import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointmentsSubject.asObservable();
  private currentId = 0;

  addAppointment(appointment: Appointment) {
    const newAppointment = { ...appointment, id: this.generateId() };
    const appointments = this.appointmentsSubject.getValue();
    this.appointmentsSubject.next([...appointments, newAppointment]);
  }

  getAppointmentsByDate(date: Date): Appointment[] {
    const appointments = this.appointmentsSubject.getValue();
    return appointments.filter(
      (app) => app.date.toDateString() === date.toDateString()
    );
  }

  deleteAppointment(id: number) {
    const currentAppointments = this.appointmentsSubject.getValue();
    const updatedAppointments = currentAppointments.filter(
      (app) => app.id !== id
    );
    this.appointmentsSubject.next(updatedAppointments);
  }

  private generateId(): number {
    return ++this.currentId;
  }
}
