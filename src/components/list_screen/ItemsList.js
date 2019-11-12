import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';

class ItemsList extends React.Component {

    state = {
        addItem: false,
    }
    addItem = () => {
        this.setState({addItem: true});
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);

        if (this.state.addItem) {
            return (
                <Redirect to={'/list/' + todoList.id + '/item/' + this.props.todoList.items.length}></Redirect>
            );
        }
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/list/' + todoList.id + '/item/' + item.id}>
                        {/*<Link to={'/item/' + item.id}>*/}
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );})
                }
                <button id="add_item_button" onClick={this.addItem}>Add Item</button>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);