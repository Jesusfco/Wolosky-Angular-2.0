import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StructureComponent } from './structure/structure.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateScheduleComponent } from './user/create-user/create-schedule/create-schedule.component';
import { SalaryComponent } from './user/create-user/salary/salary.component';
import { ReferenceComponent } from './user/create-user/reference/reference.component';
import { PaymentComponent } from './user/create-user/payment/payment.component';
import { ShowUserComponent } from './user/show-user/show-user.component';

import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditReferenceComponent } from './user/edit-user/edit-reference/edit-reference.component';
import { EditScheduleComponent } from './user/edit-user/edit-schedule/edit-schedule.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users',
        component: UserComponent,
        children: [
            {path: 'create', component: CreateUserComponent},
            {path: 'show/:id', component: ShowUserComponent},
            {path: 'edit/:id', component: EditUserComponent,
            children: [
                { path: 'schedule', component: EditScheduleComponent},
                { path: 'references', component: EditReferenceComponent},
            ]
        }
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component:  PageNotFoundComponent },
]