import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from './appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class AppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() delete = new EventEmitter<void>();
}
