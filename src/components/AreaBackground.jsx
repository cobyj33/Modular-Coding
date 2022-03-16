import React, { useEffect, useRef } from 'react'

export const AreaBackground = ({instructions}) => {


    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current === null) { return; }
        const canvas = canvasRef.current;
        console.log(canvas);
        const context = canvas.getContext('2d');
        canvas.classList.add('node-area-background');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context.strokeStyle = 'black'
        const radius = 2;
        for (let y = 0; y < canvas.height; y += canvas.height / 20) {
            for (let x = 0; x < canvas.width; x += canvas.width / 20) {
                context.beginPath();
                context.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
                context.fill();
            }
        }

        instructions.forEach(instruction => instruction())

    }, [])


  return (
      <>
        <canvas ref={canvasRef} className="node-area-background"></canvas>
      </>
  )
}

AreaBackground.defaultProps = {
    instructions: []
}