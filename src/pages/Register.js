import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState('');
  const { addToast } = useToasts;
  const auth = useAuth();
  const history = useHistory();

  console.log(history);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearence: 'error',
        autoDismiss: true,
      });
      error = true;
    }
    if (password !== confirmPassword) {
      addToast('Make sure password and confirm password matches', {
        appearence: 'error',
        autoDismiss: true,
      });
      error =true;
    }
    if(error){
        return setSignUp(false);
    }

    const response= await auth.signUp(name, email, password, confirmPassword);

    if(response.success){
        history.push('/login');
        setSignUp(false)

        return(
            addToast('User register successfully, please login in', {
                appearence: 'success',
                autoDismiss: true
            })
        )
    } else {
        addToast(response.message, {
            appearence: 'error',
            autoDismiss: true,
        })
    }

    // const setSignUp: (value: React.SetStateAction<string>)=>void
    setSignUp(false);
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Register</span>

      <div className={styles.field}>
        <input
          type="FirstName"
          placeholder="abc"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete= 'new-password'
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete= 'new-password'
        />
      </div>

      <div className={styles.field}>
        <button> Sign up</button>
      </div>
    </form>
  );
};

export default Register;
