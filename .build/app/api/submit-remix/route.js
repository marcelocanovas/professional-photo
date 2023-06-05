"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var route_exports = {};
__export(route_exports, {
  POST: () => POST,
  runtime: () => runtime
});
module.exports = __toCommonJS(route_exports);
var import_server = require("next/server");
const runtime = "edge";
async function createFormData(image, prompt) {
  const formData = new FormData();
  formData.append("files", image);
  formData.append("prompt", prompt || "A hand-drawn sketch");
  formData.append(
    "negativePrompt",
    "watermark, blurry, low-res, low contrast, desaturated"
  );
  formData.append("mode", "canny");
  formData.append("numberOfImages", "4");
  return formData;
}
async function postImageToApi(formData) {
  const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d";
  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix`;
  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${process.env.LEAP_API_KEY}`
    }
  });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const jsonResponse = await response.json();
  const remixId = jsonResponse.id;
  if (!remixId) {
    throw new Error("Remix ID not found in API response");
  }
  return remixId;
}
async function POST(request) {
  const incomingFormData = await request.formData();
  const image = incomingFormData.get("image");
  const prompt = incomingFormData.get("prompt");
  if (!image) {
    return import_server.NextResponse.json(
      { error: "No image found in request" },
      { status: 400 }
    );
  }
  if (!prompt) {
    return import_server.NextResponse.json(
      { error: "No prompt found in request" },
      { status: 400 }
    );
  }
  let remixId;
  try {
    const formData = await createFormData(image, prompt);
    remixId = await postImageToApi(formData);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error while making request to external API:",
        error.message
      );
      return import_server.NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return import_server.NextResponse.json({ remixId });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  POST,
  runtime
});
//# sourceMappingURL=route.js.map
