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
  code: string = '';
  id: string = '';
  description: string = ' ';
  explanation: string = '';
  tags: string[] = [];
  dialogTitle: string = '';
  addOnBlur = true;
  form: FormGroup;
  readonly separatorKeysCodes = [SPACE, COMMA] as const;

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

  cancel() {
    this.dialogRef.close(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  onSubmit(): void {
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
