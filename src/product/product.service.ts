import { Injectable } from '@nestjs/common';
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

    productEntity.name = productData.name;
    productEntity.value = productData.value;
    productEntity.userId = productData.userId;
    productEntity.availableQuantity = productData.availableQuantity;
    productEntity.description = productData.description;
    productEntity.category = productData.category;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;

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
    Object.assign(entityName, newData);
    return this.productRepository.save(entityName);
  }

  async deletProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
