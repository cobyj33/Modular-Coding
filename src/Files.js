
export class FileExplorer {
    constructor(head) {
        this.head = head ? head : new File({ name: 'newFile', extension: '.txt', path: "root/newFile.txt"});
    }

    addFile() {

    }

    removeFile() {

    }

    searchFileByLocation() {

    }

    searchFileByName() {

    }

    importFile() {

    }

    exportFile() {

    }

    renameFile() {

    }
}




export class File {
    constructor({isDirectory, name, lastUpdated, lastModified, extension, path}) {
        this.isDirectory = isDirectory ? isDirectory : false;
        this.path = path;
        this.name = name;
        this.extension = extension;
    }
}