import { observer } from "mobx-react-lite";
import fileStore from "~/store/FileInfo";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mantine/core";
import useParsedCsvData from "~/hooks/useParsedCsvData";
import userStore from "~/store/UserInfo";
import { useState } from "react";

const FilePreviewPage = () => {
  const { columnDefs, rowData } = useParsedCsvData();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleApprove = async () => {
    const file = fileStore.file;
    const email = userStore.user?.email;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    setUploadStatus("uploading");

    try {
        // send file to backend


      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
    }
  };

  return (
    <div className="p-24 pt-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">File Preview</h1>
          <p className="mb-4 font-medium text-gray-600">{fileStore.file?.name}</p>
        </div>
        <Button onClick={handleApprove}> Approve</Button>
      </div>
      {uploadStatus === "uploading" && <p className="text-blue-500 mb-4">Uploading file...</p>}
      {uploadStatus === "success" && <p className="text-green-600 mb-4">Uploaded file successfully!</p>}
      {uploadStatus === "error" && <p className="text-red-500 mb-4">Upload failed. Please try again.</p>}
      {rowData.length > 0 ? <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} paginationPageSize={20} domLayout="autoHeight" /> : <p>Empty File</p>}
    </div>
  );
};

export default observer(FilePreviewPage);
