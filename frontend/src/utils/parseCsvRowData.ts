import {
  claimId,
  subscriberId,
  memberSequence,
  claimStatus,
  billed,
  allowed,
  paid,
  paymentStatusDate,
  serviceDate,
  receivedDate,
  entryDate,
  processedDate,
  paidDate,
  paymentStatus,
  groupName,
  groupId,
  divisionName,
  divisionId,
  plan,
  planId,
  placeOfService,
  claimType,
  procedureCode,
  memberGender,
  providerId,
  providerName,
} from "./constants";

const parseCsvRowData = (data) => {
  const parsedObject = {};
  parsedObject[claimId] = data[claimId];
  parsedObject[subscriberId] = data[subscriberId];
  parsedObject[memberSequence] = parseInt(data[memberSequence]);
  parsedObject[claimStatus] = data[claimStatus];
  parsedObject[billed] = parseFloat(data[billed]);
  parsedObject[allowed] = parseFloat(data[allowed]);
  parsedObject[paid] = parseFloat(data[paid]);
  parsedObject[paymentStatusDate] = new Date(data[paymentStatusDate]);
  parsedObject[serviceDate] = new Date(data[serviceDate]);
  parsedObject[receivedDate] = new Date(data[receivedDate]);
  parsedObject[entryDate] = new Date(data[entryDate]);
  parsedObject[processedDate] = new Date(data[processedDate]);
  parsedObject[paidDate] = new Date(data[paidDate]);
  parsedObject[paymentStatus] = data[paymentStatus];
  parsedObject[groupName] = data[groupName];
  parsedObject[groupId] = data[groupId];
  parsedObject[divisionName] = data[divisionName];
  parsedObject[divisionId] = data[divisionId];
  parsedObject[plan] = data[plan];
  parsedObject[planId] = data[planId];
  parsedObject[placeOfService] = data[placeOfService];
  parsedObject[claimType] = data[claimType];
  parsedObject[procedureCode] = data[procedureCode];
  parsedObject[memberGender] = data[memberGender];
  parsedObject[providerId] = data[providerId];
  parsedObject[providerName] = data[providerName];

  return parsedObject;
};

export default parseCsvRowData;
