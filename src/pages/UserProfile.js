import styles from '../styles/settings.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks';
// import { useState } from 'react';
// import { useToasts } from 'react-toast-notifications';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();

  console.log('userId', userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });

        return history.push('/');
      }

      setLoading(false);
    };
    getUser();
  }, [userId, history, addToast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button
          className={`button ${styles.saveBtn}`}
          //  onClick={editProfile}
        >
          Add Friend
        </button>
        <button
          className={`button ${styles.saveBtn}`}
          // onClick={editProfile}
        >
          Remove Friend
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
