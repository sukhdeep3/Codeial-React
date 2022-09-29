// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import { Comment, Loader } from '../components';
import styles from '../styles/home.module.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                alt="user-pic"
              />
              <div>
                {/* {console.log(post.user)} */}
                <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: {
                      user: post.user,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/535/535285.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={`comment${comment._id}`} />
              ))}
            </div> 
          </div>
        </div>
      ))}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;

// import PropTypes from 'prop-types';
// import styles from '../styles/home.module.css';
// import { Comment } from '../components';

// const Home = ({ posts }) => {
//   return (
//     <div className={styles.postList}>
//       {posts.map((post) => (
//         <div className={styles.postWrapper} key={`posts-${post._id}`}>
//           <div className={styles.postHeader}>
//             <div className={styles.postAvatar}>
//               <img
//                 src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
//                 alt="user-pic"
//               />
//               <div>
//                 <span className={post.user.name}>Sukhdeep </span>
//                 <span className={styles.postTime}>a minute age</span>
//               </div>
//             </div>
//             <div className={post.content}>Post Content</div>

//             <div className={styles.postActions}>
//               <div className={styles.postLike}>
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/128/535/535285.png"
//                   alt="likes-icon"
//                 />
//                 <span>5</span>
//               </div>
//               <div className={styles.postCommentsIcon}>
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
//                   alt="comments-icon"
//                 />
//                 <span>2</span>
//               </div>
//             </div>

//             <div className={styles.postCommentBox}>
//               <input placeholder="Start typing a comment" />
//             </div>

//             {/* <div className={styles.postCommentsList}>
//               <div className={styles.postCommentsItem}>
//                 <div className={styles.postCommentHeader}>
//                   <span className={styles.postCommentAuthor}>Bill</span>
//                   <span className={styles.postCommentTime}>a minute ago</span>
//                   <span className={styles.postCommentLikes}>22</span>
//                 </div>

//                 <div className={styles.postCommentContent}>Random comment</div>
//               </div>
//             </div> */}
//             <div className={styles.postCommentsList}>
//               {post.comments.map((comment)=>{
//                 <Comment
//                 comment={comment}
//                 />
//               })}

//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

// export default Home
