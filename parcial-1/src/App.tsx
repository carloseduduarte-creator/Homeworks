import { useEffect, useState } from 'react'
import LinkedList from './lists/LinkedList'
import DoubleLinkedList from './lists/DoubleLinkedList'
import CircularLinkedList from './lists/CircularLinkedList'
import DoubleCircularLinkedList from './lists/DoubleCircularLinkedList'

const patients = new LinkedList()
const history = new DoubleLinkedList()
const doctors = new CircularLinkedList()
const committee = new DoubleCircularLinkedList()

patients.append('Juan Pérez')
patients.append('María Gómez')
patients.append('Carlos Rodríguez')

doctors.append('Doctor 1')
doctors.append('Doctor 2')
doctors.append('Doctor 3')

committee.append('Miembro 1')
committee.append('Miembro 2')
committee.append('Miembro 3')

function App() {
  const [patient, setPatient] = useState(patients.head)
  const [historySize, setHistorySize] = useState(history.length)
  const [currentHistory, setCurrentHistory] = useState(history.head)
  const [currentDoctor, setCurrentDoctor] = useState(doctors.head)
  const [currentMember, setCurrentMember] = useState(committee.head)

  const [patientList, setPatientList] = useState(patients.getValues())
  const [committeeList, setCommitteeList] = useState(committee.getValues())

  const [newPatient, setNewPatient] = useState('')
  const [newMember, setNewMember] = useState('')

  const attendPatient = () => {
    if (patient) {
      history.append(patient.value)
      patients.remove(patient.value)

      setPatient(patients.head)
      setPatientList(patients.getValues())
      setHistorySize(history.length)
      setCurrentHistory(history.tail)
    }
  }

  const addPatient = () => {
    if (newPatient) {
      patients.append(newPatient)

      setPatient(patients.head)
      setPatientList(patients.getValues())
      setNewPatient('')
    }
  }

  const addMember = () => {
    if (newMember) {
      committee.append(newMember)

      setCommitteeList(committee.getValues())
      setCurrentMember(committee.tail)
      setNewMember('')
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentDoctor?.next) {
        setCurrentDoctor(currentDoctor.next)
      }
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [currentDoctor])

  const nextHistory = () => {
    if (currentHistory?.next) {
      setCurrentHistory(currentHistory.next)
    }
  }

  const previousHistory = () => {
    if (currentHistory?.previous) {
      setCurrentHistory(currentHistory.previous)
    }
  }

  const nextMember = () => {
    if (currentMember?.next) {
      setCurrentMember(currentMember.next)
    }
  }

  const previousMember = () => {
    if (currentMember?.previous) {
      setCurrentMember(currentMember.previous)
    }
  }

  return (
    <div>
      <h1>Sistema de Clínica</h1>

      <h2>Agregar paciente</h2>

      <input
        type="text"
        value={newPatient}
        onChange={(event) => setNewPatient(event.target.value)}
        placeholder="Nombre del paciente"
      />

      <button onClick={addPatient}>
        Agregar paciente
      </button>

      <h2>Pacientes esperando</h2>

      {patientList.map((patientName, index) => (
        <p key={index}>{patientName}</p>
      ))}

      <p>Pacientes en espera: {patients.length}</p>

      <button onClick={attendPatient}>
        Atender paciente
      </button>

      <h2>Historial de atención</h2>

      <p>Pacientes atendidos: {historySize}</p>

      <p>
        {currentHistory
          ? currentHistory.value
          : 'No hay pacientes atendidos'}
      </p>

      <button onClick={previousHistory}>
        Anterior
      </button>

      <button onClick={nextHistory}>
        Siguiente
      </button>

      <h2>Doctor de turno</h2>

      <p>
        {currentDoctor
          ? currentDoctor.value
          : 'No hay doctor'}
      </p>

      <p>Doctores disponibles: {doctors.length}</p>

      <h2>Comité administrativo</h2>

      <input
        type="text"
        value={newMember}
        onChange={(event) => setNewMember(event.target.value)}
        placeholder="Nombre del miembro"
      />

      <button onClick={addMember}>
        Agregar miembro
      </button>

      {committeeList.map((memberName, index) => (
        <p key={index}>{memberName}</p>
      ))}

      <p>Miembros: {committee.length}</p>

      <p>
        Miembro actual:{' '}
        {currentMember
          ? currentMember.value
          : 'No hay miembros'}
      </p>

      <button onClick={previousMember}>
        Anterior
      </button>

      <button onClick={nextMember}>
        Siguiente
      </button>
    </div>
  )
}

export default App