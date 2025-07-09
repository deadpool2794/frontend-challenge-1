// Column Definitions
export const claimId = "Claim ID";
export const subscriberId = "Subscriber ID";
export const memberSequence = "Member Sequence";
export const claimStatus = "Claim Status";
export const billed = "Billed";
export const allowed = "Allowed";
export const paid = "Paid";
export const paymentStatusDate = "Payment Status Date";
export const serviceDate = "Service Date";
export const receivedDate = "Received Date";
export const entryDate = "Entry Date";
export const processedDate = "Processed Date";
export const paidDate = "Paid Date";
export const paymentStatus = "Payment Status";
export const groupName = "Group Name";
export const groupId = "Group ID";
export const divisionName = "Division Name";
export const divisionId = "Division ID";
export const plan = "Plan";
export const planId = "Plan ID";
export const placeOfService = "Place of Service";
export const claimType = "Claim Type";
export const procedureCode = "Procedure Code";
export const memberGender = "Member Gender";
export const providerId = "Provider ID";
export const providerName = "Provider Name";

// enums
export const claimStatusEnum = ["Payable", "Denied", "Partial Deny"] as const;
export const paymentStatusEnum = ["Paid", "Pending"] as const;
export const divisionNameEnum = ["North", "East", "West", "South"] as const;
export const divisionIdEnum = ["N", "E", "W", "S"] as const;
export const planEnum = ["Premium Care Plan", "Family Coverage Plan", "Senior Wellness Plan", "Young Adult Plan", "Basic Health Plan"] as const;
export const planIdEnum = ["PCP002", "FCP003", "SWP004", "YAP005", "BHP001"] as const;
export const placeOfServiceEnum = ["Inpatient Hospital", "Emergency Room - Hospital", "Outpatient Hospital"] as const;
export const claimTypeEnum = ["Professional", "Institutional"] as const;
export const memberGenderEnum = ["Male", "Female"] as const;
