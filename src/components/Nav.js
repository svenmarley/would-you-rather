import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
    sFunc = 'Nav';

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        const { authedUser, users } = this.props;

        debug && console.log( sFunc + 'authedUser', authedUser );

        let userName = '';
        if ( authedUser ) {
            userName = users[authedUser].name
        }


        return (
            <nav className={'nav'}>
                <ul>
                    <li>
                        <NavLink to={'/'} exact activeClassName={'active'}>
                            xHome
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/add'} exact activeClassName={'active'}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/leaderboard'} exact activeClassName={'active'}>
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li>
                        {authedUser === null
                            ?
                            <NavLink to={'/login'} exact activeClassName={'active'}>
                                Login
                            </NavLink>

                            :
                            null
                        }
                    </li>
                    <li>
                        <NavLink to={'/logout'} exact activeClassName={'active'}>
                            Logout
                        </NavLink>
                        {authedUser === null
                            ?
                            null
                            :
                            <span style={{fontSize: 'small'}}><br />Logged in as: {userName}</span>
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {};

function mapStateToProps( { authedUser, users } ) {
    return { authedUser, users };
}

export default connect( mapStateToProps )( Nav );