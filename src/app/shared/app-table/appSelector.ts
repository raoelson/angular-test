import { SelectionModel } from '@angular/cdk/collections';

/**
 * Helper class extending selection model to handle values by _id in case of api pagination
 */
export class AppSelector<T> extends SelectionModel<T> {

  private _ids = new Set();

  constructor(
    _multiple: boolean = false,
    initiallySelectedValues?: T[],
    _emitChanges: boolean = true,
  ) {
    super(_multiple, initiallySelectedValues, _emitChanges);
  }

  select(value: T) {
    super.select(value);

    if ('_id' in value) {
      const val = value as any; // to compensate typscrit not recognizing value._id even after checking ..
      this._ids.add(val._id);
    }
  }

  deselect(value: T) {
    super.deselect(value);

    if ('_id' in value) {
      const val = value as any;
      this._ids.delete(val._id);
    }

  }

  isSelected(value: T): boolean {
    if (!('_id' in value)) {
      return super.isSelected(value);
    }

    const val = value as any;
    return this._ids.has(val._id);
  }

  clear(): void {
    super.clear();
    this._ids.clear();
  }

  isMultiple(): boolean {
    return this.selected.length > 1;
  }
}
