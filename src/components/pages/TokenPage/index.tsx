import React from 'react';
import styles from "./index.module.sass";
import '../BlockPage/tabs.sass'
import {Search} from "../../ui/Search";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import info from "../../../assets/infoSVG.svg";
import ProgressBar from "../../ui/ProgressBar";
import contract from "../../../assets/contract.svg";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import classNames from "classnames";
import {
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import {Icon} from "../../ui/Icon";
import {processedStringFromApi} from "../../../services/dataProsessing";

export const Token = () => {
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>hUSDC.cc
                        (hUSDC) token</p>
                    <p className={styles.method}>ERC-20</p>
                </div>
                <div className={classNames(styles.address, styles.mgtop20, styles.contract)}>
                    <img src={contract} alt=""/>
                    0x373C548083b8A4f3A166a2386d5425A051a52394
                </div>

                <div className={classNames(styles.details, styles.mgtop30)}>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Max total supply</p>
                        <p>180,000,000</p>
                        <span className={styles.valueType}>hUSDC</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Holders</p>
                        <p>3,103,968</p>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Transfers</p>
                        <p>3,107,444</p>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Decimals</p>
                        <p>18</p>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Token transfers</Tab>
                        <Tab>Holders</Tab>
                        <Tab>Contract</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabled}><img src={prev}
                                                                                                    alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>1</div>
                                <button className={styles.controlButton}><img src={next} alt="next page"/></button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th className={classNames(styles.thW40, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thW20, styles.thDefault)}>Method</th>
                                        <th className={classNames(styles.thFrom, styles.thDefault)}>From</th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th className={classNames(styles.thW40, styles.thDefaultRight)}>Value hUSDC</th>
                                    </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div>
                                                <a className={styles.address}>0x56e43583e21393f5a4ecc...cb00</a>
                                                <p className={styles.hashTime}>22:33:01</p>
                                            </div>
                                        </td>

                                        <td className={styles.tdCell}><p className={styles.method}>commitAndForge</p>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div className={styles.addressGroup}>
                                                <div className={styles.angularAvatar}></div>
                                                <a className={styles.address}>0x75...1a90</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdIconCell}>
                                            <div><Icon icon={"path"} width={24} height={6}/></div>
                                        </td>
                                        <td className={styles.tdCellW}>
                                            <div className={styles.addressGroup}>
                                                <div
                                                    className={classNames(styles.angularAvatar, styles.receiver)}></div>
                                                <a className={styles.address}>0x8C...1a9D</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdCellRight} align={"right"}>0.00488847</td>


                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabled}><img src={prev}
                                                                                                    alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>1</div>
                                <button className={styles.controlButton}><img src={next} alt="next page"/></button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th className={classNames(styles.thW60, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thW20, styles.thDefaultRight)}>Quantity</th>
                                        <th className={classNames(styles.thW20, styles.thDefaultRight)}>Percentage</th>
                                    </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div className={styles.addressGroup}>
                                                <div
                                                    className={classNames(styles.angularAvatar, styles.receiver)}></div>
                                                <a className={styles.address}>0xfffffACc41E00f96F6af4AF0154AD18749C9d5eA</a>
                                            </div>

                                        </td>

                                        <td className={styles.tdCellRight} align={"right"}>1,185</td>
                                        <td className={classNames(styles.tdCellRight, styles.flexEnd)}>
                                            <div className={styles.percentage}>
                                                <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'} progress={10}
                                                             width={39}
                                                             height={3}></ProgressBar>
                                                <span>10%</span>

                                            </div>
                                        </td>


                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.contractsBlock}>
                            <div className={styles.creation}>
                                <p className={styles.paragraph}>Contract creation code</p>
                                <div className={styles.contractBlock}>
                                    0x60806040523480156200001157600080fd5b50604051620016cb380380620016cb8339810160408190526200003491620001ed565b6200004460ff8416600a620003bb565b620000509087620003d0565b600455600562000061868262000479565b50600662000070858262000479565b506007805460ff851660ff199091168117909155600080546001600160a01b03191633179055620000a390600a620003bb565b620000af9083620003d0565b600881905533600081815260026020908152604080832085905551938452919290917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3600980546001600160a01b0319166001600160a01b039290921691909117905550620005459350505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200015057600080fd5b81516001600160401b03808211156200016d576200016d62000128565b604051601f8301601f19908116603f0116810190828211818310171562000198576200019862000128565b81604052838152602092508683858801011115620001b557600080fd5b600091505b83821015620001d95785820183015181830184015290820190620001ba565b600093810190920192909252949350505050565b60008060008060008060c087890312156200020757600080fd5b865160208801519096506001600160401b03808211156200022757600080fd5b620002358a838b016200013e565b965060408901519150808211156200024c57600080fd5b506200025b89828a016200013e565b945050606087015160ff811681146200027357600080fd5b608088015160a089015191945092506001600160a01b03811681146200029857600080fd5b809150509295509295509295565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620002fd578160001904821115620002e157620002e1620002a6565b80851615620002ef57918102915b93841c9390800290620002c1565b509250929050565b6000826200031657506001620003b5565b816200032557506000620003b5565b81600181146200033e5760028114620003495762000369565b6001915050620003b5565b60ff8411156200035d576200035d620002a6565b50506001821b620003b5565b5060208310610133831016604e8410600b84101617156200038e575081810a620003b5565b6200039a8383620002bc565b8060001904821115620003b157620003b1620002a6565b0290505b92915050565b6000620003c9838362000305565b9392505050565b8082028115828204841417620003b557620003b5620002a6565b600181811c90821680620003ff57607f821691505b6020821081036200042057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200047457600081815260208120601f850160051c810160208610156200044f5750805b601f850160051c820191505b8181101562000470578281556001016200045b565b5050505b505050565b81516001600160401b0381111562000495576200049562000128565b620004ad81620004a68454620003ea565b8462000426565b602080601f831160018114620004e55760008415620004cc5750858301515b600019600386901b1c1916600185901b17855562000470565b600085815260208120601f198616915b828110156200051657888601518255948401946001909101908401620004f5565b5085821015620005355787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61117680620005556000396000f3fe60806040526004361061012e5760003560e01c80636bc8334f116100ab57806395d89b411161006f57806395d89b4114610341578063a457c2d714610356578063a9059cbb14610376578063dd62ed3e14610396578063eea7e46b146103dc578063f3fef3a3146103fc57600080fd5b80636bc8334f146102ac5780636f4570d4146102cc57806370a08231146102e15780638a9073ce146103015780638da5cb5b1461032157600080fd5b806323b872dd116100f257806323b872dd1461020a578063313ce5671461022a578063395093511461024c5780634fceba4d1461026c57806366d81e4a1461028c57600080fd5b806301e336671461013a57806302d05d3f1461015c57806306fdde0314610199578063095ea7b3146101bb57806318160ddd146101eb57600080fd5b3661013557005b600080fd5b34801561014657600080fd5b5061015a610155366004610cf5565b61041c565b005b34801561016857600080fd5b5060015461017c906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156101a557600080fd5b506101ae6104ac565b6040516101909190610d31565b3480156101c757600080fd5b506101db6101d6366004610d7f565b61053e565b6040519015158152602001610190565b3480156101f757600080fd5b506004545b604051908152602001610190565b34801561021657600080fd5b506101db610225366004610cf5565b610558565b34801561023657600080fd5b5060075460405160ff9091168152602001610190565b34801561025857600080fd5b506101db610267366004610d7f565b61057c565b34801561027857600080fd5b5061015a610287366004610e5c565b6105bb565b34801561029857600080fd5b5061015a6102a7366004610ec0565b6105f0565b3480156102b857600080fd5b5061015a6102c7366004610edb565b610629565b3480156102d857600080fd5b5061015a6106a6565b3480156102ed57600080fd5b506101fc6102fc366004610ec0565b610707565b34801561030d57600080fd5b5061015a61031c366004610ec0565b61074e565b34801561032d57600080fd5b5060005461017c906001600160a01b031681565b34801561034d57600080fd5b506101ae6107d3565b34801561036257600080fd5b506101db610371366004610d7f565b6107e2565b34801561038257600080fd5b506101db610391366004610d7f565b610879565b3480156103a257600080fd5b506101fc6103b1366004610f2c565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b3480156103e857600080fd5b5061015a6103f7366004610f5f565b610887565b34801561040857600080fd5b5061015a610417366004610d7f565b6108a3565b6000546001600160a01b0316331461043357600080fd5b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303816000875af1158015610482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a69190610f78565b50505050565b6060600580546104bb90610f9a565b80601f01602080910402602001604051908101604052809291908181526020018280546104e790610f9a565b80156105345780601f1061050957610100808354040283529160200191610534565b820191906000526020600020905b81548152906001019060200180831161051757829003601f168201915b5050505050905090565b60003361054c8185856108f0565b60019150505b92915050565b600033610566858285610a16565b610571858585610aa2565b506001949350505050565b3360008181526003602090815260408083206001600160a01b038716845290915281205490919061054c90829086906105b6908790610fea565b6108f0565b6000546001600160a01b031633146105d257600080fd5b60056105de838261104b565b5060066105eb828261104b565b505050565b6000546001600160a01b0316331461060757600080fd5b600980546001600160a01b0319166001600160a01b0392909216919091179055565b6000806014835161063a919061110b565b600854600954919250906001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60005b8481101561069d57836000528560208801015160601c838360206000a360149590950194600101610671565b50505050505050565b6000546001600160a01b031633146106bd57600080fd5b600080546040516001600160a01b03909116907fb91e5e5588ef972137c14d2d88a5001c28bc0ef9ddb2cd12344976bce6fbe499908390a3600080546001600160a01b0319169055565b60006001600160a01b03821661071f57506000919050565b6001600160a01b03821660009081526002602052604090205480156107445792915050565b5050600854919050565b6000546001600160a01b0316331461076557600080fd5b6001600160a01b03811661077857600080fd5b600080546040516001600160a01b03808516939216917fb91e5e5588ef972137c14d2d88a5001c28bc0ef9ddb2cd12344976bce6fbe49991a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6060600680546104bb90610f9a565b3360008181526003602090815260408083206001600160a01b03871684529091528120549091908381101561086c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61057182868684036108f0565b60003361054c818585610aa2565b6000546001600160a01b0316331461089e57600080fd5b600855565b6000546001600160a01b031633146108ba57600080fd5b6040516001600160a01b0383169082156108fc029083906000818181858888f193505050501580156105eb573d6000803e3d6000fd5b6001600160a01b0383166109525760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610863565b6001600160a01b0382166109b45760405162461bcd60e51b815260206004820152602360248201527f45524332303a20617070726f76652020746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610863565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383811660009081526003602090815260408083209386168352929052205460001981146104a65781811015610a955760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610863565b6104a684848484036108f0565b6001600160a01b038316610b065760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610863565b6001600160a01b038216610b685760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610863565b6008546001600160a01b0384166000908152600260205260409020548291610b8f91610fea565b1015610bec5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610863565b6001600160a01b03831660009081526002602052604090205415610c3d576001600160a01b03831660009081526002602052604081208054839290610c3290849061112d565b90915550610c659050565b80600854610c4b919061112d565b6001600160a01b0384166000908152600260205260409020555b6001600160a01b03821660009081526002602052604081208054839290610c8d908490610fea565b92505081905550816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0991815260200190565b80356001600160a01b0381168114610cf057600080fd5b919050565b600080600060608486031215610d0a57600080fd5b610d1384610cd9565b9250610d2160208501610cd9565b9150604084013590509250925092565b600060208083528351808285015260005b81811015610d5e57858101830151858201604001528201610d42565b506000604082860101526040601f19601f8301168501019250505092915050565b60008060408385031215610d9257600080fd5b610d9b83610cd9565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610dda57610dda610da9565b604051601f8501601f19908116603f01168101908282118183101715610e0257610e02610da9565b81604052809350858152868686011115610e1b57600080fd5b858560208301376000602087830101525050509392505050565b600082601f830112610e4657600080fd5b610e5583833560208501610dbf565b9392505050565b60008060408385031215610e6f57600080fd5b823567ffffffffffffffff80821115610e8757600080fd5b610e9386838701610e35565b93506020850135915080821115610ea957600080fd5b50610eb685828601610e35565b9150509250929050565b600060208284031215610ed257600080fd5b610e5582610cd9565b600060208284031215610eed57600080fd5b813567ffffffffffffffff811115610f0457600080fd5b8201601f81018413610f1557600080fd5b610f2484823560208401610dbf565b949350505050565b60008060408385031215610f3f57600080fd5b610f4883610cd9565b9150610f5660208401610cd9565b90509250929050565b600060208284031215610f7157600080fd5b5035919050565b600060208284031215610f8a57600080fd5b81518015158114610e5557600080fd5b600181811c90821680610fae57607f821691505b602082108103610fce57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561055257610552610fd4565b601f8211156105eb57600081815260208120601f850160051c810160208610156110245750805b601f850160051c820191505b8181101561104357828155600101611030565b505050505050565b815167ffffffffffffffff81111561106557611065610da9565b611079816110738454610f9a565b84610ffd565b602080601f8311600181146110ae57600084156110965750858301515b600019600386901b1c1916600185901b178555611043565b600085815260208120601f198616915b828110156110dd578886015182559484019460019091019084016110be565b50858210156110fb5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008261112857634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561055257610552610fd456fea264697066735822122001032eb397fd77421110972791f3cba2115b2d1bfbd9fbc986cd19474340081b64736f6c63430008120033000000000000000000000000000000000000000000000000000000000aba950000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000004a1000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e000000000000000000000000000000000000000000000000000000000000000868555344432e696f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056855534443000000000000000000000000000000000000000000000000000000
                                </div>
                            </div>
                            <div className={styles.creation}>
                                <p className={styles.paragraph}>Deployed ByteCode</p>
                                <div className={styles.contractBlock}>
                                    0x60806040523480156200001157600080fd5b50604051620016cb380380620016cb8339810160408190526200003491620001ed565b6200004460ff8416600a620003bb565b620000509087620003d0565b600455600562000061868262000479565b50600662000070858262000479565b506007805460ff851660ff199091168117909155600080546001600160a01b03191633179055620000a390600a620003bb565b620000af9083620003d0565b600881905533600081815260026020908152604080832085905551938452919290917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3600980546001600160a01b0319166001600160a01b039290921691909117905550620005459350505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200015057600080fd5b81516001600160401b03808211156200016d576200016d62000128565b604051601f8301601f19908116603f0116810190828211818310171562000198576200019862000128565b81604052838152602092508683858801011115620001b557600080fd5b600091505b83821015620001d95785820183015181830184015290820190620001ba565b600093810190920192909252949350505050565b60008060008060008060c087890312156200020757600080fd5b865160208801519096506001600160401b03808211156200022757600080fd5b620002358a838b016200013e565b965060408901519150808211156200024c57600080fd5b506200025b89828a016200013e565b945050606087015160ff811681146200027357600080fd5b608088015160a089015191945092506001600160a01b03811681146200029857600080fd5b809150509295509295509295565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620002fd578160001904821115620002e157620002e1620002a6565b80851615620002ef57918102915b93841c9390800290620002c1565b509250929050565b6000826200031657506001620003b5565b816200032557506000620003b5565b81600181146200033e5760028114620003495762000369565b6001915050620003b5565b60ff8411156200035d576200035d620002a6565b50506001821b620003b5565b5060208310610133831016604e8410600b84101617156200038e575081810a620003b5565b6200039a8383620002bc565b8060001904821115620003b157620003b1620002a6565b0290505b92915050565b6000620003c9838362000305565b9392505050565b8082028115828204841417620003b557620003b5620002a6565b600181811c90821680620003ff57607f821691505b6020821081036200042057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200047457600081815260208120601f850160051c810160208610156200044f5750805b601f850160051c820191505b8181101562000470578281556001016200045b565b5050505b505050565b81516001600160401b0381111562000495576200049562000128565b620004ad81620004a68454620003ea565b8462000426565b602080601f831160018114620004e55760008415620004cc5750858301515b600019600386901b1c1916600185901b17855562000470565b600085815260208120601f198616915b828110156200051657888601518255948401946001909101908401620004f5565b5085821015620005355787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61117680620005556000396000f3fe60806040526004361061012e5760003560e01c80636bc8334f116100ab57806395d89b411161006f57806395d89b4114610341578063a457c2d714610356578063a9059cbb14610376578063dd62ed3e14610396578063eea7e46b146103dc578063f3fef3a3146103fc57600080fd5b80636bc8334f146102ac5780636f4570d4146102cc57806370a08231146102e15780638a9073ce146103015780638da5cb5b1461032157600080fd5b806323b872dd116100f257806323b872dd1461020a578063313ce5671461022a578063395093511461024c5780634fceba4d1461026c57806366d81e4a1461028c57600080fd5b806301e336671461013a57806302d05d3f1461015c57806306fdde0314610199578063095ea7b3146101bb57806318160ddd146101eb57600080fd5b3661013557005b600080fd5b34801561014657600080fd5b5061015a610155366004610cf5565b61041c565b005b34801561016857600080fd5b5060015461017c906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156101a557600080fd5b506101ae6104ac565b6040516101909190610d31565b3480156101c757600080fd5b506101db6101d6366004610d7f565b61053e565b6040519015158152602001610190565b3480156101f757600080fd5b506004545b604051908152602001610190565b34801561021657600080fd5b506101db610225366004610cf5565b610558565b34801561023657600080fd5b5060075460405160ff9091168152602001610190565b34801561025857600080fd5b506101db610267366004610d7f565b61057c565b34801561027857600080fd5b5061015a610287366004610e5c565b6105bb565b34801561029857600080fd5b5061015a6102a7366004610ec0565b6105f0565b3480156102b857600080fd5b5061015a6102c7366004610edb565b610629565b3480156102d857600080fd5b5061015a6106a6565b3480156102ed57600080fd5b506101fc6102fc366004610ec0565b610707565b34801561030d57600080fd5b5061015a61031c366004610ec0565b61074e565b34801561032d57600080fd5b5060005461017c906001600160a01b031681565b34801561034d57600080fd5b506101ae6107d3565b34801561036257600080fd5b506101db610371366004610d7f565b6107e2565b34801561038257600080fd5b506101db610391366004610d7f565b610879565b3480156103a257600080fd5b506101fc6103b1366004610f2c565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b3480156103e857600080fd5b5061015a6103f7366004610f5f565b610887565b34801561040857600080fd5b5061015a610417366004610d7f565b6108a3565b6000546001600160a01b0316331461043357600080fd5b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb906044016020604051808303816000875af1158015610482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a69190610f78565b50505050565b6060600580546104bb90610f9a565b80601f01602080910402602001604051908101604052809291908181526020018280546104e790610f9a565b80156105345780601f1061050957610100808354040283529160200191610534565b820191906000526020600020905b81548152906001019060200180831161051757829003601f168201915b5050505050905090565b60003361054c8185856108f0565b60019150505b92915050565b600033610566858285610a16565b610571858585610aa2565b506001949350505050565b3360008181526003602090815260408083206001600160a01b038716845290915281205490919061054c90829086906105b6908790610fea565b6108f0565b6000546001600160a01b031633146105d257600080fd5b60056105de838261104b565b5060066105eb828261104b565b505050565b6000546001600160a01b0316331461060757600080fd5b600980546001600160a01b0319166001600160a01b0392909216919091179055565b6000806014835161063a919061110b565b600854600954919250906001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60005b8481101561069d57836000528560208801015160601c838360206000a360149590950194600101610671565b50505050505050565b6000546001600160a01b031633146106bd57600080fd5b600080546040516001600160a01b03909116907fb91e5e5588ef972137c14d2d88a5001c28bc0ef9ddb2cd12344976bce6fbe499908390a3600080546001600160a01b0319169055565b60006001600160a01b03821661071f57506000919050565b6001600160a01b03821660009081526002602052604090205480156107445792915050565b5050600854919050565b6000546001600160a01b0316331461076557600080fd5b6001600160a01b03811661077857600080fd5b600080546040516001600160a01b03808516939216917fb91e5e5588ef972137c14d2d88a5001c28bc0ef9ddb2cd12344976bce6fbe49991a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6060600680546104bb90610f9a565b3360008181526003602090815260408083206001600160a01b03871684529091528120549091908381101561086c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61057182868684036108f0565b60003361054c818585610aa2565b6000546001600160a01b0316331461089e57600080fd5b600855565b6000546001600160a01b031633146108ba57600080fd5b6040516001600160a01b0383169082156108fc029083906000818181858888f193505050501580156105eb573d6000803e3d6000fd5b6001600160a01b0383166109525760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610863565b6001600160a01b0382166109b45760405162461bcd60e51b815260206004820152602360248201527f45524332303a20617070726f76652020746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610863565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383811660009081526003602090815260408083209386168352929052205460001981146104a65781811015610a955760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610863565b6104a684848484036108f0565b6001600160a01b038316610b065760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610863565b6001600160a01b038216610b685760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610863565b6008546001600160a01b0384166000908152600260205260409020548291610b8f91610fea565b1015610bec5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610863565b6001600160a01b03831660009081526002602052604090205415610c3d576001600160a01b03831660009081526002602052604081208054839290610c3290849061112d565b90915550610c659050565b80600854610c4b919061112d565b6001600160a01b0384166000908152600260205260409020555b6001600160a01b03821660009081526002602052604081208054839290610c8d908490610fea565b92505081905550816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0991815260200190565b80356001600160a01b0381168114610cf057600080fd5b919050565b600080600060608486031215610d0a57600080fd5b610d1384610cd9565b9250610d2160208501610cd9565b9150604084013590509250925092565b600060208083528351808285015260005b81811015610d5e57858101830151858201604001528201610d42565b506000604082860101526040601f19601f8301168501019250505092915050565b60008060408385031215610d9257600080fd5b610d9b83610cd9565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610dda57610dda610da9565b604051601f8501601f19908116603f01168101908282118183101715610e0257610e02610da9565b81604052809350858152868686011115610e1b57600080fd5b858560208301376000602087830101525050509392505050565b600082601f830112610e4657600080fd5b610e5583833560208501610dbf565b9392505050565b60008060408385031215610e6f57600080fd5b823567ffffffffffffffff80821115610e8757600080fd5b610e9386838701610e35565b93506020850135915080821115610ea957600080fd5b50610eb685828601610e35565b9150509250929050565b600060208284031215610ed257600080fd5b610e5582610cd9565b600060208284031215610eed57600080fd5b813567ffffffffffffffff811115610f0457600080fd5b8201601f81018413610f1557600080fd5b610f2484823560208401610dbf565b949350505050565b60008060408385031215610f3f57600080fd5b610f4883610cd9565b9150610f5660208401610cd9565b90509250929050565b600060208284031215610f7157600080fd5b5035919050565b600060208284031215610f8a57600080fd5b81518015158114610e5557600080fd5b600181811c90821680610fae57607f821691505b602082108103610fce57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561055257610552610fd4565b601f8211156105eb57600081815260208120601f850160051c810160208610156110245750805b601f850160051c820191505b8181101561104357828155600101611030565b505050505050565b815167ffffffffffffffff81111561106557611065610da9565b611079816110738454610f9a565b84610ffd565b602080601f8311600181146110ae57600084156110965750858301515b600019600386901b1c1916600185901b178555611043565b600085815260208120601f198616915b828110156110dd578886015182559484019460019091019084016110be565b50858210156110fb5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008261112857634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561055257610552610fd456fea264697066735822122001032eb397fd77421110972791f3cba2115b2d1bfbd9fbc986cd19474340081b64736f6c63430008120033000000000000000000000000000000000000000000000000000000000aba950000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000004a1000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e000000000000000000000000000000000000000000000000000000000000000868555344432e696f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056855534443000000000000000000000000000000000000000000000000000000
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                </Tabs>
            </section>

        </div>
    )
}