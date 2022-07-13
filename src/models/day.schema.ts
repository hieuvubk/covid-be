import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';

export type DayDocument = Day & Document;

@Schema()
export class Day {

  @Prop()
  date: string;

  @Prop()
  state: string;

  @Prop()
  confirmed?: number;

  @Prop()
  recovered?: number;

  @Prop()
  deceased?: number;

  @Prop()
  tested?: number;

  @Prop()
  vaccinated1?: number;

  @Prop()
  vaccinated2?: number;

}

export const DaySchema = SchemaFactory.createForClass(Day);