import { createContext } from 'react';
import { useProvidePosts, updateComments } from '../hooks';
const initialState = {
  posts: [''],
  loading: true,
  addPostsToState: () => {},
  updateComments: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};