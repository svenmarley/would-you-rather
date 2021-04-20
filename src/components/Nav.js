import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <nav className={'nav'}>
                <ul>
                    <li>
                        <NavLink to={'/'} exact activeClassName={'active'} >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/new'} exact activeClassName={'active'} >
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/leaders'} exact activeClassName={'active'} >
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li>
                        <NavLink to={'/login'} exact activeClassName={'active'} >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/logout'} exact activeClassName={'active'} >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {};

export default Nav;