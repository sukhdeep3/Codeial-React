import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const searchEffect = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      searchEffect();
    } else {
      setResults([]);
    }
    searchEffect();
  }, [searchText]);

  window.document.addEventListener('click', function () {
    setResults([]);
    setSearchText('');
  });

  const setSearchContainer = () => {
    setResults([]);
    setSearchText('');
  };

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
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt=""
        />
        <input
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        {results.length > 2 && (
          <div className={styles.searchResults}>
            <ul onClick={(e) => e.stopPropagation()}>
              {results.map((user) => (
                <Link to={`/user/${user._id}`}>
                  <li
                    onClick={setSearchContainer}
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
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
