import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';

class User extends Component {
    sFunc = 'User';

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        const { userId, users } = this.props;
        const author = users[userId];

        debug && console.log( sFunc + 'userId', userId, 'author', author );

        const totA = Object.keys( author.answers ).length;
        const totQ = author.questions.length;

        return (
            <MDBCard shadow="0" border="dark" style={{ width : '62%', margin : 'auto' }}
            >
                <MDBRow className="g-0">
                    <MDBCol md="3" style={{ verticalAlign : 'middle', margin : 'auto' }}>
                        <MDBCardImage style={{ padding : '2px' }} src={author.avatarURL} alt="..." fluid/>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCardBody style={{ textAlign : 'left' }}>
                            <MDBCardTitle>
                                <h4>{author.name}</h4>
                            </MDBCardTitle>
                            <MDBRow className="g-0">
                                <MDBCol md="10">
                                    <MDBCardText>
                                        Answered questions:
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol md="1">
                                    <MDBCardText>
                                        {totA}
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="g-0">
                                <MDBCol md="10">
                                    <MDBCardText>
                                        Created questions:
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol md="1">
                                    <MDBCardText>
                                        {totQ}
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol md="1" style={{ margin : 'auto', whiteSpace: 'nowrap' }}>
                        <MDBCard>
                            <MDBCardText>
                                <span>Score</span>
                            </MDBCardText>
                            <MDBCardText className="rounded-circle">
                                {totA + totQ}
                            </MDBCardText>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBCard>

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