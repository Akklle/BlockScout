import React from 'react';
import './styles/App.module.sass'
import {Header} from "./components/HeaderComponent/Header";
import {Main} from "./components/pages/MainPage/Main";
import {Layout} from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import {Block} from "./components/pages/BlockPage";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                {/*path='/ecomarket'*/}
                {/*<Route path='/ecomarket' element={<EcoMarketPage/>} />*/}
                <Route path='/' element={<Main/>}/>
                <Route path='/block' element={<Block/>} index/>
            </Route>
        </Routes>
        // <div>
        //     <Header></Header>
        //     <Main></Main>
        // </div>
    );
}

export default App;
