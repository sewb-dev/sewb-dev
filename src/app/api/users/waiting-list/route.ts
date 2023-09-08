import { NextResponse, NextRequest } from "next/server";
import { firebase } from "@/app/lib/firebase";
import { getDatabase, ref, set } from "firebase/database";
import crypto from "crypto";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, fullName } = await req.json();
    const combinedString = email;
    const hash = crypto
      .createHash("sha256")
      .update(combinedString)
      .digest("hex");

    const database = getDatabase(firebase);

    await set(ref(database, "users/" + hash), {
      username: fullName,
      email: email,
    });

    console.log(
      `Successfully added user with hash=${hash} to waiting-list database.`
    );

    return new Response(
      JSON.stringify({
        message: `Success`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    JSON.stringify({
      message: `Success`,
    }),
    {
      status: 200,
    }
  );
}
