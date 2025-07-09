import { makeAutoObservable } from "mobx";

class FileInfo {
  file: File | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setFile(uploadedFile: File) {
    this.file = uploadedFile;
  }
}

const fileStore = new FileInfo();
export default fileStore;
