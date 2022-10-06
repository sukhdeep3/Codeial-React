import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import { toggleLike } from '../api';
import { usePosts } from '../hooks';

import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleCommentLikeClick = async () => {
    console.log('comment', comment);
    const response = await toggleLike(comment._id, 'Comment');

    if (response.success) {
      if (response.data.deleted) {
        addToast('Like removed successfully', {
          appearance: 'success',
        });
      } else {
        addToast('Like added successfully', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postActions}>
        <div className={styles.postCommentContent}>{comment.content}</div>
        <div className={styles.postLike}>
          <button onClick={handleCommentLikeClick}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/535/535285.png"
              alt="likes-icon"
            />
          </button>
          <span>{comment.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
