import { Button, FileInput, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";
import userStore from "~/store/UserInfo";

const MainPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-96">
      <label className="block text-2xl font-semibold mb-4"> Upload Claims Data</label>
        <div className = "space-y-2 w-2/5 mb-4">
        <FileInput placeholder="Choose File"/>
        </div>
        <Tooltip
        label ="Login to upload"
        disabled={userStore.isLoggedIn}
        withArrow
        position="bottom">
          <Button>Upload</Button> 
        </Tooltip>
         
    </div>
  );
}

export default observer(MainPage)