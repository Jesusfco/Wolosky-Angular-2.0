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
            // {path: '/users/', component: Sh}
        ]
    }
]