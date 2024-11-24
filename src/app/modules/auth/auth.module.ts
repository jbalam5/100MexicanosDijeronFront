import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
  ],
  imports: [
    LoginComponent,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
