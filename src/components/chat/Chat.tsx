import {useContext, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {observer} from "mobx-react-lite"
import {ISendMessage} from '../../services/GreenApi';

import messages from '../../store/messages';
import CustomButton from '../../ui/button/Button';
import Input from '../../ui/Input/Input';
import MsgWrapper from '../msgWrapper/MsgWrapper';
import s from './Chat.module.scss';
import {Context} from '../../main';


export const Chat = observer(() => {
    const queryClient = useQueryClient();
    const {user} = useContext(Context);
    const [message, setMessage] = useState<string>('');

    const mutation = useMutation((newMessage: ISendMessage) => user.fetchSendMessage(newMessage));

    const {data: notification} = useQuery(['notification'], () => user.fetchGetNotification(), {
        onSuccess: () => {
            if (notification?.body.messageData) {
                if (user.chatId == notification.body.chatId || notification.body.senderData.chatId) {
                    const type = (notification.body.typeWebhook);
                    const id = (notification.body.timestamp);
                    const text1 = (notification.body.messageData?.extendedTextMessageData?.text);
                    const text2 = (notification.body.messageData?.textMessageData?.textMessage);
                    const text = (text1 ? text1 : text2)
                    const newMessage = {textMessage: text, type: type, id: id};
                    if (text1 || text2) {
                        messages.addMessage(newMessage);
                    }
                }
                
            }
        },
        refetchInterval: 1000
    },);

    const OnChange = (arg: string) => {
        setMessage(arg);
    }

    const Button = () => {
        mutation.mutate({message});
        queryClient.invalidateQueries(['notification']);

        setMessage('');
    }

    const  Exit = () => {
        user.setAuth();
    }

    return (
        <div className={s.chat}>
            <div className={s.chat__header}>
                <p>Твой токен: {user.apiTokenInstance}</p>
                твой айди: {user.idInstance}
                <CustomButton text='Выйти' callback={Exit} />
            </div>
            <div className={s.chat__history}>
                {
                    messages.messages &&
                    <div>
                        {messages.messages.map((item, key) => (
                            <div key={key}>
                                <MsgWrapper textMessage={item.textMessage} type={item.type} id={item.id} />
                            </div>
                        ))}
                    </div>

                }
            </div>
            <div className={s.chat__input}>
                <Input value={message} onChange={(arg) => OnChange(arg)} placeholder='Отправьте сообщение...' />
                <CustomButton text='ОТПРАВИТЬ' callback={Button} />
            </div>
        </div>
    )
})