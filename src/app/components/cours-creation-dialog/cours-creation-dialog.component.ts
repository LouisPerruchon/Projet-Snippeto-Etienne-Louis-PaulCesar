import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';

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
    private coursService: CoursService,
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
    this.coursService.addCours(formData).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
