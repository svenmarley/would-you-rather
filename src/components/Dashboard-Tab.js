import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOBALS } from '../actions/shared';

class DashboardTab extends Component {
    render() {
        const { currSelected, thisOne, handler } = this.props;

        return (
            <span
                id={thisOne}
                className={thisOne === currSelected
                    ? 'tab-active'
                    : 'tab-inactive'}
                onClick={handler}
            >
                {thisOne === GLOBALS.TABS.UNANSWERED
                    ? 'Unanswered Questions'
                    : 'Answered Questions'
                }
            </span>
        );
    }
}

DashboardTab.propTypes = {
    currSelected : PropTypes.string.isRequired,
    thisOne : PropTypes.string.isRequired,
    handler : PropTypes.func.isRequired,
};

export default DashboardTab;