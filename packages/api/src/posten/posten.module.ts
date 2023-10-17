import { Module } from '@nestjs/common';
import { PostenService } from './posten.service';
import { PostenResolver } from './posten.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posten } from './entities/posten.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Posten])],
  providers: [PostenResolver, PostenService],
  exports : [PostenService],
})
export class PostenModule {}
