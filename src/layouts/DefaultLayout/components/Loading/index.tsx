import { CircleNotch } from 'phosphor-react'

export function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background text-text">
      <CircleNotch className="animate-spin" size="50" weight="bold" />
    </div>
  )
}
