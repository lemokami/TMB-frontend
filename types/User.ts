export type User = {
  id: number | string;
  name: string;
  age: number | string;
  profile_img: string;
  key: string;
  sharer: string[] | [];
  liked: string[];
};

export type dbUser = {
  _id: string;
  key: '7hYJtLWW4TWCqZixNCgK1nfYx7pa9zRW6pP1fMPc7zYP';
  completed_profile: true;
  liked: string[];
  own: string[];
  shared: string[];
  createdAt: string;
  updatedAt: string;
  age: number;
  name: string;
  profile_img: string;
};
