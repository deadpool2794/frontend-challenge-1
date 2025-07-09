import { Button, FileInput } from "@mantine/core";

export default function MainPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-96">
      <label className="block text-2xl font-semibold mb-4"> Upload Claims Data</label>
        <div className = "space-y-2 w-2/5 mb-4">
        <FileInput placeholder="Choose File"/></div>
        <Button>Upload</Button>  
    </div>
  );
}
