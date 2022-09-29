import styles from '../styles/settings.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useAuth } from '../hooks';
// import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import { useToasts } from 'react-toast-notifications';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useAuth();
  // const[checkIfUserIsAFriend, setCheckIfUserIsAFriend]= useState();

  // console.log('userId', userId);

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

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;
    // console.log(auth.user.friendships);
    // console.log(friends);
    // const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friends.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = () => {};

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    // console.log('hello');

    const response = await addFriend(userId);
    console.log(addFriend(userId));
    console.log('response.data', response.data);

    if (response.success) {
      const { friendship } = response.data;
      // console.log('response.data', response.data);

      auth.updateUserFriends(true, friendship);
      addToast('Friends added successfully', {
        appearance: 'success',
      });
      // setCheckIfUserIsAFriend(true);
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setRequestInProgress(false);
  };

  // const showAddFriendsBtn = checkIfUserIsAFriend();
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
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing friend' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
