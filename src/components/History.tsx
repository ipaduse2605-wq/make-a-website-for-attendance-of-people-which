import type { AartiSession, Person } from '../types'

interface HistoryProps {
  sessions: AartiSession[]
  peopleById: Map<string, Person>
  onRemove: (id: string) => void
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function History({ sessions, peopleById, onRemove }: HistoryProps) {
  return (
    <section className="rounded-3xl border border-saffron-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-saffron-900">Aarti History</h2>
        <span className="rounded-full bg-saffron-100 px-3 py-1 text-sm font-semibold text-saffron-700">
          {sessions.length}
        </span>
      </div>

      {sessions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-saffron-200 px-4 py-6 text-center text-sm text-saffron-500">
          Recorded aartis will appear here.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sessions.map((s) => {
            const names = s.presentIds
              .map((id) => peopleById.get(id)?.name)
              .filter((n): n is string => Boolean(n))
            return (
              <li key={s.id} className="rounded-2xl border border-saffron-100 bg-saffron-50/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-saffron-900">
                      {s.label} Aarti · {formatDate(s.date)}
                    </p>
                    <p className="mt-0.5 text-xs text-saffron-600">
                      {names.length} present · {s.pointsPerHead} modak each ·{' '}
                      <span className="font-semibold">{names.length * s.pointsPerHead}</span> total
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(s.id)}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-saffron-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
                {names.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {names.map((n) => (
                      <span
                        key={n}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-saffron-700 shadow-sm"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
