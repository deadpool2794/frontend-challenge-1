import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import Papa from "papaparse";
import transformCsvRowToSchema from "./utils/transformCsvRowToSchema.js";
import storeLocal from "./utils/storeLocal.js";
import path from "path";
import { existsSync } from "fs";
import fs from "fs/promises";


interface ParsedRow {
  Plan?: string;
  "Plan ID"?: string;
  "Place of Service"?: string;
  "Group Name"?: string;
  "Processed Date"?: string;
  "Paid Date"?: string;
}

const app = new Hono();
app.use("*", cors());

app.post("/upload", async (c) => {
  const body = await c.req.parseBody();

  const file = body["file"] as File;
  const email = body["email"] as string;
  const csvText = await file.text();

  const parsed = Papa.parse(csvText, {
    header: true, 
    skipEmptyLines: true,
  });

  const transformedOutOfNetworkData = parsed.data.map((row: any) => transformCsvRowToSchema(row as Record<string, string>));
  const data = parsed.data as ParsedRow[];
  const firstRow = data[0] || {};
  const finalJsonObject =  transformedOutOfNetworkData.map(eachRow => ({
    reporting_entity_name: "dummy Reporting Entity Name",
    reporting_entity_type: "dummy Reporting Entity Type",
    plan_name: firstRow.Plan || "dummy Plan Name",
    plan_id_type: firstRow["Plan ID"] || "dummy Plan ID Type",
    plan_id:  "dummy Plan ID",
    plan_market_type: "dummy Plan Market Type",
    last_updated_on: eachRow["Processed Date"] || "dummy Last Updated On",
    version:  "1.0.0",
    out_of_network: eachRow,
}))

  const jsonString = JSON.stringify(finalJsonObject, null, 2);
  storeLocal(email, file, jsonString);

  

  return c.text("File Upload Successful", 200);
});

app.get("/my_files", async (c) => {
  const email = c.req.query("email");

  if (!email) {
    return c.text("Missing email query parameter", 400);
  }

  const userDir = path.join("uploads", email);

  if (!existsSync(userDir)) {
    return c.json([], 200); // No files yet for this user
  }

  try {
    const files = await fs.readdir(userDir);

    const fileData = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(userDir, file);
        const stat = await fs.stat(filePath);

        return {
          name: file,
          size: stat.size,
          createdAt: stat.birthtime,
        };
      })
    );

    return c.json(fileData, 200);
  } catch (err) {
    console.error("Error reading files:", err);
    return c.text("Failed to read user files", 500);
  }
});

app.get("/download", async (c) => {
  const email = c.req.query("email");
  const file = c.req.query("file");

  if (!email || !file) {
    return c.text("Missing email or file query parameter", 400);
  }

  const filePath = path.join("uploads", email, file);

  try {
    const content = await fs.readFile(filePath);
    const fileName = path.basename(filePath);

    return new Response(content, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error("Download failed:", err);
    return c.text("File not found", 404);
  }
});


serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
