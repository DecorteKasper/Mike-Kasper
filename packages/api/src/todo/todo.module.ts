import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { type } from 'os';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    NotificationsModule
  ],
  providers: [TodoResolver, TodoService],
  exports: [TodoService],
})
export class TodoModule { }
