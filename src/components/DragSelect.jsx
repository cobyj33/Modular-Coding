import { useRef } from "react";

const DragSelect = ({position, setPosition}) => {
    const dragSelector = useRef(null);
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let mouseXOffset = 0;
    let mouseYOffset = 0;

    function updatePosition() {
        console.log(isMouseDown);
        if (isMouseDown) {
            let nextX = mouseX - mouseXOffset;
            let nextY = mouseY - mouseYOffset;
            let leftPos = nextX;
            let topPos = nextY;

            if (nextX > 0 && nextX < window.innerWidth - position.width) {
                leftPos = nextX;
            } else if (nextX < 0) {
                leftPos = "0";
            } else if (nextX > window.innerWidth - position.width) {
                leftPos = window.innerWidth - position.width;
            }

            if (nextY > 0 && nextY < window.innerHeight - position.height) {
                topPos = nextY;
            } else if (nextY < 0) {
                topPos = 0;
            } else if (nextY > window.innerHeight - position.height) {
                topPos = window.innerHeight - position.height;
            }

            setPosition({
                left: leftPos,
                top: topPos
            });

            window.setTimeout(() => updatePosition(), 10);
            return;
        }
    }

    function updateMouse(mouseEvent) {
      mouseX = mouseEvent.clientX;
      mouseY = mouseEvent.clientY;
    }

    function startDrag(e) {
        console.log('starting drag');
      if (e.target.tagName == "input" || e.target.tagName == "button" || !position || !dragSelector.current) {
        return;
      }

      window.addEventListener('mousemove', updateMouse);
      updateMouse(e);

      let selectorPosition = dragSelector.current.getBoundingClientRect();
      isMouseDown = true;
      mouseXOffset = Math.abs(mouseX - selectorPosition.left);
      mouseYOffset = Math.abs(mouseY - selectorPosition.top);

      updatePosition();
    };

    window.addEventListener('mouseup', function() {
      isMouseDown = false;
      window.removeEventListener('mousemove', updateMouse);
    });


    return (
        <div className="drag-selector" onMouseDown={startDrag} ref={dragSelector}> </div>
    )
}

export default DragSelect