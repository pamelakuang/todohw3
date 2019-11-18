import React from 'react';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {
    
    deleteItem = (e) => {
        e.preventDefault();
        var item = this.props.item;
        var todoList = this.props.todoList;
        let index = todoList.items.indexOf(item);
        let newItems = todoList.items;
        newItems.splice(index, 1);
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(todoList.id).update({
            items: newItems,
        })
    }

    moveUp = (e) => {
        console.log("move up");
        e.preventDefault();
        const currentItem = this.props.item;
        const todoList = this.props.todoList;
        const todoItems = todoList.items;

        if (todoItems.indexOf(currentItem) > 0) {
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

    moveDown = (e) => {
        e.preventDefault();
        let currentItem = this.props.item;
        const todoList = this.props.todoList;
        const todoItems = todoList.items;

        if (todoItems.indexOf(currentItem) < (todoItems.length - 1)) {
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
    stopBubble(e){
        e.preventDefault();
    }

    render() {
        const { item } = this.props; 
        const { todoList } = this.props;
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
                    { (todoList.items.indexOf(item)=== 0) ? 
                        <Button floating icon={<i className="material-icons grey" onClick={e=> this.stopBubble(e)}>arrow_upward</i>} className="yellow darken-1" /> :
                        <Button floating icon={<i className="material-icons" onClick={e=> this.moveUp(e)}>arrow_upward</i>} className="yellow darken-1" />

                    }
                    { (todoList.items.indexOf(item) === todoList.items.length-1) ?
                        <Button floating icon={<i className="material-icons grey" onClick={e => this.stopBubble(e)}>arrow_downward</i>} className="green" /> : 
                        <Button floating icon={<i className="material-icons" onClick={e => this.moveDown(e)}>arrow_downward</i>} className="green" />

                    }
                    <Button floating icon={<i className="material-icons" onClick={e => this.deleteItem(e)}>clear</i>} className="blue" />
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