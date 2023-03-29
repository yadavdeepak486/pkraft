import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientSettingsComponent } from './settings/client-settings.component';

export const ClientRoutes: Routes = [
    {
        path: '',
        component: ClientComponent
    },
    {
        path: 'new',
        component: ClientSettingsComponent
    },
    {
        path: ':id',
        component: ClientSettingsComponent
    }
];

