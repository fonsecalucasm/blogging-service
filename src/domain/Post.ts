import { CreatePost } from "src/posts/posts.dto";

export class Post {
  public readonly id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly authorId: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly isDeleted: boolean;

  constructor(
    id: string,
    title: string,
    content: string,
    authorId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    isDeleted: boolean = false
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  public static toDTO(post: Post): CreatePost {
    return new CreatePost({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
    });
  }
}
