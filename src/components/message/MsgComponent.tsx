import React from 'react';
import clsx from 'clsx';
import s from './Message.module.scss';
import {IMessage} from '../../other/interfaces/IMessage';

function Message({textMessage, type, id}: IMessage) {
    return (
        <div className={clsx(type == "outgoingAPIMessageReceived" ? s.container_right : s.container_left)}>
            <p className={s.message}>
                {textMessage}
            </p>
        </div>
    )
}

export default Message