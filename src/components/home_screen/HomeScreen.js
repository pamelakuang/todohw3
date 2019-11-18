import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createTodoList } from '../../store/database/asynchHandler';
import { resolve } from 'url';
import {getFirestore} from 'redux-firestore'

class HomeScreen extends Component {
    
    state = {
        id: null,
    }
    handleNewList = () => {
        var date = new Date();
        const newList = {
            items: [],
            name: "Unknown",
            owner: "Unknown",
            time: date, 
        }
        const fireStore = getFirestore();
  
        fireStore.collection('todoLists').add({
        ...newList,
      })
    .then((a) => {
        this.setState({id: a.id});
    })
    .then(() => this.props.dispatch({
        type: 'CREATE_TODO_LIST',
        newList,
      })).catch(err => this.props.dispatch({
        type: 'CREATE_TODO_LIST_ERROR',
        err,
      }));
    };

    // updateTime = () => {
    //     var date = new Date();
    //     const fireStore = getFirestore();
    //     fireStore.collection('todoLists').doc('todoLists.id').update({
    //         //...todoList, 
    //         time: date,
    //     })
        
    // }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (this.state.id) {
            return (<Redirect to={"/todoList/" + this.state.id}></Redirect>);
        }
       // this.updateTime();
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        //todoLists: state.firestore.ordered.time,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => ({
    addList: (todoList) => dispatch(createTodoList(todoList)),
   // addTime: (time) => dispatch(addTime(time)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists'},// orderBy: ['time', 'desc']},
    ]),
)(HomeScreen); 