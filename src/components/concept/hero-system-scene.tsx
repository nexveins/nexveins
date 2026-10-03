"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { heroSystemEdges, heroSystemNodes } from "@/lib/hero-system"

const palette = {
  primary: "#315fdf",
  cyan: "#28c7e8",
  neutral: "#6f7887",
  dark: "#171c24",
}

function SystemWorld() {
  const group = useRef<THREE.Group>(null)
  const particles = useRef<Array<THREE.Mesh | null>>([])
  const nodesById = useMemo(() => new Map(heroSystemNodes.map((node) => [node.id, node])), [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.07, 4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.055, 4, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.16, 4, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, state.pointer.y * 0.1, 4, delta)

    particles.current.forEach((particle, index) => {
      if (!particle) return
      const edge = heroSystemEdges[index]
      const from = nodesById.get(edge.from)
      const to = nodesById.get(edge.to)
      if (!from || !to) return
      const t = (state.clock.elapsedTime * (edge.emphasis === "primary" ? 0.18 : 0.11) + index * 0.17) % 1
      particle.position.lerpVectors(new THREE.Vector3(...from.position), new THREE.Vector3(...to.position), t)
    })
  })

  return (
    <group ref={group} rotation={[-0.08, -0.16, -0.025]}>
      {heroSystemEdges.map((edge, index) => {
        const from = nodesById.get(edge.from)
        const to = nodesById.get(edge.to)
        if (!from || !to) return null
        return (
          <group key={`${edge.from}-${edge.to}`}>
            <Line
              points={[from.position, to.position]}
              color={edge.emphasis === "primary" ? palette.primary : palette.neutral}
              lineWidth={edge.emphasis === "primary" ? 1.4 : 0.75}
              transparent
              opacity={edge.emphasis === "primary" ? 0.72 : 0.34}
            />
            <mesh ref={(mesh) => { particles.current[index] = mesh }}>
              <sphereGeometry args={[edge.emphasis === "primary" ? 0.055 : 0.038, 12, 12]} />
              <meshBasicMaterial color={edge.emphasis === "primary" ? palette.cyan : palette.primary} />
            </mesh>
          </group>
        )
      })}

      {heroSystemNodes.map((node) => {
        const isCore = node.id === "core"
        const color = node.accent === "primary" ? palette.primary : node.accent === "cyan" ? palette.cyan : palette.dark
        return (
          <group key={node.id} position={node.position}>
            <RoundedBox args={isCore ? [2.1, 1.08, 0.58] : [1.4, 0.7, 0.38]} radius={0.12} smoothness={4}>
              <meshStandardMaterial color={color} roughness={0.48} metalness={0.18} />
            </RoundedBox>
            <mesh position={[0, 0, isCore ? 0.31 : 0.21]}>
              <planeGeometry args={isCore ? [1.4, 0.08] : [0.82, 0.045]} />
              <meshBasicMaterial color={isCore ? "#dbe6ff" : "#8e9aad"} transparent opacity={0.82} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export function HeroSystemScene({ active = true, onContextLost }: { active?: boolean; onContextLost?: () => void }) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => () => cleanupRef.current?.(), [])

  return (
    <Canvas
      aria-hidden="true"
      className="pointer-events-none"
      camera={{ position: [0, 0, 9.2], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        const handleLost = (event: Event) => {
          event.preventDefault()
          onContextLost?.()
        }
        canvas.addEventListener("webglcontextlost", handleLost)
        cleanupRef.current = () => canvas.removeEventListener("webglcontextlost", handleLost)
      }}
    >
      <ambientLight intensity={1.45} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} />
      <directionalLight position={[-5, -2, 4]} intensity={0.75} color="#89a8ff" />
      <SystemWorld />
    </Canvas>
  )
}
