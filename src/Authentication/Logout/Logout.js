import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return (
            <div>
                <Redirect to="/" />;
                {document.location.reload()}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);