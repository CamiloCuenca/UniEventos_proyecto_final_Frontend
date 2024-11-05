import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginGuard } from './services/permiso.service';
import {ProfileComponent} from './pages/profile/profile.component'
import {HomeAdminComponent} from './pages/home-admin/home-admin.component'
import { RolesGuard } from './services/roles.service';
import { GestionarEventosComponent } from './pages/gestionar-eventos/gestionar-eventos.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';

export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'recover-password', component: RecoverPasswordComponent},
   { path: 'verify-code', component: VerifyCodeComponent},
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   {path:'perfil',component:ProfileComponent},
   {
    path: 'home-admin',
    component: HomeAdminComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ["ADMINISTRATOR"] }
  },
  {
    path:'gestionar-eventos',
    component:GestionarEventosComponent,
    canActivate :[RolesGuard],
    data: { expectedRole: ["ADMINISTRATOR"] }
  },
   { path: "**", pathMatch: "full", redirectTo: "" }
];
