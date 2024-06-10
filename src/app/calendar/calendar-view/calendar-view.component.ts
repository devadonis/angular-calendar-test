import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../appointment/appointment.model';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppointmentComponent,
  ],
})
export class CalendarViewComponent {
  appointments: Appointment[] = [];
  appointmentForm: FormGroup;
  selected: Date | null = new Date();

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  get title() {
    return this.appointmentForm.get('title');
  }
  get date() {
    return this.appointmentForm.get('date');
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      this.appointments.push(this.appointmentForm.value);
      // this.appointmentForm.reset();
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}
