import './main.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './shared/hooks/useGlobalContext';
import { DataProvider } from './shared/hooks/useDataContext';
import { Provider } from 'react-redux'
import store from './store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <GlobalProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </GlobalProvider>
    </Provider>
);