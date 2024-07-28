import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message: string): void {
    const timeStamp = new Date().toLocaleDateString();
    console.log(`${timeStamp}: ${message}`);
  }
}
