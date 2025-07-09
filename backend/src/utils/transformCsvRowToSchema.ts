import { schema } from "../schema/out-of-network-allowed-amounts-schema.js";
import getEnumValue from "./getEnumValue.js";
import parseNumber from "./parseNumber.js";

const transformCsvRowToSchema = (row: Record<string, string>): any => {
  let billingCodeType: string = "CPT"; // Default
  if (row["Procedure Code"]) {
    if (row["Procedure Code"].toLowerCase().startsWith("s")) {
      billingCodeType = "HCPCS";
    }
  }

  return {
    name: row["Provider Name"] || "dummy Name", // Using Provider Name, or dummy
    billing_code_type: getEnumValue(billingCodeType, schema.definitions.out_of_network.properties.billing_code_type.enum as string[], "CPT"),
    billing_code_type_version: "dummy Billing Code Type Version",
    billing_code: row["Procedure Code"] || "dummy Billing Code",
    description: "dummy Description for " + (row["Procedure Code"] || "code"), // Using Procedure Code for context
    allowed_amounts: [
      {
        tin: {
          type: getEnumValue("npi", schema.definitions.allowed_amounts.properties.tin.properties.type.enum as string[], "npi"), // Assuming Provider ID is an NPI
          value: row["Provider ID"] || "dummy TIN Value",
        },
        service_code: ["99"], // Dummy service code, as it's not explicitly in data
        billing_class: getEnumValue(row["Claim Type"], schema.definitions.allowed_amounts.properties.billing_class.enum as string[], "professional"),
        payments: [
          {
            allowed_amount: parseNumber(row["Allowed"]) ?? 0.0,
            billing_code_modifier: [], // No modifier in data, so empty array
            providers: [
              {
                billed_charge: parseNumber(row["Billed"]) ?? 0.0,
                npi: [parseNumber(row["Provider ID"]) ?? 0], // Assuming Provider ID is NPI
              },
            ],
          },
        ],
      },
    ],
  };
};

export default transformCsvRowToSchema;
