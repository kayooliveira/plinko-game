import { Plinko } from 'components/Plinko'
import { useSelector } from 'react-redux'
import { useWallet } from 'redux/slicers/sliceWallet'
export function GamePlinkoPage() {
  const wallet = useSelector(useWallet)

  return (
    <div>
      <h1 className="w-full bg-background p-4 text-center text-3xl font-bold text-green">
        {wallet.currentBalanceFormatted}
        <br />

        <span className=" text-xs text-greenDark">
          {wallet.currentBalance.toFixed(2)}
        </span>
      </h1>
      <Plinko />
    </div>
  )
}
