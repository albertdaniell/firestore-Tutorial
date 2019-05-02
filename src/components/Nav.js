import React, {Component} from 'react';
// import firebase from 'firebase'
import { Link } from 'react-router-dom';




class NavApp extends Component {

    componentDidMount() {
        
    }

   render(){
       return(
           <div>

           <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
    <Link className="navbar-brand" to="/">Website Name</Link>
    
    </div>
    <ul className="nav navbar-nav">
    <li><Link to="/">App Home</Link></li>
      <li><Link to="/create">Add User</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/create">Add Board</Link></li>
    </ul>
  </div>
</nav>
           </div>
       )
   }
}

export default NavApp;
