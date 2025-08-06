import { PostRepository } from "./post.repository";
import { IPost } from "src/schemas/models/post.interface";

class MockPostRepository extends PostRepository {
  createPost = jest.fn<Promise<IPost>, [IPost]>();
  getPostById = jest.fn<Promise<IPost | null>, [string]>();
  updatePost = jest.fn<Promise<IPost | null>, [string, Partial<IPost>]>();
  deletePost = jest.fn<Promise<void>, [string]>();
  getAllPosts = jest.fn<Promise<IPost[]>, [number, number]>();
  searchPostsByKeyword = jest.fn<Promise<IPost[]>, [string, number, number]>();
}

describe("PostRepository (abstract contract)", () => {
  let repository: MockPostRepository;

  beforeEach(() => {
    repository = new MockPostRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call createPost with correct arguments and return value", async () => {
    // Arrange
    const post: IPost = { id: "1", title: "t", content: "c" } as any;
    repository.createPost.mockResolvedValue(post);

    // Act
    const result = await repository.createPost(post);

    // Assert
    expect(repository.createPost).toHaveBeenCalledWith(post);
    expect(result).toBe(post);
  });

  it("should call getPostById with correct arguments and return value", async () => {
    // Arrange
    const post: IPost = { id: "2" } as any;
    repository.getPostById.mockResolvedValue(post);

    // Act
    const result = await repository.getPostById("2");

    // Assert
    expect(repository.getPostById).toHaveBeenCalledWith("2");
    expect(result).toBe(post);
  });

  it("should call updatePost with correct arguments and return value", async () => {
    // Arrange
    const updated: IPost = { id: "3", title: "updated" } as any;
    repository.updatePost.mockResolvedValue(updated);

    // Act
    const result = await repository.updatePost("3", { title: "updated" });

    // Assert
    expect(repository.updatePost).toHaveBeenCalledWith("3", {
      title: "updated",
    });
    expect(result).toBe(updated);
  });

  it("should call deletePost with correct arguments", async () => {
    // Arrange
    repository.deletePost.mockResolvedValue(undefined);

    // Act
    await repository.deletePost("4");

    // Assert
    expect(repository.deletePost).toHaveBeenCalledWith("4");
  });

  it("should call getAllPosts with correct arguments and return value", async () => {
    // Arrange
    const posts: IPost[] = [{ id: "5" } as any];
    repository.getAllPosts.mockResolvedValue(posts);

    // Act
    const result = await repository.getAllPosts(10, 1);

    // Assert
    expect(repository.getAllPosts).toHaveBeenCalledWith(10, 1);
    expect(result).toBe(posts);
  });

  it("should call searchPostsByKeyword with correct arguments and return value", async () => {
    // Arrange
    const posts: IPost[] = [{ id: "6" } as any];
    repository.searchPostsByKeyword.mockResolvedValue(posts);

    // Act
    const result = await repository.searchPostsByKeyword("test", 5, 2);

    // Assert
    expect(repository.searchPostsByKeyword).toHaveBeenCalledWith("test", 5, 2);
    expect(result).toBe(posts);
  });
});
