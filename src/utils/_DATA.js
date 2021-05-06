let users = {
    sarahedo : {
        id : 'sarahedo',
        name : 'Sarah Edo',
        avatarURL : 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
        answers : {
            '8xf0y6ziyjabvozdd253nd' : 'optionOne',
            '6ni6ok3ym7mf1p33lnez' : 'optionTwo',
            'am8ehyc8byjqgar0jgpub9' : 'optionTwo',
            'loxhs1bqm25b708cmbf3g' : 'optionTwo',
        },
        questions : [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ],
    },
    tylermcginnis : {
        id : 'tylermcginnis',
        name : 'Tyler McGinnis',
        avatarURL : 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
        answers : {
            'vthrdm985a262al8qx3do' : 'optionOne',
            'xj352vofupe1dqz9emx13r' : 'optionTwo',
        },
        questions : [ 'loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do' ],
    },
    johndoe : {
        id : 'johndoe',
        name : 'John Doe',
        avatarURL : 'https://tylermcginnis.com/would-you-rather/dan.jpg',
        answers : {
            'xj352vofupe1dqz9emx13r' : 'optionOne',
            'vthrdm985a262al8qx3do' : 'optionTwo',
            '6ni6ok3ym7mf1p33lnez' : 'optionTwo',
        },
        questions : [ '6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r' ],
    },
};

let questions = {
    '8xf0y6ziyjabvozdd253nd' : {
        id : '8xf0y6ziyjabvozdd253nd',
        authorId : 'sarahedo',
        timestamp : 1467166872634,
        optionOne : {
            votes : [ 'sarahedo' ],
            text : 'have horrible short term memory',
        },
        optionTwo : {
            votes : [],
            text : 'have horrible long term memory',
        },
    },
    '6ni6ok3ym7mf1p33lnez' : {
        id : '6ni6ok3ym7mf1p33lnez',
        authorId : 'johndoe',
        timestamp : 1468479767190,
        optionOne : {
            votes : [],
            text : 'become a superhero',
        },
        optionTwo : {
            votes : [ 'johndoe', 'sarahedo' ],
            text : 'become a supervillain',
        },
    },
    'am8ehyc8byjqgar0jgpub9' : {
        id : 'am8ehyc8byjqgar0jgpub9',
        authorId : 'sarahedo',
        timestamp : 1488579767190,
        optionOne : {
            votes : [],
            text : 'be telekinetic',
        },
        optionTwo : {
            votes : [ 'sarahedo' ],
            text : 'be telepathic',
        },
    },
    'loxhs1bqm25b708cmbf3g' : {
        id : 'loxhs1bqm25b708cmbf3g',
        authorId : 'tylermcginnis',
        timestamp : 1482579767190,
        optionOne : {
            votes : [],
            text : 'be a front-end developer',
        },
        optionTwo : {
            votes : [ 'sarahedo' ],
            text : 'be a back-end developer',
        },
    },
    'vthrdm985a262al8qx3do' : {
        id : 'vthrdm985a262al8qx3do',
        authorId : 'tylermcginnis',
        timestamp : 1489579767190,
        optionOne : {
            votes : [ 'tylermcginnis' ],
            text : 'find $50 yourself',
        },
        optionTwo : {
            votes : [ 'johndoe' ],
            text : 'have your best friend find $500',
        },
    },
    'xj352vofupe1dqz9emx13r' : {
        id : 'xj352vofupe1dqz9emx13r',
        authorId : 'johndoe',
        timestamp : 1493579767190,
        optionOne : {
            votes : [ 'johndoe' ],
            text : 'write JavaScript',
        },
        optionTwo : {
            votes : [ 'tylermcginnis' ],
            text : 'write Swift',
        },
    },
};

class API {
    sFunc = 'API';

    static generateUID() {
        return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
    }

    static _getUsers() {
        return new Promise( ( res ) => {
            setTimeout( () => res( { ...users } ), 1000 );
        } );
    }

    static _getQuestions() {
        return new Promise( ( res ) => {
            setTimeout( () => res( { ...questions } ), 1000 );
        } );
    }

    static getInitialData() {
        return Promise.all( [
                                this._getUsers(),
                                this._getQuestions(),
                            ] )
                      .then( ( [ users, questions ] ) => ( {
                          users,
                          questions,
                      } ) );
    }

    static formatQuestion( { optionOneText, optionTwoText, authorId } ) {
        return {
            id : this.generateUID(),
            timestamp : Date.now(),
            authorId,
            optionOne : {
                votes : [],
                text : optionOneText,
            },
            optionTwo : {
                votes : [],
                text : optionTwoText,
            },
        };
    }

    static _saveQuestionAnswer( { authedUser : authedUserId, qid, answer } ) {
        return new Promise( ( res ) => {
            setTimeout( () => {
                users = {
                    ...users,
                    [authedUserId] : {
                        ...users[authedUserId],
                        answers : {
                            ...users[authedUserId].answers,
                            [qid] : answer,
                        },
                    },
                };

                questions = {
                    ...questions,
                    [qid] : {
                        ...questions[qid],
                        [answer] : {
                            ...questions[qid][answer],
                            votes : questions[qid][answer].votes.concat( [ authedUserId ] ),
                        },
                    },
                };

                res();
            }, 500 );
        } );
    }

    static _saveQuestion( question ) {
        let sFunc = '_saveQuestion()-->';
        const debug = false;

        debug && console.log( sFunc + 'this question', question );
        debug && console.log( sFunc + 'questions1', questions );

        return new Promise( ( res ) => {
            const authedUserId = question.authorId;
            const formattedQuestion = API.formatQuestion( question );

            debug && console.log( sFunc + 'formattedQuestion', formattedQuestion );
            debug && console.log( sFunc + 'questions is defined?', typeof ( questions ) );

            setTimeout( () => {
                const sFuncX = '_saveQuestion().setTimeout()-->';

                questions = {
                    ...questions,
                    [formattedQuestion.id] : formattedQuestion,
                };

                users = {
                    ...users,
                    [authedUserId] : {
                        ...users[authedUserId],
                        questions : users[authedUserId].questions.concat( [ formattedQuestion.id ] ),
                    },
                };
                debug && console.log( sFuncX + 'new users', users );
                debug && console.log( sFuncX + 'new questions', questions );

                res( formattedQuestion );
            }, 1 );
        } );

    };

}

export { users, questions, API };

