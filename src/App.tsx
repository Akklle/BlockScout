import React from 'react';
import './styles/App.module.sass'
import {Main} from "./components/pages/MainPage/Main";
import {Layout} from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import {BlockPage} from "./components/pages/BlockPage";
import {Blocks} from "./components/pages/BlocksPage";
import {Tokens} from "./components/pages/TokensPage";
import {Token} from "./components/pages/TokenPage";
import {Transactions} from "./components/pages/TransactionsPage";
import {Transaction} from "./components/pages/TransactionPage";
import {Error} from "./components/pages/errorPage";


function App() {
    return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='/' element={<Main/>} index/>
                    <Route path='/block/:number' element={<BlockPage/>}/>
                    <Route path='/blocks' element={<Blocks/>}/>
                    <Route path='/tokens' element={<Tokens/>}/>
                    <Route path='/token' element={<Token/>}/>
                    <Route path='/transaction' element={<Transaction/>}/>
                    <Route path='/transactions' element={<Transactions/>}/>
                    <Route path='/error' element={<Error/>}/>

                </Route>
            </Routes>
    );
}

export default App;
