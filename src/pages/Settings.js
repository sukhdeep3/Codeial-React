import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const { addToast } = useToasts();

  
  const editProfile = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const goBack = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
      });

      error = true;
    }

    if (password !== confirmPassword) {
      addToast('Password and confirm password does not match', {
        appearance: 'error',
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log(' settings response', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      return addToast('User update successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setSavingForm(false);
  };

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {editMode ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.fieldValue}
              // defaultValue={auth.user?.name}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>

            <button className={`button ${styles.editBtn}`} onClick={goBack}>
              Go back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
              onClick={editProfile}
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Settings;
