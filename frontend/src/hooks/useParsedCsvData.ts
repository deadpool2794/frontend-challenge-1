import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import parseCsvRowData from "~/utils/parseCsvRowData";
import { CsvRowSchema } from "~/schema/claimsDataSchema";
import fileStore from "~/store/FileInfo";

const useParsedCsvData = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!fileStore.file) {
      navigate("/");
      return;
    }

    Papa.parse(fileStore.file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data as any[];
        const headers = Object.keys(data[0] || {});

        const parsedData = data.map((eachRow) => parseCsvRowData(eachRow));
        const validRows = parsedData.filter((eachRow) => CsvRowSchema.safeParse(eachRow).success);
        setRowData(validRows);

        const columns = headers.map((header) => ({
          field: header,
          sortable: true,
          filter: true,
          resizable: true,
          editable: true,
        }));
        setColumnDefs(columns);
      },
      error: (err) => {
        console.error("CSV parsing error:", err);
      },
    });
  }, []);

  return { columnDefs, rowData };
};

export default useParsedCsvData;
