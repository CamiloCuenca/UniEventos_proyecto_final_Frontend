import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginGuard } from './services/permiso.service';
import { ProfileComponent } from './pages/profile/profile.component'
import { HomeAdminComponent } from './pages/home-admin/home-admin.component'
import { RolesGuard } from './services/roles.service';
import { GestionarEventosComponent } from './pages/gestionar-eventos/gestionar-eventos.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { GestionarCuponesComponent } from './pages/gestionar-cupones/gestionar-cupones.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { SendActiveCodeComponent } from './pages/send-active-code/send-active-code.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { EventFilterComponentComponent } from './components/event-filter-component/event-filter-component.component';
import { CrearOrdenComponent } from './pages/crear-orden/crear-orden.component';



export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'recover-password', component: RecoverPasswordComponent },
   { path: 'verify-code', component: VerifyCodeComponent },
   { path: 'delete-account', component: DeleteAccountComponent },
   { path: 'active-account', component: ActiveAccountComponent },
   { path: 'send-active-code', component: SendActiveCodeComponent },
   { path: 'shopping-cart', component: ShoppingCartComponent },

   { path: 'event-filter', component: EventFilterComponentComponent },

   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   { path: 'profile', component: ProfileComponent },
   {path: 'crear-orden',component: CrearOrdenComponent },
   {
      path: 'home-admin',
      component: HomeAdminComponent,
      canActivate: [RolesGuard],
      data: { expectedRole: ["ADMINISTRATOR"] }
   },
   {
      path: 'gestionar-eventos',
      component: GestionarEventosComponent,
      canActivate: [RolesGuard],
      data: { expectedRole: ["ADMINISTRATOR"] }
   },
   {
      path: 'gestionar-cupones',
      component: GestionarCuponesComponent,
      canActivate: [RolesGuard],
      data: { expectedRole: ["ADMINISTRATOR"] }
   },
   { path: "**", pathMatch: "full", redirectTo: "" }
];
