import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizedSvc: DomSanitizer) { }

  transform(value: string): SafeHtml {
    return this.sanitizedSvc.bypassSecurityTrustHtml(value);
  }
}
