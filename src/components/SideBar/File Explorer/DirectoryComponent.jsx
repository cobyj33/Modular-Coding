import { getOffset } from "./FileExplorer";
import { useState, useRef, useEffect} from "react";
import { FileComponent } from "./FileComponent";
import { ContextMenu } from '../../Utility Components/Context Menu/ContextMenu'
import { Directory } from "../../../Files";
import $ from 'jquery'


export const DirectoryComponent = ({directory, open, managerState, depth}) => {
    const [opened, setOpened] = useState(open ? open : true);
    const [fileManager, managerDispatch] = managerState;
    const [renaming, setRenaming] = useState(false);
    const inputRef = useRef(null);
  
  
    const contentsRef = useRef(null)
    const buttonRef = useRef(null)
    const childComponents = directory.children.map(child => {
      return child instanceof Directory ? 
      <DirectoryComponent directory={child} key={child.path} managerState={managerState} depth={depth + 1}/>
      : <FileComponent file={child} key={child.path} managerState={managerState} depth={depth + 1}/>
    })
  
    useEffect(() => {
      if (opened) {
        const contents = contentsRef.current;
        $(contents).css({ width: "auto", height: "auto" });
      }
    }, [opened])
  
    const offset = getOffset(depth);
    const style = {
      width: `${offset}%`,
      marginLeft: `${100 - offset}%`
    }
  
    function addFile() {
      
    }
  
    function addDirectory() {
  
    }
  
    function renameDirectory() {
      const input = inputRef.current;
      if (input) {
        console.log('val ', input.value)
        managerDispatch({type: 'rename', path: `${directory.path}`, name: input.value})
      }
      setRenaming(false);
    }
  
    return (
      <div className="directory">
        { renaming ? <input className="file-input" onBlur={renameDirectory} style={style} ref={inputRef} placeholder='Enter Directory Name'/>  : 
        <button className="directory-button" onClick={() => setOpened(!opened)} style={style} ref={buttonRef}>
          {directory.name}
        </button> }
  
        { opened && 
        <div className='directory-contents' data-name={directory.name} ref={contentsRef}>
          {childComponents}
        </div> }
  
        <ContextMenu bindReference={buttonRef}>
          <button onClick={() => {
            managerDispatch({type: 'add --file', path: `${directory.path}/newfile.txt`})
          }}> Add File </button>
          <button onClick={() => {
            managerDispatch({type: 'add --directory', path: `${directory.path}/New Directory`})
          }}> Add Directory </button>
          <button onClick={() => {
            managerDispatch({type: 'remove', path: `${directory.path}`})
          }}> Remove Directory </button>
          <button onClick={() => setRenaming(true)}> Rename Directory </button>
        </ContextMenu>
      </div>
    )
  }