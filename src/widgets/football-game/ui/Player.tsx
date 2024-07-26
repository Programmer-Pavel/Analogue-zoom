import { forwardRef, useRef, useState } from 'react'
import { KeyboardControls } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import { type CollisionEnterPayload, type CollisionExitPayload, vec3 } from '@react-three/rapier'

export const Player = forwardRef<any, any>((props, ref) => {
  const keyDPressedRef = useRef(false)
  const playerRef = useRef<any>(null)
  const pressStartTimeRef = useRef<any>(null)

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp'] },
    { name: 'backward', keys: ['ArrowDown'] },
    { name: 'leftward', keys: ['ArrowLeft'] },
    { name: 'rightward', keys: ['ArrowRight'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  const keydownEventFunc = (e: KeyboardEvent) => {
    if (e.key === 'd' && !keyDPressedRef.current) {
      pressStartTimeRef.current = Date.now()
      keyDPressedRef.current = true
    }
  }

  const keyupEventFunc = (e: KeyboardEvent) => {
    if (e.key === 'd' && keyDPressedRef.current) {
      const direction = vec3()
      playerRef.current.getWorldDirection(direction)

      const pressDuration = (Date.now() - pressStartTimeRef.current) / 10
      let duration

      if (pressDuration > 50) {
        duration = 50
      }
      else if (pressDuration < 20) {
        duration = 20
      }
      else {
        duration = pressDuration
      }

      direction.normalize().multiplyScalar(duration)

      // @ts-expect-error fix
      ref.current.applyImpulse({ x: direction.x, y: direction.y, z: direction.z }, true)

      keyDPressedRef.current = false
    }
  }

  const onCollisionEnter = ({ other }: CollisionEnterPayload) => {
    if (other.rigidBodyObject.name === 'ball') {
      document.addEventListener('keydown', keydownEventFunc)
      document.addEventListener('keyup', keyupEventFunc)
    }
  }

  const onCollisionExit = ({ other }: CollisionExitPayload) => {
    if (other.rigidBodyObject.name === 'ball') {
      document.removeEventListener('keydown', keydownEventFunc)
      document.removeEventListener('keyup', keydownEventFunc)
    }
  }

  return (
    <KeyboardControls map={keyboardMap}>
      <Ecctrl
        name="player"
        springK={2}
        jumpVel={5}
        autoBalance={false}
        autoBalanceSpringK={0}
        autoBalanceDampingC={0}
        autoBalanceSpringOnY={0}
        autoBalanceDampingOnY={5}
        position={[3, 0, 0]}
        disableFollowCam
        disableFollowCamPos={{ x: 0, y: 10, z: -50 }}
        colliders="cuboid"
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      >
        <mesh ref={playerRef}>
          <boxGeometry args={[2, 2, 2]} />
        </mesh>
      </Ecctrl>
    </KeyboardControls>
  )
})
