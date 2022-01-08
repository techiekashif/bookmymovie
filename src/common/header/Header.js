import React from 'react';
import './Header.css';
import logoUrl from '../../assets/logo.svg';
import { Component } from 'react';
import Button from "@material-ui/core/Button";

class Header extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false
    }

  }

  render(){
    return(
      <div>
        <header className='header'>
          <img src={logoUrl} className='header-logo' alt='logo'/>
          {!this.state.loggedIn ?
           <div className='login-button'>
             <Button variant='contained' color='default'>Login</Button>
           </div>
           :
           <div className='login-button'>
             <Button variant='contained' color='default'>Logout</Button>
           </div>
          }
        </header>

      </div>
    )
  }

}

export default Header;