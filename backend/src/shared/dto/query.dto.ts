import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { IsGte } from '../decorator/is-gte.decorator';

export class QueryDto {
  @ApiPropertyOptional({ default: 0, description: 'Skip the first n results' })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip = 0;

  @ApiPropertyOptional({
    default: 100,
    description: 'Limit the number of results',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  take = 100;

  @ApiPropertyOptional({ default: 'id', description: 'Sort by this field' })
  @IsOptional()
  @IsString()
  @IsIn(['id', 'question', 'createdAt', 'updatedAt'])
  sort = 'updatedAt';

  @ApiPropertyOptional({
    default: Prisma.SortOrder.asc,
    description: 'Sort direction',
  })
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  order: Prisma.SortOrder = Prisma.SortOrder.desc;

  @ApiPropertyOptional({
    format: '2021-01-01T11:59:59.999Z',
    description: 'Filter by this date',
  })
  @IsOptional()
  from: Date;

  @ApiPropertyOptional({
    format: '2021-01-01T11:59:59.999Z',
    description: 'Filter by this date',
  })
  @IsOptional()
  @Validate(IsGte, ['from'])
  to: Date;
}

export class QueryDeleteDto {
  @ApiPropertyOptional({ default: false })
  force = false;
}
