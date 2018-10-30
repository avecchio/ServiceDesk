import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Page} from '../../models/page';
import { PipeEnums } from '../../enums/pipe';
import {Subscription} from 'rxjs';

@Component({
    selector: 'base-catalog',
    styleUrls: ['base-catalog.component.css'],
    templateUrl: 'base-catalog.component.html',
})
export class BaseCatalogComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    public entity: string;

    @Input()
    public pageSize: number;

    @Input()
    public limit = 100;

    @Input()
    public allColumns = [];

    @Input()
    public rows = [];

    public columns = [];

    public key: number;

    public loading: boolean;
    public fullTextSearch: string = null;
    public sortField: string;
    public sortOrder: string;
    public pageTypeEnums: any;

    public page = new Page();

    public guid: string;
    public resultsError: string = null;

    private subscription: Subscription;

    constructor() {
        this.subscription = new Subscription();
        this.pageTypeEnums = PipeEnums;
    }

    public ngOnInit() {
        this.columns = this.allColumns;
    }

    public ngOnDestroy() {
    }

    public ngAfterViewInit() {
    }

    public onSort(event) {
        this.page.pageNumber = 1;
        this.sortField = event.column.prop;
        this.sortOrder = event.newValue.toUpperCase();
        this.getPage(this.page.pageNumber);
    }


    public setPage(pageInfo) {

        // for some reason this is 0 indexed and we don't want a page 0
        // if it's 0 make it 1
        // if it's 1 make it 1
        // if it's 1 make it 2 and so on

        if (pageInfo.offset < 1) {
            this.page.pageNumber = 1;
        } else if (pageInfo.offset === 1 && pageInfo.initial) {
            this.page.pageNumber = pageInfo.offset;
            this.sortField = ''; // CloseClearanceConstants.APPLICATIONRECEIVEDDATE_FIELD; // defaulting to this
            this.sortOrder = 'DESC'; // defaulting to this
        } else {
            this.page.pageNumber = pageInfo.offset + 1;
        }
        this.getPage(this.page.pageNumber);
    }

    public getPage(page: number): void {
    }

    public isChecked(col, columns) {
        return columns.find(c => {
            return c ? c.name === col.name : false;
        });
    }

    public clearColumns(entity): void {
        localStorage.removeItem(entity + 'Columns');
    }

    public setUpColumns(defaultColumns, entity) {
        const cachedColumns = JSON.parse(localStorage.getItem(entity + 'Columns'));
        /*
            _.each(cachedColumns, cachedColumn => {
                if (cachedColumn) {
                    const column = _.find(defaultColumns, c => {
                        return c.name === cachedColumn.name;
                    });
                    cachedColumn.pipe = column.pipe;
                    cachedColumn.cellTemplate = column.cellTemplate;
                }
            });
        */
        return cachedColumns ? cachedColumns : defaultColumns;
    }

    public isFirstIndex(item: any, array: any[]): boolean {
        const itemToCompate = array.filter(i => {
            return i.name === item.name;
        })[0];

        const index = array.indexOf(itemToCompate);

        return index === 0;
    }

    public isLastIndex(item: any, array: any[]): boolean {
        const itemToCompate = array.filter(i => {
            return i.name === item.name;
        })[0];

        const index = array.indexOf(itemToCompate);

        return index === array.length - 1;
    }

    private swap(input, indexA, indexB): any[] {
        const temp = input[indexA];

        input[indexA] = input[indexB];
        input[indexB] = temp;

        return input;
    }

    private defaultColumnList(): any[] {
        return [];
    }

}
