import { KeyboardControls, useAnimations, useGLTF } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import { useRef } from 'react'
import type * as THREE from 'three'

export function TestKeyboardControls() {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/assets/3d-models/goalkeeperDropKick-transformed.glb')
  const { actions } = useAnimations(animations, group)

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
    { name: 'kick', keys: ['KeyA'] },
  ]

  const onChangeKeyboardControls = (e: any) => {
    if (e === 'kick') {
      actions['mixamo.com'].reset().fadeIn(0.5).play()
      actions['mixamo.com'].reset().repetitions = 1
    }
  }

  return (
    <KeyboardControls map={keyboardMap} onChange={onChangeKeyboardControls}>
      <Ecctrl
        animated
        springK={2}
        jumpVel={0}
        jumpForceToGroundMult={0}
        autoBalance={false}
        autoBalanceSpringK={0}
        autoBalanceDampingC={0}
        autoBalanceSpringOnY={0}
        autoBalanceDampingOnY={5}
        position={[3, 0, 0]}
        disableFollowCam
        disableFollowCamPos={{ x: 0, y: 10, z: -50 }}
        colliders="trimesh"
      >
        <group ref={group} scale={[0.04, 0.04, 0.04]} dispose={null}>
          <group name="AuxScene">
            <group name="Goalkeeper_Drop_Kick_(2)">
              <primitive object={nodes.mixamorig5Hips} />
            </group>
            <skinnedMesh
              name="Ch38_Shorts"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Shorts.geometry}
              material={materials.Ch38_body}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Shorts.skeleton}
            />
            <skinnedMesh
              name="Ch38_Socks"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Socks.geometry}
              material={materials.Ch38_body}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Socks.skeleton}
            />
            <skinnedMesh
              name="Ch38_Shoes"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Shoes.geometry}
              material={materials.Ch38_body}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Shoes.skeleton}
            />
            <skinnedMesh
              name="Ch38_Eyelashes"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Eyelashes.geometry}
              material={materials.Ch38_hair}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Eyelashes.skeleton}
            />
            <skinnedMesh
              name="Ch38_Hair"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Hair.geometry}
              material={materials.Ch38_hair}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Hair.skeleton}
            />
            <skinnedMesh
              name="Ch38_Shirt"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Shirt.geometry}
              material={materials.Ch38_body}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Shirt.skeleton}
            />
            <skinnedMesh
              name="Ch38_Body"
              // @ts-expect-error fix
              geometry={nodes.Ch38_Body.geometry}
              material={materials.Ch38_body}
              // @ts-expect-error fix
              skeleton={nodes.Ch38_Body.skeleton}
            />
          </group>
        </group>
        {/* </EcctrlAnimation> */}
      </Ecctrl>
    </KeyboardControls>
  )
}

useGLTF.preload('/assets/3d-models/jump-transformed.glb')
