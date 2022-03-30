
function getParentPath(path) {
    const location = path.split('/');
    location.pop();
    let parentPath = location.reduce((string, last) => string += `/${last}`, "");
    parentPath = parentPath.substr(1, parentPath.length - 1);
    console.log('parent path of ', path, ' --> ', parentPath);
    return parentPath;
}

function isValidPath(path) {
    const locations = path.split('/');
    console.log(locations);
    if (locations[0] != 'root') { console.log('path: ', path, " is invalid, does not connect to root"); return false; }

    for (let i = 0; i < locations.length - 1; i++) {
        if (locations[i].includes(".")) {
            console.log('path: ', path, " is invalid, has non-directory as parent");;
            return false;
        }
    }

    console.log('path: ', path, " is valid");
    return true;
}

function isDirectoryPath() {

}

function isFilePath() {
    
}

function trimRoot(path) {
    return path.trimStart('root/');
}

export class FileManager {
    constructor(master) {
        if (!master) {
            this.master = new Directory({path: 'root', parent: ''})
            this.addFile('root/Untitled.txt');
        } else {
            this.master = master;
        }
    }

    printFiles() {
        function print(file) {
            console.log(file.getInfo());
            if (file instanceof Directory) {
                file.children.forEach(child => print(child));
            }
        } 

        print(this.master);
    }

    addFile(path) {
        if (!isValidPath(path)) { 
            console.log("invalid path: ", path); return;
        }

        const parent = this.searchByLocation(getParentPath(path));
        if (parent instanceof Directory) {
            const newFile = new File({path: path, parent: parent});
            parent.children.push(newFile);
        }
        return this;
    }

    addDirectory(path) {
        if (!isValidPath(path)) { 
            console.log("invalid path: ", path); return;
        }

        const parent = this.searchByLocation(getParentPath(path));
        if (parent instanceof Directory) {
            const newDirectory = new Directory({path: path, parent: parent});
            parent.children.push(newDirectory);
        }
        return this;
    }

    remove(path) {
        if (!isValidPath(path)) {
            console.log('path ', path, ' is invalid');
            return;
        } else if (path == 'root') {
            console.log('cannot remove root');
            return;
        }

        const file = this.searchByLocation(path);
        file.remove();
        return this;
    }

    searchByLocation(path) {
        if (!isValidPath(path)) { return false; }
        path = trimRoot(path);
        const locations = path.split('/');
        locations.splice(0, 1);
        let current = this.master;

        for (let i = 0; i < locations.length; i++) {
            current = current.getChild(locations[i]);
        }

        // console.log('[searchByLocation] file: ', current);

        return current;
    }

    searchByName(name) {
        let directories = [this.master];
        while (directories.length != 0) {
            const files = directories.flatMap(directory => directory.children);
            for (let i = 0; i < files.length; i++) {
                if (files[i].name == name) {
                    return files[i];
                }
            }

            directories = files.filter(file => file instanceof Directory);
        }
        
        console.log("Could not find file: ", name);
    }

    getAllWithName(name) {

    }

    import() {

    }

    export() {

    }

    rename(path, newName) {
        if (isValidPath(path)) {
            const file = this.searchByLocation(path);
            if (file.name == newName) { return; }
            file.name = newName;
        }
        return this;
    }

    isDirectory(file) {
        return file instanceof Directory;
    }

    isFile(file) {
        return file instanceof File;
    }
}






export class File {
    constructor({path, parent}) {
        this.path = path;
        this.lastModified = new Date().toDateString();
        this.created = new Date().toDateString();
        this.parent = parent ? parent : 'root';
        this.data = {
            nodes: []
        };
    }

    get name() {
        return this.path.split('/').pop();
    }

    set name(newName) {
        let location = this.path.split('/');
        location[location.length - 1] = newName;
        const newPath = location.reduce((string, last) => string += `/${last}`, "");
        this.path = newPath.substr(1, newPath.length - 1)
    }

    get extension() {
        return this.isDirectory ? "" : this.path.split('.').pop();
    }

    getInfo() {
        const info = {...this};
        info.parent = info.parent.path;
        return info;
    }

    remove() {
        this.parent.removeChild(this.name);
    }

    writeNode(node) {
        this.data['nodes'] = this.data['nodes'].push(node);
    }

    overwriteData(data) {
        this.data = data;
    }
}

export class Directory {
    constructor({path, children, parent}) {
        this.path = path;
        this.children = children ? children : [];
        this.lastModified = new Date().toDateString();
        this.created = new Date().toDateString();
        this.parent = parent ? parent : 'root';
    }

    get name() {
        return this.path.split('/').pop();
    }

    set name(newName) {
        let location = this.path.split('/');
        location[location.length - 1] = newName;
        const newPath = location.reduce((string, last) => string += `/${last}`, "");
        this.path = newPath.substr(1, newPath.length - 1)
    }

    removeChild(name) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name == name) {
                this.children.splice(i, 1);
                break;
            }
        }
    }

    getChild(name) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name == name) {
                return this.children[i];
            }
        }
        console.log('could not find child: ', name);
    }

    getInfo() {
        const info = {...this};
        info.children = info.children.map(child => child.path);
        info.parent = info.parent.path;
        return info;
    }

    remove() {
        this.parent.removeChild(this.name);
        this.children.forEach(child => child.remove());
    }
}