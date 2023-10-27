import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-snippet-creation-dialog',
  templateUrl: './snippet-creation-dialog.component.html',
  styleUrls: ['./snippet-creation-dialog.component.scss'],
})
export class SnippetCreationDialogComponent implements OnInit {
  code: string = '';
  id: string = '';
  description: string = '';
  explanation: string = '';
  tags: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<SnippetCreationDialogComponent>) {}
  ngOnInit(): void {}
  cancle() {
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
    const formData = {
      code: this.code,
      id: this.id,
      description: this.description,
      explanation: this.explanation,
      tags: this.tags, // Assuming tags are comma-separated
    };
    this.dialogRef.close(formData);
  }
}
