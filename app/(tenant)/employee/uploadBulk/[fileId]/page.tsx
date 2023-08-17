import { ObjectId, Timestamp } from "bson";
import DataViewForUpload from "../components/DataViewForUpload";
import UploadedFile from "@/mongoDB/UploadedFile";
import * as xlsx from "xlsx";
import axios, { AxiosResponse } from "axios";
import { equalsCheck } from "@/libs/utils";
import { personalTypeBulk } from "@/types/employeeUpload/bulkPersonal";
import { contractTypeBulk } from "@/types/employeeUpload/bulkContract";
import { allowanceTypeBulk } from "@/types/employeeUpload/bulkAllowance";
import { overtimeTypeBulk } from "@/types/employeeUpload/bulkOverTime";
import { workingHourTypeBulk } from "@/types/employeeUpload/bulkWorkingHour";
import { companyAllowanceTypeBulk } from "@/types/employeeUpload/bulkCompanyAllowance";
import { PreparedData } from "@/libs/employeeUtils";
import dbConnect from "@/mongoDB/dbConnect";
type fileType = {
  _id: ObjectId;
  url: string;
  toWhat: string;
  tenantId: ObjectId;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};
const sheetOrder = [
  "Personal",
  "Contract",
  "Allowance",
  "OverTime",
  "WorkingHour",
  "CompanyAllowance",
];

const UploadBulkFilePage = async ({
  params,
}: {
  params: { fileId: string };
}) => {
  let file: fileType | null;
  let axiosResponse: AxiosResponse;
  let excelFile;
  let personalData : personalTypeBulk [] ;
  let contractData : contractTypeBulk [];
  let  allowanceData:allowanceTypeBulk [];
   let overtimeData:overtimeTypeBulk[];
   let workingHourData:workingHourTypeBulk[];
   let companyAllowancesData:companyAllowanceTypeBulk[];
  try {
   await dbConnect();
    file = await UploadedFile.findById(params.fileId);
  } catch (error) {
    console.log('___________-------------------------------------------------')
    console.log(error);
    return new Error("something went wrong inSide File");
  }
  if (!file) return new Error("File Not Found");

  try {
    axiosResponse = await axios(file.url, { responseType: "arraybuffer" });
  } catch (error) {
    console.log(error);
    return new Error("Axios error ");
  }
  try {
    excelFile = xlsx.read(axiosResponse.data);
  } catch (error) {
    console.log(error);
    return new Error("Excel File not found");
  }
  if (!excelFile) {
    console.log("Excel file is missing");
    return new Error("Excel file is missing");
  }
  if (!equalsCheck(excelFile.SheetNames, sheetOrder)) {
    console.log("Sheet names are incorrect or in invalid Order");
    return new Error("Sheet names are incorrect or in invalid Order");
  }

  
  try {
    personalData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[0]]);
    contractData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[1]]);
    allowanceData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[2]]);
    overtimeData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[3]]);
    workingHourData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[4]]);
    companyAllowancesData = xlsx.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[5]]);
    
  } catch (error) {
    console.log("couldn't get data from the sheet(s)");
    return new Error("Couldn't get data from the sheet(s)")
    // console.log(error);
  }

  const  a = PreparedData({personalData,contractData,allowanceData,overtimeData,workingHourData});
  
  // console.log(a?[0])

  // return <DataViewForUpload fileUrl={file.url} />;
  return(
    <>
    <h1>HIIIIIIIIIII</h1>
    <p>{JSON.stringify(a)}</p>
    </>
  )
};

export default UploadBulkFilePage;
