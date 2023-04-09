import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { UserService } from './service/user.service';
import { NotesService } from './service/notes.service';
import { NotesEntity } from './entities/notes.entity';

const entities = [UserEntity, NotesEntity];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
    
            return {
              type: 'postgres',
              host: 'localhost',
              port: 5434,
              username: 'test_user',
              password: 'test_password',
              database: 'test_db',
              entities: entities,
              synchronize: true,
            };
          },
        }),
        TypeOrmModule.forFeature(entities),
      ],
    providers: [UserService, NotesService],
    exports: [UserService, NotesService]
})
export class DatabaseModule {}
