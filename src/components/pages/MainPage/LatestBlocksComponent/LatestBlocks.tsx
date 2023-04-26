import React from 'react';
import styles from './LatestBlocks.module.sass';
import {Product, productProps} from "./Product";
import currency from '../../../../assets/currency.svg'

interface ProductArrayInterface {
    productArray: Array<productProps>
}

export const ProductArray = ({productArray}: ProductArrayInterface) => {
    return (
        <div className={styles.productArr}>
            <div className={styles.balanceBlock}>
                <div className={styles.textBalanceBlock}>
                    <div className={styles.balanceBlockInf}>
                        <p>На вашем балансе</p>
                        <img className={styles.currency} src={currency} alt="currency"/>
                        <p className={styles.balance}>200</p>
                    </div>
                    <p className={styles.promoCode}>
                        Вы можете поменять их на скидку 200 руб.
                    </p>
                </div>
                <button className={styles.bigButton}>
                    Получить промокод
                </button>
            </div>

            {productArray.map((product: productProps) => {
                return <Product
                    img={product.img}
                    brand={product.brand}
                    name={product.name}
                    type={product.type}
                    price={product.price}
                />
            })}
        </div>
    )
}