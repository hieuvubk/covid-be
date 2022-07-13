import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayModule } from './modules/day-data/day.modules';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://user:user@b4u.sqpx3.mongodb.net/?retryWrites=true&w=majority',
  ),
  DayModule,
  ],
})
export class AppModule {}
