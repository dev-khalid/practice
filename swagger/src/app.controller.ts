import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto, Todo, TodoStatus } from './dto/todo.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post()
  createTodo(@Body() todo: Todo): CreateTodoDto {
    return {
      ...todo,
      id: Number(Math.floor(Math.random() * 100000)).toString(),
    };
  }
}
