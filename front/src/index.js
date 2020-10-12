import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from "./components/DarkMode/ThemeContext";

ReactDOM.render(

    <BrowserRouter>
      {/* <ThemeProvider> */}
    
        <App />
        
      {/* </ThemeProvider> */}
    </BrowserRouter>

    , document.getElementById('root')
);

serviceWorker.unregister();



  
  