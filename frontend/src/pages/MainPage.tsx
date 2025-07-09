import { Button, FileInput, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDescription from "~/components/ErrorDescription";
import fileStore from "~/store/FileInfo";
import userStore from "~/store/UserInfo";

const MainPage = () => {
  const [csvFile, setCsvFile] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()


  const handleUpload = () => {
    if(!userStore.isLoggedIn) return
    if(!csvFile){
      setError("Please upload a file")
      return 
    }
    fileStore.setFile(csvFile);
    setError("")
    navigate("/file")
  }
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-96">
      <label className="block text-2xl font-semibold mb-4"> Upload Claims Data</label>
        <div className = "space-y-2 w-2/5 mb-4">
        <FileInput onChange={setCsvFile} value={csvFile} placeholder="Choose File" accept=".csv"/>
        {error.length > 0 && <ErrorDescription error = {error} />}
        </div>
        <Tooltip
        label ="Login to upload"
        disabled={userStore.isLoggedIn}
        withArrow
        position="bottom">
          <Button onClick={handleUpload}>Upload</Button> 
        </Tooltip>
         
    </div>
  );
}

export default observer(MainPage)