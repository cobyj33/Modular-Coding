import "./windowbuttons.css";

export const CloseButton = ({openCallback, targetReference, onDelete}) => {

  function close() {
    if (targetReference) {
      window.hideElement(targetReference.current);
      setTimeout(() => end(), 200);
    } else {
      end()
    }

    function end() {
      openCallback(false);
      if (onDelete) { onDelete(); }
    }
  }

  return (
    <button className='close-button' onClick={close}> X </button>
  )
}
