"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var submitImage_exports = {};
__export(submitImage_exports, {
  submitImage: () => submitImage
});
module.exports = __toCommonJS(submitImage_exports);
var import_axios = __toESM(require("axios"));
async function submitImage(blob, prompt) {
  try {
    const formData = new FormData();
    formData.append("image", blob);
    formData.append("prompt", prompt);
    const response = await import_axios.default.post(
      "/api/submit-remix",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return response.data.remixId;
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  submitImage
});
//# sourceMappingURL=submitImage.js.map
