import React from 'react';
import './styles/App.module.sass'
import {Main} from "./components/pages/MainPage/Main";
import {Layout} from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import {Block} from "./components/pages/BlockPage";
import {Blocks} from "./components/pages/BlocksPage";
import {Tokens} from "./components/pages/TokensPage";
import {Token} from "./components/pages/TokenPage";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Main/>} index/>
                <Route path='/block' element={<Block/>}/>
                <Route path='/blocks' element={<Blocks/>}/>
                <Route path='/tokens' element={<Tokens/>}/>
                <Route path='/token' element={<Token/>}/>
            </Route>
        </Routes>
    );
}

export default App;
