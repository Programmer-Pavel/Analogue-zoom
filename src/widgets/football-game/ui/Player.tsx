import { forwardRef, useRef } from 'react'
import { KeyboardControls } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import { type CollisionEnterPayload, type CollisionExitPayload, vec3 } from '@react-three/rapier'

export const Player = forwardRef<any, any>((props, ref) => {
  const playerRef = useRef<any>(null)

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp'] },
    { name: 'backward', keys: ['ArrowDown'] },
    { name: 'leftward', keys: ['ArrowLeft'] },
    { name: 'rightward', keys: ['ArrowRight'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  const keydownEventFunc = (e: KeyboardEvent) => {
    if (e.key === 'd') {
      const position = vec3()
      playerRef.current.getWorldDirection(position)
      position.normalize().multiplyScalar(20)

      // @ts-expect-error fix
      ref.current.applyImpulse({ x: position.x, y: position.y, z: position.z }, true)
    }
  }

  const onCollisionEnter = ({ other }: CollisionEnterPayload) => {
    if (other.rigidBodyObject.name === 'ball') {
      document.addEventListener('keydown', keydownEventFunc)
    }
  }

  const onCollisionExit = ({ other }: CollisionExitPayload) => {
    if (other.rigidBodyObject.name === 'ball') {
      document.removeEventListener('keydown', keydownEventFunc)
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
