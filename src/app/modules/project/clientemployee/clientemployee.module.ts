import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { EmployeeSettingsAccountComponent } from './employee-settings/employee-account/account.component';
import { EmployeeSettingsSecurityComponent } from './employee-settings/employee-security/security.component';
import { EmployeeSettingsPlanBillingComponent } from './employee-settings/employee-plan-billing/plan-billing.component';
import { EmployeeSettingsNotificationsComponent } from './employee-settings/employee-notifications/notifications.component';
import { EmployeeSettingsTeamComponent } from './employee-settings/employee-team/team.component';
import { ClientEmployeeComponent } from './clientemployee.component';
import { ClientEmployeeRoutes } from './clientemployee-routing.module';
import { EmployeeService } from './clientemployee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropComponent } from './drag-drop/drag-drop.component';

@NgModule({
    declarations: [
        ClientEmployeeComponent,
        EmployeeSettingsComponent,
        EmployeeSettingsAccountComponent,
        EmployeeSettingsSecurityComponent,
        EmployeeSettingsPlanBillingComponent,
        EmployeeSettingsNotificationsComponent,
        EmployeeSettingsTeamComponent,
        AddEmployeeComponent,
        FileUploadComponent,
        DragDropComponent
    ],
    imports: [
        RouterModule.forChild(ClientEmployeeRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatRadioModule,
        MatSidenavModule,
        FuseAlertModule,
        MatStepperModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressSpinnerModule
    ],
    providers:[
        EmployeeService,
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput         : 'DD/MM/YYYY',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class ClientEmployeeModule {}
