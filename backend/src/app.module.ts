import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';


const configService = new ConfigService();
console.log('MongoDB URI:', configService.get<string>('MONGODB_URI'));  // Logs the environment variable


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the configuration available globally
      envFilePath: '.env.local',  // Explicitly defines the path to the .env file (if necessary)
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Fetches the URI from the environment
      }),
      inject: [ConfigService],
    }),
    NotesModule,
  ],
})
export class AppModule {}
