import {UserOAuthInfo} from "./userOAuthInfo";
export interface Blog {
  id?: string;
  title?: string;
  summary?: string;
  content?: string;
  img?: string;
  tags?: Array<Tag>;
  comments?: Array<Comment>;
}

export interface Tag {
  name: string;
}

export interface Comment {
  content: string;
  createdBy: UserOAuthInfo;
  replies: Array<Reply>;
}

export interface Reply {
  content: string;
  createdBy: UserOAuthInfo;
}
