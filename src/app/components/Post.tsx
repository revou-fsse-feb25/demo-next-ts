import React from 'react';
import { Post } from '../services/api';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-md mb-3 shadow-md">
      <h3 className="text-lg font-semibold text-blue-300 mb-2">{post.title}</h3>
      <p className="text-gray-300 text-sm">{post.body}</p>
      <div className="mt-3 text-xs text-gray-400">Post ID: {post.id}</div>
    </div>
  );
};

export default PostItem; 