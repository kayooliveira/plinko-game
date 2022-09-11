import { CurrencyDollarSimple } from 'phosphor-react'
import { useSelector } from 'react-redux'
import { useWallet } from 'redux/slicers/sliceWallet'

interface WalletCardProps {
  showFormatted?: boolean
}
export function WalletCard({ showFormatted }: WalletCardProps) {
  const wallet = useSelector(useWallet)
  const currency = showFormatted
    ? wallet.currentBalanceFormatted
    : wallet.currentBalance

  return (
    <div className="flex cursor-pointer items-stretch">
      <div className="flex items-center gap-2 rounded-tl-md rounded-bl-md bg-background px-2 py-1 pr-4 font-bold uppercase text-white md:text-lg">
        <span className="rounded-full bg-purpleDark p-1">
          <CurrencyDollarSimple weight="bold" />
        </span>
        <span title={wallet.currentBalance.toString()}>{currency}</span>
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
