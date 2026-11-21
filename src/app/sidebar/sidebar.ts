import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { Bars } from '@primeicons/angular/bars';

interface SidebarItem {
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    ButtonModule,
    DrawerModule,
    RippleModule,
    TranslocoPipe,
    Bars,
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly visible = signal(false);
  protected readonly items: SidebarItem[] = [
    {
      labelKey: 'about.me',
      icon: 'pi pi-user',
    },
    {
      labelKey: 'portfolio.title',
      icon: 'pi pi-briefcase',
    },
    {
      labelKey: 'contact.me',
      icon: 'pi pi-envelope',
    },
  ];
}
