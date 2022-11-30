import { Switch, Route } from 'react-router-dom';
import Saved from './Saved';
import Home from './Home';
import Article from '../containers/Article';
import History from './History';

const Main = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/article/:articleId" render={() => <Article />} />
    <Route path="/saved" render={() => <Saved />} />
    <Route path="/history" render={() => <History />} />
  </Switch>
);

export default Main;
