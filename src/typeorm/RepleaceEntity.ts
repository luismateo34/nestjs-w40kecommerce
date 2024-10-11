import { Base } from '@/config/base';
import { stock } from '@/replenishStock/domain/entity/entityInterfaceRepelace';
import { Column, Entity, OneToMany } from 'typeorm';
import { AdminEntity } from './adminEntity';
import { ProductEntity } from './ProductEntity';

@Entity({ name: 'repleace' })
export class Repleace extends Base implements stock {
  @OneToMany(() => AdminEntity, (admin) => admin.name)
  admin: string;
  @Column()
  amount: number;
  @OneToMany(() => ProductEntity, (product) => product.name)
  product: string;
  @Column()
  quantity: number;
}
