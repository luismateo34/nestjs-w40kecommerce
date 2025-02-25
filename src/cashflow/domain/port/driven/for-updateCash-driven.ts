import { usecase } from 'src/cashflow/domain/usecase/usecase';

export type updateMethod = Pick<
  usecase,
  | 'update_Balance_Day'
  | 'update_Revenue_Day'
  | 'update_Balance_Month'
  | 'update_Revenue_Month'
  | 'update_Expense_Day'
  | 'update_Expense_Month'
>;
