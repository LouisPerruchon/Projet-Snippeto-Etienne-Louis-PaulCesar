import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private coursService: CoursService,
    public dialogRef: MatDialogRef<CoursCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cours>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(150)]],
      title: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title || '';
      this.description = this.data.description || '';
      this.dialogTitle = 'Update Cours';
    } else {
      this.dialogTitle = 'Add new Cours';
    }
  }
  cancle(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    const formData: Partial<Cours> = {
      title: this.title,
      description: this.description,
    };

    if (this.dialogTitle === 'Update Cours') {
      this.coursService.patchCours(this.data.id!, formData).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.coursService.addCours(formData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
