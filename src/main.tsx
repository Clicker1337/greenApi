import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import greenApiService from './services/GreenApi';

const queryClient = new QueryClient();

interface State {
    user: greenApiService,
}

const user = new greenApiService();

export const Context = createContext<State>({
    user,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Context.Provider value={{user}}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Context.Provider>
)
