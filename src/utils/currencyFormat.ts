export function currencyFormat(number: number) {
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}

export function formatPoints(number: number): string {
  const decPlaces = 10
  if (number < 999) return number.toFixed(2)
  let newNumber: any = number
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
    ' TrigV'
  ]

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3)

    // If the number is bigger or equal do the abbreviation
    if (size <= newNumber) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      newNumber = Math.floor((newNumber * decPlaces) / size) / decPlaces

      // Handle special case where we round up to the next abbreviation
      if (newNumber === 1000 && i < abbrev.length - 1) {
        newNumber = 1
        i++
      }

      // Add the letter for the abbreviation
      newNumber += abbrev[i]

      // We are done... stop
      break
    }
  }

  return newNumber
}
