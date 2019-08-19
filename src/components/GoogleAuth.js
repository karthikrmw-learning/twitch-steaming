import React from 'react';

const googleClientId = ''

class GoogleAuth extends React.Component {
    //state = { login : false };

    componentDidMount(){
        window.gapi.load('auth2', async () => {
            try {
                await window.gapi.auth2.init({ client_id : googleClientId });
            }catch(err){
                console.log("unable to connect with google auth ", err);
                return;
            }

            this.googleAuthInstance = window.gapi.auth2.getAuthInstance()
        });
    }

    listenForUserLogout = () => {
        this.googleAuthInstance.isSignedIn.listen((status) => {
            // call setLoginStateOnParent
            this.props.onLoginStatusUpdate(status);
        });
    }

    loginUserWithGoogleOAuth = async () => {
        try{
            await this.googleAuthInstance.signIn({scope: 'profile email'});
        }catch(err){
            console.log("User did not complete login");
            return;
        }
        // update login status
        this.props.onLoginStatusUpdate(this.googleAuthInstance.isSignedIn.get());

        // update user details
        var googleUser = this.googleAuthInstance.currentUser.get().getBasicProfile();
        this.props.onUserDetailUpdate({
            id      : googleUser.getId(),
            name    : googleUser.getGivenName(),
            image   : googleUser.getImageUrl(),
            email   : googleUser.getEmail()
        });
        this.listenForUserLogout();
    }

    logoutUser = async () => {
        await this.googleAuthInstance.signOut();

        // update login status
        this.props.onLoginStatusUpdate(this.googleAuthInstance.isSignedIn.get());
    }

    render(){
        if ( !this.props.login  ){
            return (
                <button className="ui google plus button" onClick={this.loginUserWithGoogleOAuth}>
                    Sign with Google
                </button>
            );
        }else{
            return (
                <button className="ui button" onClick={this.logoutUser}>
                    Logout
                </button>
            );
        }

    }
}

export default GoogleAuth;
