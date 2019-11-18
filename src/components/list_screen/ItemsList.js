import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';
import { add } from '../../store/database/asynchHandler';
import {Button} from 'react-materialize'

class ItemsList extends React.Component {

    state = {
        addItem: false,
    }
    addItem = () => {
        const { props } = this;
        const newItem = {
            description: "Unknown",
            assigned_to: "Unknown",
            due_date: "",
            completed: false,
            id: this.props.todoList.items.length,
            key: this.props.todoList.items.length,
        }
        props.todoList.items.push(newItem);
        props.add(props.todoList);
        this.setState({addItem: true});
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);

        if (this.state.addItem) {
            return (
                <Redirect to={'/addItemScreen/list/' + todoList.id + '/item/' + (items.length-1)}></Redirect>
            );
        }
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/list/' + todoList.id + '/item/' + item.id}>
                            <ItemCard todoList={todoList} item={item}/>
                        </Link>
                    );})
                }
                <div className="add_button">
                    <Button floating icon={<i className="material-icons" onClick={this.addItem}>add</i>} className="blue darken-1"></Button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    add: (todoList) => dispatch(add(todoList)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);