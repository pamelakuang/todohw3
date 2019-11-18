import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { editName } from '../../store/database/asynchHandler';
import { editOwner } from '../../store/database/asynchHandler';
import {getFirestore} from 'redux-firestore'


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        sortingCriteria: null,
    }

    handleChange = (e) => {
        const { target } = e;
        const { props } = this;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        
        if (target.id === "name") {
            this.props.todoList.name = target.value;
            props.editName(this.props.todoList, this.props.todoList.name);
        }
        if (target.id === "owner") {
            this.props.todoList.owner = target.value;
            props.editOwner(this.props.todoList, this.props.todoList.owner);
        }
    }

    sortByTask = () => {
        if (this.state.sortingCriteria === "sort_by_task_increasing") {
            this.sortTasks("sort_by_task_decreasing");
        }
        else {
            this.sortTasks("sort_by_task_increasing");
        }
    }

    sortByDuedate = () => {
        if (this.state.sortingCriteria === "sort_by_due_date_increasing") 
            this.sortTasks("sort_by_due_date_decreasing");
        else 
            this.sortTasks("sort_by_due_date_increasing");
    }

    sortByStatus = () => {
        if (this.state.sortingCriteria === "sort_by_status_increasing")
            this.sortTasks("sort_by_status_decreasing");
        else 
            this.sortTasks("sort_by_status_increasing");
    }

    sortTasks = (criteria) => {
        this.state.sortingCriteria = criteria;
        for (let i = 0; i < this.props.todoList.items.length; i++) {
            console.log(this.props.todoList.items[i].id);
            console.log(this.props.todoList.items[i].key);
        }
        this.props.todoList.items.sort(this.compare);
        for (let i = 0; i < this.props.todoList.items.length; i++) {
            console.log(this.props.todoList.items[i].id);
            console.log(this.props.todoList.items[i].key);
        }
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({ 
            items: this.props.todoList.items,
        })
    }

    compare = (item1, item2) => {
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.state.sortingCriteria==="sort_by_task_decreasing"
            || this.state.sortingCriteria==="sort_by_status_decreasing"
            || this.state.sortingCriteria==="sort_by_due_date_decreasing") {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.state.sortingCriteria==="sort_by_task_increasing"
            || this.state.sortingCriteria==="sort_by_task_decreasing") {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.state.sortingCriteria==="sort_by_due_date_increasing"
        || this.state.sortingCriteria==="sort_by_due_date_decreasing") {
            console.log(item1.due_date < item2.due_date);
            if (item1.due_date < item2.due_date)
                return -1;
            else if (item1.due_date > item2.due_date)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
       }
    

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        
        console.log(this.props.todoList.items);
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!todoList) {
            return <React.Fragment/>
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                
                <div onClick={this.sortByTask}>Task</div>
                <div onClick={this.sortByDuedate}>Due Date</div>
                <div onClick={this.sortByStatus}>Status</div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;

  if(todoList)
    todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
}

const mapDispatchToProps = dispatch => ({
    editName: (todoList, newName) => dispatch(editName(todoList, newName)),
    editOwner: (todoList, newOwner) => dispatch(editOwner(todoList, newOwner)),
  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);