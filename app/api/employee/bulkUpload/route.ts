import dbConnect from "@/mongoDB/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import xlsx from "xlsx";
import { writeFile } from "fs/promises";
import UploadedFile from "@/mongoDB/UploadedFile";
import { ObjectId } from "bson";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)
  const {fileUrl,toWhat} = await req.json();
  
if(!session){
  return NextResponse.json({ success: false , message:'Unauthenticated' });
}
  if (!fileUrl) {
    return NextResponse.json({ success: false });
  }

  try {
    await dbConnect();
        // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const newFile = new UploadedFile({
      url:fileUrl,
      toWhat,
      tenantId: new ObjectId(session.user.tenantId) ,
    })
    const SavedFile = await newFile.save();
    return NextResponse.json({ SavedFile }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
