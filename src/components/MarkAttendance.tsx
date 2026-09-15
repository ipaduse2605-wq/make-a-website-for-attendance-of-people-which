import { useMemo, useState } from 'react'
import type { Person } from '../types'
import { ModakIcon } from './ModakIcon'

interface MarkAttendanceProps {
  people: Person[]
  onRecord: (input: {
    date: string
    label: string
    pointsPerHead: number
    presentIds: string[]
  }) => void
}

const AARTI_LABELS = ['Morning', 'Noon', 'Evening', 'Night']

function todayISO(): string {
  const now = new Date()
  const tzOffset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10)
}

export function MarkAttendance({ people, onRecord }: MarkAttendanceProps) {
  const [date, setDate] = useState(todayISO())
  const [label, setLabel] = useState('Evening')
  const [points, setPoints] = useState(10)
  const [present, setPresent] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState(false)

  const presentCount = present.size

  const allSelected = people.length > 0 && presentCount === people.length

  const toggle = (id: string) => {
    setSaved(false)
    setPresent((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    setSaved(false)
    setPresent((prev) => (prev.size === people.length ? new Set() : new Set(people.map((p) => p.id))))
  }

  const handleRecord = () => {
    if (presentCount === 0) return
    onRecord({
      date,
      label,
      pointsPerHead: Number.isFinite(points) ? Math.max(0, Math.round(points)) : 0,
      presentIds: Array.from(present),
    })
    setPresent(new Set())
    setSaved(true)
  }

  const modakToAward = useMemo(
    () => presentCount * Math.max(0, Math.round(points || 0)),
    [presentCount, points],
  )

  return (
    <section className="rounded-3xl border border-saffron-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-saffron-900">Mark Aarti Attendance</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-saffron-600">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-saffron-200 bg-saffron-50/50 px-3 py-2 text-sm font-normal normal-case text-saffron-900 outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-200"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-saffron-600">
          Aarti
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded-xl border border-saffron-200 bg-saffron-50/50 px-3 py-2 text-sm font-normal normal-case text-saffron-900 outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-200"
          >
            {AARTI_LABELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-saffron-600">
          Modak / head
          <input
            type="number"
            min={0}
            value={points}
            onChange={(e) => setPoints(e.target.valueAsNumber)}
            className="rounded-xl border border-saffron-200 bg-saffron-50/50 px-3 py-2 text-sm font-normal normal-case text-saffron-900 outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-200"
          />
        </label>
      </div>

      {people.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-saffron-200 px-4 py-6 text-center text-sm text-saffron-500">
          Add devotees first to mark who is present.
        </p>
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-medium text-saffron-700">
              Present: <span className="font-bold">{presentCount}</span> / {people.length}
            </p>
            <button
              onClick={toggleAll}
              className="rounded-lg px-3 py-1 text-xs font-semibold text-saffron-600 transition hover:bg-saffron-50"
            >
              {allSelected ? 'Clear all' : 'Select all'}
            </button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {people.map((p) => {
              const isPresent = present.has(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className={[
                    'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition active:scale-95',
                    isPresent
                      ? 'border-saffron-500 bg-saffron-500 text-white shadow-sm'
                      : 'border-saffron-200 bg-white text-saffron-800 hover:border-saffron-300 hover:bg-saffron-50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                      isPresent ? 'border-white bg-white text-saffron-600' : 'border-saffron-300 text-transparent',
                    ].join(' ')}
                  >
                    ✓
                  </span>
                  <span className="truncate">{p.name}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 text-sm text-saffron-700">
              <ModakIcon className="h-5 w-5" />
              Awards <span className="font-bold">{modakToAward}</span> modak points
            </p>
            <button
              onClick={handleRecord}
              disabled={presentCount === 0}
              className="rounded-xl bg-saffron-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-saffron-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-saffron-300"
            >
              Record aarti attendance
            </button>
          </div>

          {saved && (
            <p className="mt-3 animate-pop-in rounded-xl bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              🙏 Attendance recorded and modak points awarded!
            </p>
          )}
        </>
      )}
    </section>
  )
}
