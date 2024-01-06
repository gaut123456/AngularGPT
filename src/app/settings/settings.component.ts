import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const localStorageKey = localStorage.getItem('apikey');
    const localStorageUseGPT4 = localStorage.getItem('UseGPT4');

    this.dialog.open(SettingsModalComponent, {
      data: { localStorageValue: {localStorageKey, localStorageUseGPT4} }
    });
    }
  
}
