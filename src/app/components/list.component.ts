
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Columns } from '../shared/models/columns.model';
import { Options } from '../shared/models/options.model';
import { ApiService } from '../services/api.service';
import { DetailDialogComponent } from './dialog/details-dialog.component';
import * as _ from 'lodash';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    datasource: any[] = [];
    _datasource: any[] = [];
    selectedCommands: any[] = [];
    optionsYear: any;
    optionsTitle: any;
    filteredUsers: any[] = [];
    columns: Columns[] = [
        { label: 'tconst', type: 'tconst' },
        { label: 'Primary title', type: 'primaryTitle' },
        { label: 'Original title', type: 'originalTitle' },
        { label: 'Start year', type: 'startYear' },
    ];
    options: Options = {
        title: false,
        menu: true,
        select: 'uniq',
        filter: false,
        autoPager: true,
        tabs: [
            { label: 'Modifier', function: this.showDetails.bind(this) },
        ]
    };

    constructor(
        private dialog: MatDialog,
        private apiService: ApiService,
    ) { }

    ngOnInit() {
        this.apiService.get()
            .subscribe(data => {
                this.datasource = data;
                this._datasource = this.datasource;
            });
    }

    public showDetails(selected: any[]): void {
        if (selected && selected.length) {
            this.dialog.open(DetailDialogComponent, {
                width: '50%',
                data: { data: selected[0] },
            });
        }
    }

    public filters(_filters: any) {
        this.datasource = this._datasource;
        const keys = _.keys(_filters);
        const filterData = data => {
            let result = keys.map(key => {
                if (data[key]) {
                    return String(data[key]).toLowerCase().startsWith(String(_filters[key]).toLowerCase())
                } else {
                    return false;
                }
            });
            result = result.filter(it => it !== undefined);
            return result.reduce((acc, cur: any) => { return acc & cur }, 1);
        };
        this.datasource = this.datasource.filter(filterData);
    }
}
