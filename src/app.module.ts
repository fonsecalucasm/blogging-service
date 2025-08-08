import { Module } from "@nestjs/common";
import { PostsService } from "./service/posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./controller/posts.controller";
import { Post, PostSchema } from "./schemas/post.schema";
import { PostRepository } from "./repositories/post.repository";
import { PostMongooseRepository } from "./repositories/mongoose/post.mongoose.repository";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./commons/interceptors/logging.interceptor";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL ?? "mongodb://localhost:27017/blogging"
    ),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: PostRepository,
      useClass: PostMongooseRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
