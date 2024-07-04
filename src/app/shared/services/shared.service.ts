import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getRandomId(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  checkElementValue(elementId: string, value: string): number {
    let element: any = document.getElementById(elementId);
    return !!element ? element[value] : 0;
  }

  capitalizeFirstLetter(st: string) {
    return st.charAt(0).toUpperCase() + st.slice(1);
  }

  detectCeilOrFloor(value: number) {
    if (value.toString().includes('.')) {
      if (Number.parseInt(value.toString().split('.')[1]) <= 5) {
        return Math.floor(value);
      } else {
        return Math.ceil(value);
      }
    } else {
      return value;
    }
  }
}
