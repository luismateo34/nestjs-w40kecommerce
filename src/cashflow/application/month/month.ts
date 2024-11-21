export enum month_spanish {
  january = 0,
  february = 1,
  march = 2,
  april = 3,
  may = 4,
  june = 5,
  july = 6,
  august = 7,
  september = 8,
  octuber = 9,
  november = 10,
  december = 11,
}
export type string_month_spanish = keyof typeof month_spanish;

export const NumberMonth = (month: string_month_spanish): number => {
  let month_number: number;
  const arrMonth = Object.keys(month_spanish);
  for (const item in month_spanish) {
    if (item === month) {
      month_number = Number(month_spanish[month]);
    }
    if (arrMonth.indexOf(month) === -1) {
      throw new Error('el dato no es un mes valido');
    }
  }
  return month_number;
};
