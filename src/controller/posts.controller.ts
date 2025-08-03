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
import { Post as BlogPost } from "src/schemas/post.schema";
import { PostsService } from "src/service/posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query("limit") limit: number = 25,
    @Query("page") page: number = 1
  ): Promise<BlogPost[]> {
    return await this.postsService.getPosts(limit, page);
  }

  @Get(":id")
  getPostById(@Param("id") postId: string): Promise<BlogPost> {
    return this.postsService.getPostById(postId);
  }

  @Post()
  createPost(@Body() createPost: BlogPost): Promise<BlogPost> {
    return this.postsService.createPost(createPost);
  }

  @Put(":id")
  updatePost(
    @Param("id") postId: string,
    @Body() updatePost: BlogPost
  ): Promise<BlogPost> {
    return this.postsService.updatePost(postId, updatePost);
  }

  @Delete(":id")
  async deletePost(@Param("id") postId: string): Promise<void> {
    await this.postsService.deletePost(postId);
  }
}
