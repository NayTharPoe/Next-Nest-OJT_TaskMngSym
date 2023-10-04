import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { paginate } from '../../constants/pagination';

const defaultPageNumber = paginate.DEFAULT_PAGE_NUMBER;
const defaultLimit = paginate.DEFAULT_LIMIT;

export class PaginationRequestDto {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @Transform((params) =>
    params.value == null ? defaultPageNumber : Number(params.value),
  )
  @IsOptional()
  page?: number = defaultPageNumber;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform((params) =>
    params.value == null ? defaultLimit : Number(params.value),
  )
  @IsOptional()
  limit?: number = defaultLimit;
}
