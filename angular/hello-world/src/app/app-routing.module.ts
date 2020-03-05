import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { TestComponent } from './test/test.component';
import { AuthenticationGuard } from './authentication.guard';


const routes: Routes = [
  {path:"", component: LoginPageComponent},
  {path:"loggedIn", component: TestComponent,canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginPageComponent,TestComponent]
