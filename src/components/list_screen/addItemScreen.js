import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom';

class addItemScreen extends Component {

    state = {
        cancel: false, 
        submit: false,
    }

    delete = () => {
        var item = this.props.item;
        var todoList = this.props.todoList;
        let index = todoList.items.indexOf(item);
        let newItems = todoList.items;
        newItems.splice(index, 1);
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(todoList.id).update({
            items: newItems,
        })

        this.setState({cancel: true});
    }

    addNewItem = () => {
        this.setState({submit: true});
        console.log("HIIIIii");
    }

    render() {
        const item = this.props.item; 

        if (this.state.cancel || this.state.submit) {
            return <Redirect to={"/todoList/" + this.props.listid }/>
        }
        return (
            <div className="container white">
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} 
                    defaultValue={item ? item.description : null}/>
                </div>
                <div className="input-field">
                    <label htmlFor="assigned_to">Assigned to</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} 
                    defaultValue={item ? item.assigned_to : null}/>
                </div>
                <div className="date">
                    <label htmlFor="due_date">Due date</label>
                    <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} 
                    defaultValue={item ? item.due_date : null}/>
                </div>
                <label>
                    <label htmlFor="completed">Completed</label>
                    <p></p>
                    <input type="checkbox" defaultChecked={item ? item.completed : "checked"}/>
                    <span></span>
                </label>
                <div></div>
                <button id="submit" onClick={this.addNewItem}>Submit</button>
                <button id="cancel" onClick={this.delete}>Cancel</button>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const {listid} = ownProps.match.params;
    const {itemid} = ownProps.match.params;
    const {todoLists} = state.firestore.data;
    const todoList = todoLists ? todoLists[listid] : null;
    for (let i = 0; i < todoList.items.length; i++) {
        if (todoList.items[i].id == itemid) {
            var item = todoList.items[i];
            item.id = itemid;
        }
    }
    todoList.id = listid;
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
)(addItemScreen);