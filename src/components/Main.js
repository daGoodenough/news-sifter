import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Article from '../containers/Article';

const Main = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/article/:articleId" render={() => <Article />} />
  </Switch>
);

export default Main;
