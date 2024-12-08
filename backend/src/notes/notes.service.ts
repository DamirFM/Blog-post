import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(noteData: Partial<Note>) {
    const note = new this.noteModel(noteData);
    await note.save();
    return {
      message: 'Note created successfully',
      note,
    };
  }

  async findAll() {
    const notes = await this.noteModel.find().exec();
    if (notes.length === 0) {
      return { message: 'No notes found' };
    }
    return {
      message: 'Notes retrieved successfully',
      notes,
    };
  }

  // NEW METHOD
  async findOne(id: string) {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      return { message: 'Note not found' };
    }
    return {
      message: 'Note retrieved successfully',
      note,
    };
  }

  async update(id: string, noteData: Partial<Note>) {
    const updatedNote = await this.noteModel.findByIdAndUpdate(id, noteData, {
      new: true,
    });
    if (!updatedNote) {
      return { message: 'Note not found for update' };
    }
    return {
      message: 'Note updated successfully',
      updatedNote,
    };
  }

  async delete(id: string) {
    const deletedNote = await this.noteModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return { message: 'Note not found for deletion' };
    }
    return {
      message: 'Note deleted successfully',
      deletedNote,
    };
  }
}
