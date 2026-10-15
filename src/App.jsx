
import { useEffect, useState } from "react";
import TreeNode from "./classes/TreeNode";
import NaryTree from "./classes/NaryTree";
import TreeView from "./components/TreeView";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";
import { saveTree, loadTree } from "./services/treeService";
import "./App.css";

function restoreNode(data) {
  const node = new TreeNode(
    data.name,
    data.type,
    data.email
  );

  node.children = (data.children || []).map((child) =>
    restoreNode(child)
  );

  return node;
}

function App() {
  const { user, loading, logout } = useAuth();

  const [tree, setTree] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("folder");
  const [parent, setParent] = useState("");
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!user) {
        setTree(null);
        return;
      }

      try {
        const data = await loadTree(user);

        if (data) {
          const newTree = new NaryTree(
            data.root.name,
            data.root.email
          );

          newTree.root = restoreNode(data.root);

          setTree(newTree);
          setParent(data.root.name);
        } else {
          const newTree = new NaryTree(
            "Mi unidad",
            user.email
          );

          await saveTree(user, newTree);

          setTree(newTree);
          setParent("Mi unidad");
        }

        setError("");
      } catch (error) {
        console.error("Error al cargar archivos:", error);

        setError(
          "No se pudieron cargar los archivos: " + error.message
        );
      }
    }

    loadData();
  }, [user]);

  function findFolder(node, name) {
    if (node.name === name && node.type === "folder") {
      return node;
    }

    for (let child of node.children) {
      const result = findFolder(child, name);

      if (result) {
        return result;
      }
    }

    return null;
  }

  function getFolders(node) {
    let folders = [];

    if (node.type === "folder") {
      folders.push(node);
    }

    for (let child of node.children) {
      folders = folders.concat(getFolders(child));
    }

    return folders;
  }

  async function addElement(event) {
    event.preventDefault();
    setError("");

    if (name.trim() === "") {
      setError("Escribe un nombre.");
      return;
    }

    const folder = findFolder(tree.root, parent);

    if (!folder) {
      setError("Selecciona una carpeta válida.");
      return;
    }

    const node = new TreeNode(
      name.trim(),
      type,
      user.email
    );

    const added = tree.addNode(folder, node);

    if (added) {
      try {
        await saveTree(user, tree);

        setName("");
        setUpdate((previous) => previous + 1);
      } catch (error) {
        console.error("Error al guardar archivos:", error);

        setError(
          "No se pudo guardar el elemento: " + error.message
        );
      }
    }
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Login />;
  }

  if (!tree) {
    return <p>{error || "Cargando archivos..."}</p>;
  }

  const folders = getFolders(tree.root);

  return (
    <div>
      <header className="app-header">
        <h1>Mi explorador de archivos</h1>

        <p>Usuario: {user.email}</p>

        <button onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <form onSubmit={addElement}>
        <input
          type="text"
          placeholder="Nombre del archivo o carpeta"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="folder">Carpeta</option>
          <option value="file">Archivo</option>
        </select>

        <select
          value={parent}
          onChange={(event) => setParent(event.target.value)}
        >
          {folders.map((folder, index) => (
            <option key={index} value={folder.name}>
              {folder.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Crear
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <TreeView node={tree.root} key={update} />
    </div>
  );
}

export default App;
