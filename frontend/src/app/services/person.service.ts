import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Person} from "../interfaces/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = `${environment.apiUrl}/person`;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public async getPersons(): Promise<Person[]> {
    try {
      return firstValueFrom(this.httpClient.get<Person[]>(this.baseUrl));
    } catch (e) {
      throw 'Não foi possível carregar os dados de pessoas';
    }
  }

  public savePerson(person: Person): Promise<Person> {
    try {
      return firstValueFrom(
        this.httpClient.post<Person>(this.baseUrl, person)
      );
    } catch (e) {
      throw 'Ocorreu um erro ao tentar cadastrar a pessoa.';
    }
  }

  public updatePerson(person: Person): Promise<Person> {
    try {
      const url = `${this.baseUrl}/${person.id}`;
      return firstValueFrom(
        this.httpClient.put<Person>(url, {
          'name': person.name,
          'document': person.document,
          'phone': person.phone
        })
      );
    } catch (e) {
      throw 'Ocorreu um erro ao tentar alterar os dados da pessoa.';
    }
  }

  public async removePerson(id: string): Promise<void> {
    try {
      const url = `${this.baseUrl}/${id}`;
      await firstValueFrom(
        this.httpClient.delete(url)
      );
    } catch (e) {
      throw 'Ocorreu um erro ao tentar remover a pessoa.';
    }
  }

}
