import { CurrencyDollarSimple } from 'phosphor-react'
import { formatPoints } from 'utils/currencyFormat'

interface WalletCardProps {
  showFormatted?: boolean
  balance: number
}
export function WalletCard({ balance, showFormatted }: WalletCardProps) {
  const currency = showFormatted ? formatPoints(balance) : balance
  return (
    <div className="flex cursor-pointer items-stretch">
      <div className="flex items-center gap-2 rounded-tl-md rounded-bl-md bg-background px-2 py-1 pr-4 font-bold uppercase text-white md:text-lg">
        <span className="rounded-full bg-purpleDark p-1">
          <CurrencyDollarSimple weight="bold" />
        </span>
        <span title={String(balance)}>{currency}</span>
      </div>
      <span
        title="Plinko Points"
        className="rounded-tr-md rounded-br-md bg-purpleDark p-2 font-bold text-white"
      >
        PP
      </span>
    </div>
  )
}
