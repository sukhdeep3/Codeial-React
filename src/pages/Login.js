import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
// import { login } from '../api';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();

  // const auth = useProvideAuth();
  const auth = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    if (!email || !password) {
      return addToast('Please add both email and password', {
        appearance: 'error',
      });
    }
    const response = await auth.login(email, password);
    // console.log('useAuth', authed.login.response);
    // console.log('useProviderAuth', auth.login.response);

    console.log('response', response);
    // console.log('response', response.success);
    if (response.success) {
      addToast('Sucessfully Login', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setLoggingIn(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

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
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
