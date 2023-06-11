import { Injectable } from '@angular/core';
import { Appointment } from '../../../shared/Appointment';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {this.bookingListRef = this.db.list('/estudiante')}
  // Create
  createBooking(apt: Appointment) {
    const aportes: number[] = [apt.nota1, apt.nota2, apt.nota3, apt.nota4, apt.nota5];

    const pesos = [20, 20, 20, 10, 30];
    let sumaAportes = 0;

    for (let i = 0; i < aportes.length; i++) {
      sumaAportes += (aportes[i] * pesos[i])/10;
    }

    apt.total  = sumaAportes;
    return this.bookingListRef.push({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
      nota1: apt.nota1,
      nota2: apt.nota2,
      nota3: apt.nota3,
      nota4: apt.nota4,
      nota5: apt.nota5,
      total: apt.total
    });
  }
  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}
