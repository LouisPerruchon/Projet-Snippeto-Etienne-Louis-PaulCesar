import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { CommentService } from 'src/app/services/comment.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() selectedCours: Cours | undefined;
  @Input() selectedSnippet: Snippet | undefined;
  public comments: Comment[] = [];
  public tags: Set<string> | undefined;
  public numberOfSnippets: number = 0;
  public user_name: string = '';
  public comment: string = '';
  public showCommentForm: boolean = false;
  public form: FormGroup;

  constructor(
    private commentService: CommentService,
    private snippetsService: SnippetService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(100)]],
      user_name: ['', [Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCours']) {
      if (this.selectedCours) {
        this.snippetsService
          .getSnippetsById(this.selectedCours!.id)
          .subscribe((snippets: Snippet[]) => {
            this.tags = new Set(
              snippets.flatMap((snippet: Snippet) => snippet.tags)
            );
            this.numberOfSnippets = snippets.length;
          });
      } else {
        this.tags = undefined;
        this.numberOfSnippets = 0;
      }
      this.selectedSnippet = undefined;
    }

    if (changes['selectedSnippet']) {
      if (this.selectedSnippet) {
        this.commentService
          .getCommentBySnippetId(this.selectedSnippet!.id)
          .subscribe((comments: Comment[]) => {
            this.comments = comments;
          });
      } else {
        this.comments = [];
      }
      this.cancleCommentForm();
    }
  }

  public addCommentForm(): void {
    this.showCommentForm = true;
  }

  public onSubmit(): void {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const dataToTransmit: Comment = {
      id: '',
      user_name: this.user_name,
      comment: this.comment,
      date: formattedDate,
      snippet_id: this.selectedSnippet!.id,
    };
    this.commentService.addComment(dataToTransmit).subscribe();

    this.comment = '';
    this.user_name = '';
    this.showCommentForm = false;
  }

  public cancleCommentForm(): void {
    this.comment = '';
    this.user_name = '';
    this.showCommentForm = false;
  }
}
