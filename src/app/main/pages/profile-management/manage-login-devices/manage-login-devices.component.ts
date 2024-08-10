import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../../../core/services/deviceservice/devices.service'; 
import { Device } from '../../../../main/models/devicemodel/devices.model';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-login-devices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-login-devices.component.html',
  styleUrl: './manage-login-devices.component.css'
})
export class ManageLoginDevicesComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data: Device[]) => {
        this.devices = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to fetch devices:', err);
      }
    });
  }

}
