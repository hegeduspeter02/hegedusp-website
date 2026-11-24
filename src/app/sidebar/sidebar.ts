import { Component, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { Bars } from '@primeicons/angular/bars';
import { ScrollService } from '../shared/scroll.service';

interface SidebarItem {
  labelKey: string;
  icon: string;
  targetId?: string;
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
  private readonly scroll = inject(ScrollService);
  protected readonly visible = signal(false);
  protected readonly items: SidebarItem[] = [
    {
      labelKey: 'hero.title',
      icon: 'pi pi-user',
      targetId: 'hero',
    },
    {
      labelKey: 'portfolio.title',
      icon: 'pi pi-briefcase',
      targetId: 'chip-timing',
    },
    {
      labelKey: 'contact.me',
      icon: 'pi pi-envelope',
    },
  ];

  protected navigate(item: SidebarItem, event: Event, drawer: Drawer): void {
    if (!item.targetId) {
      return;
    }
    drawer.close(event);
    this.scroll.scrollTo(item.targetId);
  }
}
