import React, { Component } from 'react';
import './FrontPageInfo.css';
import FrontForms from '../frontForms/FrontForms.js';

class FrontPageInfo extends Component {
  
  render() {
    return (

    <div className="card-section">
      <div className="container">
          <div className="card-block bg-white mb30">
             <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="section-title mb-0">
                        <h2>Witaj na stronie miłośników gokartów!</h2>
                        <p>Nasz portal został stworzony z myślą o wszystkich gokartowcach</p>
                    </div>
                </div>
             </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                   <div className="cotn_principal">
                       <FrontForms/>
                   </div>
                </div>
            </div>
         </div>
       </div>
    </div>

    );
  }
}

export default FrontPageInfo;