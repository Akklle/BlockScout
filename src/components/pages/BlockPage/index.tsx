import React, { useState } from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './tabs.sass'

export const Block = () => {
    const [key, setKey] = useState('tab2')
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.blockSection}>
            <div className={styles.blockParagraph}>
                <p>Block</p>
                <p>#8829949</p>
            </div>
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Transactions</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </section>

        </div>
    )
}