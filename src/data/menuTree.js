
import NaryTree from '../classes/NaryTree.js';

const menuTree = new NaryTree();

const home = menuTree.setRoot('Inicio', '/', 'home');

const users = menuTree.addChild(
    home,
    'Usuarios',
    '/usuarios',
    'users'
);

menuTree.addChild(
    users,
    'Lista de usuarios',
    '/usuarios/lista',
    'users'
);

menuTree.addChild(
    users,
    'Crear usuario',
    '/usuarios/crear',
    'users'
);

const products = menuTree.addChild(
    home,
    'Productos',
    '/productos',
    'products'
);

menuTree.addChild(
    products,
    'Lista de productos',
    '/productos/lista',
    'products'
);

menuTree.addChild(
    products,
    'Crear producto',
    '/productos/crear',
    'products'
);

export default menuTree;
