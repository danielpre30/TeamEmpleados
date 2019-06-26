import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Employees from './pages/Employees';
import EmployeesDetail from './pages/EmployeesDetail';
import Prizes from './pages/Prizes';
import PrizesDetail from './pages/PrizesDetail';
import Achievements from './pages/Achievements';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar'
import './App.css'

function App() {
  return (
    <HashRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/"
          render={() => (
            <Redirect to="/employees" />
          )}
        />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/employees/:id" component={EmployeesDetail} />
        <Route exact path="/prizes" component={Prizes}/>
        <Route exact path="/prizes/:id" component={PrizesDetail} />
        <Route exact path="/achievements" component={Achievements} />
        <Route component={NotFound}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
