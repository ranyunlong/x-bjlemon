declare module '@material-ui/core/Box' {
    import react from 'react'
    import { borders } from '@material-ui/system';
    interface BoxProps {
        display?: react.CSSProperties['display'] | mediaQuery;
        width?: react.CSSProperties['width'];
        flexShrink?: react.CSSProperties['flexShrink'];
        alignSelf?: react.CSSProperties['alignSelf'];
        border?: borders;
        borderTop?: number;
        borderRight?: number;
        borderBottom?: number;
        borderLeft?: number;
        borderRadius?: string;
        borderColor?: ''

    }
    interface mediaQuery {
        xs?: react.CSSProperties['display'];
        sm?: react.CSSProperties['display'];
        md?: react.CSSProperties['display'];
        lg?: react.CSSProperties['display'];
    }
    export const unstable_Box: React.ComponentType<BoxProps>;
}

