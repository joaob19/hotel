import {Person} from "./person";

export interface CheckIn{
  id: string;
  entryDate: string;
  exitDate: string;
  person: Person;
  haveVehicle: boolean;
  totalValue: number;
}
