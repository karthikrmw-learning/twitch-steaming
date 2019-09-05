import React from 'react';
import { connect } from 'react-redux';
import { signIn , signOut } from '../actions'

const googleClientId = '734114124943-c42pecvmo4gsghv99kaalu6asdttg6ll.apps.googleusercontent.com'

class GoogleAuth extends React.Component {
    componentDidMount(){
        window.gapi.load('auth2', async () => {
            try {
                await window.gapi.auth2.init({ client_id : googleClientId });
            }catch(err){
                console.log("unable to connect with google auth ", err);
                return;
            }
            this.auth = window.gapi.auth2.getAuthInstance();

            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange)
        });
    }

    onAuthChange = (loginState) => {
        if( loginState ){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onClickLogin = async () => {
        try{
            await this.auth.signIn({scope: 'profile email'});
        }catch(err){
            console.log("User did not complete login");
            return;
        }
    }

    onClickLogout = async () => {
        await this.auth.signOut();
    }

    render(){
        if ( !this.props.login  ){
            return (
                <button className="ui google plus button" onClick={this.onClickLogin}>
                    Sign with Google
                </button>
            );
        }else{
            return (
                <button className="ui button" onClick={this.onClickLogout}>
                    Logout
                </button>
            );
        }

    }
}

const mapStateToProps = function(state){
    return { login : state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn , signOut })(GoogleAuth);
