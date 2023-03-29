import { Routes } from '@angular/router';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { VerifyComponent } from './verify.component';

export const EmployeeRoutes: Routes = [
    {
        path: '',
        component: VerifyComponent
    },
    {
        path: 'add',
        component: VerifyEmployeeComponent
    },
    {
        path: ':id',
        component: VerifyEmployeeComponent
    },
    
];