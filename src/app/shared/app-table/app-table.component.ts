import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, MatSort } from '@angular/material';
import { AppSelector } from './appSelector';
import { Options } from '../models/options.model';
import { Columns } from '../models/columns.model';
import { AppTableService } from '../services/appTableService';
import { find as _find } from 'lodash';
import { ActionElm } from '../models/action-elm.model';
import { Action } from '../models/actions.model';

@Component({
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: ['./app-table.component.scss'],
})
export class AppTableComponent implements OnInit, OnChanges {
    private _options: Options;
    private _columns: Columns[];
    // input getter and setter to adapt component to data options or columns change
    @Input()
    set options(options: Options) {
        // filter tabs by tags
        this.table.setOptions(options).subscribe((_options) => { this._options = _options; });
    }
    get options() { return this._options; }

    @Input()
    set columns(columns: Columns[]) {
        this._columns = columns;
        if (this.options.select && !_find(this._columns, { 'type': 'select' })) {
            this._columns.unshift({ label: '', type: 'select' });
        }
        this.displayedColumns = columns.map((column: any) => column.type);
    }
    get columns() { return this._columns; }

    @Input() loading: boolean;

    get header() {
        return this.options && (this._options.filter || this.options.actions);
    }

    @Input()
    set data(_val: any) {
        this.dataSource = new MatTableDataSource<any>(_val || []);
        if (this.options && this.options.autoPager) {
            this.dataSource.paginator = this.paginator;
        }
        if (this.options && this.options.autoSort) {
            this.dataSource.sort = this.sort;
        }
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Output() selectedValue: EventEmitter<ActionElm> = new EventEmitter<ActionElm>();

    // "any" type here is supposed to be the same type as SelectionModel elements
    @Output() selectedRowsChange = new EventEmitter<any[]>();
    @Input() selectedRows: any[];

    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    selection: AppSelector<any>;
    showFilterInput: boolean;

    constructor(
        public pagerIntl: MatPaginatorIntl,
        public table: AppTableService,
    ) {
        // translation
        this.pagerIntl.itemsPerPageLabel = 'Résultats par page :';
        this.pagerIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) {
                return `0 sur ${length}`;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} sur ${length}`;
        };
        this.pagerIntl.nextPageLabel = 'Page suivante';
        this.pagerIntl.previousPageLabel = 'Page précédente';
    }

    ngOnInit() {
        this.selection = new AppSelector<any>((this.options.select !== 'uniq'), []);
    }

    ngOnChanges(_val: any) {
    }

    displayFilterInput() {
        this.showFilterInput = !this.showFilterInput;
    }

    // filter data
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSource.data.forEach(row => this.selection.select(row));
        }
        this.selectedRowsChange.emit(this.selection.selected);
    }

    emitAction(_id: string, _data: any) {
        const actionElm: ActionElm = {
            id: _id,
            data: _data,
        };
        this.selectedValue.emit(actionElm);
    }

    toggleSelection(row: Object): void {
        this.selection.toggle(row);
        this.selectedRowsChange.emit(this.selection.selected);
    }

    showMasterToggle() {
        return this.options.select !== 'uniq'
            && this.options.select !== 'limited';
    }

    getActionTabs(): Action[] {
        return this.options.tabs
            .filter((tab: Action) => {
                return !this.selection.isMultiple() === !tab.multiple;
            });
    }
}
