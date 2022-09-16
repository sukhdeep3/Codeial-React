import styles from '../styles/home.module.css';

export const Home = () => {
  return (
    <div className={styles.postList}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>Sukhdeep </span>
              <span className={styles.postTime}>a minute age</span>
            </div>
          </div>
          <div className={styles.postContent}>Post Content</div>

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
              <span>2</span>
            </div>
          </div>

          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentsHeader}>
                <span className={styles.postCommentsAuthor}>Jashan </span>
                <span className={styles.postCommentsTime}>a minute ago</span>
                <span className={styles.postCommentsLikes}>40</span>
              </div>
              <div className={styles.postCommentsContent}>random comment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
