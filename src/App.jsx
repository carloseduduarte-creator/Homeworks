import { useState } from "react";
import { Queue } from "./Queue";
import "./App.css";

function App() {

    const [queue, setQueue] = useState(() => {

        const cola = new Queue();

        // Mock data

        cola.push({
            name: "Carlos",
            withdrawalAmount: 200000,
            arrivalDate: "2026-10-06 15:00:00"
        });

        cola.push({
            name: "María",
            withdrawalAmount: 150000,
            arrivalDate: "2026-10-06 15:05:00"
        });

        cola.push({
            name: "Juan",
            withdrawalAmount: 300000,
            arrivalDate: "2026-10-06 15:10:00"
        });

        return cola;
    });


    const [name, setName] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");


    // Agregar persona a la cola

    function addPerson(event) {

        event.preventDefault();

        if (!name || !withdrawalAmount) {
            return;
        }

        const newQueue = new Queue();

        // Copiar las personas actuales

        queue.forEach((person) => {
            newQueue.push(person);
        });


        // Fecha de llegada asignada por el sistema

        const arrivalDate = new Date();


        newQueue.push({
            name: name,
            withdrawalAmount: Number(withdrawalAmount),
            arrivalDate: arrivalDate.toLocaleString()
        });


        setQueue(newQueue);


        // Limpiar formulario

        setName("");
        setWithdrawalAmount("");
    }


    // Sacar la primera persona de la cola

    function removePerson() {

        if (queue.length === 0) {
            return;
        }


        const newQueue = new Queue();


        // Eliminar la primera persona

        queue.slice(1).forEach((person) => {
            newQueue.push(person);
        });


        setQueue(newQueue);
    }


    // Primera persona de la cola

    const firstPerson = queue.peek();


    return (
        <div className="container">

            <h1>Challenge 05</h1>

            <h2>Queue de personas - Cajero</h2>


            <div className="content">


                {/* FORMULARIO */}

                <form
                    onSubmit={addPerson}
                    className="form"
                >

                    <h3>Agregar persona</h3>


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
                        Monto de retiro
                    </label>

                    <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(event) =>
                            setWithdrawalAmount(
                                event.target.value
                            )
                        }
                    />


                    <button type="submit">
                        Agregar a la cola
                    </button>

                </form>


                {/* QUEUE */}

                <div className="queue-section">

                    <h3>
                        Cola del cajero
                    </h3>


                    <p>
                        <strong>
                            Personas en la cola:
                        </strong>{" "}
                        {queue.length}
                    </p>


                    <p>
                        <strong>
                            Primera persona:
                        </strong>{" "}

                        {firstPerson
                            ? firstPerson.name
                            : "La cola está vacía"}
                    </p>


                    <button onClick={removePerson}>
                        Dequeue - Atender persona
                    </button>


                    <div className="queue">

                        {queue.length === 0 ? (

                            <p>
                                La cola está vacía
                            </p>

                        ) : (

                            queue.map((person, index) => (

                                <div
                                    className="person"
                                    key={
                                        person.name +
                                        person.arrivalDate
                                    }
                                >

                                    <h4>
                                        {person.name}
                                    </h4>


                                    <p>
                                        <strong>
                                            Monto de retiro:
                                        </strong>{" "}
                                        $
                                        {person.withdrawalAmount.toLocaleString()}
                                    </p>


                                    <p>
                                        <strong>
                                            Fecha de llegada:
                                        </strong>{" "}
                                        {person.arrivalDate}
                                    </p>


                                    {index === 0 && (
                                        <span>
                                            PRÓXIMO
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