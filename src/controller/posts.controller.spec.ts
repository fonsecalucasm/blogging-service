import { PostsService } from "../../src/service/posts.service";
import { PostsController } from "./posts.controller";
import { CreatePost, PostResult } from "../../src/commons/dto/post-result.dto";
import { Post } from "../../src/schemas/post.schema";

describe("PostsController", () => {
  let controller: PostsController;
  let postsService: jest.Mocked<PostsService>;

  beforeEach(() => {
    postsService = {
      searchPostsByKeyword: jest.fn(),
      getPostById: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      createPost: jest.fn(),
      getPosts: jest.fn(),
    } as any;

    controller = new PostsController(postsService);

    // Mock DTO conversion
    jest
      .spyOn(PostResult, "toDTO")
      .mockImplementation((post: any) => ({ ...post, dto: true }));
    jest
      .spyOn(Post, "toDomain")
      .mockImplementation((dto: any) => ({ ...dto, domain: true }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("searchPostsByKeyword", () => {
    it("should return mapped posts from service", async () => {
      // Arrange
      const posts = [
        {
          _id: "1",
          title: "Portugues",
          content: "conteudo da materia",
          author: "Prof. Luis",
        },
        {
          _id: "1",
          title: "Matematica",
          content: "conteudo da materia",
          author: "Prof. Luis",
        },
      ].map((post) => {
        return Post.toDomain(post);
      });
      postsService.searchPostsByKeyword.mockResolvedValue(posts);

      // Act
      const result = await controller.searchPostsByKeyword("conteudo", 5, 2);

      // Assert
      expect(postsService.searchPostsByKeyword).toHaveBeenCalledWith(
        "conteudo",
        5,
        2
      );
      expect(result).toMatchObject([
        {
          _id: "1",
          title: "Portugues",
          content: "conteudo da materia",
          author: "Prof. Luis",
          dto: true,
          domain: true,
        },
        {
          _id: "1",
          title: "Matematica",
          content: "conteudo da materia",
          author: "Prof. Luis",
          dto: true,
          domain: true,
        },
      ]);
    });
  });

  describe("getPostById", () => {
    it("should return mapped post from service", async () => {
      // Arrange
      const post = Post.toDomain({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
      });
      postsService.getPostById.mockResolvedValue(post);

      // Act
      const result = await controller.getPostById("abc");

      // Assert
      expect(postsService.getPostById).toHaveBeenCalledWith("abc");
      expect(result).toEqual({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
        dto: true,
        domain: true,
      });
    });
  });

  describe("updatePost", () => {
    it("should update and return mapped post", async () => {
      // Arrange
      const updateDto: CreatePost = { title: "t", content: "c" } as any;
      const domainPost = { title: "t", content: "c", domain: true };
      const updatedPost = Post.toDomain({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
      });
      (Post.toDomain as jest.Mock).mockReturnValue(domainPost);
      postsService.updatePost.mockResolvedValue(updatedPost);

      // Act
      const result = await controller.updatePost("xyz", updateDto);

      // Assert
      expect(Post.toDomain).toHaveBeenCalledWith(updateDto);
      expect(postsService.updatePost).toHaveBeenCalledWith("xyz", domainPost);
      expect(result).toEqual({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
        dto: true,
        domain: true,
      });
    });
  });

  describe("deletePost", () => {
    it("should call service to delete post", async () => {
      // Arrange
      postsService.deletePost.mockResolvedValue(undefined);

      // Act
      await controller.deletePost("delid");

      // Assert
      expect(postsService.deletePost).toHaveBeenCalledWith("delid");
    });
  });

  describe("createPost", () => {
    it("should create and return mapped post", async () => {
      // Arrange
      const createDto: CreatePost = { title: "new", content: "post" } as any;
      const domainPost = { title: "new", content: "post", domain: true };
      const createdPost = Post.toDomain({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
      });
      (Post.toDomain as jest.Mock).mockReturnValue(domainPost);
      postsService.createPost.mockResolvedValue(createdPost);

      // Act
      const result = await controller.createPost(createDto);

      // Assert
      expect(Post.toDomain).toHaveBeenCalledWith(createDto);
      expect(postsService.createPost).toHaveBeenCalledWith(domainPost);
      expect(result).toEqual({
        title: "Portugues",
        content: "conteudo da materia",
        author: "Prof. Luis",
        dto: true,
        domain: true,
      });
    });
  });

  describe("getPosts", () => {
    it("should return mapped posts from service", async () => {
      // Arrange
      const posts = [
        {
          _id: "1",
          title: "Portugues",
          content: "conteudo da materia",
          author: "Prof. Luis",
        },
        {
          _id: "1",
          title: "Matematica",
          content: "conteudo da materia",
          author: "Prof. Luis",
        },
      ].map((post) => {
        return Post.toDomain(post);
      });
      postsService.getPosts.mockResolvedValue(posts);

      // Act
      const result = await controller.getPosts(10, 3);

      // Assert
      expect(postsService.getPosts).toHaveBeenCalledWith(10, 3);
      expect(result).toEqual([
        {
          _id: "1",
          title: "Portugues",
          content: "conteudo da materia",
          author: "Prof. Luis",
          dto: true,
          domain: true,
        },
        {
          _id: "1",
          title: "Matematica",
          content: "conteudo da materia",
          author: "Prof. Luis",
          dto: true,
          domain: true,
        },
      ]);
    });
  });
});
