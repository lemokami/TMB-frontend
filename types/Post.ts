import { dbUser } from './User';

export type Post = {
  id: number | number;
  hash: string;
  caption: string;
  likes: number | string;
  path: string;
  smid: string;
  shareable: boolean;
  owner: dbUser;
};
