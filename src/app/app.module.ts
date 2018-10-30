import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,  
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { StructureComponent } from './structure/structure.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserService } from './user/user.service';
import { CreateScheduleComponent } from './user/create-user/create-schedule/create-schedule.component';
import { ReferenceComponent } from './user/create-user/reference/reference.component';
import { ShowUserComponent } from './user/show-user/show-user.component';

import { routes } from './app.route';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { EditReferenceComponent } from './user/show-user/edit-reference/edit-reference.component';
import { EditScheduleComponent } from './user/show-user/edit-schedule/edit-schedule.component';

import { ReceiptComponent } from './receipt/receipt.component';
import { CreateRecieptComponent } from './receipt/create-reciept/create-reciept.component';
import { EditReceiptComponent } from './receipt/edit-receipt/edit-receipt.component';
import { ReceiptService } from './receipt/receipt.service';

import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { AssignUserEventComponent } from './event/assign-user-event/assign-user-event.component';

// COMPONENTE PUNTO DE VENTA
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { InventoryService } from './inventory/inventory.service';
import { FilterInventoryPipe } from './inventory/filter-inventory.pipe';

import { SalePointComponent } from './sale-point/sale-point.component';
import { SearchProductComponent } from './sale-point/search-product/search-product.component';
import { SaleService } from './sale-point/sale.service';

import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';
import { CashComponent } from './cash/cash.component';

import { CashService } from './cash/cash.service';
import { StatusUserComponent } from './user/status-user/status-user.component';
import { CutoutComponent } from './cutout/cutout.component';
import { CutoutService } from './cutout/cutout.service';

import { ExpenseComponent } from './expense/expense.component';
import { CreateExpenseComponent } from './expense/create-expense/create-expense.component';
import { UpdateExpenseComponent } from './expense/update-expense/update-expense.component';
import { ExpenseService } from './expense/expense.service';

import { SaleDebtComponent } from './sale-debt/sale-debt.component';
import { SaleDebtService } from './sale-debt/sale-debt.service';

import { NotificationComponent } from './notification/notification.component';

import { MonthlyPriceComponent } from './monthly-prices/monthly-price.component';
import { MonthlyPriceService } from './monthly-prices/monthly-price.service';
import { CreateMonthlyPriceComponent } from './monthly-prices/create-monthly-price/create-monthly-price.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleService } from './schedules/schedule.service';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { DayPípePipe } from './day-pípe.pipe';
import { ScheduleComponentPipePipe } from './schedule-component-pipe.pipe';
import { TimePipe } from './time.pipe';
import { WorkersPaymentComponent } from './workers-payment/workers-payment.component';
import { WorkPaymentService } from './workers-payment/work-payment.service';
import { PaymentCreateComponent } from './workers-payment/payment-create/payment-create.component';
import { PaymentShowComponent } from './workers-payment/payment-show/payment-show.component';

@NgModule({
  declarations: [
    AppComponent,

    InventoryComponent,
    NewProductComponent,
    EditProductComponent,
    FilterInventoryPipe,
    SalePointComponent,
    SaleProcessComponent,
    SalesComponent,
    ShowSaleComponent,
    SearchProductComponent,

    LoginComponent,
    StructureComponent,
    FooterComponent,
    UserComponent,
    CreateUserComponent,
    CreateScheduleComponent,    
    ReferenceComponent,
    
    ShowUserComponent,
    PageNotFoundComponent,
        
    EditReferenceComponent,
    EditScheduleComponent,
    ReceiptComponent,
    CreateRecieptComponent,
    EventComponent,
    CreateEventComponent,
    AssignUserEventComponent,
    CashComponent,
    StatusUserComponent,
    CutoutComponent,
    ExpenseComponent,
    CreateExpenseComponent,
    UpdateExpenseComponent,
    EditReceiptComponent,
    SaleDebtComponent,
    NotificationComponent,
    MonthlyPriceComponent,
    CreateMonthlyPriceComponent,
    SchedulesComponent,
    DeleteUserComponent,
    DayPípePipe,
    ScheduleComponentPipePipe,
    TimePipe,
    WorkersPaymentComponent,
    PaymentCreateComponent,
    PaymentShowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    JsonpModule,
    RouterModule.forRoot(routes),

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    
    
  ],
  providers: [
        UserService,
        LoginService,
        ReceiptService,
        InventoryService,
        SaleService,
        CashService,
        CutoutService,
        ExpenseService,
        SaleDebtService,
        MonthlyPriceService,
        ScheduleService,
        WorkPaymentService
      ],

  bootstrap: [AppComponent]
})
export class AppModule { }
