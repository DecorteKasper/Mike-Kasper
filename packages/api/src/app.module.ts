import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LifeguardModule } from './lifeguard/lifeguard.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
  

export class AppModule {}
