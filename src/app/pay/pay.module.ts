import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { DepartmentComponent } from './pages/department/department.component';
import { ContractComponent } from './pages/contract/contract.component';
import { PostComponent } from './pages/post/post.component';
import { ReasonLeavingComponent } from './pages/reason-leaving/reason-leaving.component';
import { NewContractComponent } from './pages/contract/new-contract/new-contract.component';
import { NewDepartmentComponent } from './pages/department/new-department/new-department.component';
import { NewPostComponent } from './pages/post/new-post/new-post.component';
import { NewReasonLeavingComponent } from './pages/reason-leaving/new-reason-leaving/new-reason-leaving.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { AbsenceComponent } from './pages/absence/absence.component';
import { NewLeaveComponent } from './pages/leave/new-leave/new-leave.component';
import { NewAbsenceComponent } from './pages/absence/new-absence/new-absence.component';
import { SharedModule } from '../shared/shared.module';
import { ContractTypeComponent } from './pages/contract/contract-type/contract-type.component';
import { LeaveTypeComponent } from './pages/leave/leave-type/leave-type.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { IndemnityComponent } from './pages/indemnity/indemnity.component';
import { NewSalaryComponent } from './pages/salary/new-salary/new-salary.component';
import { DetailSalaryComponent } from './pages/salary/detail-salary/detail-salary.component';
import { LoanComponent } from './pages/loan/loan.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { NewAdvanceComponent } from './pages/advance/new-advance/new-advance.component';
import { NewLoanComponent } from './pages/loan/new-loan/new-loan.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DepartmentComponent,
    ContractComponent,
    PostComponent,
    ReasonLeavingComponent,
    NewContractComponent,
    NewDepartmentComponent,
    NewPostComponent,
    NewReasonLeavingComponent,
    LeaveComponent,
    AbsenceComponent,
    NewLeaveComponent,
    NewAbsenceComponent,
    ContractTypeComponent,
    LeaveTypeComponent,
    SalaryComponent,
    BonusComponent,
    IndemnityComponent,
    NewSalaryComponent,
    DetailSalaryComponent,
    LoanComponent,
    AdvanceComponent,
    NewAdvanceComponent,
    NewLoanComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // PayRoutingModule,
    SharedModule
  ]
})
export class PayModule { }
