import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cours-creation-dialog',
  templateUrl: './cours-creation-dialog.component.html',
  styleUrls: ['./cours-creation-dialog.component.scss'],
})
export class CoursCreationDialogComponent implements OnInit {
  title: string = '';
  description: string = '';

  constructor(public dialogRef: MatDialogRef<CoursCreationDialogComponent>) {}
  ngOnInit(): void {}
  cancle() {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    const formData = {
      title: this.title,
      description: this.description,
    };
    this.dialogRef.close(formData);
  }
}
