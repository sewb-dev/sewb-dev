import { firebase } from '@/lib/firebase';
import crypto from 'crypto';
import { getDatabase, ref, set } from 'firebase/database';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, fullName } = await req.json();
    const combinedString = email;
    const hash = crypto
      .createHash('sha256')
      .update(combinedString)
      .digest('hex');

    const database = getDatabase(firebase);

    await set(ref(database, 'users/' + hash), {
      fullName,
      email,
    });

    console.info(
      `Successfully added user with hash=${hash} to waiting-list database.`
    );

    return new Response(
      JSON.stringify({
        message: `Success`,
      }),
      {
        status: StatusCodes.CREATED,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function GET() {
  return NextResponse.json(
    JSON.stringify({
      message: `Success`,
    }),
    {
      status: StatusCodes.OK,
    }
  );
}
