import { MongoRepository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: MongoRepository<Todo>,
  ) { }

  // 1 record toevoegen
  create(createTodoInput: CreateTodoInput) {
    const todo = new Todo()
    todo.post = createTodoInput.post
    todo.description = createTodoInput.description
    todo.status = false
    return this.todoRepository.save(todo)
  }


  async update(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoRepository.findOne({ _id: new ObjectId(id) } as any)

    todo.post = updateTodoInput.post
    todo.description = updateTodoInput.description
    todo.status = updateTodoInput.status
    await this.todoRepository.update(todo.id, todo)

    return todo
  }


  // Alle records vinden
  findAll() {
    return this.todoRepository.find();
  }

  // 1 record verwijderen
  async remove(id: string) {
    const todo = await this.todoRepository.findOne({ _id: new ObjectId(id) } as any)
    if (todo) {
      await this.todoRepository.delete(todo)
      return todo
    }
    return null
  }

  // Zoek 1 record op basis van ID
  findOneById(id: string): Promise<Todo> {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')
    const obj = new ObjectId(id)
    // @ts-ignore
    return this.todoRepository.findOne({ _id: new ObjectId(id) })
  }

}
