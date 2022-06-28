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
  likedby: any[];
  own: any[];
  shared: any[];
  _id: string;
  key: string;
  completed_profile: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  age: number;
  name: string;
  profile_img: string;
};
