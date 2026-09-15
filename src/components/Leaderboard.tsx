import type { LeaderboardEntry } from '../types'
import { ModakIcon } from './ModakIcon'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

const MEDALS = ['🥇', '🥈', '🥉']

export function Leaderboard({ entries }: LeaderboardProps) {
  const hasPoints = entries.some((e) => e.totalPoints > 0)

  return (
    <section className="rounded-3xl border border-saffron-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <ModakIcon className="h-6 w-6" />
        <h2 className="font-display text-xl font-bold text-saffron-900">Modak Leaderboard</h2>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-saffron-200 px-4 py-6 text-center text-sm text-saffron-500">
          The leaderboard will fill up as devotees attend aarti.
        </p>
      ) : (
        <ol className="flex flex-col gap-2">
          {entries.map((entry, i) => {
            const isTop = hasPoints && i < 3 && entry.totalPoints > 0
            return (
              <li
                key={entry.person.id}
                className={[
                  'flex items-center justify-between rounded-xl px-4 py-3 transition',
                  isTop
                    ? 'bg-gradient-to-r from-saffron-100 to-saffron-50 ring-1 ring-saffron-200'
                    : 'bg-saffron-50/60',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-lg font-bold text-saffron-500">
                    {isTop ? MEDALS[i] : i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-saffron-900">{entry.person.name}</p>
                    <p className="text-xs text-saffron-500">
                      {entry.attendanceCount} aarti{entry.attendanceCount === 1 ? '' : 's'} attended
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm">
                  <ModakIcon className="h-4 w-4" />
                  <span className="text-sm font-bold text-saffron-700">{entry.totalPoints}</span>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
