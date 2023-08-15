import dbConnect from "@/mongoDB/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import xlsx from "xlsx";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `/TenantUploadedExcels/${file.name}`;
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
    NextResponse.json({ messgae: "Upload Successfully " }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
