import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './Product.entity';
import { ormProduct } from 'src/product/domain/entity/ormProduct';
import { Repository } from 'typeorm';
import {
  createProduct,
  productget,
  product,
} from 'src/product/domain/entity/entityInterfaceProduct';

export class Product implements ormProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private adminInject: Repository<ProductEntity>,
  ) {}
  async set_Discount_Product_update(
    id: string,
    discount: number,
  ): Promise<void> {
    await this.adminInject.update(
      { id: id },
      { percentaje_discount: discount },
    );
  }
  async find_Stock_productId(id: string): Promise<number> {
    const resp = await this.adminInject.findOneBy({ id: id });
    return resp.stock;
  }
  async set_Price_Product_update(id: string, price: number): Promise<void> {
    await this.adminInject.update({ id: id }, { price: price });
  }
  async find_Stock_product_Name(name: string): Promise<number> {
    const resp = await this.adminInject.findOneBy({ name: name });
    return resp.stock;
  }
  async set_Stock_Product_update(id: string, stock: number): Promise<void> {
    await this.adminInject.update({ id: id }, { stock: stock });
  }
  async delete(id: string): Promise<void> {
    await this.adminInject.delete({ id: id });
  }
  create(CreateProduct: createProduct): void {
    this.adminInject.create(CreateProduct);
  }
  async update_Product(id: string, product: createProduct): Promise<void> {
    await this.adminInject.update({ id: id }, product);
  }

  async find_Product_All_Id(id: string): Promise<product> {
    const obj = await this.adminInject.findOneBy({ id: id });
    const resp: product = {
      category_product: obj.category_product,
      franchise: obj.franchise,
      gender: obj.gender,
      id: obj.id,
      name: obj.name,
      percentaje_discount: obj.percentaje_discount,
      createdAt: obj.createdAt,
      deleted_at: obj.deleted_at,
      updatedAt: obj.updatedAt,
      price: obj.price,
      status: obj.status,
      stock: obj.stock,
    };
    return resp;
  }

  async find_Product_by_Id(id: string): Promise<productget> {
    const obj = await this.adminInject.findOneBy({ id: id });
    const resp: productget = {
      category_product: obj.category_product,
      franchise: obj.franchise,
      gender: obj.gender,
      id: obj.id,
      name: obj.name,
      percentaje_discount: obj.percentaje_discount,
      price: obj.price,
      status: obj.status,
      stock: obj.stock,
    };
    return resp;
  }
  async find_Product_Name(name: string): Promise<productget> {
    const obj = await this.adminInject.findOneBy({ name: name });
    const resp: productget = {
      category_product: obj.category_product,
      franchise: obj.franchise,
      gender: obj.gender,
      id: obj.id,
      name: obj.name,
      percentaje_discount: obj.percentaje_discount,
      price: obj.price,
      status: obj.status,
      stock: obj.stock,
    };
    return resp;
  }
  async find_Products_Category(
    category_product: string,
  ): Promise<productget[]> {
    const obj = await this.adminInject.findBy({
      category_product: category_product,
    });
    const resp = obj.map((el) => {
      const elresp: productget = {
        category_product: el.category_product,
        franchise: el.franchise,
        gender: el.gender,
        id: el.id,
        name: el.name,
        percentaje_discount: el.percentaje_discount,
        price: el.price,
        status: el.status,
        stock: el.stock,
      };
      return elresp;
    });
    return resp;
  }
  async find_Products_Franchise(franchise: string): Promise<productget[]> {
    const obj = await this.adminInject.findBy({ franchise: franchise });
    const resp = obj.map((el) => {
      const elresp: productget = {
        category_product: el.category_product,
        franchise: el.franchise,
        gender: el.gender,
        id: el.id,
        name: el.name,
        percentaje_discount: el.percentaje_discount,
        price: el.price,
        status: el.status,
        stock: el.stock,
      };
      return elresp;
    });
    return resp;
  }
  async find_Products_Gender(gender: string): Promise<productget[]> {
    const obj = await this.adminInject.findBy({ gender: gender });
    const resp = obj.map((el) => {
      const elresp: productget = {
        category_product: el.category_product,
        franchise: el.franchise,
        gender: el.gender,
        id: el.id,
        name: el.name,
        percentaje_discount: el.percentaje_discount,
        price: el.price,
        status: el.status,
        stock: el.stock,
      };
      return elresp;
    });
    return resp;
  }
}
