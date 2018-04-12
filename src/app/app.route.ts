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

import { ReceiptComponent } from './receipt/receipt.component';
import { CreateRecieptComponent } from './receipt/create-reciept/create-reciept.component';

import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { AssignUserEventComponent } from './event/assign-user-event/assign-user-event.component';

// PUNTO DE VENTA
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';


import { CashComponent } from './cash/cash.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'cash',
        component: CashComponent
    },
    
    {
        path: 'users',
        component: UserComponent,
        children: [
            {path: 'create', component: CreateUserComponent},
            {path: 'show/:id', component: ShowUserComponent},
            {path: 'edit/:id', component: EditUserComponent,
            children: [
                { path: 'schedule/:id', component: EditScheduleComponent},
                { path: 'references/:id', component: EditReferenceComponent},
            ]
        }
        ]
    },

    {
        path: 'receipt',
        component: ReceiptComponent,
        children: [
            { path: 'create', component: CreateRecieptComponent },
        ]
    },

    {
        path: 'events',
        component: EventComponent,
        children: [
            { path: 'create', component: CreateEventComponent },
            { path: 'assign', component: AssignUserEventComponent },
        ]
    },

    // PUNTO DE VENTA
    { path: 'sales', component: SalesComponent,
        children : [
            { path: ':id', component: ShowSaleComponent },
        ] },
    { path: 'inventory', component: InventoryComponent,
        children : [
            { path: 'create', component: NewProductComponent },
            { path: 'edit/:id', component: EditProductComponent },
        ]
    },
    { path: 'sale-point', component: SalePointComponent,
        children: [
            { path: 'sale-process', component: SaleProcessComponent }
    ]},

    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component:  PageNotFoundComponent },
]