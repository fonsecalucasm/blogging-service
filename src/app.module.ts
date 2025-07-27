import { Module } from "@nestjs/common";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";
import { PostsRepository } from "./posts/posts.repository";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class AppModule {}
