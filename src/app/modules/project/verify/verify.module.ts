import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { EmployeeRoutes } from './verify-routing.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';
import { VerifyComponent } from './verify.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';

@NgModule({
    declarations: [
        VerifyComponent,
        VerifyEmployeeComponent,
    ],
    imports: [
        RouterModule.forChild(EmployeeRoutes),
        MatFormFieldModule,
        SharedModule,
        FuseAlertModule,
        MatMomentDateModule,
    ],
    providers:[
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput         : 'DD/MM/YYYY',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'L',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class VerifyModule {}
