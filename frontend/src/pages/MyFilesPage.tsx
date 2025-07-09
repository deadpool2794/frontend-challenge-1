import { Alert, Paper, Table } from "@mantine/core";
import { useEffect } from "react";
import userStore from "~/store/UserInfo";


const MyFilesPage = () => {

    const getUserFiles = async () => {
        const res = await fetch(`http://localhost:8080/my_files?email=${encodeURIComponent(userStore.user?.email || "")}`);
        const data = await res.json();
        console.log(data);
    }

    useEffect(() => {
        getUserFiles();
    }, [])


  return (
    <div className="py-20">
      <div className="flex items-center justify-between gap-12 px-[20%] py-6">
        <img
          src="https://my.clearesthealth.com/assets/ManReading-BFWcqFdd.jpg"
          alt="Man reading"
          className="rounded"
          style={{ height: "350px" }}
        />
        <div className="space-y-4 text-sm">
          <h2 className="text-xl font-semibold">Machine Readable Files</h2>

          <Alert color="yellow" title="Note">
            Some of these files are very large so download at your own risk.
          </Alert>

          <div>
            A machine-readable file is defined as a digital representation of data or information in a file that can be imported or read by a computer system for further processing without human intervention, while ensuring no semantic meaning is lost.
          </div>

          <div>
            Below are all of the relevant machine readable files. This page is intended to meet the compliance requirements for the{" "}
            <a
              href="https://www.cms.gov/CCIIO/Resources/Regulations-and-Guidance/Downloads/CMS-Transparency-in-Coverage-9915F.pdf"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transparency in Coverage Act
            </a>
            . Per that legislation, this page includes these files below.
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-[20%] py-12">
        <Paper shadow="xs" radius="md" p="md">
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>In/Out Network</th>
              </tr>
            </thead>
            <tbody className="text-center">
             <tr>
                <td colSpan={2} className="text-center text-gray-500 pt-4 pb-2">No files to display</td>
            </tr>
            </tbody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default MyFilesPage;
