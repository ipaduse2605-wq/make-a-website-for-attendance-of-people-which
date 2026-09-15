import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AartiSession, LeaderboardEntry, Person } from '../types'

const PEOPLE_KEY = 'aarti.people.v1'
const SESSIONS_KEY = 'aarti.sessions.v1'

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore write failures (e.g. private mode) */
  }
}

export function useAttendanceStore() {
  const [people, setPeople] = useState<Person[]>(() => load<Person[]>(PEOPLE_KEY, []))
  const [sessions, setSessions] = useState<AartiSession[]>(() =>
    load<AartiSession[]>(SESSIONS_KEY, []),
  )

  useEffect(() => save(PEOPLE_KEY, people), [people])
  useEffect(() => save(SESSIONS_KEY, sessions), [sessions])

  const addPerson = useCallback((name: string): boolean => {
    const trimmed = name.trim()
    if (!trimmed) return false
    let added = false
    setPeople((prev) => {
      const exists = prev.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())
      if (exists) return prev
      added = true
      return [...prev, { id: makeId(), name: trimmed, createdAt: Date.now() }]
    })
    return added
  }, [])

  const removePerson = useCallback((id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id))
    setSessions((prev) =>
      prev.map((s) => ({ ...s, presentIds: s.presentIds.filter((pid) => pid !== id) })),
    )
  }, [])

  const recordSession = useCallback(
    (input: { date: string; label: string; pointsPerHead: number; presentIds: string[] }) => {
      setSessions((prev) => [
        {
          id: makeId(),
          date: input.date,
          label: input.label,
          pointsPerHead: input.pointsPerHead,
          presentIds: [...input.presentIds],
          createdAt: Date.now(),
        },
        ...prev,
      ])
    },
    [],
  )

  const removeSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const peopleById = useMemo(() => {
    const map = new Map<string, Person>()
    for (const p of people) map.set(p.id, p)
    return map
  }, [people])

  const leaderboard = useMemo<LeaderboardEntry[]>(() => {
    const totals = new Map<string, { points: number; count: number }>()
    for (const p of people) totals.set(p.id, { points: 0, count: 0 })
    for (const s of sessions) {
      for (const pid of s.presentIds) {
        const entry = totals.get(pid)
        if (!entry) continue
        entry.points += s.pointsPerHead
        entry.count += 1
      }
    }
    return people
      .map((person) => {
        const t = totals.get(person.id) ?? { points: 0, count: 0 }
        return { person, totalPoints: t.points, attendanceCount: t.count }
      })
      .sort((a, b) => b.totalPoints - a.totalPoints || a.person.name.localeCompare(b.person.name))
  }, [people, sessions])

  const totalModak = useMemo(
    () => leaderboard.reduce((sum, e) => sum + e.totalPoints, 0),
    [leaderboard],
  )

  return {
    people,
    sessions,
    peopleById,
    leaderboard,
    totalModak,
    addPerson,
    removePerson,
    recordSession,
    removeSession,
  }
}

export type AttendanceStore = ReturnType<typeof useAttendanceStore>
