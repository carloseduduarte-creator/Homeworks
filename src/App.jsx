import { useState } from "react";
import { Stack } from "./Stack";
import "./App.css";

function App() {

    const [stack, setStack] = useState(() => {

        const pila = new Stack();

        pila.push({
            name: "Cien años de soledad",
            isbn: "978-0307474728",
            author: "Gabriel García Márquez",
            editorial: "Editorial Sudamericana"
        });

        pila.push({
            name: "El principito",
            isbn: "978-0156012195",
            author: "Antoine de Saint-Exupéry",
            editorial: "Reynal & Hitchcock"
        });

        pila.push({
            name: "1984",
            isbn: "978-0451524935",
            author: "George Orwell",
            editorial: "Secker & Warburg"
        });

        return pila;
    });


    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [author, setAuthor] = useState("");
    const [editorial, setEditorial] = useState("");


  
    function addBook(event) {

        event.preventDefault();

        if (!name || !isbn || !author || !editorial) {
            return;
        }

        const newStack = new Stack();

        stack.forEach((book) => {
            newStack.push(book);
        });

        newStack.push({
            name: name,
            isbn: isbn,
            author: author,
            editorial: editorial
        });

        setStack(newStack);

        setName("");
        setIsbn("");
        setAuthor("");
        setEditorial("");
    }


    function removeBook() {

        if (stack.length === 0) {
            return;
        }

        const newStack = new Stack();

        stack.forEach((book) => {
            newStack.push(book);
        });

        newStack.pop();

        setStack(newStack);
    }


    const topBook = stack.peek();


    return (
        <div className="container">

            <h1>Challenge 04</h1>

            <h2>Stack de Libros</h2>


            <div className="content">

                {/* FORMULARIO */}

                <form
                    onSubmit={addBook}
                    className="form"
                >

                    <h3>Agregar libro</h3>


                    <label>
                        Nombre
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />


                    <label>
                        ISBN
                    </label>

                    <input
                        type="text"
                        value={isbn}
                        onChange={(event) =>
                            setIsbn(event.target.value)
                        }
                    />


                    <label>
                        Autor
                    </label>

                    <input
                        type="text"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                    />


                    <label>
                        Editorial
                    </label>

                    <input
                        type="text"
                        value={editorial}
                        onChange={(event) =>
                            setEditorial(event.target.value)
                        }
                    />


                    <button type="submit">
                        Agregar a la pila
                    </button>

                </form>


                {/* STACK */}

                <div className="stack-section">

                    <h3>
                        Pila de libros
                    </h3>


                    <p>
                        <strong>
                            Tamaño:
                        </strong>{" "}
                        {stack.length}
                    </p>


                    <p>
                        <strong>
                            Libro en la cima:
                        </strong>{" "}

                        {topBook
                            ? topBook.name
                            : "La pila está vacía"}
                    </p>


                    <button onClick={removeBook}>
                        Pop - Sacar libro
                    </button>


                    <div className="stack">

                        {stack.length === 0 ? (

                            <p>
                                La pila está vacía
                            </p>

                        ) : (

                            [...stack]
                                .reverse()
                                .map((book, index) => (

                                    <div
                                        className="book"
                                        key={book.isbn}
                                    >

                                        <h4>
                                            {book.name}
                                        </h4>


                                        <p>
                                            <strong>
                                                ISBN:
                                            </strong>{" "}
                                            {book.isbn}
                                        </p>


                                        <p>
                                            <strong>
                                                Autor:
                                            </strong>{" "}
                                            {book.author}
                                        </p>


                                        <p>
                                            <strong>
                                                Editorial:
                                            </strong>{" "}
                                            {book.editorial}
                                        </p>


                                        {index === 0 && (
                                            <span>
                                                TOP
                                            </span>
                                        )}

                                    </div>

                                ))

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default App;