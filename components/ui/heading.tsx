import { cx } from '@/utils/cx';

type HeadingProps = React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4'> &
    React.PropsWithChildren<{
        level: 1 | 2 | 3 | 4;
    }>;

const HEADING_CLASSNAMES = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
};

export function Heading({
    level,
    children,
    className,
    ...props
}: HeadingProps) {
    const Tag = `h${level}` as const;

    return (
        <Tag
            {...props}
            className={cx('font-semibold', HEADING_CLASSNAMES[level], className)}
        >
            {children}
        </Tag>
    );
}