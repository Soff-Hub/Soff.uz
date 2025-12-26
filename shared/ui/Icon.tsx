import React from 'react';
import type { IconType, IconBaseProps } from 'react-icons';

type IconProps = {
    icon: IconType;
} & IconBaseProps;

function Icon({ icon: IconComponent, ...props }: IconProps) {
    let IconComponentFinal =
        IconComponent as React.ComponentType<IconBaseProps>;
    return <IconComponentFinal {...props} />;
}

export default Icon;
