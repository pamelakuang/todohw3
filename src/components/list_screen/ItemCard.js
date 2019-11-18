import React from 'react';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {
    
    deleteItem = () => {
        console.log("delete");
        // //event.preventDefault();
        // var item = this.props.item;
        // var todoList = this.props.todoList;
        // let index = todoList.items.indexOf(item.id);
        // let newItems = todoList.items.splice(index, 1);
        // const firestore = getFirestore();
        // firestore.collection('todoLists').doc(todoList.id).update({
        //     items: newItems,
        // })
    }

    moveUp = () => {
        const currentItem = this.props.item;
        const todoList = this.props.todoList;
        const todoItems = todoList.items;

        if (todoItems.indexOf[currentItem.id] > 0) {
            let currentIndex = todoItems.indexOf(currentItem);
            let prevIndex = todoItems.indexOf(currentItem) - 1;
            todoItems[currentIndex] = todoItems[prevIndex];
            todoItems[prevIndex] = currentItem;
            
            const firestore = getFirestore();
            firestore.collection('todoLists').doc(todoList.id).update({
                items: todoItems,
            })
        }
    }

    moveDown = () => {
        let currentItem = this.props.item;
        const todoList = this.props.todoList;
        const todoItems = todoList.items;

        if (todoItems.indexOf[currentItem.id] < (todoItems.length - 1)) {
            let currentIndex = todoItems.indexOf(currentItem);
            let nextIndex = todoItems.indexOf(currentItem) + 1;
            todoItems[currentIndex] = todoItems[nextIndex];
            todoItems[nextIndex] = currentItem;

            const firestore = getFirestore();
            firestore.collection('todoLists').doc(todoList.id).update({
                items: todoItems,
            })
        }

        
    }

    render() {
        const { item } = this.props; 
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <Button
                    floating
                    fab={{direction: 'left'}}
                    className="red"
                    large
                    >
                    {/*<Button floating icon={<i className="material-icons">add</i>} className="red"/> */ }
                    <Button floating icon={<i className="material-icons" onClick={this.moveUp}>arrow_upward</i>} className="yellow darken-1" />
                    <Button floating icon={<i className="material-icons" onClick={this.moveDown}>arrow_downward</i>} className="green" />
                    <Button floating icon={<i className="material-icons" onClick={this.deleteItem}>clear</i>} className="blue" />
                    </Button>
                    
                    <div>{item.assigned_to}</div>
                    <div>{item.due_date}</div>
                    <div>{item.completed}</div>
                </div>
            </div>
        );
    }
}
export default ItemCard;