export type TErros = {
  userRequired?: string;
  titleRequired?: string;
  students?: string;
  valorRequired?: string;
  passRequired?: string;
  classRequired?: string;
  inityDateRequired?:string;
  endDateRequired?:string;
  inityHourRequired?:string;
  endHourRequired?:string;
  durationRequired?:string;
  endLessThanInity?:string;
  invalid?: string;
}
