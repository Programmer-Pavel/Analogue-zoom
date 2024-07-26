import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import type { RapierRigidBody } from '@react-three/rapier'
import { Physics, RigidBody } from '@react-three/rapier'
import { Floor } from './Floor'
import { Gates } from './Gates'
import { Player } from './Player'

export function FootballGameContainer() {
  const ballRigidBody = useRef<RapierRigidBody>(null)

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

            <Player ref={ballRigidBody} />
            <Gates />
            <Floor />
          </Physics>
        </Suspense>

        <OrbitControls />
      </Canvas>
    </>
  )
}
