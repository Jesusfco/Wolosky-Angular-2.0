import { ResetComponent } from './login/reset/reset.component';
import { ParkingComponent } from './parking/parking.component';
import { WorkersPaymentComponent } from './workers-payment/workers-payment.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StructureComponent } from './structure/structure.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateScheduleComponent } from './user/create-user/create-schedule/create-schedule.component';
import { ReferenceComponent } from './user/create-user/reference/reference.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';


import { EditReferenceComponent } from './user/show-user/edit-reference/edit-reference.component';
import { EditScheduleComponent } from './user/show-user/edit-schedule/edit-schedule.component';
import { StatusUserComponent } from './user/status-user/status-user.component';

import { ReceiptComponent } from './receipt/receipt.component';
import { CreateRecieptComponent } from './receipt/create-reciept/create-reciept.component';
import { EditReceiptComponent } from './receipt/edit-receipt/edit-receipt.component';

import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { AssignUserEventComponent } from './event/assign-user-event/assign-user-event.component';



// PUNTO DE VENTA
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SearchProductComponent } from './sale-point/search-product/search-product.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';

//DEUDORES
import { SaleDebtComponent } from './sale-debt/sale-debt.component';

//CORTE DE CAJA
import { CashComponent } from './cash/cash.component';
import { CutoutComponent } from './cutout/cutout.component';

//COMPONENTE DE GASTOS
import { ExpenseComponent } from './expense/expense.component';
import { CreateExpenseComponent } from './expense/create-expense/create-expense.component';
import { UpdateExpenseComponent } from './expense/update-expense/update-expense.component';

//COMPONENTE PRECIOS POR HORA
import { MonthlyPriceComponent } from './monthly-prices/monthly-price.component';
import { CreateMonthlyPriceComponent } from './monthly-prices/create-monthly-price/create-monthly-price.component';

//SCHEDULES 
import { SchedulesComponent } from './schedules/schedules.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentCreateComponent } from './workers-payment/payment-create/payment-create.component';
import { PaymentShowComponent } from './workers-payment/payment-show/payment-show.component';
import { RecordsComponent } from './records/records.component';
import { FilterUserComponent } from './user/filter-user/filter-user.component';
import { ShowEventComponent } from './event/show-event/show-event.component';
import { ShowReceiptComponent } from './receipt/show-receipt/show-receipt.component';
import { ShowParkingComponent } from './parking/show-parking/show-parking.component';
import { NewParkingComponent } from './parking/new-parking/new-parking.component';
import { AdminParkingComponent } from './parking/admin-parking/admin-parking.component';
import { RecoverComponent } from './login/recover/recover.component';
import { ShowMonthlyPriceComponent } from './monthly-prices/show-monthly-price/show-monthly-price.component';
import { EditMonthlyPriceComponent } from './monthly-prices/edit-monthly-price/edit-monthly-price.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'resetear-contraseña', component: ResetComponent },
    { path: 'restablecer-contraseña', component: RecoverComponent },
    { path: 'login', component: LoginComponent },

    {
        path: 'cash',
        component: CashComponent
    },
    
    {
        path: 'users',
        component: UserComponent,
        children: [
            {path: 'create', component: CreateUserComponent},
            {path: 'filter', component: FilterUserComponent},
            {path: 'show/:id', component: ShowUserComponent,
                children: [
                    { path: 'schedule', component: EditScheduleComponent},
                    { path: 'references', component: EditReferenceComponent},
                    { path: 'status', component: StatusUserComponent},
                    { path: 'delete', component: DeleteUserComponent}
            ]},
        ]
    },    

    {
        path: 'receipt',
        component: ReceiptComponent,
        children: [
            { path: 'create', component: CreateRecieptComponent },
            { path: 'show/:id',  component: ShowReceiptComponent}
        ]
    },

    {
        path: 'events',
        component: EventComponent,
        children: [
            { path: 'create', component: CreateEventComponent },
            { path: 'assign', component: AssignUserEventComponent },
            { path: 'show/:id',  component: ShowEventComponent}
        ]
    },

    {
        path: 'pago-trabajadores',
        component: WorkersPaymentComponent,
        children: [
            { path: 'crear', component: PaymentCreateComponent },
            { path: 'show/:id', component: PaymentShowComponent },
        ]
    },

    {
        path: 'parking',
        component: ParkingComponent,
        children: [
            { path: 'admin', component: AdminParkingComponent },
            { path: 'crear', component: NewParkingComponent },
            { path: 'ver/:id', component: ShowParkingComponent },
        ]
    },
    {
        path: 'asistencias',
        component: RecordsComponent,
    },

    {
        path: 'cutout',
        component: CutoutComponent,
    },

    // PUNTO DE VENTA
    { path: 'sales', component: SalesComponent,
        children : [
            { path: 'show/:id', component: ShowSaleComponent },
        ] },
    { path: 'inventory', component: InventoryComponent,
        children : [
            { path: 'create', component: NewProductComponent },
            { path: 'edit/:id', component: EditProductComponent },
        ]
    },
    { path: 'sale-point', component: SalePointComponent,
        children: [
            { path: 'sale-process', component: SaleProcessComponent },
            { path: 'search', component: SearchProductComponent },
    ]},

    {
        path: 'sale-debt', component: SaleDebtComponent
    },

    //componente de gastos
    {
        path: 'expenses',
        component: ExpenseComponent,
        children: [
            { path: 'create', component: CreateExpenseComponent },
            { path: 'edit/:id', component: UpdateExpenseComponent },
        ]
    },

    {
        path: 'monthly-cost', component: MonthlyPriceComponent,
        children: [
            { path: 'create', component: CreateMonthlyPriceComponent },
            { path: 'ver/:id', component: ShowMonthlyPriceComponent,  children: [ 
                    { path: 'edit', component: EditMonthlyPriceComponent }
                ]
            }
        ]
    }, 
    
    {
        path: 'schedules', component: SchedulesComponent,
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: '**', component:  PageNotFoundComponent },

];