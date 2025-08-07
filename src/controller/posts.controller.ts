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

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("search")
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
  async getPostById(@Param("id") postId: string): Promise<PostResult> {
    const result = await this.postsService.getPostById(postId);
    return PostResult.toDTO(result);
  }

  @Put(":id")
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
  async deletePost(@Param("id") postId: string): Promise<void> {
    this.postsService.deletePost(postId);
  }

  @Post()
  async createPost(@Body() createPost: CreatePost): Promise<PostResult> {
    const result = await this.postsService.createPost(
      BlogPost.toDomain(createPost)
    );
    return PostResult.toDTO(result);
  }

  @Get()
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
