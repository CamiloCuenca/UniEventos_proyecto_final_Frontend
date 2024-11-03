import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "./token.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RolesGuard {

  realRole: string = "";

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole: string[] = next.data["expectedRole"];
    this.realRole = this.tokenService.getRol();

    if (!this.tokenService.isLogged() || !expectedRole.some(r => this.realRole.includes(r))) {
      const destino = this.realRole === "ADMINISTRATOR" ? "/home-admin" : "/";
      this.router.navigate([destino]);
      return false;
    }

    return true;
  }
}
