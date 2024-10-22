import { usecase } from '@/cashflow/domain/usecase/usecase';

export type findmethod = Pick<
  usecase,
  | 'find_Balance_day'
  | 'find_Balance_Month'
  | 'find_Expense_Day'
  | 'find_Expense_Month'
  | 'find_Revenue_Day'
  | 'find_Revenue_Month'
>;
