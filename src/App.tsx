import {observer} from 'mobx-react-lite';
import {useContext, useState} from 'react';
import s from './App.module.scss';
import Auth from './components/auth/Auth';
import {Chat} from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import {Context} from './main';

function App() {

    const {user} = useContext(Context);

    return (
        <>
            <div className='container'>
                <header className={s.header} />
                {(user.isAuth == false) && <Auth />}
                {(user.isAuth == true) && <section className={s.main}>
                    <Sidebar />
                    <Chat />
                </section>}
                <footer className={s.footer} />
            </div>
        </>
    )
}

export default observer(App)
