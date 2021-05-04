import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
    sFunc = 'User';

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = true;

        const { userId, users } = this.props;
        const author = users[userId];

        debug && console.log( sFunc + 'userId', userId, 'author', author );

        const totA = Object.keys( author.answers ).length;
        const totQ = author.questions.length;

        return (
            <div className="user-box">
                <div className="question-avatar">
                    <img
                        src={author.avatarURL}
                        width="90"
                        alt={'Image of ' + author.name}
                    />
                </div>
                <div className="user-summary-details">
                    <h2>{author.name}</h2>
                    <div>
                        <div>
                            <div className="user-totals">
                                Answered questions:
                            </div>
                            <div className="user-totals2">
                                {totA}
                            </div>
                        </div>
                        <div style={{ borderBottom : '1px solid gray' }}>
                            <div className="user-totals">
                                Created questions:
                            </div>
                            <div className="user-totals2">
                                {totQ}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-score-box">
                    <div className="user-score-text">
                        Score
                    </div>
                    <div className="user-score-circle-box">
                        <div className="user-score-circle">
                            {totA + totQ}
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

User.propTypes = {
    userId : PropTypes.string.isRequired,
};

function mapStateToProps( { users } ) {

    return ( {
        users,
    } );
}

export default connect( mapStateToProps )( User );