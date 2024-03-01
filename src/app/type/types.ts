export type PostsType = {
  map: any;
  _id: string;
  userId: {
    _id: string;
    name: string;
    photo: string;
  };
  description: string;
  image: string;
  likes: string[];
  comments: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type CommentType = {
  map: any;
  _id: string;
  userId: {
    _id: string;
    name: string;
    photo: string;
  };
  comment: string;
  from: string;
  likes: string[];
  postId: string;
  replies: [
    {
      _id: string;
      userId: {
        _id: string;
        name: string;
      };
      from: string;
      replyAt: string;
      comment: string;
      created_At: string;
      updated_At: string;
      likes: string[];
    }
  ];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SessionType = {
  user: {
    user: {
      _id: string;
      name: string;
      email: string;
      secretQue: string;
      secretAnswer: string;
      phone: number;
      photo: string;
      isOnline: boolean;
      views: [];
      friends: [];
      requestsFriend: [];
      posts: [];
      createdAt: string;
      updatedAt: string;
      __v: 0;
    };
    token: string;
    iat: number;
    exp: number;
    jti: string;
  };
};

export type UserInfoType = {
  profession: string;
  _id: string;
  name: string;
  email: string;
  secretQue: string;
  secretAnswer: string;
  phone: number;
  photo: string;
  isOnline: boolean;
  views: [];
  friends: [];
  requestsFriend: [];
  posts: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
  location: string;
};

export type RequestFriendsType = {
  createdAt: string;
  updatedAt: string;
  requestFrom: {
    name: string;
    photo: string;
    _id: string;
    profession: string;
  };
  requestTo: string;
  requestStatus: string;
  _id: string;
  _v: number;
};
export type SuggestedFriendsType = {
  requestsFriend: any;
  name: string;
  photo: string;
  _id: string;
  profession: string;
};

export type ReplyType = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    photo: string;
  };
  from: string;
  replyAt: string;
  comment: string;
  created_At: string;
  updated_At: string;
  likes: string[];
};
