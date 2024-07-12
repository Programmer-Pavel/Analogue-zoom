import { RigidBody } from '@react-three/rapier'
import React from 'react'

export function Player() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  )
}
