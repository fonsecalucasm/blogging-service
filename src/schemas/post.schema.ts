import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IPost } from "./models/post.interface";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  public id: string;
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
}

export const PostSchema = SchemaFactory.createForClass(Post);
