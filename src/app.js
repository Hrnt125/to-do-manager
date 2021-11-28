import { Component } from 'react';
import './app.css';
import Header from './components/header/header';
import LargeButton from './components/largeButton/largeButton';
import ItemsPanel from './components/itemsPanel/itemsPanel';
import EditToDo from './components/editTodo/editTodo';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalEditor: false,
      showModalConfirm: false,
      currentToDoId: -1,
      selectedToDoId: -1,
      selectedToDoText: "",
      activeItems: [],
      completedItems: []
    }
  }

  // permanent state 

  componentDidMount() {
    const savedState = localStorage.getItem('toDoManagerState');
    if (savedState) {
      this.setState(JSON.parse(savedState));
    }
  }

  updateLocalStorage = (state) => {
    localStorage.setItem('toDoManagerState', JSON.stringify(state));
  }

  // dialogs handlers

  showEditor = () => {
    this.setState({ showModalEditor: true });
  }

  hideEditor = () => {
    this.setState({ showModalEditor: false });
  };

  // not implemented confirm dialog for 'Delete' ToDo and possibly 'Complete'
  showConfirm = () => {
    this.setState({ showModalConfirm: true });
  }

  // not implemented confirm dialog for 'Delete' ToDo and possibly 'Complete'
  hideConfirm = () => {
    this.setState({ showModalConfirm: false });
  }

  addToDo = () => {
    this.setState({ selectedToDoId: -1, selectedToDoText: "" }, () => this.showEditor());
  }

  editToDo = (id, text) => {
    this.setState({ selectedToDoId: id, selectedToDoText: text }, () => this.showEditor());
  }

  // application state modifiers

  updateToDO = (id, text) => {
    const t = this;
    const s = t.state;
    t.hideEditor();
    if(id === -1) {
      t.setState(prevState => {
        return {
             ...prevState,
             currentToDoId : prevState.currentToDoId + 1,
             activeItems: [...prevState.activeItems, { id: prevState.currentToDoId + 1, text: text, complete: false }]
        }
     }, () => t.updateLocalStorage(this.state));
    }
    else {
      for (let i = 0; i < s.activeItems.length; i++) {
        if (s.activeItems[i].id === id) {
          const left = s.activeItems.slice(0, i);
          const edited =  {...s.activeItems[i], text: text};
          const right = s.activeItems.slice(i + 1, s.activeItems.length);
          t.setState({activeItems: left.concat([edited]).concat(right)},
            () => t.updateLocalStorage(this.state)
          );
        }
      }
    }
  }
  
  completeItem = (id) => {
    const t = this;
    const s = t.state;
    const targetItem = s.activeItems.filter((value) => value.id === id)[0];
    const updatedActiveItems = s.activeItems.filter((value) => value.id !== id);
    t.setState({ completedItems: [...s.completedItems, {...targetItem, complete: true }], activeItems: updatedActiveItems },
      () => t.updateLocalStorage(this.state)
    );
  }

  deleteItem = (id, isComplete) => {
    const t = this;
    const s = t.state;
    if(isComplete) {
      const updatedActiveItems = s.completedItems.filter((value) => value.id !== id);
      t.setState({ completedItems: updatedActiveItems },
        () => t.updateLocalStorage(this.state)
      );
    }
    else {
      const updatedActiveItems = s.activeItems.filter((value) => value.id !== id);
      t.setState({ activeItems: updatedActiveItems },
        () => t.updateLocalStorage(this.state)
      );
    }
  }

  render() {
    const t = this;
    const s = t.state;
    
    return (
      <div className='main-container'>
        <Header />
        <LargeButton onClick={t.addToDo}>
          Add To-Do
        </LargeButton>
      
        <ItemsPanel
          headerText={"Active To-Do Items"}
          toDoItems={s.activeItems}
          onEdit={t.editToDo}
          onComplete={t.completeItem}
          onDelete={t.deleteItem}
        />
        <ItemsPanel
          headerText={"Completed To-Do Items"}
          toDoItems={s.completedItems}
          onEdit={() => {}}
          onComplete={() => {}}
          onDelete={t.deleteItem}
        />

        <EditToDo
          show={s.showModalEditor}
          id={s.selectedToDoId}
          text={s.selectedToDoText}
          onCancel={t.hideEditor}
          onSave={t.updateToDO}
        />
      </div>
    );   
  }
}

export default App;
