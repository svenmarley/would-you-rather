import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOBALS } from '../actions/shared';

class DashboardTab extends Component {
    render() {
        const { currSelected, thisTab, handler } = this.props;

        return (
            <span
                id={thisTab}
                className={thisTab === currSelected
                    ? 'tab-active'
                    : 'tab-inactive'}
                onClick={handler}
            >
                {thisTab === GLOBALS.TABS.UNANSWERED
                    ? 'Unanswered Questions'
                    : 'Answered Questions'
                }
            </span>
        );
    }
}

DashboardTab.propTypes = {
    currSelected : PropTypes.string.isRequired,
    thisTab : PropTypes.string.isRequired,
    handler : PropTypes.func.isRequired,
};

export default DashboardTab;