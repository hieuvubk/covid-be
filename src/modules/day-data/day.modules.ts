import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from 'src/models/day.schema';
import { DayController } from 'src/modules/day-data/day.controller';
import { DayService } from 'src/modules/day-data/day.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Day.name, schema: DaySchema },
    ]),
  ],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
