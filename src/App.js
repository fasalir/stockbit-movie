import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Movies from './views/Movies';
import MovieDetail from './views/MovieDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> <Movies /> </Route>
        <Route path="/detail/:movieId"> <MovieDetail /> </Route>
      </Switch>
    </Router>
  )
}

export default App;
