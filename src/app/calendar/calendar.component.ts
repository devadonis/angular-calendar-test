import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    AppointmentListComponent,
    AppointmentFormComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  selectedDate: Date = new Date();

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {}

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.openAppointmentForm(date);
  }

  openAppointmentForm(date: Date) {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: { date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newAppointment: Appointment = {
          id: 0, // ID will be assigned in the service
          date: this.selectedDate!,
          title: result.title,
          time: result.time,
        };
        this.appointmentService.addAppointment(newAppointment);
      }
    });
  }
}
