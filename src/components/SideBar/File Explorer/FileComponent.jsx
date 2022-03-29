import { getOffset } from "./FileExplorer";
import { useState, useRef, useContext } from "react";
import { NodeContext } from "../../../App";
import { ContextMenu } from '../../Utility Components/Context Menu/ContextMenu'

export const FileComponent = ({file, children, managerState, depth}) => {
    const [opened, setOpened] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const { selectedAreaState } = useContext(NodeContext);
    const [selectedAreas, setSelectedAreas] = selectedAreaState;
    const [fileManager, managerDispatch] = managerState;
    const buttonRef = useRef(null)
    const inputRef = useRef(null)
  
    const fileNodeAreaObject = {scope: 'window', file: file};
    const offset = getOffset(depth);
    const style = {
      width: `${offset}%`,
      marginLeft: `${100 - offset}%`
    }
  
    function openFile() {
      if (!opened) {
        setSelectedAreas(selectedAreas.concat(fileNodeAreaObject))
        setOpened(true);
      } else {
        setSelectedAreas(selectedAreas.filter(area => area !== fileNodeAreaObject))
      }
    }
  
    function renameFile() {
      const input = inputRef.current;
      if (input) {
        console.log('val ', input.value)
        managerDispatch({type: 'rename', path: `${file.path}`, name: input.value})
      }
      setRenaming(false);
    }
  
    return (
      <div className="file"> 
        { renaming ? <input className="file-input" onBlur={renameFile} style={style} ref={inputRef} placeholder='Enter File Name'/>  : <button className={`file-button ${opened ? 'opened' : ''}`} onDoubleClick={openFile} style={style} ref={buttonRef}> {file.name} </button> }
  
        <ContextMenu bindReference={buttonRef}>
          <button onClick={() => {
            managerDispatch({type: 'remove', path: `${file.path}`})
          }}> Delete File </button>
          <button onClick={() => setRenaming(true)}> Rename File </button>
        </ContextMenu>
      </div>
    )
  }
  