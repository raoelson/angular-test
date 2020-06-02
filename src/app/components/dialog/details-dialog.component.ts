import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {

  showBody = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: any },
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleBody(): void {
    this.showBody = !this.showBody;
  }

  buildForm(): void {
    this.form = this.fb.group({
      primaryTitle: new FormControl(this.data.data.primaryTitle),
      originalTitle: new FormControl(this.data.data.originalTitle),
      startYear: new FormControl(this.data.data.startYear)
    });
  }

  public add(value: any): void {
    /* ici code pour modifier object */
    alert(`${value.primaryTitle} - ${value.originalTitle} - ${value.startYear}`);
  }

}
