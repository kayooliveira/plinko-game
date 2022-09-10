import ballAudio from '@sounds/ball.wav'
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Render,
  Runner,
  World
} from 'matter-js'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { incrementCurrentBalance } from 'redux/slicers/sliceWallet'
import { random } from 'utils/random'

import { LinesType, MultiplierValues } from './@types'
import { PlinkoBody } from './components/Body'
import { config } from './config'
import {
  getMultiplierByLinesQnt,
  getMultiplierSound
} from './config/multipliers'

export function Plinko() {
  // #region States
  const isMobile = useMediaQuery({
    maxWidth: '860px'
  })
  const dispatch = useDispatch()
  const engine = Engine.create()
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [lines, setLines] = useState<LinesType>(16)
  const {
    pins: pinsConfig,
    colors,
    ball: ballConfig,
    engine: engineConfig,
    world: worldConfig
  } = config

  const worldWidth: number = isMobile
    ? worldConfig.width / 1.3
    : worldConfig.width

  const worldHeight: number = isMobile
    ? worldConfig.height / 1.3
    : worldConfig.height
  // #endregion

  useEffect(() => {
    engine.gravity.y = engineConfig.engineGravity
    const element = document.getElementById('plinko')
    const render = Render.create({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      element: element!,
      bounds: {
        max: {
          y: worldHeight,
          x: worldWidth
        },
        min: {
          y: 0,
          x: 0
        }
      },
      options: {
        background: colors.background,
        hasBounds: true,
        width: worldWidth,
        height: worldHeight,
        wireframes: false
      },
      engine
    })
    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)
    return () => {
      World.clear(engine.world, true)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [lines, isTesting, isMobile])

  const pins: Body[] = []

  for (let l = 0; l < lines; l++) {
    const linePins = pinsConfig.startPins + l
    const lineWidth = linePins * pinsConfig.pinGap
    for (let i = 0; i < linePins; i++) {
      const pinX =
        worldWidth / 2 -
        lineWidth / 2 +
        i * pinsConfig.pinGap +
        pinsConfig.pinGap / 2

      const pinY =
        worldWidth / lines + l * pinsConfig.pinGap + pinsConfig.pinGap

      const pin = Bodies.circle(pinX, pinY, pinsConfig.pinSize, {
        label: `pin-${i}`,
        render: {
          fillStyle: 'white'
        },
        isStatic: true
      })
      pins.push(pin)
    }
  }

  const addBall = useCallback(() => {
    const ballSound = new Audio(ballAudio)
    ballSound.volume = 0.2
    ballSound.currentTime = 0
    ballSound.play()

    const minBallX = worldWidth / 2 - pinsConfig.pinSize * 3 + pinsConfig.pinGap
    const maxBallX =
      worldWidth / 2 -
      pinsConfig.pinSize * 3 -
      pinsConfig.pinGap +
      pinsConfig.pinGap / 2

    const ballX = random(minBallX, maxBallX)

    const ball = Bodies.circle(ballX, 20, ballConfig.ballSize, {
      restitution: 1,
      friction: 0.6,
      label: 'ball-2',
      id: new Date().getTime(),
      frictionAir: 0.05,
      render: {
        fillStyle: config.colors.orange
      },
      isStatic: false
    })
    Composite.add(engine.world, ball)
  }, [lines, isMobile])

  const leftWall = Bodies.rectangle(
    worldWidth / 3 - pinsConfig.pinSize * pinsConfig.pinGap - pinsConfig.pinGap,
    worldWidth / 2 - pinsConfig.pinSize,
    worldWidth * 2,
    40,
    {
      angle: 90,
      render: {
        visible: false
      },
      isStatic: true
    }
  )
  const rightWall = Bodies.rectangle(
    worldWidth -
      pinsConfig.pinSize * pinsConfig.pinGap -
      pinsConfig.pinGap -
      pinsConfig.pinGap / 2,
    worldWidth / 2 - pinsConfig.pinSize,
    worldWidth * 2,
    40,
    {
      angle: -90,
      render: {
        visible: false
      },
      isStatic: true,
      isSensor: true
    }
  )

  const multipliers = getMultiplierByLinesQnt(lines)

  const multipliersBodies: Body[] = []

  let lastMultiplierX: number =
    worldWidth / 2 - (pinsConfig.pinGap / 2) * lines - pinsConfig.pinGap

  multipliers.forEach(multiplier => {
    const blockSize = 21 // height and width
    const multiplierBody = Bodies.rectangle(
      lastMultiplierX + 20,
      worldWidth / lines + lines * pinsConfig.pinGap + pinsConfig.pinGap,
      blockSize,
      blockSize,
      {
        label: multiplier.label,
        isStatic: true,
        render: {
          sprite: {
            xScale: 1,
            yScale: 1,
            texture: multiplier.img
          }
        }
      }
    )
    lastMultiplierX = multiplierBody.position.x
    multipliersBodies.push(multiplierBody)
  })

  Composite.add(engine.world, [
    ...pins,
    ...multipliersBodies,
    leftWall,
    rightWall
  ])

  function bet() {
    addBall()
  }

  function setBalance(number: number) {
    dispatch(incrementCurrentBalance(number))
  }

  Events.on(engine, 'collisionActive', event => {
    const pairs = event.pairs
    for (const pair of pairs) {
      const { bodyA, bodyB } = pair
      if (bodyB.label.includes('ball') && bodyA.label.includes('block')) {
        pair.bodyB.collisionFilter.group = 2
        World.remove(engine.world, pair.bodyB)
        const ballValue = bodyB.label.split('-')[1]
        const multiplierValue = +bodyA.label.split('-')[1] as MultiplierValues
        const multiplierSong = new Audio(getMultiplierSound(multiplierValue))
        multiplierSong.currentTime = 0
        multiplierSong.play()
        const newBalance = +ballValue * multiplierValue
        setBalance(newBalance)
      }
    }
  })

  return (
    <div className="h-full min-h-screen w-screen max-w-full bg-background">
      <div className="flex flex-col-reverse items-center justify-center gap-4 lg:flex-row">
        <div className="bg-primary text-text">
          <button
            onClick={bet}
            className="w-full rounded-md bg-green px-4 py-2 transition-colors hover:bg-greenDark"
          >
            APOSTAR
          </button>
        </div>
        <div className="flex-1">
          <PlinkoBody />
        </div>
      </div>
    </div>
  )
}
