import { Button } from "@mantine/core"



const FileRow = ({file, email}) => {
    return (
        <tr key={file.name}>
            <td className="text-left pt-2">{file.name}</td>
            <td className = "text-center pt-2">
                <a
                href={`http://localhost:8080/download?email=${encodeURIComponent(
                    email
                )}&file=${encodeURIComponent(file.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button size="xs" variant="light">
                    Download
                </Button>
                </a>
            </td>
        </tr>
    )

}


export default FileRow