import React, { useEffect, useRef } from 'react'
import $ from "jquery";

export const AreaBackground = ({instructions, coordinates}) => {
    const canvasRef = useRef(null);

    function draw() {
        if (canvasRef.current === null) { return; }
        const canvas = canvasRef.current;
        console.log(canvas);
        const context = canvas.getContext('2d');
        canvas.width = $(canvas).outerWidth()
        canvas.height = $(canvas).outerHeight()
    

        const xGap = canvas.width / 20;
        const yGap = canvas.height / 20;

        context.strokeStyle = 'black'
        const radius = 2;
        for (let y = 0; y < canvas.height; y += yGap) {
            for (let x = 0; x < canvas.width; x += xGap) {
                context.beginPath();
                context.arc(x + radius + coordinates?.x % xGap, y + radius + coordinates?.y % yGap, radius, 0, Math.PI * 2);
                context.fill();
            }
        }

        instructions.forEach(instruction => instruction());
    }

    useEffect(() => {
        draw();
    }, [coordinates])

    useEffect(() => {
        const observer = new ResizeObserver((mutations) => draw());
        observer.observe(canvasRef.current, {attributes: true});
        return () => { observer.disconnect() }
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