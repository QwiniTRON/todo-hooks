import React, {useCallback, useRef, useState} from 'react'

import s from './Input.module.css'

export default function Input(props) {
    const [correct, setCorrect] = useState(true)
    const $input = useRef()

    const submitHandle = useCallback((event) => {
        event.preventDefault()

        let value = $input.current.value.trim()
        if(value.length > 3){
            $input.current.value = ''

            props.onCreateHandle(value)
            setCorrect(true)
        }else {
            setCorrect(false)
        }
    }, [])

    return (
        <div>
            <form onSubmit={submitHandle}>
                <input ref={$input} placeholder="Введите todo" className={s.input + ' ' + (correct? '' : s.uncorrect)} type="text" />
            </form>
        </div>
    );
}