import React from 'react'

import Item from '../Item/Item.jsx'

export default function List({items, onItemEdit, editableHandle, onDoneHandle, onDeleteHandle}) {
    const itemsTemplate = items.map((item) => {
        return (
            <Item 
            onEditHandle={onItemEdit} 
            key={item.id} 
            item={item} 
            onEditableHandle={editableHandle}
            onDoneHandle={onDoneHandle}
            onDeleteHandle={onDeleteHandle} />
        );
    })

    return (
        <div className="list">
            {itemsTemplate.length? itemsTemplate : (<p>Пока ничего нет...</p>)}
        </div>
    );
}