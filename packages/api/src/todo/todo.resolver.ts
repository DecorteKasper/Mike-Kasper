import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly gateway: NotificationsGateway
  ) { }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    //hier spreek je de notification gateway aan
    this.gateway.sendTodo(createTodoInput)
    return this.todoService.create(createTodoInput);
  }

  // 1 record verwijderen 
  @Mutation(() => Todo)
  async removeTodo(@Args('remove', { type: () => String }) id: string) {
    this.gateway.handleDeleteTodo(id)
    return await this.todoService.remove(id)
  }

  // Krijg 1 record terug op basis van id
  @Query(() => Todo, { name: 'GetTodoById', nullable: true })
  GetTodoById(@Args('id') id: string): Promise<Todo> {
    return this.todoService.findOneById(id);
  }

  // krijg alle records terug
  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todoService.findAll();
  }

  // Update 1 record op basis van id
  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    this.gateway.handleUpdate(updateTodoInput)
    return await this.todoService.update(updateTodoInput.id, updateTodoInput)
  }
}



