import { Home } from '../pages';
import { Login } from '../pages';
import { Register, Settings, UserProfile } from '../pages';
import { Loader } from './';
import { Navbar } from './';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();


  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  console.log(auth);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>

          <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
