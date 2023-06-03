import React from 'react'
import './styles/App.module.sass'
import { Main } from './components/pages/MainPage/Main'
import { Layout } from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { BlockPage } from './components/pages/BlockPage'
import { BlocksPage } from './components/pages/BlocksPage'
import { TokensPage } from './components/pages/TokensPage'
import { TokenPage } from './components/pages/TokenPage'
import { Transactions } from './components/pages/TransactionsPage'
import { TransactionPage } from './components/pages/TransactionPage'
import { Error } from './components/pages/errorPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} index />
                <Route path="/block/:number" element={<BlockPage />} />
                <Route
                    path="/transaction/:address"
                    element={<TransactionPage />}
                />
                <Route path="/token/:address" element={<TokenPage />} />
                <Route path="/blocks" element={<BlocksPage />} />
                <Route path="/tokens" element={<TokensPage />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/error" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default App
