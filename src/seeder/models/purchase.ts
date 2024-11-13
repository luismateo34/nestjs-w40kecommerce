import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
import { Factory } from 'nestjs-seeder';

export class PurchaseSeed implements OrderPurchase {
  @Factory((fake) => fake.number.float())
  amount: number;
  @Factory((fake) => fake.person.fullName())
  client: string[];
  @Factory((fake) => fake.date.anytime())
  createdAt: Date;

  @Factory((fake) => fake.date.anytime())
  date: Date;

  envoy = false;
  @Factory((fake) => fake.string.uuid())
  id: string;

  products = ['libros', 'codex'];

  @Factory((fake) => fake.date.anytime())
  updatedAt: Date;
}
