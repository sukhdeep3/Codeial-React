import { Link } from 'react-router-dom';
import { Post, CreatePost, FriendsList, Loader } from '../components';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
