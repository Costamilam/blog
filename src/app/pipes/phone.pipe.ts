import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }
    
        value = value.split('').filter(value => !Number.isNaN(Number.parseInt(value)));
    
        value = value.map((char, index) => {
            switch (index) {
                case 0:
                    return '(' + char;
                case 1:
                    return char + ') ';
                case 5:
                    return char + '-';
                default:
                    return char;
            }
        }).join('');
    
        if (value.length >= 15) {
            value = value.replace(/-([0-9])/, '$1-');
        }
    
        return value.substr(0, 15);
    }

}
