import React from 'react';
import './App.css';
import AppBaari from './components/AppBaari';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import {amber, lightBlue, brown} from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: { primary: {main: lightBlue[500], contrastText: '#FFFFFF'},
  secondary: {main: amber[300], contrastText: lightBlue[50]},
  text: {primary: brown[800], secondary: brown[50 ] }, 
  },  
  typography: {fontFamily: ['Poppins', 'Sans Serif']}
});

function App() {

  return (
    <BrowserRouter>
    <MuiThemeProvider theme= { theme }>
    <div>
      <CssBaseline/>
      <AppBaari />
        <Switch>
        <Route path ='/treenilista' component={Traininglist} />
        <Route path='/asiakaslista' component={Customerlist} />
      </Switch>
    </div>
  </MuiThemeProvider>
  </BrowserRouter>
  );
}

export default App;
