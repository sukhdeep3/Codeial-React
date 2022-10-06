import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState } from 'react';

const Navbar = () => {
  const [results, setResults] = useState('');
  const [searchText, setSearchText] = useState(false);
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://t3.ftcdn.net/jpg/01/05/18/78/240_F_105187826_f9QmMttoqksCW1abMmDCAv8q2u265Saa.jpg"
          alt=""
        />
        <input
          placeholder="Search Users"
          value={results}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => {
                <li
                  className="styles.searchResultsRow"
                  key={`users-${user._id}`}
                >
                  <Link to={`/users/${user._id}`}>
                    <img
                      src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                      alt="UserDp"
                      className={styles.userDp}
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>;
              })}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
