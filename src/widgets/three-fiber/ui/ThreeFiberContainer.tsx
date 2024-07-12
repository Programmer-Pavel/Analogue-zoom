import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Sky, Text } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import Ecctrl, { EcctrlJoystick } from 'ecctrl'
import { MeshPhysicalMaterial } from 'three'
import { Box } from './Box'
import { Floor } from './Floor'
import { Player } from './Player'

export function ThreeFiberContainer() {
  const [intersecting, setIntersection] = useState(false)

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  const onIntersectionEnter = (payload: any) => {
    if (payload.rigidBodyObject.name === 'player')
      setIntersection(true)
  }

  const onIntersectionExit = (payload: any) => {
    if (payload.rigidBodyObject.name === 'player')
      setIntersection(false)
  }

  return (
    <>
      {/* <EcctrlJoystick /> */}
      <Canvas camera={{ fov: 45 }} shadows>
        <Suspense>
          {/* <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={50} /> */}
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={1.5} />
          <Physics debug gravity={[0, -5, 0]} timeStep="vary">
            <RigidBody name="player" colliders="ball">
              <mesh position={[0, 0, 0]}>
                <sphereGeometry />
              </mesh>
            </RigidBody>

            <KeyboardControls map={keyboardMap}>
              <Ecctrl
                debug
                springK={2}
                jumpVel={5}
                autoBalance={false}
                autoBalanceSpringK={0}
                autoBalanceDampingC={0}
                autoBalanceSpringOnY={0}
                autoBalanceDampingOnY={5}
                colliders="cuboid"
                position={[3, 0, 0]}
                disableFollowCam
                disableFollowCamPos={{ x: 0, y: 10, z: -50 }}
              >
                <Player />
              </Ecctrl>
            </KeyboardControls>

            <CuboidCollider
              position={[-8, -2, 5]}
              args={[8, 5, 1]}
              sensor
              onIntersectionEnter={payload => onIntersectionEnter(payload)}
              onIntersectionExit={payload => onIntersectionExit(payload)}
            />

            <RigidBody position={[-8, 3, 4]} type="fixed">
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[15, 1, 1]} />
              </mesh>
              <mesh position={[8, -4, 0]}>
                <boxGeometry args={[1, 9, 1]} />
              </mesh>
              <mesh position={[-8, -4, 0]}>
                <boxGeometry args={[1, 9, 1]} />
              </mesh>
            </RigidBody>

            {intersecting && (
              <Text color="red" position={[-6, 5, 0]} fontSize={2}>
                !
              </Text>
            )}
            <Floor />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}
