import { useState } from "react"
import { ClientList } from "./features/clients/components/ClientList"
import { Modal } from "./components/Modal"
import { ClientForm } from "./features/clients/components/ClientForm"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Taller</h1>
            <p className="text-gray-600 mt-1">Gestion de clientes</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            + Nuevo Cliente
          </button>
        </header>
        <main>
          <ClientList />  
        </main>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Agregar Nuevo Cliente"
        >
          <ClientForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  )
}
export default App