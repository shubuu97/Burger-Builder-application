import React, { Component } from 'react';
import classes from './Login.css';
import {connect} from 'react-redux';
import * as actions from '../Store/Actions/index';
import Spinner from '../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class loginForm extends Component {
    state = {
        email: '',
        password: '',
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
     
    onEmailChangeHandler = (event) => {
        let updatedEmail = {
            ...this.state.email
        }
        updatedEmail = event.target.value
        this.setState({ email: updatedEmail })
    }

    onPasswordChangedHandler = (event) => {
        let updatedPassword = {
            ...this.state.password
        }
        updatedPassword = event.target.value
        this.setState({ password: updatedPassword })
    }

    formSubmitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)
    }

    switchSignUpHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        let buttons = (
            <tr>
                <td>
                    <button className="btn btn-dark">{this.state.isSignUp ? 'Sign Up' : 'Login'}</button>
                </td>
            
                <td>
                    <button className="btn btn-light" onClick={(event) => this.switchSignUpHandler(event)}>Switch to {this.state.isSignUp ? 'Login' : 'Sign up'}</button>
                </td>
            </tr>
        )

        if(this.props.loading) {
            buttons = <Spinner />
        }

        let errorMessage = null;

        let authenticated = null;

        if(this.props.isAuthenticated) {
            authenticated = <Redirect to={this.props.authRedirectPath} />
        }

        if(this.props.error) {
            errorMessage = (
                <p style={{color: 'red', fontSize: '1.5em'}}>{this.props.error.message}</p>
            );
        }
        return (
        <div>
         {authenticated}
         <div className={classes.flexContainer}>
            <div className={classes.LoginForm}>
              <form onSubmit={(event) => this.formSubmitHandler(event)}>
                 <table className={classes.TableStyle}>
                     <tbody>
                        <tr>
                            <td colspan="2" style={{textAlign: 'center'}}>
                                {errorMessage}
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <input type="email" value={this.state.email} onChange={(event) => this.onEmailChangeHandler(event)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                <input type="password" value={this.state.password} onChange={(event) => this.onPasswordChangedHandler(event)} />
                            </td>
                        </tr>
                        {buttons}
                     </tbody>
                </table>
            </form>
             </div>
         </div>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))         
    }
};

const mapStateToProps = state => {
    return {
     loading: state.auth.loading,
     error: state.auth.error,
     isAuthenticated: state.auth.idToken !== null,
     building: state.burgerBuilder.building,
     authRedirectPath: state.auth.authRedirectPath
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);