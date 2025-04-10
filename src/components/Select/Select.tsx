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
                    option: (provided, state) => ({
                      ...provided,
                      color: 'black',
                      backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                    multiValueLabel: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
            />
        </div>
    );
}
