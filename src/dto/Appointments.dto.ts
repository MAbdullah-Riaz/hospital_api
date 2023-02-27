export interface IRemainingBalance {
  remainingBalance: Number;
}


interface Status {
  amountPaid: Number;
  amountUnpaid: Number;
  balance: Number;
}
export interface IStatement {
  weeklyStatus: Status;
  monthlyStatus: Status;
}
