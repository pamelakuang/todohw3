import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

class ItemScreen extends Component {

    state = {
        description:'',
        assigned_to: '',
        due_date: '',
        completed: false,
        cancel: false,
    }

    cancel = () => {
        this.setState({cancel: true});
    }
    editItem = (e) => {
        const { target } = e;
        const { props } = this;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        props.editItem();
    }
    render() {
        const item = this.props.item; 
        
        if (this.state.cancel) {
            return <Redirect to={"/todoList/" + this.props.listid }/>
        }
        return (
            <div className="container white">
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input className="active" type="text" name="description" id="description" defaultValue={item ? item.description : null}/>
                </div>
                <div className="input-field">
                    <label htmlFor="assigned_to">Assigned to</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" defaultValue={item ? item.assigned_to : null}/>
                </div>
                <div className="date">
                    <label htmlFor="due_date">Due date</label>
                    <input className="active" type="date" name="due_date" id="due_date" defaultValue={item ? item.due_date : null}/>
                </div>
                <div className="checkbox">
                    <label htmlFor="due_date">Completed</label>
                    <p></p>
                    <input className="active" type="checkbox" name="completed" id="completed" defaultChecked={item ? item.completed : false}/>
                </div>
                <button id="submit" onClick={this.editItem}>Submit</button>
                <button id="cancel" onClick={this.cancel}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {listid} = ownProps.match.params;
    const {itemid} = ownProps.match.params;
    const {todoLists} = state.firestore.data;
    const todoList = todoLists ? todoLists[listid] : null;
    const item = todoList ? todoList.items[itemid] : null;

    return {
        todoList, 
        item,
        listid, 
        itemid,
        auth: state.firebase.auth,
      };
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);