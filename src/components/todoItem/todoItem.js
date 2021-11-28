import React from 'react';
import PropTypes from 'prop-types';
import './todoItem.css'

function TodoItem(props) {
    return(
        <div className="todo-item-container">
            <div className="todo-item-input-container">
                {props.text}
            </div>
            <div className="todo-item-controls-container">
                <button
                    type="button"
                    className="todo-item-button"
                    onClick={() => {props.onEdit(props.id, props.text)}}
                    hidden={props.complete}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="todo-item-button"
                    onClick={() => {props.onComplete(props.id)}}
                    hidden={props.complete}
                >
                    Complete
                </button>
                <button
                    type="button"
                    className="todo-item-button float-right"
                    onClick={() => {props.onDelete(props.id, props.complete)}}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TodoItem;