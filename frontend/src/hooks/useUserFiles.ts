import { useEffect, useState } from "react";
import userStore from "~/store/UserInfo";

export interface UserFile {
  fileName: string;
  inOutNetwork: string;
  size: number;
  createdAt: string;
}

const useUserFiles = () => {
  const [files, setFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState(true);
  const email = userStore.user?.email || "";

  useEffect(() => {
    const getUserFiles = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/my_files?email=${encodeURIComponent(email)}`
        );
        const data = await res.json();
        setFiles(data || []);
      } catch (err) {
        console.error("Failed to fetch files", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      getUserFiles();
    } else {
      setLoading(false); // no user, stop loading
    }
  }, [email]);

  return { files, loading };
};

export default useUserFiles;
