import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginGuard } from './services/permiso.service';
import {ProfileComponent} from './pages/profile/profile.component'
import {HomeAdminComponent} from './components/home-admin/home-admin.component'
import { RolesGuard } from './services/roles.service';

export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   {path:'perfil',component:ProfileComponent},
   {path:'home-admin',component:HomeAdminComponent,canActivate: [RolesGuard], data:{
    exectedRole: ["ADMINISTRATOR"]}},
   { path: "**", pathMatch: "full", redirectTo: "" }
];
