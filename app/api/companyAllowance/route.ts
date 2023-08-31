import { slugify } from "@/libs/utils";
import CompanyAllowance from "@/mongoDB/CompanyAllowance";
import dbConnect from "@/mongoDB/dbConnect";
import { companyAllowanceTypeBulk } from "@/types/employeeUpload/bulkCompanyAllowance";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import {
  FrequencyOfCompanyAllowance,
  ICompanyAllowance,
  statusOfCompanyAllowance,
} from "@/types/companyAllowance";
export const POST = async (req: Request) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    console.log("unauthorized");
    return NextResponse.json({ error: true, message: "Unauthorize" });
  }
//   console.log(data);
  // console.log(req.json())
  const savedCompanyAllowance: ICompanyAllowance[] = [];
  const errorCompanyAllowance: companyAllowanceTypeBulk[] = [];

  data.map(async (item: companyAllowanceTypeBulk) => {
    const slug = slugify(item.name);
    // console.log(item,slug)
    try {
      await dbConnect();
      const foundAllowance = await CompanyAllowance.findOne({ slag: slug });
      // console.log(foundAllowance)
      if (!foundAllowance) {
        console.log("+++++++++++++++++++++++++");
        const newlyCreatedCompanyAllowance = await new CompanyAllowance({
          name: item.name,
          slag: slug,
          minTaxable: item.minTaxable,
          minTaxableManager: item.minTaxableManager,
          statusOfAllowance: statusOfCompanyAllowance.Active,
          tenantId: session.user.tenantId,
          frequency:
            item.frequency === 1
              ? FrequencyOfCompanyAllowance.byService
              : FrequencyOfCompanyAllowance.monthly,
          type: item.type === 1 ? "Vary" : "Constant",
        }).save();
        savedCompanyAllowance.push(newlyCreatedCompanyAllowance);
      } else {
        savedCompanyAllowance.push(foundAllowance);
      }
    } catch (error) {
      console.log("ERROR ===== ", error);
      errorCompanyAllowance.push(item);
      // return NextResponse.json({error:true,message:error})
    }
  });

return NextResponse.json({savedCompanyAllowance,errorCompanyAllowance})
};
