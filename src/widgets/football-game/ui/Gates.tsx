import { useState } from 'react'
import { Text } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export function Gates() {
  const [intersecting, setIntersection] = useState(false)

  const onIntersectionEnter = (payload: any) => {
    if (payload.rigidBodyObject.name === 'ball')
      setIntersection(true)
  }

  const onIntersectionExit = (payload: any) => {
    if (payload.rigidBodyObject.name === 'ball')
      setIntersection(false)
  }

  return (
    <>
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
    </>
  )
}
