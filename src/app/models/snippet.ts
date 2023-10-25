import { Comment } from './comment';

export interface Snippet {
  code: string;
  id: string;
  description: string;
  explanation: string;
  tags: string[];
  comments: Comment[];
}
