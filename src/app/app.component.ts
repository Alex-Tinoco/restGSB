import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Medecin } from './types/medecin';
import { DoctorsService } from './services/doctors.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DoctorComponent } from './doctor/doctor.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoctorComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly doctorsService = inject(DoctorsService);
  private readonly destroyRef = inject(DestroyRef);
  medecins!: Medecin[];
  filteredMedecins!: Medecin[];

  searchDoctorControl: FormControl<string | null> = new FormControl('');

  ngOnInit(): void {
    this.doctorsService.getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((medecins) => {
      this.medecins = medecins;
      this.filteredMedecins = medecins;
    });
  }

  searchDoctor(){
    const name = this.searchDoctorControl.value;

    if (!name){
      this.filteredMedecins = this.medecins;
      return;
    }

  }
}

