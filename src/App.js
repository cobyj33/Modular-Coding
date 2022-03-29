import { useState, createContext, useRef, useEffect, useReducer} from "react";
import { NodeArea } from "./components/NodeArea";
import { Sidebar } from "./components/SideBar/Sidebar";
import { BottomBar } from "./components/BottomBar/BottomBar";
import "./App.css";
import { FileManager } from "./Files";
import { FileExplorer } from "./components/SideBar/File Explorer/FileExplorer";
import { Menu } from "./components/Menu Bar/Menu";
import { MenuItem } from "./components/Menu Bar/MenuItem";

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

    return state;
}

let nodeID = 0;
export const NodeContext = createContext(null);
function App() {
    const [fileManager, managerDispatch] = useReducer(fileManagerReducer, new FileManager());
    const [selectedAreas, setSelectedAreas] = useState([{scope: 'window', file: fileManager.searchByLocation('root/Untitled.txt')}])
    const [nodeSelection, setNodeSelection] = useState('variable');

    const editAreaRef = useRef(null);
    useEffect(() => {
        const editArea = editAreaRef.current;

    }, [])  

    const globalState = {
            selectionState: [nodeSelection, setNodeSelection],
            selectedAreaState: [selectedAreas, setSelectedAreas],
            fileManagerState: [fileManager, managerDispatch]
        };

    

    return (
        <NodeContext.Provider value={globalState}>
            <Menu>
                <MenuItem text="File"> </MenuItem>
                <MenuItem text="Edit"> </MenuItem>
                <MenuItem text="View"> </MenuItem>
                <MenuItem text="Help"> </MenuItem>
            </Menu>

            <Sidebar>
                <FileExplorer managerState={globalState.fileManagerState}/>
            </Sidebar>

            <div id="edit-area" ref={editAreaRef}>
                { selectedAreas.map(areaInfo => 
                <NodeArea 
                scope={areaInfo.scope} 
                file={areaInfo.file} 
                key={window.hash(areaInfo.file.path + ".")} 
                container={editAreaRef} /> )}
                
            </div>
            <BottomBar />
        </NodeContext.Provider>
    )
}

export default App;