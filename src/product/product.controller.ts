import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productData: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(productData);

    return {
      message: 'Produto criado com sucesso.',
      product: createdProduct,
    };
  }

  @Get()
  async listAll() {
    return this.productService.listProducts();
  }
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const produtoAlterado = await this.productService.updateProduct(
      id,
      productData,
    );

    return {
      message: 'product update success',
      product: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.productService.deletProduct(id);

    return {
      message: 'product removed success',
      product: produtoRemovido,
    };
  }
}
