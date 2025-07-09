import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import Papa from "papaparse";
import transformCsvRowToSchema from "./utils/transformCsvRowToSchema.js";
import storeLocal from "./utils/storeLocal.js";

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


serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
