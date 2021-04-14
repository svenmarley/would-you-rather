
import { users, questions } from './_DATA'

export default class API {

    static generateUID() {
        return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
    }

    static _getUsers() {
        return new Promise( ( res, rej ) => {
            setTimeout( () => res( { ...users } ), 1000 );
        } );
    }

    static _getQuestions() {
        return new Promise( ( res, rej ) => {
            setTimeout( () => res( { ...questions } ), 1000 );
        } );
    }

    static getInitialData() {
        return Promise.all([
                               this._getUsers(),
                               this._getQuestions(),
                           ]).then(([users, questions]) => ({
            users,
            questions,
        }));
    }



    static formatQuestion( { optionOneText, optionTwoText, author } ) {
        return {
            id : this.generateUID(),
            timestamp : Date.now(),
            author,
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

    static _saveQuestion( question ) {
        return new Promise( ( res, rej ) => {
            const authedUserId = question.authorId;
            const formattedQuestion = this.formatQuestion( question );

            setTimeout( () => {
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

                res( formattedQuestion );
            }, 1000 );
        } );
    }

    static _saveQuestionAnswer( { authedUser : authedUserId, qid, answer } ) {
        return new Promise( ( res, rej ) => {
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
}
