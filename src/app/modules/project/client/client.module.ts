import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientRoutes } from './client-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
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
import { ClientSettingsComponent } from './settings/client-settings.component';
import { ClientSettingsAccountComponent } from './settings/account/account.component';
import { ClientSettingsSecurityComponent } from './settings/security/security.component';
import { ClientSettingsPlanBillingComponent } from './settings/plan-billing/plan-billing.component';
import { ClientSettingsNotificationsComponent } from './settings/notifications/notifications.component';
import { ClientSettingsTeamComponent } from './settings/team/team.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { ClientService } from './client.service';
import { ClientSettingsEmployeeComponent } from './settings/employee/employee.component';

@NgModule({
    declarations: [
        ClientComponent,
        ClientSettingsComponent,
        ClientSettingsAccountComponent,
        ClientSettingsSecurityComponent,
        ClientSettingsPlanBillingComponent,
        ClientSettingsNotificationsComponent,
        ClientSettingsTeamComponent,
        ClientSettingsEmployeeComponent
    ],
    imports: [
        RouterModule.forChild(ClientRoutes),
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
    ],
    providers:[
        ClientService,
    ]
})
export class ClientModule {}
