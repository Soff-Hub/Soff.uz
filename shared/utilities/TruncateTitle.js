export const truncateTitle = (title, maxLength = 7) => {
    if (!title) return '';
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

export const TruncateText = ({
    text,
    lines = 1,
    as: Component = 'span',
    className = '',
    ...props
}) => {
    const baseStyle =
        lines === 1
            ? {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  wordBreak: 'break-all', // 👈 allows breaking long words
                  overflowWrap: 'anywhere', // 👈 ensures safe wrapping in all browsers
              }
            : {
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: String(lines),
                  overflow: 'hidden',
                  wordBreak: 'break-all', // 👈 breaks long words too
                  overflowWrap: 'anywhere', // 👈 improves behavior on narrow screens
              };

    return (
        <Component
            className={className}
            style={baseStyle}
            title={text} // hover tooltip
            {...props}>
            {text}
        </Component>
    );
};
