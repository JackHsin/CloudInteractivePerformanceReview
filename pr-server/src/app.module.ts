import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account/entities/account.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

const {
  MYSQL_DB_HOST,
  MYSQL_DB_PORT,
  MYSQL_ROOT_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

@Module({
  imports: [
    AccountModule,
    ReviewModule,
    TypeOrmModule.forRoot({
      timezone: 'Z',
      autoLoadEntities: true,
      type: 'mysql',
      host: MYSQL_DB_HOST,
      port: parseInt(MYSQL_DB_PORT),
      username: MYSQL_ROOT_USER,
      password: MYSQL_ROOT_PASSWORD,
      database: MYSQL_DATABASE,
      entities: [AccountEntity],
      logging: 'all',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3001',
        credentials: true,
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
