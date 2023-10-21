import { config } from "@/app/lib/auth";
import generationService from "@/app/modules/generation/generation.service";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';


const createGenerationDtoSchema = z.object({
  generationId: z.string(),
  generatedAt: z.string().datetime()
})

type CreateGenerationDto = z.infer<typeof createGenerationDtoSchema>

type GenerationResponse = {
  generationId: string
  generatedAt: number
  userId: string
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(config)

  if (!session) {
    return NextResponse.json({ message: 'You must be logged in' }, { status: 401 })
  }

  // if (req.method !== 'POST') {
  //   return NextResponse.json({ message: 'Only POST requests allowed' })
  // }

  const data = createGenerationDtoSchema.safeParse(await req.json())

  if (!data.success) {
    return NextResponse.json({ message: 'One or more validation errors occured' }, { status: 400 })
  }

  const { generatedAt, generationId } = data.data

  const { email } = session.user
  const generation = await generationService.addGeneration(email, new Date(generatedAt), generationId)

  if (!generation) {
    return NextResponse.json({ message: 'An error occured while saving the generation' }, { status: 500 })
  }
  return NextResponse.json(generation, { status: 201 })
}