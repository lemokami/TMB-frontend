import { dbPost } from './Post';
import { dbUser } from './User';

export type feedPost = {
  _id: string;
  post: dbPost;
  likes: number;
  isOwner: true;
  poster: dbUser;
  owner: dbUser;
  createdAt: string;
  updatedAt: string;
};
