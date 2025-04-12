'use client';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Option, SelectProps } from './types';

import styles from './Select.module.css';

const animatedComponents = makeAnimated();

export default function BaseSelect({ label, options, value, onChange, multi = false, placeholder }: SelectProps) {
    const selected = multi
        ? options.filter((opt) => (value as string[]).includes(opt.value))
        : options.find((opt) => opt.value === value);

    const handleChange = (selectedOption: any) => {
        if (multi) {
            onChange(selectedOption ? selectedOption.map((opt: Option) => opt.value) : []);
        } else {
            console.log('selectedOption', selectedOption)
            onChange(selectedOption?.value || '');
        }
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <Select
                isMulti={multi}
                options={options}
                value={selected}
                onChange={handleChange}
                components={animatedComponents}
                placeholder={placeholder}
                classNamePrefix="select"
                styles={{
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--background-primary-color)',
                        color: 'var(--color-white)',
                        borderRadius: '0px',
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        color: 'var(--color-white)',
                        backgroundColor: state.isFocused ? 'var(--background-accent-color)' : 'var(--background-primary-color)',
                        borderBottom: '1px solid var(--background-primary-color)',
                        borderTop: '1px solid var(--background-primary-color)',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: 'var(--color-white)',
                        backgroundColor: 'var(--background-primary-color)',
                    }),
                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: 'var(--color-white)',
                        backgroundColor: 'var(--background-primary-color)',
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        borderColor: state.isFocused ? 'var(--color-white)' : provided.borderColor,
                        boxShadow: state.isFocused ? '0 0 0 1px var(--color-white)' : provided.boxShadow,
                        backgroundColor: 'var(--background-primary-color)',
                        '&:hover': {
                            borderColor: 'var(--color-white)',
                        },
                    }),
                }}
            />
        </div>
    );
}
