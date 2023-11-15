import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Snippet } from 'src/app/models/snippet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-snippet-creation-dialog',
  templateUrl: './snippet-creation-dialog.component.html',
  styleUrls: ['./snippet-creation-dialog.component.scss'],
})
export class SnippetCreationDialogComponent implements OnInit {
  readonly separatorKeysCodes = [SPACE, COMMA] as const;
  public code: string = '';
  public id: string = '';
  public description: string = '';
  public explanation: string = '';
  public tags: string[] = [];
  public dialogTitle: string = '';
  public addOnBlur = true;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SnippetCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Snippet>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      code: ['', Validators.required],
      explanation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.code = this.data.code || '';
      this.description = this.data.description || '';
      this.explanation = this.data.explanation || '';
      this.tags = this.data.tags || [];
      this.dialogTitle = 'Update Snippet';
    } else {
      this.dialogTitle = 'Add new Snippet';
    }
  }

  public cancel() {
    this.dialogRef.close(null);
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public onSubmit(): void {
    const formData: Partial<Snippet> = {
      code: this.code,
      id: this.id,
      description: this.description,
      explanation: this.explanation,
      tags: this.tags,
    };
    this.dialogRef.close(formData);
  }
}
