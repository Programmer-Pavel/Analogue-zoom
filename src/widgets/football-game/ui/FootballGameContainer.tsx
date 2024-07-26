import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Text } from '@react-three/drei'
import type { RapierRigidBody } from '@react-three/rapier'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Floor } from './Floor'
import { Player } from './Player'

export function FootballGameContainer() {
  const [intersecting, setIntersection] = useState(false)

  const ballRigidBody = useRef<RapierRigidBody>(null)

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
      <Canvas camera={{ fov: 45 }}>
        <Suspense>
          {/* <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={50} /> */}
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={1.5} />
          <Physics debug timeStep="vary">
            <RigidBody ref={ballRigidBody} name="ball" colliders="ball" scale={[0.6, 0.6, 0.6]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry />
              </mesh>
            </RigidBody>

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

            <Player ref={ballRigidBody} />

            {intersecting && (
              <Text color="red" position={[-6, 5, 0]} fontSize={2}>
                !
              </Text>
            )}
            <Floor />
          </Physics>

        </Suspense>

        <OrbitControls />
      </Canvas>
    </>
  )
}
