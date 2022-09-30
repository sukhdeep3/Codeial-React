// import styles from '../styles/settings.module.css';
// import { useHistory, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { addFriend, fetchUserProfile } from '../api';
// import { useToasts } from 'react-toast-notifications';
// import { Loader } from '../components';
// import { useAuth } from '../hooks';
// // import { useLocation } from 'react-router-dom';
// // import { useState } from 'react';
// // import { useToasts } from 'react-toast-notifications';

// const UserProfile = () => {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [requestInProgress, setRequestInProgress] = useState(false);
//   const { userId } = useParams();
//   const { addToast } = useToasts();
//   const history = useHistory();
//   const auth = useAuth();
//   // const[checkIfUserIsAFriend, setCheckIfUserIsAFriend]= useState();

//   // console.log('userId', userId);

//   useEffect(() => {
//     const getUser = async () => {
//       const response = await fetchUserProfile(userId);

//       if (response.success) {
//         setUser(response.data.user);
//       } else {
//         addToast(response.message, {
//           appearance: 'error',
//         });

//         return history.push('/');
//       }

//       setLoading(false);
//     };
//     getUser();
//   }, [userId, history, addToast]);

//   if (loading) {
//     return <Loader />;
//   }

//   const checkIfUserIsAFriend = () => {
//     const friends = auth.user.friendships;
//     console.log(auth.user);
//     // console.log(friends);
//     const friendIds = friends.map((friend) => friend);

//     const index = friendIds.indexOf(userId);
//     if (index !== -1) {
//       return true;
//     }
//     return false;
//   };

//   const handleRemoveFriendClick = () => {};

//   const handleAddFriendClick = async () => {
//     setRequestInProgress(true);
//     // console.log('hello');

//     const response = await addFriend(userId);
//     console.log(addFriend(userId));
//     console.log('response.data', response.data);

//     if (response.success) {
//       const { friendships } = response.data;
//       // console.log('response.data', response.data);

//       auth.updateUserFriends(true, friendships);
//       addToast('Friends added successfully', {
//         appearance: 'success',
//       });
//       // setCheckIfUserIsAFriend(true);
//     } else {
//       addToast(response.message, {
//         appearance: 'error',
//       });
//     }

//     setRequestInProgress(false);
//   };

//   // const showAddFriendsBtn = checkIfUserIsAFriend();
//   return (
//     <div className={styles.settings}>
//       <div className={styles.imgContainer}>
//         <img
//           src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
//           alt=""
//         />
//       </div>

//       <div className={styles.field}>
//         <div className={styles.fieldLabel}>Email</div>
//         <div className={styles.fieldValue}>{user?.email}</div>
//       </div>

//       <div className={styles.field}>
//         <div className={styles.fieldLabel}>Name</div>
//         <div className={styles.fieldValue}>{user?.name}</div>
//       </div>

//       <div className={styles.btnGrp}>
//         {checkIfUserIsAFriend() ? (
//           <button
//             className={`button ${styles.saveBtn}`}
//             onClick={handleRemoveFriendClick}
//             disabled={requestInProgress}
//           >
//             {requestInProgress ? 'Removing friend' : 'Remove friend'}
//           </button>
//         ) : (
//           <button
//             className={`button ${styles.saveBtn}`}
//             onClick={handleAddFriendClick}
//             disabled={requestInProgress}
//           >
//             {requestInProgress ? 'Adding friend' : 'Add friend'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
// export default UserProfile;

import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { Loader } from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useImperativeHandle, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useAuth();

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
    // console.log(friends);
    const friendIds = friends.map((friend) => friend);
    const index = friendIds.indexOf(userId);
    // console.log(index);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    console.log(response);
    console.log(response.data);
    // console.log(auth.updateUserFriends);
    // const { friendship } = response;
    if (response.success) {
      const { friendships } = response.data;

      const hello= auth.updateUserFriends(true, friendships);
      console.log(hello);
      addToast('Friend added successfully!', {
        appearance: 'success',
      });
    } else {
      // auth.updateUserFriends(true, friendship);
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
