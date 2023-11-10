import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() cours: Cours | undefined;
  @Input() commentSnippet: Snippet | undefined;
  comments: Comment[] = [];
  user_name: string = '';
  form_comment: string = '';
  tags: Set<string> = new Set();
  showCommentForm: boolean = false;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cours']) {
      this.tags = new Set(
        this.cours?.snippets?.flatMap((snippet) => {
          return snippet.tags;
        })
      );
      this.commentSnippet = undefined;
    }

    if (changes['commentSnippet']) {
      this.prepareComment();
    }
  }

  prepareComment() {
    this.commentService.getComments().subscribe((data: Comment[]) => {
      this.comments = this.filteredComments(data);
    });
  }

  filteredComments(comments: Comment[]): Comment[] {
    return comments.filter(
      (comment) => comment.snippet_id === this.commentSnippet?.id
    );
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
      snippet_id: this.commentSnippet!.id,
    };
    // Transmit the data as required
    this.commentService.addComment(dataToTransmit).subscribe((data) => {
      this.commentService.getComments().subscribe((data: Comment[]) => {
        this.comments = this.filteredComments(data);
      });
    });
    this.form_comment = '';
    this.user_name = '';
    this.showCommentForm = false;
  }
}
