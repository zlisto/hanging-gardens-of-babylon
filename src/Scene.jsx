import { useMemo } from 'react'
import { Box, Bush, Cypress, GEO, GOLD, Hills, Instanced, Palm, Water, mat } from './kit.jsx'

// The Hanging Gardens as ancient writers described them: three tiers of mud-brick terraces with
// blue glazed bands, planted with trees and flowers that spill over the edges, a grand stairway up
// the middle, waterfalls fed from the river, the Euphrates to the west, a blue glazed gate in the
// style of the Ishtar Gate, and the great ziggurat on the horizon.

const BRICK = '#b98a5a'
const GLAZE = '#2f5fa8'
const TIERS = [
  { x0: -20, x1: 20, z0: -43, z1: -12, y0: 0, y1: 6 },
  { x0: -14, x1: 14, z0: -38, z1: -18, y0: 6, y1: 12 },
  { x0: -8, x1: 8, z0: -33, z1: -24, y0: 12, y1: 18 },
]

function Tier({ x0, x1, z0, z1, y0, y1 }) {
  const w = x1 - x0
  const d = z1 - z0
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  return (
    <>
      <Box p={[cx, (y0 + y1) / 2, cz]} s={[w, y1 - y0, d]} c={BRICK} />
      {/* blue glazed brick band and a garden bed of dark earth on top */}
      <Box p={[cx, y1 - 0.6, cz]} s={[w + 0.08, 0.5, d + 0.08]} c={GLAZE} o={{ roughness: 0.4 }} />
      <Box p={[cx, y1 + 0.02, cz]} s={[w - 0.4, 0.06, d - 0.4]} c="#4a5e2a" />
    </>
  )
}

// one flight of stairs from (z1, y0) up to (z0, y1), centered on x = 0
function Flight({ z0, z1, y0, y1, w = 5 }) {
  const n = Math.round((y1 - y0) / 0.5)
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n
    const top = y0 + (y1 - y0) * t
    const z = z1 + (z0 - z1) * (i + 0.5) / n
    return <Box key={i} p={[0, (y0 + top) / 2, z]} s={[w, top - y0, Math.abs(z1 - z0) / n + 0.02]} c="#c99a66" />
  })
}

function Greenery() {
  const { bushes, flowers, vines, trees } = useMemo(() => {
    const bushes = []
    const flowers = []
    const vines = []
    const trees = []
    let k = 0
    for (const t of TIERS) {
      // shrubs along the edges of each terrace, flowers between them
      for (let x = t.x0 + 1.2; x < t.x1 - 1; x += 2.2) {
        for (const z of [t.z0 + 1, t.z1 - 1]) {
          if (Math.abs(x) < 3 && z === t.z1 - 1) continue // keep the stair landing clear
          bushes.push({ p: [x, t.y1 + 0.8, z], s: [1.5, 1.1, 1.5] })
          if (k++ % 2) flowers.push({ p: [x + 1.1, t.y1 + 0.5, z], s: [0.55, 0.45, 0.55] })
        }
      }
      for (let z = t.z0 + 3; z < t.z1 - 2; z += 2.4) for (const x of [t.x0 + 1, t.x1 - 1]) bushes.push({ p: [x, t.y1 + 0.8, z], s: [1.5, 1.1, 1.5] })
      // vines spilling down the terrace walls
      for (let x = t.x0 + 0.8; x < t.x1; x += 1.6) {
        if (Math.abs(x) < 3) continue
        const len = 2 + ((x * 7) % 3 + 3) % 3
        vines.push({ p: [x, t.y1 - len / 2, t.z1 + 0.15], s: [0.7, len, 0.2] })
        vines.push({ p: [x, t.y1 - len / 2, t.z0 - 0.15], s: [0.7, len, 0.2] })
      }
      for (let z = t.z0 + 0.8; z < t.z1; z += 1.6) {
        const len = 2 + ((z * 5) % 3 + 3) % 3
        vines.push({ p: [t.x0 - 0.15, t.y1 - len / 2, z], s: [0.2, len, 0.7] })
        vines.push({ p: [t.x1 + 0.15, t.y1 - len / 2, z], s: [0.2, len, 0.7] })
      }
      // trees in the middle of each terrace
      for (let x = t.x0 + 3; x < t.x1 - 2; x += 4) for (let z = t.z0 + 3; z < t.z1 - 2; z += 4) if (Math.abs(x) > 3.5) trees.push([x, z, t.y1])
    }
    return { bushes, flowers, vines, trees }
  }, [])
  return (
    <>
      <Instanced items={bushes} geometry={GEO.sph} material={mat('#3f7d3a')} />
      <Instanced items={flowers} geometry={GEO.sph} material={mat('#e85d8a')} />
      <Instanced items={vines} geometry={GEO.box} material={mat('#4f8f3a')} />
      {trees.map(([x, z, y], i) => (
        <group key={i} position={[0, y, 0]}>
          {i % 2 ? <Cypress x={x} z={z} h={6} /> : <Palm x={x} z={z} h={5} r={i} />}
        </group>
      ))}
    </>
  )
}

