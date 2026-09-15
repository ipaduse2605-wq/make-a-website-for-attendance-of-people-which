import { Header } from './components/Header'
import { PeopleManager } from './components/PeopleManager'
import { MarkAttendance } from './components/MarkAttendance'
import { Leaderboard } from './components/Leaderboard'
import { History } from './components/History'
import { useAttendanceStore } from './hooks/useAttendanceStore'

export default function App() {
  const store = useAttendanceStore()

  return (
    <div className="min-h-screen bg-saffron-50 text-saffron-950">
      <Header
        peopleCount={store.people.length}
        sessionCount={store.sessions.length}
        totalModak={store.totalModak}
      />

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-5 py-8 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <MarkAttendance people={store.people} onRecord={store.recordSession} />
          <PeopleManager
            people={store.people}
            onAdd={store.addPerson}
            onRemove={store.removePerson}
          />
        </div>
        <div className="flex flex-col gap-5">
          <Leaderboard entries={store.leaderboard} />
          <History
            sessions={store.sessions}
            peopleById={store.peopleById}
            onRemove={store.removeSession}
          />
        </div>
      </main>

      <footer className="border-t border-saffron-100 bg-white/60 py-6 text-center text-sm text-saffron-500">
        Made with devotion · Attendance &amp; modak points saved on this device 🪔
      </footer>
    </div>
  )
}
