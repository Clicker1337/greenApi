import {observer} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {Context} from '../../main';
import ResponseSection from '../../ui/button/ResponseSection';
import Input from '../../ui/Input/Input';
import s from './Auth.module.scss';

const Auth = () => {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const {user} = useContext(Context);

    const ButtonFunc = () => {
        user.setApiToken(token);
        user.setAuth();
        user.setIdInstance(id);
        console.log(user.isAuth)
    }

    return (
        <div className={s.Auth}>
            <h1>Добро пожаловать</h1>
            <Input onChange={setToken} value={token} placeholder="Введите ваш ApiToken" />
            <Input onChange={setId} value={id} placeholder="Введите ваш idInstance" />
            <ResponseSection text='Отправить' callback={ButtonFunc} />
        </div>
    )
}

export default observer(Auth);