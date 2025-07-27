import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePost, UpdatePost } from "./posts.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query("query") query?: string): CreatePost[] {
    return this.postsService.getPosts(query);
  }

  @Get(":id")
  getPostById(@Param("id") postId: string): CreatePost {
    return this.postsService.getPostById(postId);
  }

  @Post()
  createPost(@Body() createPost: CreatePost): CreatePost {
    return this.postsService.createPost(createPost);
  }

  @Put(":id")
  updatePost(@Param("id") postId: string, updatePost: UpdatePost) {
    return this.postsService.updatePost(postId, updatePost);
  }

  @Delete(":id")
  deletePost(@Param("id") postId: string) {
    return this.postsService.deletePost(postId);
  }
}
