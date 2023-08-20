import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AccountDetails } from 'src/app/model/account-details';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  allCustomerDetails?: AccountDetails[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllCustomerDetail().subscribe(res =>{
      this.allCustomerDetails = res;
     
    }, err =>{
      Swal.fire('Error', "Error while fetching customer records ! "+err.error.errorMessage, 'error');
    });
  }

}
