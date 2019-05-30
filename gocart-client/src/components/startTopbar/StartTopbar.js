import React, { Component } from 'react';
import './StartTopbar.css';

class StartTopBar extends Component {
    
  render() {
    return (

      <div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <a href="/">
                    <div className="page-caption"> </div>
                  </a>
                </div>
            </div>
        </div>
      </div>

    );
  }
}

export default StartTopBar;
