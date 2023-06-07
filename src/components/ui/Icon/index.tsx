import styles from './index.module.sass'

interface Props {
    icon: string
    size?: number | string
    width?: number | string
    height?: number | string
    color?: string
}

export const Icon = ({ icon, height, width, size = 29, color }: Props) => {
    const iconWith = width ?? size
    const iconHeight = height ?? size
    return (
        <svg
            className={styles.icon}
            style={{
                width: iconWith + 'px',
                height: iconHeight + 'px',
                fill: color,
            }}
        >
            <use xlinkHref={`/sprite.svg#${icon}`}></use>
        </svg>
    )
}
