import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './components/Scss/style.css';
import Login from './components/Login/Login';
import AdminPage from './components/Admin/Admi';
 import Graph from './components/Graph/Graph';
 import ChambreCulture from './components/ChambreCulture/ChambreCulture';
 import ChambreCultureAdd from './components/ChambreCulture/ChambreCultureAdd';
 import ChambreCulturePut from './components/ChambreCulture/ChambreCulturePut';
import Suivi from './components/Suivi/Suivi';
import SuiviPut from './components/Suivi/SuiviPut';
import SuiviAdd from './components/Suivi/SuiviAdd';
import SuiviDel from './components/Suivi/SuiviDel';
import Plante from './components/Plante/Plante';
import PlanteAdd from './components/Plante/PlanteAdd';
import Dashboard from './components/Dashboard/Dashboard'; 
import Admin from './components/Admin/Admin';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      redirectToAdminPage: false,
    };
  }

  // fonction pour mettre à jour isLogged et redirectToAdminPage dans le state de App.js,
  // cette fonction est passée en props au composant LoginPage pour que ce même composant puisse déclencher cette fonction
  updateLogin = () => {
    this.setState({
      isLogged: true,
      redirectToAdminPage: true
    });

  };

  render() {
    const { isLogged, redirectToAdminPage } = this.state;
    return (
      <>
        {redirectToAdminPage && <Redirect to="/admin" />}
        <Switch>
       
        <Route exact path="/add" component={Admin} />
        <Route exact path="/suivi" component={Suivi} />
        <Route exact path="/suiviput" component={SuiviPut} />
        <Route exact path="/suiviadd" component={SuiviAdd} /> 
        <Route exact path="/suividel" component={SuiviDel} /> 
        <Route exact path="/" component={Dashboard} /> 
        <Route exact path="/graph" component={Graph} />
        {/* <Route exact path="/admi" component={Admi} /> */}
        <Route exact path="/sui" component={Sui} /> 
        <Route exact path="/recolte" component={Recolte} /> 
        <Route exact path="/configuration" component={Configuration} />
        <Route exact path="/chambre" component={ChambreCulture} />
        <Route exact path="/chambreadd" component={ChambreCultureAdd} />
        <Route exact path="/chambreput" component={ChambreCulturePut} />
         <Route exact path="/automatisationadd" component={AutomatisationAdd} />
         <Route exact path="/automatisation" component={Automatisation} />
        <Route exact path="/plante" component={Plante} /> 
          <Route exact path="/plante" component={Plante} /> 
          <Route exact path="/planteadd" component={PlanteAdd} /> 
          {/* <Route path="/admin" component={AdminPage} />*/}
           <Route exact path="/login" component={() => <Login updateFunction={this.updateLogin} />} />
         {isLogged ? <Route exact path="/admin" component={AdminPage} /> : <Redirect to="/" />}  
          
        </Switch>
      </>
    )
  }
}

export default App;
