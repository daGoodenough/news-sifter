import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Article from '../containers/Article';

const Main = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={(routerProps) => <Home history={routerProps.history} />}
    />
    <Route
      path="/:articleId"
      render={(routerProps) => <Article history={routerProps.history} />}
    />
  </Switch>
);

export default Main;
