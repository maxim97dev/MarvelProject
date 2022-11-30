import ContentLoader from 'react-content-loader';

const CardSkeleton = (props) => {
    const rows = 5,
        columns = 2,
        coverHeight = 430,
        coverWidth = 317,
        borderRadius = 10,
        padding = 15,
        speed = 1;

    const coverHeightWithPadding = coverHeight + padding;
    const coverWidthWithPadding = coverWidth + padding;
    const covers = Array(columns * rows).fill(1);

    return (
        <ContentLoader
            speed={speed}
            width={columns * coverWidthWithPadding}
            height={rows * coverHeightWithPadding}
            backgroundColor='#d9d9d9'
            foregroundColor='#ecebeb'
            {...props}
        >
            {covers.map((g, i) => {
                let vy = Math.floor(i / columns) * coverHeightWithPadding;
                let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
                return (
                    <rect
                        key={i}
                        x={vx}
                        y={vy}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={coverWidth}
                        height={coverHeight}
                    />
                )
            })}
        </ContentLoader>
    )
}

export default CardSkeleton;