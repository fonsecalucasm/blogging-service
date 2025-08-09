import { ApiProperty } from "@nestjs/swagger";
import { IPost } from "src/schemas/models/post.interface";

export class CreatePost {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  constructor(partial: Partial<CreatePost>) {
    this.title = partial.title || "";
    this.content = partial.content || "";
    this.author = partial.author || "";
  }

  static toDTO(post: IPost): CreatePost {
    return new CreatePost({
      title: post.title,
      content: post.content,
      author: post.author,
    });
  }
}

export class PostResult extends CreatePost {
  @ApiProperty()
  id: string;

  constructor(partial: Partial<PostResult>) {
    super(partial);
    this.id = partial.id || "";
  }

  static toDTO(post: IPost): PostResult {
    return new PostResult({
      id: post._id,
      title: post.title,
      content: post.content,
      author: post.author,
    });
  }
}
