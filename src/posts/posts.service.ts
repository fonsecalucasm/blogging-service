import { Injectable } from "@nestjs/common";
import { CreatePost, UpdatePost } from "./posts.dto";
import { PostsRepository } from "./posts.repository";
import { Post } from "src/domain/Post";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPosts(query?: string): CreatePost[] {
    // TODO - Implement search functionality based on the query parameter
    const posts = this.postsRepository.findAll();
    return posts.map((post) => Post.toDTO(post));
  }

  getPostById(postId: string): CreatePost {
    const post = this.postsRepository.findById(postId);
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }
    return Post.toDTO(post);
  }

  createPost(createPost: CreatePost): CreatePost {
    const post = this.postsRepository.create(CreatePost.toDomain(createPost));
    return Post.toDTO(post);
  }

  updatePost(postId: string, updatePost: UpdatePost): CreatePost {
    const existingPost = this.postsRepository.findById(postId);
    if (!existingPost) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const updatedData = {
      ...existingPost,
      ...updatePost,
    } as Post;

    const post = this.postsRepository.update(postId, updatedData);
    return Post.toDTO(post);
  }

  deletePost(postId: string) {
    this.postsRepository.delete(postId);
  }
}
