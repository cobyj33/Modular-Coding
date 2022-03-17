export const CloseButton = ({openCallback, targetReference, onDelete}) => {

  function close() {
    if (targetReference) {
      window.hideElement(targetReference.current);
      setTimeout(() => end(), 200);
    } else {
      end()
    }

    function end() {
      onDelete();
      openCallback(false);
    }
  }

  return (
    <button className='close-button' onClick={close}> X </button>
  )
}
