import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  Active = 'Active',
  Completed = 'Completed',
  Archived = 'Archived',
}

export class Todo {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TodoStatus })
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class CreateTodoDto extends OmitType(Todo, [] as const) {
  id?: string | number;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
