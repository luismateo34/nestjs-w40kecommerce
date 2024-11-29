import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashflow';
import { Factory } from 'nestjs-seeder';

export class cashSeeder implements cash {
  @Factory((faker) => faker.number.float())
  balance_day: number;

  @Factory((faker) => faker.date.anytime())
  date: Date;

  @Factory((faker) => faker.number.float())
  expenses: number;

  @Factory((faker) => faker.number.float())
  monthly_balance: number;

  @Factory((faker) => faker.number.float())
  monthly_expenses: number;

  @Factory((faker) => faker.number.float())
  monthly_revenue: number;

  @Factory((faker) => faker.number.float())
  revenue: number;

  @Factory(new Date())
  createdAt: Date;

  @Factory((faker) => faker.string.uuid())
  id: string;

  @Factory(new Date())
  updatedAt: Date;
}
