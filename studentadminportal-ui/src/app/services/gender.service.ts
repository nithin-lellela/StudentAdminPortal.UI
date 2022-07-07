import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = "https://localhost:44308";

  constructor(private httpClient: HttpClient) { }

  getGenders(){
    return this.httpClient.get<Gender []>(this.baseApiUrl + '/Genders');
  }

}