// water tumbling down the terrace walls on the east and west sides
function Falls() {
  return TIERS.map((t, i) =>
    [t.x0, t.x1].map((x) => (
      <mesh key={`${i}${x}`} position={[x + (x < 0 ? -0.2 : 0.2), (t.y0 + t.y1) / 2 + 0.5, (t.z0 + t.z1) / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, t.y1 - t.y0 - 1]} />
        <meshStandardMaterial color="#8fd0f0" transparent opacity={0.7} emissive="#4aa0d0" emissiveIntensity={0.25} />
      </mesh>
    )),
  )
}

// a gate faced with blue glazed bricks and golden animals, in the style of the Ishtar Gate
function Gate({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * 5, 7, 0]} s={[4, 14, 6]} c={GLAZE} o={{ roughness: 0.35 }} />
      ))}
      <Box p={[0, 11, 0]} s={[6, 6, 6]} c={GLAZE} o={{ roughness: 0.35 }} />
      {[-1, 1].map((s) =>
        [4, 8, 12].map((y) => <Box key={`${s}${y}`} p={[s * 5, y, 3.02]} s={[2, 1, 0.05]} c="#e3b545" o={GOLD} />),
      )}
      {/* crenellations */}
      {[-6, -4, -2, 0, 2, 4, 6].map((cx) => (
        <Box key={cx} p={[cx, 14.5, 0]} s={[1, 1, 6]} c={GLAZE} />
      ))}
    </group>
  )
}

function Ziggurat({ x, z }) {
  return [0, 1, 2, 3, 4, 5, 6].map((i) => <Box key={i} p={[x, 6 * i + 3, z]} s={[60 - i * 8, 6, 60 - i * 8]} c={i % 2 ? '#b07e50' : '#c08e5e'} />)
}

export default function Scene() {
  return (
    <>
      <Hills color="#b9a070" r={430} h={22} />
      {/* irrigated lawns and flower beds around the foot of the terraces */}
      <Box p={[0, 0.02, -24]} s={[70, 0.04, 56]} c="#5f8a3a" />
      <Instanced
        items={Array.from({ length: 40 }, (_, i) => {
          const a = (i / 40) * Math.PI * 2
          return { p: [Math.sin(a) * 30, 0.6, -24 + Math.cos(a) * 24], s: [1.4, 1, 1.4] }
        }).filter((b) => Math.abs(b.p[0]) > 4 || b.p[2] < -24)}
        geometry={GEO.sph}
        material={mat('#3f7d3a')}
      />
      {TIERS.map((t, i) => (
        <Tier key={i} {...t} />
      ))}
      <Flight z0={-12} z1={0} y0={0} y1={6} />
      <Flight z0={-18} z1={-12} y0={6} y1={12} />
      <Flight z0={-24} z1={-18} y0={12} y1={18} />
      <Greenery />
      <Falls />
      {/* a royal pavilion on the top terrace */}
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <Box key={`${sx}${sz}`} p={[sx * 2.5, 20, -28.5 + sz * 2]} s={[0.5, 4, 0.5]} c="#e8d9b5" />))}
      <Box p={[0, 22.2, -28.5]} s={[6.5, 0.4, 5]} c={GLAZE} />
      {/* the Euphrates to the west, with reeds and palms on its bank */}
      <Water x0={-260} x1={-60} z0={-400} z1={400} y={0.04} color="#3f8fa8" />
      {Array.from({ length: 9 }, (_, i) => (
        <Palm key={i} x={-54 + (i % 2) * 4} z={-80 + i * 20} h={8} r={i} lean={0.1} />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <Bush key={i} x={-58 + (i % 3)} z={-70 + i * 11} s={0.6} c="#6b8f3a" />
      ))}
      <Gate x={27} z={15} />
      <Ziggurat x={90} z={-160} />
      {[
        [-12, 30],
        [14, 34],
        [-20, 52],
        [24, 50],
      ].map(([x, z], i) => (
        <Palm key={i} x={x} z={z} h={7} r={i} />
      ))}
    </>
  )
}
