import {SyntheticEvent} from 'react';

import s from './ResponseSection.module.scss';

interface IResponseSection {
    callback: (e: SyntheticEvent) => void;
    text: string;
}

function ResponseSection(props: IResponseSection) {
    return (
        <button
            className={s.button}
            onClick={props.callback}
        >
            {props.text}
        </button>
    );
}

export default ResponseSection;