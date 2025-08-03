import { InjectModel } from "@nestjs/mongoose";
import { PostRepository } from "../post.repository";
import { Post } from "src/schemas/post.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { IPost } from "src/schemas/models/post.interface";

@Injectable()
export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(post: IPost): Promise<IPost> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async getPostById(id: string): Promise<IPost | null> {
    return this.postModel.findById(id).exec();
  }

  async updatePost(id: string, post: Partial<IPost>): Promise<IPost | null> {
    return this.postModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async deletePost(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }

  async getAllPosts(limit: number, page: number): Promise<IPost[]> {
    const offset = limit * (page - 1);
    return this.postModel.find().limit(limit).skip(offset).exec();
  }
}
