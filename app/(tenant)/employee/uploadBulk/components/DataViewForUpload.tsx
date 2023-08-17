import { equalsCheck } from '@/libs/utils';
import axios from 'axios';
import React from 'react'
import { toast } from 'react-hot-toast'
import * as xlsx from 'xlsx'
interface DataViewForUploadProps {
  fileUrl: string
}
const sheetOrder = [
  "Personal",
  "Contract",
  "Allowance",
  "OverTime",
  "WorkingHour",
  "CompanyAllowance",
];
export const DADe = async (fileUrl: string) => {
  // 'use server'
  if(!fileUrl) return null;
  let excelFile,
    personalSheet,
    contractSheet,
    allowanceSheet,
    overtimeSheet,
    workingHourSheet,
    companyAllowanceSheet;
  let personalData,
    contractData,
    allowanceData,
    overtimeData,
    workingHourData,
    companyAllowancesData = [];
   

  try {
  let axiosResponse = await axios(fileUrl,{responseType:'arraybuffer'});

     excelFile = xlsx.readFile(axiosResponse.data);
     
  } catch (error) {
    toast.error("Unsupported File Type" + error);
  }
if(!excelFile) 
{
  toast.error("Excel file not found" );
  return null;

}
if (!equalsCheck(excelFile.SheetNames, sheetOrder)) {
   toast.error("Sheet names are incorrect or in invalid Order");
    return null
}

// allocating sheets
try {
  personalSheet = excelFile.Sheets[excelFile.SheetNames[0]];
  contractSheet = excelFile.Sheets[excelFile.SheetNames[1]];
  allowanceSheet = excelFile.Sheets[excelFile.SheetNames[2]];
  overtimeSheet = excelFile.Sheets[excelFile.SheetNames[3]];
  workingHourSheet = excelFile.Sheets[excelFile.SheetNames[4]];
  companyAllowanceSheet = excelFile.Sheets[excelFile.SheetNames[5]];
} catch (error) {
  console.log(error);
  toast.error("Couldn't get Sheet(s)");
  return;
}
try {
  personalData = xlsx.utils.sheet_to_json(personalSheet);
  contractData = xlsx.utils.sheet_to_json(contractSheet);
  allowanceData = xlsx.utils.sheet_to_json(allowanceSheet);
  overtimeData = xlsx.utils.sheet_to_json(overtimeSheet);
  workingHourData = xlsx.utils.sheet_to_json(workingHourSheet);
  companyAllowancesData = xlsx.utils.sheet_to_json(companyAllowanceSheet);
  return personalData;
} catch (error) {
  toast.error("Couldn't get data from the sheet(s)");
  // console.log(error);
  return;
}
}

const DataViewForUpload:React.FC<DataViewForUploadProps>=  async({fileUrl}) => {
  
  const t = await DADe(fileUrl)

  return (
    <div>DataViewForUpload {JSON.stringify(t)}</div>
  )
}

export default DataViewForUpload
