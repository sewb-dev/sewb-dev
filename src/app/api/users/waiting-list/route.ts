import { NextResponse, NextRequest } from "next/server";
import { firebase } from "@/app/lib/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import { serialize } from "cookie";

const maxAge = 60 * 60 * 24 * 365 // 1 year;

const cookieName = "QNA_TOKEN";
export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const fullName = formData.get("fullName");
  const email = formData.get("email");

  const database = getDatabase(firebase);
  const token = req.cookies.get(cookieName);
  let userId: string = "";
  if (token) {
    userId = token.value;
  } else {
    userId = uuid();
    console.log("111", req.ip);
  }

  await set(ref(database, "users/" + userId), {
    username: fullName,
    email: email,
  });

  const cookie = serialize(cookieName, userId, {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return new Response(`Success`, {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(`Success`, {
    status: 200,
  });
}
