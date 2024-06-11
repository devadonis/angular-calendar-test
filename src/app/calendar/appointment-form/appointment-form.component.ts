import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        ...this.appointmentForm.value,
        date: this.data.date,
        time: new Date(),
      };
      this.appointmentService.addAppointment(appointment);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
