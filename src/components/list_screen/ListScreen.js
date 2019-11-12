import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { editName } from '../../store/database/asynchHandler';
import { editOwner } from '../../store/database/asynchHandler';


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
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