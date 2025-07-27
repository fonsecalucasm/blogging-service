import { Post } from "src/domain/Post";

export class CreatePost {
  public readonly id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly authorId: number;

  constructor(data: {
    id: string;
    title: string;
    content: string;
    authorId: number;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.authorId = data.authorId;
  }

  static toDomain(createPost: CreatePost): Post {
    return new Post(
      crypto.randomUUID(),
      createPost.title,
      createPost.content,
      createPost.authorId,
      new Date(),
      new Date(),
      false
    );
  }
}

export class UpdatePost extends CreatePost {}
