interface MultiplierHistoryProps {
  multiplierHistory: number[]
}
export function MultiplierHistory({
  multiplierHistory
}: MultiplierHistoryProps) {
  return (
    <div className="absolute right-4 top-40 flex w-16 flex-col gap-1 overflow-hidden rounded-md bg-background md:top-60">
      {multiplierHistory.map((multiplier, index) => {
        if (index > 3 || !multiplier) return null
        return (
          <span
            key={`${multiplier}${index}${Math.random()}`}
            className="flex items-center justify-center bg-purpleDark p-1 font-bold text-text"
          >
            {multiplier}x
          </span>
        )
      })}
    </div>
  )
}
