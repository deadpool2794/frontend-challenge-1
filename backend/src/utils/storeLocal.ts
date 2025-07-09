import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";

const storeLocal = async (email: string, file: File, jsonString: string) => {
  const uploadDir = path.join(process.cwd(), "uploads", email);
  await mkdir(uploadDir, { recursive: true });

  const existingFiles = await readdir(uploadDir);
  const nextIndex = existingFiles.length + 1;
  const jsonFileName = `${nextIndex}-${file.name.replace(/\.[^/.]+$/, "")}.json`;

  const filePath = path.join(uploadDir, jsonFileName);
  await writeFile(filePath, jsonString);
}

export default storeLocal