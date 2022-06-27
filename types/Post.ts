import { User } from './User';

export type Post = {
  id: number | number;
  hash: string;
  owner: User;
  caption: string;
  likes: number | string;
  path: string;
  smid: string;
  shareable: boolean;
};
