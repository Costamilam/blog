import { Directive, ElementRef, HostListener } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';

@Directive({
    selector: '[appPhone]',
    providers: [PhonePipe]
})
export class PhoneDirective {

    private element: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private phonePipe: PhonePipe
    ) {
        this.element = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.element.value = this.phonePipe.transform(this.element.value);
    }

    @HostListener('input', ['$event.target.value'])
    @HostListener('paste', ['$event.target.value'])
    @HostListener('change', ['$event.target.value'])
    onChange(value) {
        this.element.value = this.phonePipe.transform(value);
    }

}
