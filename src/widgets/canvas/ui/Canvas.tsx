import React, { useEffect, useRef } from 'react'

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    // if (context?.fillStyle) {
    //   context.fillStyle = 'blue'
    // }

    if (canvas) {
      ctx?.fillRect(25, 25, 100, 100)
      ctx?.clearRect(45, 45, 60, 60)
      ctx?.strokeRect(50, 50, 50, 50)
      // context?.fillRect(0, 0, canvas?.width, canvas?.height)
      // context?.strokeRect(0, 0, canvas?.width, canvas?.height)
    }
  }, [])
  return <canvas ref={canvasRef}></canvas>
}
