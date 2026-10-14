
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import menuTree from './data/menuTree.js';
import './App.css';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import Products from './pages/Products.jsx';

function App() {
    const [selectedPage, setSelectedPage] = useState('home');

    const components = {
        home: <Home />,
        users: <Users />,
        products: <Products />
    };

    const handleSelect = (node) => {
        if (node.component) {
            setSelectedPage(node.component);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar
                tree={menuTree}
                onSelect={handleSelect}
            />

            <main style={{ flex: 1, padding: '30px' }}>
                {components[selectedPage] || <Home />}
            </main>
        </div>
    );
}

export default App;
