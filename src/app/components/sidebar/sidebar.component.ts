import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

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
  comments: Comment[] = [];
  tags: Set<string> | undefined;
  numberOfSnippets: number = 0;

  user_name: string = '';
  form_comment: string = '';

  showCommentForm: boolean = false;

  constructor(
    private commentService: CommentService,
    private snippetsService: SnippetService
  ) {}

  ngOnInit(): void {
    this.commentService.getComments().subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
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

  addCommentForm() {
    this.showCommentForm = true;
  }

  onSubmit() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const dataToTransmit: Comment = {
      id: '',
      user_name: this.user_name,
      comment: this.form_comment,
      date: formattedDate,
      snippet_id: this.selectedSnippet!.id,
    };
    // Transmit the data as required
    this.commentService.addComment(dataToTransmit).subscribe();

    this.form_comment = '';
    this.user_name = '';
    this.showCommentForm = false;
  }

  cancleCommentForm() {
    this.form_comment = '';
    this.user_name = '';
    this.showCommentForm = false;
  }
}
