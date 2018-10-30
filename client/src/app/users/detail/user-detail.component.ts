import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
    selector: 'base-detail',
    styleUrls: ['base-detail.component.css'],
    templateUrl: 'base-detail.component.html',
})
export class BaseDetailComponent implements OnInit {

    @Input()
    public fields: any;

    public dataSource;
    public displayedColumns;

    constructor() {
    }

    public ngOnInit(): void {
        this.displayedColumns = ['label', 'value'];
        this.dataSource = new MatTableDataSource(this.fields);
    }
}
