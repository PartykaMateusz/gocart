import React, { Component } from 'react';
import './StartPage.css';
import StartTopBar from '../startTopBar/StartTopbar.js';
import FrontPageInfo from '../frontPageInfo/FrontPageInfo.js';
import LocalStorage from 'local-storage';


function LogoutInfo(){
  if (LocalStorage.get("message") === "logout"){
    return (
      <div className="alert alert-success" role="alert">
        Wylogowano pomyślnie
      </div>
    )
    
  }
    else{
      return <div></div>
    }
}



class StartPage extends Component {
  render() {
    return (
          <div>
              <LogoutInfo />

              <StartTopBar/>
              <FrontPageInfo/>

          </div>

    );
  }
}

export default StartPage;
