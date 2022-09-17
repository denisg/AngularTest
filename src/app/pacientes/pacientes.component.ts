import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public showAddModal: boolean = false;
  public editingModal: boolean = false;
  public selectedPatient: any = {};
  public patients: Array<any> = [];

  constructor(private _service: PatientService) {
    this.clearSelectedPatient();
  }

  clearSelectedPatient() {
    this.selectedPatient = {
      id: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      document: '',
      type: 'FISICA',
      birthday: '',
    };
  }

  showNewClientModal() {
    this.clearSelectedPatient();
    this.editingModal = false;
    this.showAddModal = true;
  }

  showEditPatientModal(patient: any) {
    this.selectedPatient = patient;
    this.showAddModal = true;
    this.editingModal = true;
  }

  async editPatient() {
    await this._service.editPatient(this.selectedPatient);
    this.clearSelectedPatient();
    this.editingModal = false;
    this.showAddModal = false;
    this.ngOnInit();
  }

  async createPatient() {
    const newPatient = await this._service.createPatient(
      this.selectedPatient
    );
    // Concat new patient
    this.patients = this.patients.concat(newPatient);
    // Clear
    this.clearSelectedPatient();
    // Close
    this.showAddModal = false;
  }

  public get isValidSelectedPatient(): boolean {
    return !!this.selectedPatient &&
      !!this.selectedPatient.name &&
      !!this.selectedPatient.lastName &&
      !!this.selectedPatient.document &&
      !!this.selectedPatient.phone &&
      !!this.selectedPatient.type &&
      !!this.selectedPatient.birthday;
  }

  async loadPatients() {
    this.patients = await this._service.getAllPatients();
  }

  ngOnInit(): void {
    this.loadPatients();
  }

}
