import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;

  @ManyToOne(() => Product, (product) => product.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
