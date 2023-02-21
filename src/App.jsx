// import logo from './logo.svg';
import './App.css';
import Addfood from './components/Addfood';
import Fooddetails from './components/Fooddetails';
import Home from './components/Home';
import Navbar from './components/Navbar';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Searchfood from './components/Searchfood';
import Updatefood from './components/Updatefood';
import Orders from './components/Orders ';

 
function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Navbar/>
          <Switch>
              <Route exact path="/">
                  <Home/>
              </Route>

              <Route path="/addfood">
                  <Addfood/>
              </Route>

              <Route path="/fooddetails:id">
                  <Fooddetails/>
              </Route>
              <Route path="/search:searchKey">
                    <Searchfood/>
              </Route>

              <Route path="/updatefood:id">
                  <Updatefood/>
              </Route>
              <Route path="/orders">
                <Orders/>
              </Route>

          </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
