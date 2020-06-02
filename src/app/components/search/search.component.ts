
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    form: FormGroup;
    optionsYear: any;
    optionsTitle: any;
    datasource: any[] = [];
    @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set data(_val: any) {
        this.datasource = _val;
        this.optionsTitle = this.groupBy('originalTitle');
        this.optionsYear = this.groupBy('startYear');
    }
    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            originalTitle: new FormControl(''),
            startYear: new FormControl('')
        });
    }

    public groupBy(filter: any) {
        return _.keys(_.groupBy(this.datasource, filter));
    }

    public search(filters: any): void {
        _.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
        this.groupFilters.emit(filters);
    }

}
