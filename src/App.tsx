import { ToastContainer } from 'react-toastify';
import Header from './layouts/Header';
import Content from './layouts/Content';

function App() {
    return (
        <div className="app">
            <ToastContainer />
            <Header />
            <Content />
        </div>
    );
}

export default App;
