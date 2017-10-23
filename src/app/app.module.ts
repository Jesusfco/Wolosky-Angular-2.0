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
import { UserComponentComponent } from './user-component/user-component.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user-component/edit-user/edit-user.component';

import { NewScheduleComponent } from './user-component/create-user/new-schedule/new-schedule.component';

import { NewSalariesComponent } from './user-component/create-user/new-salaries/new-salaries.component';
import { NewPaymentComponent } from './user-component/create-user/new-payment/new-payment.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { StructureComponent } from './structure/structure.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { CreateScheduleComponent } from './user/create-schedule/create-schedule.component';
import { SalaryComponent } from './user/create-user/salary/salary.component';
import { ReferenceComponent } from './user/create-user/reference/reference.component';
import { PaymentComponent } from './user/create-user/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponentComponent,
    CreateUserComponent,
    EditUserComponent,
    NewScheduleComponent,
    
    NewSalariesComponent,
    NewPaymentComponent,
    LoginComponent,
    StructureComponent,
    FooterComponent,
    UserComponent,
    CreateScheduleComponent,
    SalaryComponent,
    ReferenceComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    JsonpModule,
    

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
  providers: [ UserService, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
