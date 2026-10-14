
import { useEffect, useState } from 'react';
import BinaryTree from './classes/BinaryTree.js';
import BinaryTreeView from './components/BinaryTreeView.jsx';

function App() {
    const [tree] = useState(() => {
        const newTree = new BinaryTree();

        [50, 30, 70, 20, 40, 60, 80].forEach((number) => {
            newTree.insert(number);
        });

        return newTree;
    });

    const [treeData, setTreeData] = useState(() => tree.toD3Tree());
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('Recorrido InOrder:');
        tree.inOrder();

        console.log('Recorrido PostOrder:');
        tree.postOrder();

        console.log('Recorrido PreOrder:');
        tree.preOrder();
    }, [tree]);

    const handleInsert = (event) => {
        event.preventDefault();

        if (number.trim() === '') {
            setMessage('Escribe un número.');
            return;
        }

        const value = Number(number);

        if (!Number.isSafeInteger(value)) {
            setMessage('Ingresa un número entero válido.');
            return;
        }

        if (tree.search(value)) {
            setMessage('Ese número ya existe en el árbol.');
            return;
        }

        tree.insert(value);
        setTreeData(tree.toD3Tree());
        setNumber('');
        setMessage(`Número ${value} insertado correctamente.`);

        console.log('InOrder:');
        tree.inOrder();

        console.log('PostOrder:');
        tree.postOrder();

        console.log('PreOrder:');
        tree.preOrder();
    };

    const handleSearch = () => {
        if (number.trim() === '') {
            setMessage('Escribe el número que quieres buscar.');
            return;
        }

        const value = Number(number);

        if (!Number.isSafeInteger(value)) {
            setMessage('Ingresa un número entero válido.');
            return;
        }

        setMessage(
            tree.search(value)
                ? `El número ${value} sí existe en el árbol.`
                : `El número ${value} no existe en el árbol.`
        );
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Challenge 08 - Árbol Binario</h1>
            <p>Inserta números y consulta si existen en el árbol.</p>

            <form onSubmit={handleInsert} style={{ marginBottom: '15px' }}>
                <input
                    type="number"
                    step="1"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    placeholder="Escribe un número"
                />

                <button type="submit">Insertar número</button>

                <button type="button" onClick={handleSearch}>
                    Buscar
                </button>
            </form>

            {message && <p>{message}</p>}

            <BinaryTreeView data={treeData} />
        </div>
    );
}

export default App;
