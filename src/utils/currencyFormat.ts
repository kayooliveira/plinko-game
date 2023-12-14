export function currencyFormat(number: number) {
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}

export function formatPoints(number: number): string {
  const decPlaces = 10
  if (number < 999) return number.toFixed(2)
  let newNumber: number | string = number
  const abbrev = [
    ' k',
    ' Mi',
    ' Bi',
    ' Tri',
    ' Qua',
    ' Qui',
    ' Sex',
    ' Sep',
    ' Oct',
    ' Non',
    ' Dec',
    ' UnD',
    ' DuD',
    ' TriD',
    ' QuadD',
    ' QuinD',
    ' SexD',
    ' SepD',
    ' OctD',
    ' NonD',
    ' VigD',
    ' UnV',
    ' DuV',
    ' TriV',
    ' QuadV',
    ' QuinV',
    ' SexV',
    ' SepV',
    ' OctV',
    ' NonV',
    ' TrigV',
    ' QuadragV',
    ' QuinquagV',
    ' SexagV',
    ' SeptuagV',
    ' OctogV',
    ' NonagV',
    ' CentV',
    ' DucentV',
    ' TrecentV',
    ' QuadringV',
    ' QuingentV',
    ' SexcentV',
    ' SeptingentV',
    ' OctingentV',
    ' NongentV',
    ' MillV',
    ' UnDuoMillV',
    ' DuoDuoMillV',
    ' TreDuoMillV',
    ' QuattuorDuoMillV',
    ' QuinDuoMillV',
    ' SexDuoMillV',
    ' SepDuoMillV',
    ' OctDuoMillV',
    ' NovemDuoMillV',
    ' VigintiMillV',
    ' TrigintiMillV',
    ' QuadragintiMillV',
    ' QuinquagintiMillV',
    ' SexagintiMillV',
    ' SeptuagintiMillV',
    ' OctogintiMillV',
    ' NonagintiMillV',
    ' CentumMillV',
    ' DucentumMillV',
    ' TrecentumMillV',
    ' QuadringentumMillV',
    ' QuingentumMillV',
    ' SexcentumMillV',
    ' SeptingentumMillV',
    ' OctingentumMillV',
    ' NongentumMillV',
    ' Millies',
    ' UnDuoMillies',
    ' DuoDuoMillies',
    ' TreDuoMillies',
    ' QuattuorDuoMillies',
    ' QuinDuoMillies',
    ' SexDuoMillies',
    ' SepDuoMillies',
    ' OctDuoMillies',
    ' NovemDuoMillies',
    ' VigintiMillies',
  ]

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)
    if (size <= newNumber) {
      newNumber = Math.floor((newNumber * decPlaces) / size) / decPlaces
      if (newNumber === 1000 && i < abbrev.length - 1) {
        newNumber = 1
        i++
      }
      newNumber = newNumber.toFixed()
      newNumber += abbrev[i]
      break
    }
  }

  return String(newNumber)
}

