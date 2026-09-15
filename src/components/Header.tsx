import { ModakIcon } from './ModakIcon'

interface HeaderProps {
  peopleCount: number
  sessionCount: number
  totalModak: number
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-sm">
      <span className="text-2xl font-bold leading-none">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wide text-white/80">{label}</span>
    </div>
  )
}

export function Header({ peopleCount, sessionCount, totalModak }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-saffron-500 via-saffron-600 to-red-600 text-white">
      <div className="pointer-events-none absolute -right-10 -top-10 opacity-20">
        <ModakIcon className="h-56 w-56 animate-float" />
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:py-14">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
            <ModakIcon className="h-9 w-9" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Aarti Attendance
            </h1>
            <p className="text-sm text-white/85 sm:text-base">
              Mark who is present at aarti &amp; reward them with modak points 🪔
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:max-w-md">
          <Stat label="Devotees" value={peopleCount} />
          <Stat label="Aartis" value={sessionCount} />
          <Stat label="Modak Pts" value={totalModak} />
        </div>
      </div>
    </header>
  )
}
