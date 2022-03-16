export const CloseButton = ({openCallback, targetReference}) => {

  function close() {
    if (targetReference) {
      window.hideElement(targetReference.current);
      setTimeout(() => openCallback(false), 200);
    } else {
      openCallback(false);
    }
  }

  return (
    <button className='close-button' onClick={close}> X </button>
  )
}
