import {useState} from 'react'

export const MenuItem = ({text, children}) => {
    const [opened, setOpened] = useState(false);

    function checkClick() {

    }

    function open() {
        if (opened) {
            close();
            return;
        }

        setOpened(!opened);
        window.addEventListener('click', checkClick);
    }

    function close() {
        window.removeEventListener('click', checkClick);
        setOpened(false);
    }

  return (
    <div className='menu-item'>
        <button onClick={open}> {text} </button>
        { opened && children }
    </div>
  )
}
