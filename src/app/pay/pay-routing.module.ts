import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceComponent } from './pages/absence/absence.component';
import { ContractComponent } from './pages/contract/contract.component';
import { DepartmentComponent } from './pages/department/department.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { ReasonLeavingComponent } from './pages/reason-leaving/reason-leaving.component';
import { PostComponent } from './pages/post/post.component';
import { NewContractComponent } from './pages/contract/new-contract/new-contract.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { LoanComponent } from './pages/loan/loan.component';
import { AdvanceComponent } from './pages/advance/advance.component';

export const routes: Routes = [
  {
    path: 'absences',
    component: AbsenceComponent,
    data: {
      title: 'Absences'
    }
  },
  {
    path: 'contracts',
    component: ContractComponent,
    data: {
      title: 'Contrats'
    }
  },
  {
    path: 'contracts/new',
    component: NewContractComponent,
    data: {
      title: 'Nouveau contrat'
    }
  },
  {
    path: 'contracts/edit/:id',
    component: NewContractComponent,
    data: {
      title: 'Modifier contrat'
    }
  },
  {
    path: 'departments',
    component: DepartmentComponent,
    data: {
      title: 'Départements'
    }
  },
  {
    path: 'leaves',
    component: LeaveComponent,
    data: {
      title: 'Congés'
    }
  },
  {
    path: 'posts',
    component: PostComponent,
    data: {
      title: 'Postes'
    }
  },
  {
    path: 'reason-leavings',
    component: ReasonLeavingComponent,
    data: {
      title: 'Motifs de renvoi'
    }
  },
  {
    path: 'salaries',
    component: SalaryComponent,
    data: {
      title: 'Salaires'
    }
  },
  {
    path: 'loans',
    component: LoanComponent,
    data: {
      title: 'Prêts'
    }
  },
  {
    path: 'advances',
    component: AdvanceComponent,
    data: {
      title: 'Acomptes sur salaire'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
