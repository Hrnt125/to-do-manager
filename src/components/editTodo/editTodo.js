import { Component } from 'react';
import PropTypes from 'prop-types';
import './editTodo.css'

class EditToDo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: props.text
        }
    }

    // this is not the best implementation,
    // but I found that I need use this aproach a little late,
    // better implementation would be move control to parent component
    componentWillReceiveProps(nextProps) {
        const t = this;
        const s = t.state;
        if (nextProps.text !== s.text) {
          t.setState({
            text: nextProps.text
          });
        }
      }

    handleChange = (event) => {
        const t = this;
        t.setState({ text: event.target.value });
    }

    save = (id, text) => {
        const t = this;
        const p = t.props;
        t.setState({ text: ""});
        p.onSave(id, text);
    }

    cancel = () => {
        const t = this;
        const p = t.props;
        t.setState({ text: ""});
        p.onCancel();
    }

    render() {
        const t = this;
        const p = t.props;
        const s = t.state
        const showHideClass = p.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClass}>
                <section className="modal-main">
                    <div className="edit-todo-input-container">
                        <textarea
                            className="edit-todo-input"
                            name="toDo"
                            cols="40"
                            rows="5"
                            value={s.text}
                            onChange={t.handleChange}
                        />
                    </div>
                    <div className="edit-todo-controls-container">
                        <button
                            className="save-button"
                            type="button"
                            onClick={() => t.save(p.id, s.text)}
                        >
                            Save
                        </button>   
                        <button
                            className="cancel-button"
                            type="button"
                            onClick={() => t.cancel()}
                        >
                            Cancel
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

EditToDo.propTypes = {
    show: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave:PropTypes.func.isRequired
};

export default EditToDo;