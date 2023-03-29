import { Routes } from '@angular/router';
import { ClientEmployeeComponent } from './clientemployee.component';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const ClientEmployeeRoutes: Routes = [
    {
        path: '',
        component: ClientEmployeeComponent
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

