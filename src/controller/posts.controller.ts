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
import { CreatePost, PostResult } from "../commons/dto/post-result.dto";
import { Post as BlogPost } from "../schemas/post.schema";
import { PostsService } from "../service/posts.service";
import { ApiCreatedResponse, ApiResponse } from "@nestjs/swagger";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("search")
  @ApiResponse({
    status: 200,
    description: "List of posts",
    type: [PostResult],
  })
  async searchPostsByKeyword(
    @Query("keyword") keyword: string,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1
  ): Promise<PostResult[]> {
    const result = await this.postsService.searchPostsByKeyword(
      keyword,
      limit,
      page
    );
    return result.map((post) => {
      return PostResult.toDTO(post);
    });
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The post with the specified ID",
    type: PostResult,
  })
  async getPostById(@Param("id") postId: string): Promise<PostResult> {
    const result = await this.postsService.getPostById(postId);
    return PostResult.toDTO(result);
  }

  @Put(":id")
  @ApiCreatedResponse({
    description: "List of posts",
    type: PostResult,
  })
  async updatePost(
    @Param("id") postId: string,
    @Body() updatePost: CreatePost
  ): Promise<PostResult> {
    const result = await this.postsService.updatePost(
      postId,
      BlogPost.toDomain(updatePost)
    );
    return PostResult.toDTO(result);
  }

  @Delete(":id")
  @ApiResponse({
    status: 204,
    description: "Post deleted successfully",
  })
  async deletePost(@Param("id") postId: string): Promise<void> {
    this.postsService.deletePost(postId);
  }

  @Post()
  @ApiCreatedResponse({
    description: "Post created successfully",
    type: PostResult,
  })
  async createPost(@Body() createPost: CreatePost): Promise<PostResult> {
    const result = await this.postsService.createPost(
      BlogPost.toDomain(createPost)
    );
    return PostResult.toDTO(result);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "List of posts",
    type: [PostResult],
  })
  async getPosts(
    @Query("limit") limit: number = 25,
    @Query("page") page: number = 1
  ): Promise<PostResult[]> {
    const result = await this.postsService.getPosts(limit, page);
    return result.map((post) => {
      return PostResult.toDTO(post);
    });
  }
}
