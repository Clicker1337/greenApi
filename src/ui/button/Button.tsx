import {SyntheticEvent} from 'react';

import s from './Button.module.scss';

interface IResponseSection {
    callback: (e: SyntheticEvent) => void;
    text: string;
}

function CustomButton(props: IResponseSection) {
    return (
        <button
            className={s.button}
            onClick={props.callback}
        >
            {props.text}
        </button>
    );
}

export default CustomButton;