'use client'

import { useState } from 'react'
import { Bell, Calendar, Plus, RefreshCw, Star, Trash2, X } from 'lucide-react'

export default function TaskDetail() {
  const [isChecked, setIsChecked] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  return (
    <div className="w-1/4 bg-[#EEF6EF] rounded-lg shadow">
      {/* Task Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="w-5 h-5 border-2 border-gray-300 rounded checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className={`text-lg ${isChecked ? 'line-through text-[#1B281B]' : 'text-gray-700'}`}>
              Buy groceries
            </span>
          </div>
          <button
            onClick={() => setIsStarred(!isStarred)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Star 
              className={`h-5 w-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-[#1B281B]'}`}
            />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2 border-b">
        <button className="w-full flex items-center gap-3 p-2 text-[#1B281B] hover:bg-gray-50 rounded-lg">
          <Plus className="h-5 w-5" />
          <span>Add Step</span>
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-[#1B281B] hover:bg-gray-50 rounded-lg">
          <Bell className="h-5 w-5" />
          <span>Set Reminder</span>
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-[#1B281B] hover:bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5" />
          <span>Add Due Date</span>
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-[#1B281B] hover:bg-gray-50 rounded-lg">
          <RefreshCw className="h-5 w-5" />
          <span>Repeat</span>
        </button>
      </div>

      {/* Notes Section */}
      <div className="p-4 border-b">
        <textarea
          placeholder="Add Notes"
          className="w-full h-32 p-2 text-[#1B281B] bg-transparent border-none resize-none focus:ring-0 placeholder-[rgba(27, 40, 27, 0.59)]"
        />
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <button className="hover:bg-gray-100 p-1 rounded-full">
            <X className="h-4 w-4" />
          </button>
          <span>Created Today</span>
        </div>
        <button className="hover:bg-gray-100 p-1 rounded-full">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

