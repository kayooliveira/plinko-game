import { CurrencyDollarSimple } from 'phosphor-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'redux/slicers/sliceAuth'
import { getCurrentBalanceFromDb, useWallet } from 'redux/slicers/sliceWallet'

interface WalletCardProps {
  showFormatted?: boolean
}
export function WalletCard({ showFormatted }: WalletCardProps) {
  const { currentBalance, currentBalanceFormatted } = useSelector(useWallet)
  const {
    user: { id }
  } = useSelector(useAuth)
  const currency = showFormatted ? currentBalanceFormatted : currentBalance
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(getCurrentBalanceFromDb(id))
  }, [id])

  return (
    <div className="flex cursor-pointer items-stretch">
      <div className="flex items-center gap-2 rounded-tl-md rounded-bl-md bg-background px-2 py-1 pr-4 font-bold uppercase text-white md:text-lg">
        <span className="rounded-full bg-purpleDark p-1">
          <CurrencyDollarSimple weight="bold" />
        </span>
        <span title={currentBalance.toString()}>{currency}</span>
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
