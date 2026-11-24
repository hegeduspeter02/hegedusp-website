import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonDirectiveOptions } from 'primeng/button';

@Component({
  imports: [
    ScrollTopModule,
  ],
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.html',
})
export class BackToTop {
  protected readonly buttonProps: ButtonDirectiveOptions = {
    raised: true,
    severity: 'secondary',
  };
}
