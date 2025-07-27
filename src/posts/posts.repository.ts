import { Injectable } from "@nestjs/common";
import { Post } from "src/domain/Post";

@Injectable()
export class PostsRepository {
  posts: Post[] = new Array<Post>();

  create(post: Post): Post {
    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findById(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  update(id: string, updatedPost: Post): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  delete(id: string): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return false;

    this.posts.splice(postIndex, 1);
    return true;
  }
}
