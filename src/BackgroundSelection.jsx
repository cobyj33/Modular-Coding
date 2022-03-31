import React, { useRef, useState } from 'react'
import { mousePosition } from './App'
import { DynamicText } from './components/Utility Components/Dynamic Text/DynamicText'
import { Window } from './components/Utility Components/Window/Window'
import "./backgroundselection.css"

function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('./assets/Background Images', false, /\.(png|jpe?g|svg)$/));
console.log(images);

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

export const BackgroundSelection = ({ closeCallback }) => {
    const [view, setView] = useState('select');
    const urlReference = useRef(null);

    function loadURL() {
        if (!urlReference.current) return

        const url = urlReference.current.value;
        if (isValidURL(url)) {
            document.documentElement.style.setProperty('--background-image', `url(${url})`);
        } else {
            console.error('invalid URL')
        }
    }


  return (
    <Window style={{margin: 'auto', top: '25vh', width: '50vw', height: '50vh'}} noDrag noResize inTopBar={<DynamicText> Background </DynamicText>} onDelete={() => closeCallback()}>
        <div className="background-selection-window">
            <div className='decision'>
                <button className={view === 'select' ? 'selected' : ''} onClick={() => setView('select')}> Choose Background </button>
                <button className={view === 'upload' ? 'selected' : ''} onClick={() => setView('upload')}> Upload Background </button>
            </div>

            { view == 'select' &&
                <div className='default-bgs'> 
                    
                    { images.map(url => <img key={url} src={url} placeholder={url} width="200px" onClick={() => document.documentElement.style.setProperty('--background-image', `url(${url})`)}></img>)}
                </div>}

            { view == 'upload' && 
                <div className='upload-background'> 

                    <div className='url-upload-area'>
                        <h3> Upload from URL </h3>
                        <input placeholder='https://...' ref={urlReference}/>
                        <button onClick={loadURL}> submit </button>
                    </div>
                    
                    <h1> OR </h1>

                    <div className='file-upload-area'>
                        <h3> Upload File </h3>
                        <input type="file" />
                        <button> Upload </button>
                    </div>
                
                </div>}
        </div>
    </Window>
  )
}
