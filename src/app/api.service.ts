import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AccountDetails } from './model/account-details';
import { TransferDetail } from './model/transfer-detail';
import { ExchangeDetail } from './model/exchange-detail';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //apiUrl :string = 'http://localhost:8088/account'
  apiUrl :string = '/account'

  exchangeRateApiUrl = 'https://api.apilayer.com/exchangerates_data/convert?to='
  headerDict = {
    'apikey': 'CJPpfqtUknnscjYfURwFtvXDeLyj2Wji'
}

 requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(this.headerDict), 
};

  constructor(private httpClient: HttpClient) { }

  public getAllCustomerDetail(){
      return this.httpClient.get<AccountDetails[]>(this.apiUrl+'/allAcountDetails');
  }

  public validateTransferDetail(transferDetail?: TransferDetail){
    return this.httpClient.post(this.apiUrl+'/validateTransfer', transferDetail);
  }

  public transfer(transferDetail?: TransferDetail){
    return this.httpClient.post(this.apiUrl+'/transfer', transferDetail);
  }

  public callExchangedApi(from:string,to:string,amount:string){
    
    let exchangeUrl = this.exchangeRateApiUrl+ to+'&from='+from+'&amount='+amount;
    return this.httpClient.get(exchangeUrl, this.requestOptions );
  }
}
