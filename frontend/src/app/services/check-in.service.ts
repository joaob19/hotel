import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckIn} from "../interfaces/check-in";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private baseUrl = `${environment.apiUrl}/check-in`;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public async getCheckinData(): Promise<CheckIn[]> {
    try {
      return firstValueFrom(
        this.httpClient.get<CheckIn[]>(this.baseUrl)
      );
    } catch (e) {
      throw 'Não foi possível carregar os dados de check-in';
    }
  }

  public async doCheckIn(checkin: CheckIn): Promise<CheckIn> {
    try {
      const entryDate = moment(checkin.entryDate, 'DD/MM/YYYY HH:mm:ss');
      const exitDate = moment(checkin.exitDate, 'DD/MM/YYYY HH:mm:ss');

      if (!entryDate.isValid()) {
        throw 'A data de entrada é inválida';
      }

      if (!exitDate.isValid()) {
        throw 'A data de saída é inválida';
      }

      checkin.totalValue = this.getTotalValue(entryDate, exitDate, checkin.haveVehicle);

      checkin.entryDate = entryDate.toISOString();
      checkin.exitDate = exitDate.toISOString();

      return firstValueFrom(
        this.httpClient.post<CheckIn>(this.baseUrl, checkin)
      );
    } catch (e) {
      if (typeof e === 'string') {
        throw e;
      } else {
        throw 'Não foi possível realizar o check-in';
      }
    }
  }

  private getTotalValue(
    start: moment.Moment,
    end: moment.Moment,
    haveVehicle: boolean
  ): number {
    const normalDaily = 120;
    const normalVehicleTax = haveVehicle ? 15 : 0;

    const weekendDaily = 150;
    const weekendVehicleTax = haveVehicle ? 20 : 0;

    let difference = end.diff(start, 'days');
    let date = moment(start);
    let total = 0;

    const maxTime = end.hour() > 16 || (end.hour() <= 16 && end.minute() > 30);
    if (maxTime) {
      difference++;
    }

    while (difference > 0) {
      date = date.add(1, 'days');

      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        total += (normalDaily + normalVehicleTax);
      } else {
        total += (weekendDaily + weekendVehicleTax);
      }

      difference--;
    }

    return total;
  }

}
