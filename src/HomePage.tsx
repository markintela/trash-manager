'use client'

import { useState } from 'react'
import { Circle, Check, Trash2 } from 'lucide-react'

export default function HomePage() {
  type TrashItem = {
    id: number
    name: string
    dateThrowOut: string
    isPending: boolean
  }

  const initialData: TrashItem[] = [
    { id: 1, name: 'Marcusd', dateThrowOut: '2025-10-10', isPending: true },
    { id: 2, name: 'Alonso', dateThrowOut: '2025-10-12', isPending: false },
    { id: 3, name: 'Hanna', dateThrowOut: '2025-10-13', isPending: false },
    { id: 4, name: 'Jidenna', dateThrowOut: '2025-10-13', isPending: false },
    { id: 5, name: 'Kristina', dateThrowOut: '2025-10-13', isPending: false }
  ]

  const [data] = useState<TrashItem[]>(initialData)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null)
  const [trashTypes, setTrashTypes] = useState<string[]>([])

  const handleOpenModal = (item: TrashItem) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setTrashTypes([])
  }

  const handleToggleType = (type: string) => {
    setTrashTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleConfirm = () => {
    console.log(`Selected types for ${selectedItem?.name}:`, trashTypes)
    handleCloseModal()
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trash Collection</h1>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Date Throw Out</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Is Pending</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{item.name}</td>
              <td className="px-4 py-2">{item.dateThrowOut}</td>
              <td className="px-4 py-2">
                <Circle
                  className={`h-5 w-5 ${
                    item.isPending ? 'text-green-500' : 'text-red-500'
                  }`}
                  fill={item.isPending ? 'green' : 'red'}
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="flex items-center gap-1 bg-[#b849c7] hover:bg-[#a03eb0] text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Select Trash Type
            </h2>
            <div className="space-y-2">
              {['Food', 'Normal', 'Glasses', 'Paper'].map(type => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={trashTypes.includes(type)}
                    onChange={() => handleToggleType(type)}
                    className="accent-[#b849c7]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                <Check className="h-4 w-4" /> Check
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
