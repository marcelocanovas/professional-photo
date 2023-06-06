import { NextResponse } from "next/server";

export const runtime = "edge";

async function createFormData(image: File, prompt: string) {
  const formData = new FormData();
  formData.append("files", image);
  formData.append("prompt", prompt || "A professional 8k image for Linkedin");
  formData.append(
    "negativePrompt",
    "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature"
  );
  formData.append("mode", "canny");
  formData.append("numberOfImages", "2");

  return formData;
}

// Model ID's
// Stable Diffusion 1.5	8b1b897c-d66d-45a6-b8d7-8e32421d02cf	A red bird
// Stable Diffusion 2.1	ee88d150-4259-4b77-9d0f-090abe29f650	A red bird
// OpenJourney v4	1e7737d7-545e-469f-857f-e4b46eaa151d	A red bird
// OpenJourney v2	d66b1686-5e5d-43b2-a2e7-d295d679917c	A red bird
// OpenJourney v1	7575ea52-3d4f-400f-9ded-09f7b1b1a5b8	A red bird mdjrny-v4 style
// Modern Disney	8ead1e66-5722-4ff6-a13f-b5212f575321	A red bird modern disney style
// Future Diffusion	1285ded4-b11b-4993-a491-d87cdfe6310c	A red bird future style
// Realistic Vision v2.0	eab32df0-de26-4b83-a908-a83f3015e971	A red bird

async function postImageToApi(formData: FormData) {
  const modelId = "ee88d150-4259-4b77-9d0f-090abe29f650";
  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix`;

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${process.env.LEAP_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Solicitação de API falhou com status ${response.status}`);
  }

  const jsonResponse = await response.json();
  const remixId = jsonResponse.id;

  if (!remixId) {
    throw new Error("ID do remix não encontrado na resposta da API");
  }

  return remixId;
}

export async function POST(request: Request) {
  // Get the incoming image from form data

  const incomingFormData = await request.formData();
  const image = incomingFormData.get("image") as File | null;
  const prompt = incomingFormData.get("prompt") as string | null;

  if (!image) {
    return NextResponse.json(
      { error: "Nenhuma imagem encontrada na solicitação" },
      { status: 400 }
    );
  }

  if (!prompt) {
    return NextResponse.json(
      { error: "Nenhum prompt encontrado na solicitação" },
      { status: 400 }
    );
  }

  let remixId;
  try {
    const formData = await createFormData(image, prompt);
    remixId = await postImageToApi(formData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Erro ao fazer solicitação para API externa:",
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ remixId });
}
