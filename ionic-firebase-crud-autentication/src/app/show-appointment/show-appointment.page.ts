import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.page.html',
  styleUrls: ['./show-appointment.page.scss'],
})
export class ShowAppointmentPage implements OnInit {
  Bookings = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private aptService: AppointmentService
  ) { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
  }
  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }
  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }
}