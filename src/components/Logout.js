import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUserObjLogOut } from '../actions/authedUserActions';

class Logout extends Component {
    sFunc = 'Logout';

    componentDidMount() {
        this.props.dispatch( setAuthedUserObjLogOut() )
    }

    render() {
        //const sFunc = this.sFunc + '.render()-->';
        //const debug = true;

        return (
            <div >
                Logged Out
            </div>
        );
    }
}


export default connect()(Logout);
