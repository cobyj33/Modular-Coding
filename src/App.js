import { useState } from "react";
import { NodeArea } from "./components/NodeArea";
import { Sidebar } from "./components/SideBar/Sidebar";
import { BottomBar } from "./components/BottomBar/BottomBar";
import "./App.css";

export class File {
    constructor({ isDirectory, name, lastUpdated, lastModified, extension }) {
        this.isDirectory = isDirectory ? isDirectory : false;
    }
}

function App() {
    const [scope, setScope] = useState('window');
    const [files, setFiles] = useState();
    const [loaded, setLoaded] = useState(false);

    window.addEventListener('load', console.log('window loaded'));

    return (
        <>
            <Sidebar files={files} />
            <NodeArea scope={scope}/>
            <BottomBar />
        </>
    )
}

export default App;
