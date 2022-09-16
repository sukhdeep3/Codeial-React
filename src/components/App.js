import { useEffect, useState } from 'react';
import { getPosts } from '../api/index';
import { Home } from '../pages';
import { Loader } from './';

export function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoader(false);
    };

    fetchPosts();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Home posts={posts} />
    </div>
  );
}
