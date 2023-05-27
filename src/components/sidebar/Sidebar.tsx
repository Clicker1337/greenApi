import {observer} from 'mobx-react-lite';
import {useContext, useState} from 'react';
import {Context} from '../../main';
import ResponseSection from '../../ui/button/ResponseSection';
import Contact from '../../ui/contact/contact';
import Input from '../../ui/Input/Input';
import s from './Sidebar.module.scss';

function Sidebar() {
    const [contact, setContact] = useState('79029511546');

    const {user} = useContext(Context);

    const addContact = () => {
        user.setChatId(contact);
    }

    return (
        <div className={s.sidebar}>
            <div className={s.header}>
                Контакт
            </div>
            <div className={s.wrapper}>
                <Input value={contact} placeholder="Введите номер телефона" onChange={setContact} />
                <ResponseSection callback={addContact} text={'Изменить'} />
            </div>
            <div className={s.list}>
                <Contact contact={user.chatId} />
            </div>
        </div>
    )
}

export default observer(Sidebar)