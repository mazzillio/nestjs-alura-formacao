import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Product } from '../product.entity';

export class CharacteristicProductDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Characteristic cant be empty!' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cant be empty!' })
  description: string;

  product: Product;
}

export class ImageProductDTO {
  id: string;

  @IsUrl({ message: 'Invalide URL image' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Imagem description cant be empty' })
  description: string;

  product: Product;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Product name cant be empty' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Value must be greater than zero' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'Available quanity must be greater than 0' })
  availableQuantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Product description cant be empty ' })
  @MaxLength(1000, {
    message: 'Description cant have more than 100 character',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CharacteristicProductDTO)
  characteristics: CharacteristicProductDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Category cant be empty' })
  category: string;
}
