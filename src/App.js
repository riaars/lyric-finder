import React from 'react';
import './App.css';
import Navbar from './component/layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Index from './component/layout/Index';
import Lyrics from './component/tracks/Lyrics';

import {Provider} from './context';
function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
