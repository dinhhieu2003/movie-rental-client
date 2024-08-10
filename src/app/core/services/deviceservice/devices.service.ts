import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments'; 

import { Device } from '../../../main/models/devicemodel/devices.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = `${environment.apiUrl}/api/user/devices`;

  constructor(private httpClient: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.apiUrl);
  }
}
