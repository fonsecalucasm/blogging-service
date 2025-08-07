import { Injectable, NotFoundException } from "@nestjs/common";
import { PostRepository } from "../repositories/post.repository";
import { IPost } from "../schemas/models/post.interface";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostRepository) {}

  async getPosts(limit: number, page: number): Promise<IPost[]> {
    return this.postsRepository.getAllPosts(limit, page);
  }

  async getPostById(postId: string): Promise<IPost> {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    return post;
  }

  async createPost(post: IPost): Promise<IPost> {
    return this.postsRepository.createPost(post);
  }

  async updatePost(postId: string, post: IPost): Promise<IPost> {
    const updatedPost = await this.postsRepository.updatePost(postId, post);
    if (!updatedPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    return updatedPost;
  }

  async deletePost(postId: string): Promise<void> {
    await this.postsRepository.deletePost(postId);
  }

  async searchPostsByKeyword(
    keyword: string,
    limit: number,
    page: number
  ): Promise<IPost[]> {
    return this.postsRepository.searchPostsByKeyword(keyword, limit, page);
  }
}
