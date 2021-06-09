import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

    @Input() snav: any;

    hasNewNotif: boolean = false;
    showNotifs: boolean = false;


    notifSubscription: Subscription;

    constructor(
        private notificationService: NotificationService,
    ) { }

    ngOnInit(): void {
        this.notifSubscription = this.notificationService.newNotifSubject.subscribe((val: boolean) => {
            this.hasNewNotif = val;
        })
    }

    toggleNav() {
        this.snav.toggle();
    }

    onNotif() {
        this.showNotifs = !this.showNotifs;
        this.hasNewNotif = false;
    }

    ngOnDestroy(): void {
        this.notifSubscription.unsubscribe();
    }

}