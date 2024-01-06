import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent {
  apikey: string | undefined;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<SettingsModalComponent>) {
    const useGPT4 = localStorage.getItem('UseGPT4') === 'true';
    this.apikey = localStorage.getItem('apikey') ?? '';
    this.formGroup = new FormGroup({
      UseGPT4: new FormControl(useGPT4)
    });
  }

  closeDialog() {
    localStorage.setItem('UseGPT4', this.formGroup.value.UseGPT4 ? 'true' : 'false');
    localStorage.setItem('apikey', this.apikey ?? '');
    this.dialogRef.close();
  }
}