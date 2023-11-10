import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cours } from 'src/app/models/cours';

@Component({
  selector: 'app-cours-creation-dialog',
  templateUrl: './cours-creation-dialog.component.html',
  styleUrls: ['./cours-creation-dialog.component.scss'],
})
export class CoursCreationDialogComponent implements OnInit {
  title: string = '';
  description: string = '';
  dialogTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<CoursCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cours>
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title || '';
      this.description = this.data.description || '';
      this.dialogTitle = 'Update Cours';
    } else {
      this.dialogTitle = 'Add new Cours';
    }
  }
  cancle() {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    const formData: Partial<Cours> = {
      title: this.title,
      description: this.description,
    };
    this.dialogRef.close(formData);
  }
}

/* constructor(
    public dialogRef: MatDialogRef<CoursCreationDialogComponent>,
    private partialCoursData: Partial<Cours> | undefined
  ) {
    this.title = this.partialCoursData?.title;
    this.description = this.partialCoursData?.description;
  } */
