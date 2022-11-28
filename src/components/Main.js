import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Article from './Article';

const Main = () => (
  <div>
    <p>Main</p>

    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/article/:articleId" render={() => <Article />} />
    </Switch>
  </div>
);

export default Main;
