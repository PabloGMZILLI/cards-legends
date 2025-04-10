// src/components/icons/DefaultIcon.tsx
'use client';

import { LucideIcon, Crown, X, User, Trash2, LucideProps, ArrowRight } from 'lucide-react';
import styles from './Icon.module.css';

type IconName = 'crown' | 'x' | 'user' | 'trash' | 'arrowRight';

interface DefaultIconProps extends LucideProps {
    name: IconName;
    title?: string;
    hasAction?: boolean;
};

const iconMap: Record<IconName, LucideIcon> = {
    crown: Crown,
    x: X,
    user: User,
    trash: Trash2,
    arrowRight: ArrowRight,
};

export default function DefaultIcon({
    name,
    size = 18,
    className = '',
    title,
    hasAction = false,
    ...props
}: DefaultIconProps) {
    const IconComponent = iconMap[name];
    const iconClass = className ? className : styles.icon 

    if (!IconComponent) {
        console.error(`Icon "${name}" not found`);
        return null;
    }

    return (
        <span className={`${styles.iconWrapper} ${hasAction ? styles.iconWithAction : '' }`} title={title}>
            <IconComponent size={size} className={iconClass} {...props} />
        </span>
    );
}
