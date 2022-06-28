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
  likes: number;
  shareable: boolean;
  metaHash: string;
  caption: string;
  metaContentHash: string;
  owner: dbUser;
  tid: string;
  likedby: string[];
  sharers: string[];
  tx: string;
  pid: string;
};
