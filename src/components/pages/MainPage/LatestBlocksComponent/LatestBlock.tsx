import React from 'react';
import styles from './LatestBlocks.module.sass';
import currency from '../../../../assets/currency.svg'

export interface productProps {
    img: string
    brand: string
    name: string
    type: string
    price: number
}

export const Product = (props: productProps) => {
    return (
        <button className={styles.productBox}>
            <img src={props.img} alt="img product"/>

            <div className={styles.brandTag}>
                {props.brand}
            </div>

            <div className={styles.productInfo}>
                <p className={styles.productName}>{props.name}</p>
                <p className={styles.productType}>{props.type}</p>
            </div>

            <div className={styles.productPrice}>
                <img src={currency} alt="currency"/>
                <p>{props.price}</p>
            </div>
        </button>
    )
}