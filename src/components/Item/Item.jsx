import React, { useState, useCallback, useEffect } from 'react'

import s from './Item.module.css'

export default function Item({ item, onEditHandle, onEditableHandle, onDoneHandle, onDeleteHandle }) {
    const { text, done, isEdit, id } = item
    const [value, setValue] = useState(text)

    useEffect(() => {
        setValue(text)
    }, [isEdit])

    const changeHandler = useCallback((event) => {
        setValue(event.target.value)
    }, [])

    const submitHandle = useCallback((event) => {
        event.preventDefault()

        let currentValue = value.trim()
        if (currentValue.length > 3) {
            onEditHandle(id, currentValue)
        }
    }, [value])

    const editableHandle = useCallback((event) => {
        if (!isEdit) {
            onEditableHandle(id)
        } else {
            let currentValue = value.trim()
            if (currentValue.length > 3) {
                onEditHandle(id, currentValue)
            }
        }
    }, [isEdit, value])

    const doneHandle = useCallback((event) => {
        onDoneHandle(id)
    }, [])

    const deleteHandle = useCallback((event) => {
        onDeleteHandle(id)
    }, [])

    const editTemplate = (<input
        className={value.trim().length > 3 ? '' : s.uncorrect}
        onChange={changeHandler}
        value={value}
        type="text" />);
    const textTemplate = (<span className={`${s.text} ${done && 'lineed' || ''}`}>{text}</span>)
    const deleteTemplate = (<span onClick={deleteHandle} className={s.delete}> &times;</span>)
    const editableTemplate = (<span className={s.edit} onClick={editableHandle}> " </span>)

    return (
        <div className={s.item}>
            <form onSubmit={submitHandle}>
                <label><input
                    onChange={doneHandle}
                    checked={done}
                    type="checkbox" />
                    <span className={s.flag}></span>
                </label>
                {isEdit && editTemplate || textTemplate}
                {done && deleteTemplate}
                {!done && editableTemplate}
            </form>
        </div>
    );
}
