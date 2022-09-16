import { Gift } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/auth'
import { formatPoints } from 'utils/currencyFormat'

export function Gifts() {
  const redeemGift = useAuthStore(state => state.redeemGift)
  const currentBalance = useAuthStore(state => state.wallet.balance)
  const navigate = useNavigate()
  async function handleRedeemGift() {
    await redeemGift()
    navigate('/')
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-text">
      <Gift className="text-purple" weight="fill" size="80" />
      <span className="text-center text-lg font-bold">
        Eba!!! Temos um presente pra você!
      </span>
      <span className="text-center text-lg font-bold">
        Percebemos que você tem somente{' '}
        <span className="text-purple">{formatPoints(currentBalance)}</span>{' '}
        pontos.
        <br />
        Mas não se preocupe, nesta página você pode resgatar até{' '}
        <span className="text-purple">300</span> pontos
        <br /> cada vez que seu saldo estiver abaixo de{' '}
        <span className="text-purple">10 PPs</span> <br />
        basta clicar no botão abaixo e contar com a sorte. <br />
      </span>
      <button
        onClick={handleRedeemGift}
        className="rounded-md bg-purpleDark px-4 py-2 font-bold text-text transition-colors hover:bg-purple"
      >
        RESGATAR
      </button>
    </div>
  )
}
