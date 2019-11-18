import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { editItem } from '../../store/database/asynchHandler';

class ItemScreen extends Component {

    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed,
        cancel: false,
        submit: false,
        itemid: this.props.itemid,
        key: this.props.itemid,
    }

    cancel = () => {
        this.setState({cancel: true});
    }

    handleChange = (e) => {
        const { target } = e;
        if (target.id === "description") 
            this.setState({description: target.value});
        if (target.id === "assigned_to")
            this.setState({assigned_to: target.value});
        if (target.id === "due_date")
            this.setState({due_date: target.value});
        if (target.id === "completed"){
            if(this.state.completed===false)
                this.setState({completed:true});
            else
                this.setState({completed:false});
        }
    
    }
    itemChanges = () => {
        console.log(this.props.item);
        const { props } = this;
        this.setState({
            submit: true,
        });
        const todoItems = props.todoList.items;
        var index = todoItems.indexOf(this.props.item);
        console.log("index", index);
        const todoItem = {
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed,
            id: this.state.itemid,
            key: this.state.key,
        }
        todoItems[index] = todoItem;
        props.editItem(todoItems, props.todoList);
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
                    <input id="completed" type="checkbox" onChange={e=>this.handleChange(e)} defaultChecked={item ? item.completed : "checked"}/>
                    <span></span>
                </label>
                <div></div>
                <button id="submit" onClick={this.itemChanges}>Submit</button>
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

    for (let i = 0; i < todoList.items.length; i++) {
        if (todoList.items[i].id == itemid) {
            var item = todoList.items[i];
            item.id = itemid;
        }
    }
    console.log(item);
    todoList.id = listid;
    return {
        todoList, 
        item,
        listid, 
        itemid,
        auth: state.firebase.auth,
      };
}

const mapDispatchToProps = dispatch => ({
    editItem: (todoItem, todoList) => dispatch(editItem(todoItem, todoList)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);