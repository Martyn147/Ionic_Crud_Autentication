import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(

    private authService: AuthService,
    private router: Router
  ) {}

  aportes: number[] = [0, 0, 0, 0, 0];
  resultado: number = 0;

  calcularResultado() {
    const pesos = [20, 20, 20, 10, 30];
    let sumaAportes = 0;

    for (let i = 0; i < this.aportes.length; i++) {
      sumaAportes += (this.aportes[i] * pesos[i])/10;
    }

    return this.resultado = sumaAportes;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }



 
}
