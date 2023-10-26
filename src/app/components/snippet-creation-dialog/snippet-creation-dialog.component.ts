import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


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
  tags: string = '';

  constructor(public dialogRef: MatDialogRef<SnippetCreationDialogComponent>) {}
  ngOnInit(): void {}
  cancle(){
    this.dialogRef.close(null);
  }
  onSubmit(): void {
    const formData = {
      code: this.code,
      id: this.id,
      description: this.description,
      explanation: this.explanation,
      tags: this.tags.split(','), // Assuming tags are comma-separated
    };
    this.dialogRef.close(formData);
  }
  
}
