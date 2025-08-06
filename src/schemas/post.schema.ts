import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IPost } from "./models/post.interface";
import { CreatePost } from "src/commons/dto/post-result.dto";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  public _id: string;
  @Prop({ required: true })
  public title: string;
  @Prop({ required: true })
  public content: string;
  @Prop({ required: true })
  public author: string;
  @Prop({ type: Date, default: Date.now })
  public createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  public updatedAt: Date;
  @Prop({ type: Boolean, default: false })
  public isDeleted: boolean;

  constructor(
    title: string,
    content: string,
    author: string,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean
  ) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  static toDomain(post: CreatePost): Post {
    return new Post(
      post.title,
      post.content,
      post.author,
      new Date(),
      new Date(),
      false
    );
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);
