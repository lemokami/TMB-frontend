import { string } from 'yup';
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

export type dbPost = {
  _id: string;
  path: string;
  shareable: true;
  metaHash: string;
  metaContentHash: string;
  owner: string;
  caption: string;
  sharers: string[];
  pid: string;
  tx: string;
  createdAt: string;
  updatedAt: string;
};
