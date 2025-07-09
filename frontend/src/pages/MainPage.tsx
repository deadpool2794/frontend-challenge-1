import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, FileInput, Tooltip } from "@mantine/core";
import ErrorDescription from "~/components/ErrorDescription";
import userStore from "~/store/UserInfo";
import fileStore from "~/store/FileInfo";

const MainPage = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!userStore.isLoggedIn) return;
    if (!csvFile) {
      setError("Please upload a file");
      return;
    }

    fileStore.setFile(csvFile);
    setError("");
    navigate("/file_preview");
  };

  return (
    <div className="flex flex-col h-full items-center justify-center  text-center px-96">
      <label className="block text-2xl font-semibold mb-4">Upload Claims Data</label>
      <div className="space-y-2 w-2/5 min-w-96 mb-4">
        <FileInput onChange={setCsvFile} value={csvFile} placeholder="Choose File" accept=".csv" />
        {error.length > 0 && <ErrorDescription error={error} />}
      </div>

      <Tooltip
        label="Login to Upload"
        disabled={userStore.isLoggedIn} // Tooltip only shows when not logged in
        withArrow
        position="bottom"
      >
        <Button onClick={handleUpload}>Upload</Button>
      </Tooltip>
    </div>
  );
};

export default observer(MainPage);
