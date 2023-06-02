import React from 'react';
import styles from "../BlocksPage/index.module.sass";
import {Holder} from "../../../app/models/generated";
import {HolderItem} from "./HolderItem";

interface HolderArrayInterface {
    HolderArray: Array<Holder>
}

export const HolderItems = ({HolderArray}: HolderArrayInterface) => {
    return (
        <tbody className={styles.tableBody}>
        {HolderArray.map((holder: Holder) => {
            return <HolderItem key={holder.address.hash}
                              holder={holder}
            />
        })}
        </tbody>

    )
}