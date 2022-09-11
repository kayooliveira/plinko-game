// multiplierImages
import multiplier0dot3Img from '@images/multipliers/multiplier0.3.png'
import multiplier0dot5Img from '@images/multipliers/multiplier0.5.png'
import multiplier1dot5Img from '@images/multipliers/multiplier1.5.png'
import multiplier1Img from '@images/multipliers/multiplier1.png'
import multiplier10Img from '@images/multipliers/multiplier10.png'
import multiplier110Img from '@images/multipliers/multiplier110.png'
import multiplier15Img from '@images/multipliers/multiplier15.png'
import multiplier18Img from '@images/multipliers/multiplier18.png'
import multiplier2Img from '@images/multipliers/multiplier2.png'
import multiplier25Img from '@images/multipliers/multiplier25.png'
import multiplier3Img from '@images/multipliers/multiplier3.png'
import multiplier33Img from '@images/multipliers/multiplier33.png'
import multiplier41Img from '@images/multipliers/multiplier41.png'
import multiplier5Img from '@images/multipliers/multiplier5.png'
import multiplier88Img from '@images/multipliers/multiplier88.png'
// multiplierSoundEffects
import multiplierBest from '@sounds/multiplier-best.wav'
import multiplierGood from '@sounds/multiplier-good.wav'
import multiplierLow from '@sounds/multiplier-low.wav'
import multiplierRegular from '@sounds/multiplier-regular.wav'

import { LinesType, MultiplierType, MultiplierValues } from '../@types'

const multiplierSounds = {
  110: multiplierBest,
  88: multiplierBest,
  41: multiplierBest,
  33: multiplierBest,
  25: multiplierBest,
  18: multiplierGood,
  15: multiplierGood,
  10: multiplierGood,
  5: multiplierGood,
  3: multiplierRegular,
  2: multiplierRegular,
  1.5: multiplierRegular,
  1: multiplierRegular,
  0.5: multiplierLow,
  0.3: multiplierLow
} as const

const multipliers = {
  110: {
    label: 'block-110',
    sound: multiplierBest,
    img: multiplier110Img
  },
  88: {
    label: 'block-88',
    sound: multiplierBest,
    img: multiplier88Img
  },
  41: {
    label: 'block-41',
    sound: multiplierBest,
    img: multiplier41Img
  },
  33: {
    label: 'block-33',
    sound: multiplierBest,
    img: multiplier33Img
  },
  25: {
    label: 'block-25',
    sound: multiplierBest,
    img: multiplier25Img
  },
  18: {
    label: 'block-18',
    sound: multiplierGood,
    img: multiplier18Img
  },
  15: {
    label: 'block-15',
    sound: multiplierGood,
    img: multiplier15Img
  },
  10: {
    label: 'block-10',
    sound: multiplierGood,
    img: multiplier10Img
  },
  5: {
    label: 'block-5',
    sound: multiplierGood,
    img: multiplier5Img
  },
  3: {
    label: 'block-3',
    sound: multiplierRegular,
    img: multiplier3Img
  },
  2: {
    label: 'block-2',
    sound: multiplierRegular,
    img: multiplier2Img
  },
  1.5: {
    label: 'block-1.5',
    sound: multiplierRegular,
    img: multiplier1dot5Img
  },
  1: {
    label: 'block-1',
    sound: multiplierRegular,
    img: multiplier1Img
  },
  0.5: {
    label: 'block-0.5',
    sound: multiplierLow,
    img: multiplier0dot5Img
  },
  0.3: {
    label: 'block-0.3',
    sound: multiplierLow,
    img: multiplier0dot3Img
  }
} as const

export type MultipliersType = keyof typeof multipliers

export function getMultiplier(value: MultipliersType): MultiplierType {
  return multipliers[value]
}

export const multiplyBlocks16Lines = [
  getMultiplier(110),
  getMultiplier(41),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(41),
  getMultiplier(110)
]

export const multiplyBlocks15Lines = [
  getMultiplier(88),
  getMultiplier(18),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(18),
  getMultiplier(88)
]
export const multiplyBlocks14Lines = [
  getMultiplier(41),
  getMultiplier(15),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(15),
  getMultiplier(41)
]
export const multiplyBlocks13Lines = [
  getMultiplier(41),
  getMultiplier(15),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(15),
  getMultiplier(41)
]
export const multiplyBlocks12Lines = [
  getMultiplier(33),
  getMultiplier(10),
  getMultiplier(3),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(3),
  getMultiplier(10),
  getMultiplier(33)
]
export const multiplyBlocks11Lines = [
  getMultiplier(25),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(2),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(2),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(25)
]
export const multiplyBlocks10Lines = [
  getMultiplier(25),
  getMultiplier(5),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(5),
  getMultiplier(25)
]
export const multiplyBlocks9Lines = [
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(5),
  getMultiplier(10)
]
export const multiplyBlocks8Lines = [
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5)
]

export const multiplyBlocksByLinesQnt = {
  8: multiplyBlocks8Lines,
  9: multiplyBlocks9Lines,
  10: multiplyBlocks10Lines,
  11: multiplyBlocks11Lines,
  12: multiplyBlocks12Lines,
  13: multiplyBlocks13Lines,
  14: multiplyBlocks14Lines,
  15: multiplyBlocks15Lines,
  16: multiplyBlocks16Lines
}

export function getMultiplierByLinesQnt(value: LinesType): MultiplierType[] {
  return multiplyBlocksByLinesQnt[value]
}

export function getMultiplierSound(value: MultiplierValues): string {
  return multiplierSounds[value]
}
