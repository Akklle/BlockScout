import React from 'react';
import './styles/App.module.sass'
import {Header} from "./components/HeaderComponent/Header";
import {Main} from "./components/pages/MainPage/Main";


function App() {
    return (
        <div>
            <header>
                <Header></Header>
            </header>


            <Main></Main>


        </div>
    );
}

export default App;
