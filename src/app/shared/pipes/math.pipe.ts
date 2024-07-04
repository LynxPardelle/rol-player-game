import { Pipe, PipeTransform } from '@angular/core';

export type TMathArgs =
  | {
      value: number;
      operation: 'add' | 'sub' | 'mul' | 'div' | 'roundDigit';
    }
  | {
      operation: 'floor' | 'ceil' | 'round';
    };
@Pipe({
  name: 'math',
  standalone: true,
})
export class MathPipe implements PipeTransform {
  transform(value: number, args: TMathArgs[]): number {
    return args.reduce((acc, arg) => {
      switch (arg.operation) {
        case 'add':
          return acc + arg.value;
        case 'sub':
          return acc - arg.value;
        case 'mul':
          return acc * arg.value;
        case 'div':
          return acc / arg.value;
        case 'floor':
          return Math.floor(acc);
        case 'ceil':
          return Math.ceil(acc);
        case 'round':
          return Math.round(acc);
        case 'roundDigit':
          return (
            Math.round(acc * Math.pow(10, arg.value)) / Math.pow(10, arg.value)
          );
        default:
          return acc;
      }
    }, value);
  }
}
