export type Option = {
    label: string;
    value: string;
};

export type SelectProps = {
    label?: string;
    options: Option[];
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multi?: boolean;
    placeholder?: string;
};
