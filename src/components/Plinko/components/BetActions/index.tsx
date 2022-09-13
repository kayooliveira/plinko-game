import { LinesType } from 'components/Plinko/@types'
import { CurrencyDollarSimple } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'redux/slicers/sliceAuth'
import { decrementCurrentBalance, useWallet } from 'redux/slicers/sliceWallet'

interface PlinkoBetActions {
  onRunBet: (betValue: number) => void
  onChangeLines: (lines: LinesType) => void
  inGameBallsCount: number
}

export function BetActions({
  onRunBet,
  onChangeLines,
  inGameBallsCount
}: PlinkoBetActions) {
  const { currentBalance, isLoading } = useSelector(useWallet)
  const { isAuth } = useSelector(useAuth)
  const [betValue, setBetValue] = useState(0)
  const maxLinesQnt = 16
  const linesOptions: number[] = []
  const dispatch = useDispatch()
  for (let i = 8; i <= maxLinesQnt; i++) {
    linesOptions.push(i)
  }

  function handleChangeBetValue(e: ChangeEvent<HTMLInputElement>) {
    if (!isAuth || isLoading) return
    e.preventDefault()
    const value = +e.target.value
    const newBetValue = value >= currentBalance ? currentBalance : value
    setBetValue(newBetValue)
  }

  function handleChangeLines(e: ChangeEvent<HTMLSelectElement>) {
    if (!isAuth || isLoading) return

    onChangeLines(Number(e.target.value) as LinesType)
  }

  function handleHalfBet() {
    if (!isAuth || isLoading) return
    const value = betValue / 2
    const newBetvalue = value <= 0 ? 0 : Math.floor(value)
    setBetValue(newBetvalue)
  }

  function handleDoubleBet() {
    if (!isAuth || isLoading) return
    const value = betValue * 2

    if (value >= currentBalance) {
      setBetValue(currentBalance)
      return
    }

    const newBetvalue = value <= 0 ? 0 : Math.floor(value)
    setBetValue(newBetvalue)
  }

  function handleMaxBet() {
    if (!isAuth || isLoading) return
    setBetValue(currentBalance)
  }

  function handleRunBet() {
    if (!isAuth || isLoading) return
    if (inGameBallsCount >= 15) return
    if (betValue > currentBalance) {
      setBetValue(currentBalance)
      return
    }
    dispatch(decrementCurrentBalance(betValue))
    onRunBet(betValue)
  }

  return (
    <div className="relative h-full w-full flex-1 py-8 px-4">
      <span className="absolute left-4 top-0 mx-auto text-xs font-bold text-text md:text-base">
        *bolas em jogo {inGameBallsCount}/15
      </span>
      <div className="flex h-full flex-col gap-4 rounded-md bg-primary p-4 text-text md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-1 md:flex-col">
            <div className="w-full text-sm font-bold md:text-base">
              <div className="flex flex-1 items-stretch justify-between">
                <span>Valor da aposta</span>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-purpleDark p-0.5">
                    <CurrencyDollarSimple weight="bold" />
                  </div>
                  <span>{betValue.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-stretch justify-center shadow-md">
                <input
                  type="number"
                  min={0}
                  max={currentBalance}
                  onChange={handleChangeBetValue}
                  value={betValue}
                  className="w-full rounded-bl-md rounded-tl-md border-2 border-secondary bg-background p-2.5 px-4 font-bold transition-colors placeholder:font-bold placeholder:text-text focus:border-purple focus:outline-none md:p-2"
                />
                <button
                  onClick={handleHalfBet}
                  className="relative border-2 border-transparent bg-secondary p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-background after:content-[''] hover:bg-secondary/80 focus:border-purple focus:outline-none md:p-2"
                >
                  ½
                </button>
                <button
                  onClick={handleDoubleBet}
                  className="relative border-2 border-transparent bg-secondary p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-background after:content-[''] hover:bg-secondary/80 focus:border-purple focus:outline-none md:p-2"
                >
                  2x
                </button>
                <button
                  onClick={handleMaxBet}
                  className="rounded-br-md rounded-tr-md border-2 border-transparent bg-secondary p-2 px-3 text-xs transition-colors hover:bg-secondary/80 focus:border-purple focus:outline-none"
                >
                  max
                </button>
              </div>
            </div>

            <button
              onClick={handleRunBet}
              className="block rounded-md bg-purple px-2 py-4 text-sm font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary md:hidden"
            >
              Apostar
            </button>
          </div>
          <select
            disabled={inGameBallsCount > 0}
            onChange={handleChangeLines}
            defaultValue={16}
            className="w-full rounded-md border-2 border-secondary bg-background py-2 px-4 font-bold transition-all placeholder:font-bold placeholder:text-text focus:border-purple focus:outline-none disabled:line-through disabled:opacity-80"
            id="lines"
          >
            {linesOptions.map(line => (
              <option key={line} value={line}>
                {line} Linhas
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunBet}
          className="hidden rounded-md bg-purple px-6 py-5 font-bold leading-none text-background transition-colors hover:bg-purpleDark focus:outline-none focus:ring-1 focus:ring-purple focus:ring-offset-1 focus:ring-offset-primary md:visible md:block"
        >
          Apostar
        </button>
      </div>
    </div>
  )
}
