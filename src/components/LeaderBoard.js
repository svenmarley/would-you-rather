import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';

class LeaderBoard extends Component {
    render() {
        const { totaledUsers, users } = this.props;

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

LeaderBoard.propTypes = {};

function mapStateToProps( { questions, users, authedUser } ) {
    const sFunc = 'LeaderBoard.mapStateToProps()-->';
    const debug = false;

    if ( debug ) {
        console.log( sFunc + 'questions', questions );
        console.log( sFunc + 'users', users );
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

export default connect( mapStateToProps )( LeaderBoard );