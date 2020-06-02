import { Injectable } from '@angular/core';
import { Options } from '../models/options.model';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, filter, toArray, take } from 'rxjs/operators';
import { Action } from '../models/actions.model';

@Injectable({
    providedIn: 'root',
})
export class AppTableService {

    constructor() { }

    /**
     * Adapt a tables options to current user
     */
    setOptions(options: Options): Observable<Options> {
        if (options.tabs === undefined) {
            return of(options);
        }
        return from(options.tabs).pipe(
            switchMap((tab: Action) => {
                return this.isAllowed().pipe(map((access: boolean) => (access) ? tab : null));
            }),
            filter((response: Action | null) => response !== null),
            toArray(),
            map((tabs: Action[]) => ({ ...options, tabs })),
            take(1),
        );
    }

    isAllowed(): Observable<boolean> {
        return of(true);
    }
}
