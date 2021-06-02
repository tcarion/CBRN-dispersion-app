import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FlexpartInput } from '../../../../../interfaces/flexpart/flexpart-input';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { SelectionTableComponent } from 'src/app/components/selection-table/selection-table.component';

const columnInfo = [
    {
        name: 'startDate',
        text: 'Start Date',
        width: 140,
        withPipe: { pipe: DatePipe, arg: ["YYYY-MM-dd @ HH:mm"] },
        sort: true
    },
    {
        name: 'endDate',
        text: 'End Date',
        width: 150,
        withPipe: { pipe: DatePipe, arg: ["YYYY-MM-dd @ HH:mm"] },
        sort: true
    },
]

@Component({
    selector: 'app-flexpart-run-preloaded',
    templateUrl: './flexpart-run-preloaded.component.html',
    styleUrls: ['./flexpart-run-preloaded.component.scss']
})
export class FlexpartRunPreloadedComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('selectionTableRef') selectionTableRef: SelectionTableComponent<FlexpartInput>;

    displayedColumns = ['select', 'startDate', 'endDate'];
    columnInfo = columnInfo;

    newSelectionSubject = new Subject<FlexpartInput>();

    constructor() {}

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.selectionTableRef.populateWithRequest("flexpart", "available_flexpart_input", (data: any) => {
            data.forEach((element: any) => {
                element.startDate = new Date(element.startDate);
                element.endDate = new Date(element.endDate);
            });
            return <FlexpartInput>data;
        });
    }

    emitSelection(fpInput: FlexpartInput) {
        this.newSelectionSubject.next(fpInput);
    }

    ngOnDestroy() {

    }

}