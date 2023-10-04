import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProductImageEntity } from './product-imagem.entity';
import { ProductCharacteristicsEntity } from './product-characteristic.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => ProductImageEntity, (imageProduct) => imageProduct.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImageEntity[];

  @OneToMany(
    () => ProductCharacteristicsEntity,
    (characteristics) => characteristics.product,
    { cascade: true, eager: true },
  )
  characteristics: ProductCharacteristicsEntity[];
}
