import React, { useEffect, useState, useRef, useContext } from 'react'
import { File, Directory } from '../../Files';
import { NodeArea } from '../NodeArea';
import $ from "jquery";
import { NodeContext } from '../../App';
import { ContextMenu } from '../Utility Components/Context Menu/ContextMenu';


export const DirectoryComponent = ({directory, open, managerState, depth}) => {
  const [opened, setOpened] = useState(open ? open : true);
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

  const offset = 100 - Math.min(60, depth * 5);
  const style = {
    width: `${offset}%`,
    marginLeft: `${100 - offset}%`
  }

  return (
    <div className="directory">
      <button className="directory-button" onClick={() => setOpened(!opened)} style={style} ref={buttonRef}>
        {directory.name}
      </button>

      { opened && 
      <div className='directory-contents' data-name={directory.name} ref={contentsRef}>
        {childComponents}
      </div> }

      <ContextMenu bindReference={buttonRef}>
        <button onClick={() => {
          const [fileManager, managerDispatch] = managerState;
          managerDispatch({type: 'add --file', path: `${directory.path}/newfile.txt`})
        }}> Add File </button>
        <button onClick={() => {
          const [fileManager, managerDispatch] = managerState;
          managerDispatch({type: 'add --directory', path: `${directory.path}/New Directory`})
        }}> Add Directory </button>
        <button> Remove File </button>
        <button> Rename File </button>
      </ContextMenu>
    </div>
  )
}

export const FileComponent = ({file, children, managerState, depth}) => {
  const [opened, setOpened] = useState(false);
  const { selectedAreaState } = useContext(NodeContext);
  const [selectedAreas, setSelectedAreas] = selectedAreaState;

  const offset = 100 - Math.min(60, depth * 5);

  const style = {
    width: `${offset}%`,
    marginLeft: `${100 - offset}%`
  }

  const fileNodeAreaObject = {scope: 'window', file: file};

  function openFile() {
    if (!opened) {
      setSelectedAreas(selectedAreas.concat(fileNodeAreaObject))
      setOpened(true);
    } else {
      setSelectedAreas(selectedAreas.filter(area => area !== fileNodeAreaObject))
    }
  }

  return (
    <div className="file"> 
      <button className={`file-button ${opened ? opened : ''}`} onDoubleClick={openFile} style={style}> {file.name} </button>
    </div>
  )
}



export const FileExplorer = ({ managerState }) => {
  const fileExplorerReference = useRef(null);
  const [fileManager] = managerState;

  return (
    <div id="file-explorer" ref={fileExplorerReference}>
      <h3> File Explorer </h3>
      <DirectoryComponent directory={fileManager.master} open={true} managerState={managerState} depth={0}/>
    </div>
  )
}