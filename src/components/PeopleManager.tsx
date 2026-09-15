import { useState } from 'react'
import type { Person } from '../types'

interface PeopleManagerProps {
  people: Person[]
  onAdd: (name: string) => boolean
  onRemove: (id: string) => void
}

export function PeopleManager({ people, onAdd, onRemove }: PeopleManagerProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = onAdd(name)
    if (!ok) {
      setError(name.trim() ? 'That name is already on the list.' : 'Please enter a name.')
      return
    }
    setError('')
    setName('')
  }

  return (
    <section className="rounded-3xl border border-saffron-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-saffron-900">Devotees</h2>
        <span className="rounded-full bg-saffron-100 px-3 py-1 text-sm font-semibold text-saffron-700">
          {people.length}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError('')
          }}
          placeholder="Add a devotee's name"
          className="w-full rounded-xl border border-saffron-200 bg-saffron-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-saffron-400 focus:ring-2 focus:ring-saffron-200"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-saffron-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-saffron-600 active:scale-95"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <ul className="mt-4 flex flex-col gap-2">
        {people.length === 0 && (
          <li className="rounded-xl border border-dashed border-saffron-200 px-4 py-6 text-center text-sm text-saffron-500">
            No devotees yet. Add people to start marking aarti attendance.
          </li>
        )}
        {people.map((p) => (
          <li
            key={p.id}
            className="flex animate-pop-in items-center justify-between rounded-xl bg-saffron-50 px-4 py-2.5"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-saffron-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-saffron-200 text-xs font-bold text-saffron-700">
                {p.name.charAt(0).toUpperCase()}
              </span>
              {p.name}
            </span>
            <button
              onClick={() => onRemove(p.id)}
              className="rounded-lg px-2 py-1 text-xs font-semibold text-saffron-500 transition hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${p.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
