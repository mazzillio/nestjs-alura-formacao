import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CharacteristicProductDTO, ImageProductDTO } from './CreateProduct.dto';

export class UpdateProductDTO {
  @IsUUID(undefined, { message: 'Invalid user ID' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Product name cant be empty' })
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'Value must greater than zero' })
  @IsOptional()
  value: number;

  @IsNumber()
  @Min(0, { message: 'Minimum quantity invalid' })
  @IsOptional()
  availableQuantity: number;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CharacteristicProductDTO)
  @IsOptional()
  characteristics: CharacteristicProductDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  @IsOptional()
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Product category cant be empty' })
  @IsOptional()
  category: string;
}
