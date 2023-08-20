import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AccountDetails } from 'src/app/model/account-details';
import { ExchangeDetail } from 'src/app/model/exchange-detail';
import { TransferDetail } from 'src/app/model/transfer-detail';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm: any;
  transferFormData?: TransferDetail;
  errorMsg?: any;
  transferAccountDetails?: any;
  finalAmount?: number ;
  conversionRate?: string = '';

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.transferForm = this.formBuilder.group({
      debitAccount: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      creditAccount: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      amount: ['',[Validators.required, Validators.pattern("^[0-9,.]*$")]],
      calAmount: []
    });
  }

  transfer(){
    this.transferForm.get("calAmount").patchValue(this.finalAmount);
    this.transferFormData = this.transferForm.value;
      console.log(this.transferFormData);
      this.apiService.transfer(this.transferFormData).subscribe(res =>{
      this.transferAccountDetails = res as AccountDetails[];
    }, err =>{

      this.errorMsg = err.error;
  
    })
    
    Swal.fire('Success', 'Transaction Successful', 'success');
    this.transferForm.reset();
  }

  calculate(){
    this.transferFormData = this.transferForm.value;

      this.apiService.validateTransferDetail(this.transferFormData).subscribe(res =>{
      this.transferAccountDetails = res as AccountDetails[];
      this.getExchangeDetail();
      
      }, err =>{

      this.errorMsg = err.error;
       Swal.fire('Error', "Error while calculating value "+ this.errorMsg.errorMessage, 'error');
    })      
    
  }

  getExchangeDetail(){
    this.apiService.callExchangedApi(this.transferAccountDetails?.Debit.currency,
      this.transferAccountDetails?.Credit.currency,this.transferForm.get('amount').value).subscribe((res: any) => {
        this.finalAmount = res.result as number;
        this.conversionRate = res.info.rate as string;
      }, err =>{

      this.errorMsg = err.error;
      Swal.fire('Error', "Error while Fetching Conversion rate Please try after some time", 'error');
    });
  }

}
