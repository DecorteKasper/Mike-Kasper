import { Server, Socket } from 'socket.io'
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets'
import { FirebaseWebsocketGuard } from 'src/authentication/guards/firebase.websocket.guard'
import { TodoService } from 'src/todo/todo.service'
import { Todo } from 'src/todo/entities/todo.entity'
import { CreateTodoInput } from 'src/todo/dto/create-todo.input'
import { UsersService } from 'src/users/users.service'

@WebSocketGateway(+process.env.WS_PORT || 3004, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  },
})

export class NotificationsGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  private todos: Todo[] = [];
  constructor(
    private readonly todoService: TodoService,
    private readonly usersService: UsersService,
  ) { }

  @WebSocketServer() //An alternative for afterInit()
  server: Server

  numberOfMessages: number = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('Message received: ', payload)
    // this.server.emit('todo:add', payload)
    return 'Hello world!'
  }

  handleDisconnect(client: any) {
    this.numberOfMessages--
    console.log('Message disconnected 👋')
    console.log('Number of Message on the server: ', this.numberOfMessages)
  }
  async handleConnection(client: any, ...args: any[]) {
    this.numberOfMessages++
    console.log('Message connected')
    console.log('Number of Message on the server: ', this.numberOfMessages)

    // Vraag alle todo's in de database op en stuur ze naar de client
    const todos = await this.todoService.findAll();
    client.emit('todos', todos);
    const users = await this.usersService.findAll();
    client.emit('users', users);
  }
  // Deze functie werkt.
  sendTodo(payload: any) {

    const newTodo: Todo = payload;

    this.todos.push(newTodo);

    this.server.emit('todo:add', newTodo);

    this.todoService.findAll().then((todosDatabase) => {
      const todosWithnewTodo = [...todosDatabase, newTodo]
      this.server.emit('todos', todosWithnewTodo);
    });
  }

  async handleDeleteTodo(id: string) {
    try {
      const removedTodo = await this.todoService.remove(id);
      // Deze console.log wordt niet uitgevoerd
      console.log('removedTodo realtime' + id);

      if (removedTodo) {
        // Als het verwijderen is gelukt, stuur een bericht naar alle clients
        this.server.emit('todo:remove', removedTodo);

        // Haal bijgewerkte lijst met todos op
        const updatedTodos = await this.todoService.findAll();

        // Stuur de bijgewerkte lijst naar alle clients
        this.server.emit('todos', updatedTodos);
      }
    } catch (error) {
      // Verwerk eventuele fouten bij het verwijderen
      console.error(`Fout bij het verwijderen van todo met ID ${id}:`, error.message);
    }
  }

  async handleDeleteUser(id: string) {
    try {
      const removedUser = await this.usersService.remove(id);
      console.log('removedUser realtime' + id);

      if (removedUser) {
        // Als het verwijderen is gelukt, stuur een bericht naar alle clients
        this.server.emit('user:remove', removedUser);

        // Haal bijgewerkte lijst met todos op
        const updatedUsers = await this.usersService.findAll();

        // Stuur de bijgewerkte lijst naar alle clients
        this.server.emit('users', updatedUsers);
      }
    } catch (error) {
      // Verwerk eventuele fouten bij het verwijderen
      console.error(`Fout bij het verwijderen van user met ID ${id}:`, error.message);
    }

  }

  async handleDeleteAllUsers(id: string[]) {
    try {
      const removedUsers = await this.usersService.removeAll(id);
      console.log('removedUsers realtime' + id);

      if (removedUsers) {
        // Als het verwijderen is gelukt, stuur een bericht naar alle clients
        this.server.emit('users:remove', removedUsers);

        // Haal bijgewerkte lijst met todos op
        const updatedUsers = await this.usersService.findAll();

        // Stuur de bijgewerkte lijst naar alle clients
        this.server.emit('users', updatedUsers);
      }
    } catch (error) {
      // Verwerk eventuele fouten bij het verwijderen
      console.error(`Fout bij het verwijderen van user met ID ${id}:`, error.message);
    }
  }

  async handleUpdate(payload: any) {
    try {
      const updatedTodo = await this.todoService.update(payload.id, payload);
      console.log('updatedTodo realtime' + payload.id);

      if (updatedTodo) {
        // Als het updaten is gelukt, stuur een bericht naar alle clients
        this.server.emit('todo:update', updatedTodo);

        // Haal bijgewerkte lijst met todos op
        const updatedTodos = await this.todoService.findAll();

        // Stuur de bijgewerkte lijst naar alle clients
        this.server.emit('todos', updatedTodos);
      }
    } catch (error) {
      // Verwerk eventuele fouten bij het updaten
      console.error(`Fout bij het updaten van todo met ID ${payload.id}:`, error.message);
    }
  }

  async handleUpdateUser(payload: any) {
    try {
      const updatedUser = await this.usersService.update(payload);
      console.log('updatedUser realtime' + payload.id);

      if (updatedUser) {
        // Als het updaten is gelukt, stuur een bericht naar alle clients
        this.server.emit('user:update', updatedUser);

        // Haal bijgewerkte lijst met todos op
        const updatedUsers = await this.usersService.findAll();

        // Stuur de bijgewerkte lijst naar alle clients
        this.server.emit('users', updatedUsers);
      }
    } catch (error) {
      // Verwerk eventuele fouten bij het updaten
      console.error(`Fout bij het updaten van user met ID ${payload.id}:`, error.message);
    }
  }


}
