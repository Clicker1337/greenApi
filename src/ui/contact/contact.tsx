import s from './contact.module.scss'

interface ContactProps {
    contact: string;
}

const Contact = ({contact}: ContactProps) => {
    return <>
        <div className={s.contact}>
            {contact}
        </div>
    </>
}

export default Contact