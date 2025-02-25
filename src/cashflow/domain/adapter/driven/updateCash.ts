import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import {
  method_update_Balance,
  method_expense,
  method_revenue,
} from 'src/cashflow/domain/adapter/driven/updateMethod';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

export class updateCashmethodDriven implements updateMethod {
  private readonly method_balance: method_update_Balance;
  private readonly method_expense_service: method_expense;
  private readonly method_revenue_service: method_revenue;
  constructor(
    readonly cashflowRepo: ormcashflow,
    readonly order: ormPurchase,
  ) {
    this.method_expense_service = new method_expense(cashflowRepo);
    this.method_revenue_service = new method_revenue(cashflowRepo);
    this.method_balance = new method_update_Balance(cashflowRepo, order);
  }
  async update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    await this.method_balance.update_Balance_Day(year, month, day);
  }
  async update_Balance_Month(year: number, month: number): Promise<void> {
    await this.method_balance.update_Balance_Month(year, month);
  }
  async update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<void> {
    await this.method_expense_service.update_Expense_Day(
      year,
      month,
      day,
      expenses,
    );
  }

  async update_Expense_Month(year: number, month: number): Promise<void> {
    await this.method_expense_service.update_Expense_Month(year, month);
  }
  async update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<void> {
    await this.method_revenue_service.update_Revenue_Day(
      year,
      month,
      day,
      revenue,
    );
  }

  async update_Revenue_Month(year: number, month: number): Promise<void> {
    await this.method_revenue_service.update_Revenue_Month(year, month);
  }
}
