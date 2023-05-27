import React, {ChangeEvent} from 'react';
import s from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const Input = ({value, onChange, placeholder}: InputProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <div className={s.input_container}>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                
            />
        </div>
    );
};

export default Input;