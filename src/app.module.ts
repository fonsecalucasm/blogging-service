import { Module } from "@nestjs/common";
import { PostsService } from "./service/posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./controller/posts.controller";
import { Post, PostSchema } from "./schemas/post.schema";
import { PostRepository } from "./repositories/post.repository";
import { PostMongooseRepository } from "./repositories/mongoose/post.mongoose.repository";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/blogging"),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: PostRepository,
      useClass: PostMongooseRepository,
    },
  ],
})
export class AppModule {}
