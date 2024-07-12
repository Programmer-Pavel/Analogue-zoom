import { useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import React from 'react'
import * as THREE from 'three'
// @ts-expect-error fix
import floorTexture from '../../../../assets/images.png'

export function Floor() {
  const texture = useTexture(floorTexture)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[0, -5, 0]} rotation-x={-Math.PI / 2}>
          <boxGeometry args={[500, 500]} />
          <meshStandardMaterial color="gray" map={texture} map-repeat={[360, 360]} />
        </mesh>
      </RigidBody>
      {/* <RigidBody>
        <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[700, 700]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <mesh position={[0, -5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh> */}
    </>
  )
}
