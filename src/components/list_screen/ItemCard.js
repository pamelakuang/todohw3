import React from 'react';
import { Button, Icon } from 'react-materialize';

class ItemCard extends React.Component {
    
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
                    <Button floating icon={<Icon />} className="red"/>
                    <Button floating icon={<Icon />} className="yellow darken-1" />
                    <Button floating icon={<Icon />} className="green" />
                    <Button floating icon={<Icon />} className="blue" />
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