export const API_URL: string = "http://localhost:2000";
export const fetchPosts = async (token: string) => {
  const res = await fetch(`${API_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await res.json();
  return posts.data;
};
export const fetchPost = async (token: string, updatingPostId: string) => {
  try {
    const res = await fetch(`${API_URL}/api/post/${updatingPostId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await res.json();
    return posts.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUserPost = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${API_URL}/api/post/get-user-post/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await res.json();
    return posts.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUserInfo = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/user-info/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    return info;
  } catch (error) {
    console.log(error);
  }
};

export const deployPost = async ({
  token,
  description,
  image,
}: {
  token: string;
  description: string;
  image: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description, image }),
    });
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async ({
  token,
  postId,
}: {
  token: string;
  postId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};
export const likePost = async ({
  token,
  postId,
}: {
  token: string;
  postId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/like/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async ({
  token,
  description,
  image,
  postId,
}: {
  token: string;
  description: string;
  image: string;
  postId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/update-post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, image }),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchComments = async (token: string, postId: string) => {
  try {
    const res = await fetch(`${API_URL}/api/post/comments/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const comments = await res.json();

    return comments.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async ({
  token,
  comment,
  from,
  postId,
}: {
  token: string;
  comment: string;
  from: string;
  postId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment, from }),
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async ({
  token,
  commentId,
  postId,
}: {
  token: string;
  postId: string;
  commentId: string;
}) => {
  try {
    const res = await fetch(
      `${API_URL}/api/post/deleteComment/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addReply = async ({
  token,
  reply,
  from,
  commentId,
}: {
  token: string;
  reply: string;
  from: string;
  commentId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/post/reply-comment/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: reply, from, replyAt: "" }),
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReply = async ({
  token,
  commentId,
  replyId,
}: {
  token: string;
  commentId: string;
  replyId: string;
}) => {
  try {
    const res = await fetch(
      `${API_URL}/api/post/delete-reply/${commentId}/${replyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async ({
  token,
  commentId,
  replayId,
}: {
  token: string;
  commentId: string;
  replayId: string;
}) => {
  try {
    const res = await fetch(
      ` ${
        replayId !== ""
          ? `${API_URL}/api/post/like-comment/${commentId}/${replayId}`
          : `${API_URL}/api/post/like-comment/${commentId}/false`
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// USER

export const fetchSuggestedFriends = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/suggestedFriends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const suggestedFriends = await res.json();

    return suggestedFriends.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFriendRequest = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/get-friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const friendRequest = await res.json();

    return friendRequest;
  } catch (error) {
    console.log(error);
  }
};
export const accesptRequest = async ({
  token,
  requestId,
  status,
}: {
  token: string;
  requestId: string;
  status: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/accept-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestId, status }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const sendRequest = async ({
  token,
  requestTo,
}: {
  token: string;
  requestTo: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestTo }),
    });
    const data = await res.json();
    console.log(data);
    return data;
    // console.log(requestTo);
  } catch (error) {
    console.log(error);
  }
};

export const viewProfile = async ({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/profile-view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: userId }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
