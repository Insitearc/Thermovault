/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean up filename to prevent path traversal and ensure web-safe names
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_");
    
    const timestamp = Date.now();
    const fileName = `${baseName}_${timestamp}${ext}`;
    const uploadDir = path.join(process.cwd(), "public/images");
    
    // Ensure the destination images directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl
    });
  } catch (error: any) {
    console.error("Error in upload API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
