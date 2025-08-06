import { PostsService } from "./posts.service";
import { NotFoundException } from "@nestjs/common";
import { PostRepository } from "../repositories/post.repository";
import { IPost } from "../schemas/models/post.interface";

describe("PostsService", () => {
  let service: PostsService;
  let postRepository: jest.Mocked<PostRepository>;

  beforeEach(() => {
    postRepository = {
      getAllPosts: jest.fn(),
      getPostById: jest.fn(),
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      searchPostsByKeyword: jest.fn(),
    } as any;

    service = new PostsService(postRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPosts", () => {
    it("should return posts from repository", async () => {
      // Arrange
      const posts: IPost[] = [{ id: "1" } as any, { id: "2" } as any];
      postRepository.getAllPosts.mockResolvedValue(posts);

      // Act
      const result = await service.getPosts(10, 2);

      // Assert
      expect(postRepository.getAllPosts).toHaveBeenCalledWith(10, 2);
      expect(result).toEqual(posts);
    });
  });

  describe("getPostById", () => {
    it("should return post if found", async () => {
      // Arrange
      const post: IPost = { id: "abc" } as any;
      postRepository.getPostById.mockResolvedValue(post);

      // Act
      const result = await service.getPostById("abc");

      // Assert
      expect(postRepository.getPostById).toHaveBeenCalledWith("abc");
      expect(result).toEqual(post);
    });

    it("should throw NotFoundException if post not found", async () => {
      // Arrange
      postRepository.getPostById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getPostById("notfound")).rejects.toThrow(
        NotFoundException
      );
      expect(postRepository.getPostById).toHaveBeenCalledWith("notfound");
    });
  });

  describe("createPost", () => {
    it("should create and return post", async () => {
      // Arrange
      const post: IPost = { id: "new" } as any;
      postRepository.createPost.mockResolvedValue(post);

      // Act
      const result = await service.createPost(post);

      // Assert
      expect(postRepository.createPost).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe("updatePost", () => {
    it("should update and return post if found", async () => {
      // Arrange
      const post: IPost = { id: "upd" } as any;
      postRepository.updatePost.mockResolvedValue(post);

      // Act
      const result = await service.updatePost("upd", post);

      // Assert
      expect(postRepository.updatePost).toHaveBeenCalledWith("upd", post);
      expect(result).toEqual(post);
    });

    it("should throw NotFoundException if post not found", async () => {
      // Arrange
      postRepository.updatePost.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updatePost("notfound", {} as any)).rejects.toThrow(
        NotFoundException
      );
      expect(postRepository.updatePost).toHaveBeenCalledWith("notfound", {});
    });
  });

  describe("deletePost", () => {
    it("should call repository to delete post", async () => {
      // Arrange
      postRepository.deletePost.mockResolvedValue(undefined);

      // Act
      await service.deletePost("delid");

      // Assert
      expect(postRepository.deletePost).toHaveBeenCalledWith("delid");
    });
  });

  describe("searchPostsByKeyword", () => {
    it("should return posts from repository", async () => {
      // Arrange
      const posts: IPost[] = [{ id: "a" } as any, { id: "b" } as any];
      postRepository.searchPostsByKeyword.mockResolvedValue(posts);

      // Act
      const result = await service.searchPostsByKeyword("test", 5, 1);

      // Assert
      expect(postRepository.searchPostsByKeyword).toHaveBeenCalledWith(
        "test",
        5,
        1
      );
      expect(result).toEqual(posts);
    });
  });
});
