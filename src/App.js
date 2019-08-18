import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Details from './components/cards/Details';
import { Provider } from './context';
import './App.css';

class App extends Component {
  render() {
    return (
        <Provider>
            <Router>
                <React.Fragment>
                    <Navbar />
                    <div className="container-fluid justify-content-center main-container">
                        <Switch>
                            <Route path="/" component={Index}/>
                            <Route path="/details/card/:id" component={Details}/>
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>
        </Provider>
    );
  }
}

export default App;
