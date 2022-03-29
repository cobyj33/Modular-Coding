import { DirectoryComponent } from './DirectoryComponent';

export function getOffset(depth) {
  return 100 - Math.min(60, depth * 5);
}

export const FileExplorer = ({ managerState }) => {
  const [fileManager] = managerState;

  return (
    <div id="file-explorer">
      <h3> File Explorer </h3>
      <DirectoryComponent directory={fileManager.master} open={true} managerState={managerState} depth={0}/>
    </div>
  )
}