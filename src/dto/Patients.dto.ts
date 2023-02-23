interface IPetPopularity {
  petName: String;
  popularity: Number;
}
interface ITotalMoneyFromPet {
  cat: Number;
  dog: Number;
  bird: Number;
}
export interface IPopularPet {
  mostPopularPet: IPetPopularity[];
  petWiseMoney: ITotalMoneyFromPet;
}
