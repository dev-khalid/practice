import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto, Todo, TodoStatus } from './dto/todo.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CombinedDto } from './dto/combined.dto';
import { Pay } from './dto/pay.dto';
import { WorkOrder } from './dto/workorder.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('all-schemas')
  @ApiOkResponse({
    type: CombinedDto,
    description: 'Combined output (This route should be ignored)',
  })
  dummyModel(): CombinedDto {
    return {
      pay: new Pay(),
      workOrder: new WorkOrder(),
    };
  }

  @Post()
  createTodo(@Body() todo: Todo): CreateTodoDto {
    return {
      ...todo,
      id: Number(Math.floor(Math.random() * 100000)).toString(),
    };
  }
}
