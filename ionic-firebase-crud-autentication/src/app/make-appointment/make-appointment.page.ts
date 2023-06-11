import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';
@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {

   aportes: number[] = [0, 0, 0, 0, 0];
  resultado: number = 0;

  calcularResultado() {
    const pesos = [20, 20, 20, 10, 30];
    let sumaAportes = 0;

    for (let i = 0; i < this.aportes.length; i++) {
      sumaAportes += (this.aportes[i] * pesos[i])/10;
    }

    this.resultado = sumaAportes;
  }

  bookingForm: FormGroup;
  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder
  ) {}
  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      nota1: [''],
      nota2: [''],
      nota3: [''],
      nota4: [''],
      nota5: [''],
      total: [''],
    });
  }
  
  formSubmit() {
    if (!this.bookingForm.valid) {
      
      return false;
    } else {
      this.aptService
        .createBooking(this.bookingForm.value)
        .then((res) => {
          console.log(res);
          this.bookingForm.reset();
          this.router.navigate(['/show-appointment']);
        })
        .catch((error) => console.log(error));
    }
  }
}
