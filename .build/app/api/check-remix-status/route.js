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
  GET: () => GET,
  runtime: () => runtime
});
module.exports = __toCommonJS(route_exports);
var import_server = require("next/server");
const runtime = "edge";
async function GET(request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("modelId");
  const remixId = searchParams.get("remixId");
  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix/${remixId}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.LEAP_API_KEY}`
      }
    });
    if (!response.ok) {
      return import_server.NextResponse.json(
        { error: `Request failed with status ${response.status}` },
        { status: response.status }
      );
    }
    const jsonResponse = await response.json();
    return import_server.NextResponse.json(jsonResponse);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while checking the remix status:", error.message);
      return import_server.NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  runtime
});
//# sourceMappingURL=route.js.map
