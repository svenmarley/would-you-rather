import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { withRouter } from 'react-router-dom';
import { handleSaveTargetPath } from '../actions/targetPathActions';

class LeaderBoard extends Component {
    sFunc = 'LeaderBoard';

    componentDidMount() {
        const sFunc = this.sFunc + 'componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        if ( this.props.authedUser === null ) {
            debug && console.log( sFunc + 'props', this.props );

            const { dispatch } = this.props;
            dispatch( handleSaveTargetPath( this.props.location.pathname ) );

            this.props.history.push( `/login` );
        }
    }

    render() {
        const { totaledUsers, authedUser } = this.props;

        if ( authedUser === null )
            return null;

        return (
            <div>
                <ul className='user'>
                {totaledUsers.map( (u) => (
                    <li key={u.id} >
                        <User userId={u} />
                    </li>
                ))}

                </ul>
            </div>
        );
    }
}


function mapStateToProps( { questions, users, authedUser } ) {
    const sFunc = 'LeaderBoard.mapStateToProps()-->';
    const debug = false;

    if ( debug ) {
        console.log( sFunc + 'questions', questions );
        console.log( sFunc + 'users', users );
    }

    if ( authedUser === null ) {
        return { authedUser };
    }

    // sarahedo : {
    //     id : 'sarahedo',
    //     name : 'Sarah Edo',
    //     avatarURL : 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    //     answers : {
    //          '8xf0y6ziyjabvozdd253nd' : 'optionOne',
    //          '6ni6ok3ym7mf1p33lnez' : 'optionTwo',
    //          'am8ehyc8byjqgar0jgpub9' : 'optionTwo',
    //          'loxhs1bqm25b708cmbf3g' : 'optionTwo',
    //          },
    //     questions : [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ],
    // },

    let totaledUsers = Object.keys( users ).sort( ( a, b ) => {
        const totA = users[a].questions.length + Object.keys( users[a].answers ).length;
        const totB = users[b].questions.length + Object.keys( users[b].answers ).length;

        debug && console.log( sFunc + '.sort()  userA', users[a].id, 'questions', users[a].questions.length, 'answers', Object.keys( users[a].answers ).length );
        debug && console.log( sFunc + '.sort()  userB', users[b].id, 'questions', users[b].questions.length, 'answers', Object.keys( users[b].answers ).length );

        if ( totA > totB )
            return -1;
        if ( totA < totB )
            return 1;

        return 0;
    } );

    debug && console.log( sFunc + 'totaledUsers', totaledUsers );

    return {
        totaledUsers,
        users,
        authedUser,
    };
}

export default withRouter( connect( mapStateToProps )( LeaderBoard ) );