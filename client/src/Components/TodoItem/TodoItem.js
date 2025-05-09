import React from 'react';
import styles from './TodoItem.module.css'
import { format } from 'date-fns';

const TodoItem = (props) => {
    const {item: {body,deadline,status}} = props;
    return (
        <li>
            <div className={styles['flex-conteiner']}>
           <span>{body}</span> 
           <span>{format(new Date(deadline),'yyyy-MM-dd')}</span>
           <span>{status}</span>
            </div>
        </li>
    );
}

export default TodoItem;
