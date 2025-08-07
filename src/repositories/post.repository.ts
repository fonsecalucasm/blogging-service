import { IPost } from "../schemas/models/post.interface";

export abstract class PostRepository {
  abstract createPost(post: IPost): Promise<IPost>;
  abstract getPostById(id: string): Promise<IPost | null>;
  abstract updatePost(id: string, post: Partial<IPost>): Promise<IPost | null>;
  abstract deletePost(id: string): Promise<void>;
  abstract getAllPosts(limit: number, page: number): Promise<IPost[]>;
  abstract searchPostsByKeyword(
    keyword: string,
    limit: number,
    page: number
  ): Promise<IPost[]>;
}
