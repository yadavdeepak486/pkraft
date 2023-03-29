import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const EmployeeRoutes: Routes = [
    {
        path: '',
        component: EmployeeComponent
    },
    {
        path: 'new',
        component: EmployeeSettingsComponent
    },
    {
        path: 'add',
        component: AddEmployeeComponent
    },
    {
        path: ':id',
        component: AddEmployeeComponent
    },
    
];

// {
//     path: ':id',
//     component: EmployeeSettingsComponent
// }

