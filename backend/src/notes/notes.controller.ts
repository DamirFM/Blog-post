import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body) {
    return this.notesService.create(body);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
