import React from 'react';
import PropTypes from 'prop-types';
import './largeButton.css'

function LargeButton(props) {
    return (
        <button
            onClick={props.onClick}
            className="large-button"
            type="button"
        >
            {props.children}
        </button>
    );
}

LargeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default LargeButton;