import React from 'react';
import PropTypes from 'prop-types';
import './itemsPanel.css'
import TodoItem from '../todoItem/todoItem';


function ItemsPanel(props) {
    return (
        <div className='items-panel-container'> 
            <div className='items-panel-header'>
                {props.headerText}
            </div>
            <div>
                {props.toDoItems.map((item => <TodoItem
                                                key={item.id}
                                                id={item.id}
                                                text={item.text}
                                                complete={item.complete}
                                                onEdit={props.onEdit}
                                                onComplete={props.onComplete}
                                                onDelete={props.onDelete}
                                              />
                ))}
            </div>
        </div>
    );
}

ItemsPanel.propTypes = {
    headerText: PropTypes.string.isRequired,
    toDoItems: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ItemsPanel;