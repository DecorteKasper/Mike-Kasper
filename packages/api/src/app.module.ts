import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LifeguardModule } from './lifeguard/lifeguard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostenModule } from './posten/posten.module';

import { NotificationsGateway } from './notifications/notifications.gateway';
import { TodoModule } from './todo/todo.module';
import { NotificationsModule } from './notifications/notifications.module';

import { HolidaysModule } from './holidays/holidays.module';
import { ReportsModule } from './reports/reports.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), LifeguardModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27027/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),
    SeedModule,
    AuthenticationModule,
    UsersModule,
    PostenModule,
    TodoModule,
    NotificationsModule
    HolidaysModule,
    ReportsModule,
  ],

  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})


export class AppModule { }
