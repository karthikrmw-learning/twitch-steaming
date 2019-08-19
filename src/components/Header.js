import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = (props) => {
    return (
        <div className="ui secondary menu">
          <Link className="active item" to="/">Streamer</Link>
          <div className="right menu">
            <Link className="item" to="/">Streams</Link>
            <GoogleAuth
                login={props.login}
                onLoginStatusUpdate={props.onLoginStatusUpdate}
                onUserDetailUpdate={props.onUserDetailUpdate}
                />
          </div>
        </div>
    );
}

export default Header;
