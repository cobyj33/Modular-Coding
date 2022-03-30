import { useState, createContext, useRef, useEffect, useReducer} from "react";
import { NodeArea } from "./components/NodeArea";
import { Sidebar } from "./components/SideBar/Sidebar";
import { BottomBar } from "./components/BottomBar/BottomBar";
import "./App.css";
import { FileManager } from "./Files";
import { FileExplorer } from "./components/SideBar/File Explorer/FileExplorer";
import { Menu } from "./components/Menu Bar/Menu";
import { MenuItem } from "./components/Menu Bar/MenuItem";
import { hash } from "./index";
import { DynamicText } from "./components/Utility Components/Dynamic Text/DynamicText";
import { MenuButton } from "./components/Menu Bar/MenuButton";

let fileCounter = 1;

export let mousePosition = {
    left: 0,
    top: 0
};

window.addEventListener('mousemove', (mouseEvent) => {
    mousePosition.left = mouseEvent.clientX;
    mousePosition.top = mouseEvent.clientY;
});

const fileManagerReducer = (state, action) => {
    const {type, path, name} = action;
    switch (type) {
        case "add --file": 
            path ? state.addFile(path) : console.error('no path detected [file manager reducer]');
        break; 
        case "add --directory":
            path ? state.addDirectory(path) : console.error('no path detected [file manager reducer]');
        break;
        case "remove": 
            path ? state.remove(path) : console.error('no path detected [file manager reducer]');
        break;
        case "rename": 
            if (path && name) {
                state.rename(path, name);
            } else if (!path) {
                console.error('no path detected [file manager reducer - rename]');
            } else {
                console.error('no name detected [file manager reducer - rename]');
            }
        break;
        default:
            console.log('no valid operation [file manager reducer] requested: ', type);
    }

    return new FileManager(state.master);
}

function openedFilesReducer(state, action) {
    const {type, file} = action;
    const newState = {...state};

    function isFileLoaded(testFile) {
        return newState.files.some(file => file.path === testFile.path);
    }

    function getFileIndex(testFile) {
        for (let i = 0; i < newState.files.length; i++) {
            if (newState.files[i].path === testFile.path) 
                return i;
        }
        console.error('could not find file [getFileIndex]');
        return -1;
    }

    function open() {
        if (!file) {
            console.error('no file found to open [openFileReducer]');
            return;
        }

        newState.selected = file;
        if (!isFileLoaded(file)) {
            newState.files.push(file);
        }
    }

    function select() {
        if (!isFileLoaded(file)) {
            console.error('no file found to select [openFileReducer]');
            return;
        }

        newState.selected = file;
    }

    function close() {
        if (!file) {
            console.error('no file found to close [openFileReducer]');
            return;
        }

        newState.files = newState.files.filter(testFile => testFile.path !== file.path)
        if (newState.selected.path == file.path) {
            newState.selected = undefined;
        }
    }

    switch (type) {
        case 'open': open(); break;
        case 'open --select': open(); select(); break;
        case 'close': close(); break;
        case 'toggle':
            if (newState.selected.path === file.path) {
                close();
            } else {
                open();
            }
            break;
        case 'clear':
            newState = {files: [], selected: undefined}
        break;
        case 'close --right':
            if (!file) {
                console.error('no file found to start close [openFileReducer]');
                break;
            }

            newState.files = newState.files.slice(0, getFileIndex(file));
        break;
        default: console.error('No valid action type of ', type, ' could be found [openFileReducer]');
    }

    return newState;
}

export const GlobalContext = createContext(null);
function App() {
    const [fileManager, managerDispatch] = useReducer(fileManagerReducer, new FileManager());
    const [openedFiles, openedFilesDispatch] = useReducer(openedFilesReducer, { files: [fileManager.master], selected: fileManager.master })
    const [nodeSelection, setNodeSelection] = useState('variable');

    const editAreaRef = useRef(null);
    const globalState = {
            selectionState: [nodeSelection, setNodeSelection],
            openedFilesState: [openedFiles, openedFilesDispatch],
            fileManagerState: [fileManager, managerDispatch]
        };

    

    return (
        <GlobalContext.Provider value={globalState}>

            <Menu>
                <MenuItem text="File">
                    <MenuButton> Save </MenuButton>
                    <MenuButton> Open </MenuButton>
                    <MenuButton> Save As </MenuButton>
                    <MenuButton> New </MenuButton>
                </MenuItem>
                <MenuItem text="Edit">

                </MenuItem>
                <MenuItem text="View"> 

                </MenuItem>
                <MenuItem text="Help">

                </MenuItem>
            </Menu>

            <Sidebar>
                <FileExplorer managerState={globalState.fileManagerState}/>
            </Sidebar>

            <div id="file-area">
                <div id="open-file-bar">
                    {
                        openedFiles.files.map(file => ( 
                            <div className={`open-file-indicator ${file.path === openedFiles?.selected?.path ? 'selected' : ''}`}  key={hash(file.path + 'indicator')} onClick={function(event) {
                                if (event.target.classList.contains("open-file-indicator")) {
                                    openedFilesDispatch({type: 'open', file: file});
                                }
                            }}> 
                                {file.name} 
                                <button className="file-close-button" onClick={() => openedFilesDispatch({type: 'close', file: file})}> X </button>
                            </div>
                        ))
                    }
                </div>

                <div id="edit-area" ref={editAreaRef}>
                    { openedFiles.selected && <NodeArea scope='window' file={openedFiles.selected} key={hash(openedFiles.selected.path + ".")} container={editAreaRef} />}
                
                    {/* { selectedAreas.map(areaInfo => 
                    <NodeArea 
                    scope={'window'} 
                    file={areaInfo.file} 
                    key={window.hash(areaInfo.file.path + ".")} 
                    container={editAreaRef} /> )} */}
                </div>
            </div>

            <BottomBar />
        </GlobalContext.Provider>
    )
}

export default App;