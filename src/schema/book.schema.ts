import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Book {
  @Prop()
  name: string;
  @Prop()
  roleNumber: number;
  @Prop()
  class: number;
  @Prop()
  gender: string;
  @Prop()
  marks: number;
}
export const BookSchema = SchemaFactory.createForClass(Book);
