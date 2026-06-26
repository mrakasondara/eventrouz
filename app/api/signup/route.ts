import { mongoURI } from "@/constant";
import { connectDB, encryptPassword } from "@/database";
import { User } from "@/database/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectDB(mongoURI);

  try {
    // check if email exist
    const isExist = await User.findOne({ email }, "email");
    if (isExist) {
      return NextResponse.json(
        { success: false, message: "Email has been used!" },
        { status: 400 }
      );
    }

    const encryptedPassword = await encryptPassword(password);

    await User.create({ email, password: encryptedPassword });

    return NextResponse.json(
      { success: true, message: "Sign up success!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Sign up failed!" },
      { status: 400 }
    );
  }
}
