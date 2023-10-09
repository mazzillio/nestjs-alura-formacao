import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListProdutoDTO } from './dto/ListProduct.dto';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productData: CreateProductDTO) {
    const productEntity = new Product();

    Object.assign(productEntity, <Product>productData);

    return this.productRepository.save(productEntity);
  }

  async listProducts(): Promise<ListProdutoDTO[]> {
    const saveProducts = await this.productRepository.find({
      relations: {
        images: true,
        characteristics: true,
      },
    });
    const productsList = saveProducts.map(
      (product) =>
        new ListProdutoDTO(
          product.id,
          product.name,
          product.characteristics,
          product.images,
        ),
    );
    return productsList;
  }

  async updateProduct(id: string, newData: UpdateProductDTO) {
    const entityName = await this.productRepository.findOneBy({ id });
    if (!entityName) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(entityName, <Product>newData);
    return this.productRepository.save(entityName);
  }

  async deletProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
