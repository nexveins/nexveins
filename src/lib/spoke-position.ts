export function getSpokePosition(index: number, count: number, radius = 38) {
  const angle = -90 + (index * 360) / count
  const radians = (angle * Math.PI) / 180

  return {
    angle,
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  }
}
