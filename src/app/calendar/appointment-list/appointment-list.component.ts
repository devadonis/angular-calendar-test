import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatCardModule, MatButtonModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnChanges, OnDestroy {
  @Input() selectedDate: Date = new Date();
  appointments: Appointment[] = [];
  private subscription!: Subscription;

  constructor(private appointmentService: AppointmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.loadAppointments();
    }
  }

  loadAppointments() {
    if (this.selectedDate) {
      this.subscription = this.appointmentService.appointments$.subscribe(
        (appointments) => {
          this.appointments = appointments.filter(
            (app) =>
              app.date.toDateString() === this.selectedDate.toDateString()
          );
        }
      );
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id);
  }

  drop(event: any) {
    const previousIndex = this.appointments.findIndex(
      (app) => app === event.item.data
    );
    const newIndex = event.currentIndex;

    if (previousIndex !== -1 && newIndex !== -1 && previousIndex !== newIndex) {
      const movedItem = this.appointments.splice(previousIndex, 1)[0];
      this.appointments.splice(newIndex, 0, movedItem);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
