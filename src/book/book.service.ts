import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { IBook } from 'src/interface/book.interface';
import { Model } from 'mongoose';
import { UpdateBookDto } from 'src/dto/update-book.dto';
@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<IBook>) {}
  async createBook(createBookDto: CreateBookDto): Promise<IBook> {
    const newBook = await new this.bookModel(createBookDto);
    return newBook.save();
  }
  async updateBook(
    studentId: string,
    updateBookDto: UpdateBookDto,
  ): Promise<IBook> {
    const existingBook = await this.bookModel.findByIdAndUpdate(
      studentId,
      updateBookDto,
      { new: true },
    );
    if (!existingBook) {
      throw new NotFoundException(`Book #${studentId} not found`);
    }
    return existingBook;
  }
  async getAllBooks(): Promise<IBook[]> {
    const bookData = await this.bookModel.find();
    if (!bookData || bookData.length == 0) {
      throw new NotFoundException('Books data not found!');
    }
    return bookData;
  }
  async getBook(studentId: string): Promise<IBook> {
    const existingBook = await this.bookModel.findById(studentId).exec();
    if (!existingBook) {
      throw new NotFoundException(`Book #${studentId} not found`);
    }
    return existingBook;
  }
  async deleteBook(studentId: string): Promise<IBook> {
    const deletedBook = await this.bookModel.findByIdAndDelete(studentId);
    if (!deletedBook) {
      throw new NotFoundException(`Book #${studentId} not found`);
    }
    return deletedBook;
  }
}
