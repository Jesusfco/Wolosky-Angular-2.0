import { ResetComponent } from './login/reset/reset.component';
import { PrintReceiptComponent } from './utils/print-receipt/print-receipt.component';
import { EventService } from './services/event.service';
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
import { LoginService } from './services/login.service';
import { StructureComponent } from './structure/structure.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserService } from './services/user.service';
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
import { ReceiptService } from './services/receipt.service';

import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { AssignUserEventComponent } from './event/assign-user-event/assign-user-event.component';

// COMPONENTE PUNTO DE VENTA
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './inventory/new-product/new-product.component';
import { EditProductComponent } from './inventory/edit-product/edit-product.component';
import { InventoryService } from './services/inventory.service';
import { FilterInventoryPipe } from './pipes/filter-inventory.pipe';

import { SalePointComponent } from './sale-point/sale-point.component';
import { SearchProductComponent } from './sale-point/search-product/search-product.component';
import { SaleService } from './services/sale.service';

import { SaleProcessComponent } from './sale-point/sale-process/sale-process.component';
import { SalesComponent } from './sales/sales.component';
import { ShowSaleComponent } from './sales/show-sale/show-sale.component';
import { CashComponent } from './cash/cash.component';

import { CashService } from './cash/cash.service';
import { StatusUserComponent } from './user/status-user/status-user.component';
import { CutoutComponent } from './cutout/cutout.component';
import { CutoutService } from './services/cutout.service';

import { ExpenseComponent } from './expense/expense.component';
import { CreateExpenseComponent } from './expense/create-expense/create-expense.component';
import { UpdateExpenseComponent } from './expense/update-expense/update-expense.component';
import { ExpenseService } from './services/expense.service';

import { SaleDebtComponent } from './sale-debt/sale-debt.component';
import { SaleDebtService } from './services/sale-debt.service';

import { NotificationComponent } from './notification/notification.component';

import { MonthlyPriceComponent } from './monthly-prices/monthly-price.component';
import { MonthlyPriceService } from './services/monthly-price.service';
import { CreateMonthlyPriceComponent } from './monthly-prices/create-monthly-price/create-monthly-price.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleService } from './services/schedule.service';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { DayPípePipe } from './pipes/day-pípe.pipe';
import { ScheduleComponentPipePipe } from './pipes/schedule-component-pipe.pipe';
import { TimePipe } from './pipes/time.pipe';
import { WorkersPaymentComponent } from './workers-payment/workers-payment.component';
import { WorkPaymentService } from './services/work-payment.service';
import { PaymentCreateComponent } from './workers-payment/payment-create/payment-create.component';
import { PaymentShowComponent } from './workers-payment/payment-show/payment-show.component';
import { NotificationService } from './notification/notification.service';
import { RecordsComponent } from './records/records.component';
import { RecordService } from './services/record.service';
import { FilterUserComponent } from './user/filter-user/filter-user.component';
import { ShowEventComponent } from './event/show-event/show-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { ParticipantsEventComponent } from './event/participants-event/participants-event.component';
import { ReceiptsEventComponent } from './event/receipts-event/receipts-event.component';
import { CreateReceiptEventComponent } from './event/create-receipt-event/create-receipt-event.component';
import { ShowReceiptComponent } from './receipt/show-receipt/show-receipt.component';
import { ParkingComponent } from './parking/parking.component';
import { NewParkingComponent } from './parking/new-parking/new-parking.component';
import { EditParkingComponent } from './parking/edit-parking/edit-parking.component';
import { ShowParkingComponent } from './parking/show-parking/show-parking.component';
import { AdminParkingComponent } from './parking/admin-parking/admin-parking.component';
import { ParkingService } from './services/parking.service';
import { DeleteGenericComponent } from './utils/delete-generic/delete-generic.component';
import { RecoverComponent } from './login/recover/recover.component';
import { ShowMonthlyPriceComponent } from './monthly-prices/show-monthly-price/show-monthly-price.component';
import { EditMonthlyPriceComponent } from './monthly-prices/edit-monthly-price/edit-monthly-price.component';
import { VerifyMonthlyPriceComponent } from './monthly-prices/verify-monthly-price/verify-monthly-price.component';
import { ExportRecordsComponent } from './records/export-records/export-records.component';
import { DeleteRecordsComponent } from './records/delete-records/delete-records.component';
import { DetailsRecordComponent } from './records/details-record/details-record.component';
import { Time12FormatPipe } from './pipes/time-12-format.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';


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
    RecordsComponent,
    FilterUserComponent,
    ShowEventComponent,
    EditEventComponent,
    ParticipantsEventComponent,
    ReceiptsEventComponent,
    CreateReceiptEventComponent,
    ShowReceiptComponent,
    ParkingComponent,
    NewParkingComponent,
    EditParkingComponent,
    ShowParkingComponent,
    AdminParkingComponent,
    PrintReceiptComponent,
    DeleteGenericComponent,
    ResetComponent,
    RecoverComponent,
    ShowMonthlyPriceComponent,
    EditMonthlyPriceComponent,
    VerifyMonthlyPriceComponent,
    ExportRecordsComponent,
    DeleteRecordsComponent,
    DetailsRecordComponent,
    Time12FormatPipe,
    DashboardComponent,
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
        WorkPaymentService,
        RecordService,
        EventService,
        NotificationService,
        ParkingService,
      ],

  bootstrap: [AppComponent]
})
export class AppModule { }
