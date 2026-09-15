export interface Person {
  id: string
  name: string
  createdAt: number
}

export interface AartiSession {
  id: string
  /** ISO date string (YYYY-MM-DD) of the aarti */
  date: string
  /** Which aarti of the day, e.g. "Morning" / "Evening" */
  label: string
  /** Modak points awarded to each person present at this aarti */
  pointsPerHead: number
  /** Ids of people who were present */
  presentIds: string[]
  createdAt: number
}

export interface LeaderboardEntry {
  person: Person
  totalPoints: number
  attendanceCount: number
}
