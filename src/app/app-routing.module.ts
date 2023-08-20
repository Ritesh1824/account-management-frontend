import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransferComponent} from '../app/components/transfer/transfer.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

const routes: Routes = [
  {path: 'transfer', component: TransferComponent},
  {path: '', component: TransferComponent},
  {path: 'account-details', component: AccountDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
