/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");

async function readJsonFile(fileName: string) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error: any) {
    console.error(`Error reading ${fileName}:`, error);
    return null;
  }
}

async function writeJsonFile(fileName: string, data: any) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error: any) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
}

export async function GET() {
  try {
    const blogs = (await readJsonFile("blogs.json")) || [];
    const services = (await readJsonFile("services.json")) || [];
    const projects = (await readJsonFile("projects.json")) || [];
    const pages = (await readJsonFile("pages.json")) || {};
    const tracker = (await readJsonFile("tracker.json")) || [];

    return NextResponse.json({
      success: true,
      data: {
        blogs,
        services,
        projects,
        pages,
        tracker,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: "Action is required" },
        { status: 400 }
      );
    }

    let success = false;

    switch (action) {
      case "save_blogs":
        success = await writeJsonFile("blogs.json", data);
        break;
      case "save_services":
        success = await writeJsonFile("services.json", data);
        break;
      case "save_projects":
        success = await writeJsonFile("projects.json", data);
        break;
      case "save_pages":
        success = await writeJsonFile("pages.json", data);
        break;
      case "save_tracker":
        success = await writeJsonFile("tracker.json", data);
        break;
      default:
        return NextResponse.json(
          { success: false, error: `Invalid action: ${action}` },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to write data file" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
