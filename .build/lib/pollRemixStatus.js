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
var pollRemixStatus_exports = {};
__export(pollRemixStatus_exports, {
  pollRemixStatus: () => pollRemixStatus
});
module.exports = __toCommonJS(pollRemixStatus_exports);
var import_axios = __toESM(require("axios"));
const POLL_INTERVAL_MS = 3e3;
async function checkStatus({ modelId, remixId, updateStatus, setIsPolling }, pollInterval) {
  try {
    const response = await import_axios.default.get(
      `/api/check-remix-status?modelId=${modelId}&remixId=${remixId}`
    );
    const status = response.data.status;
    if (status === "finished" || status === "failed") {
      updateStatus(response.data.images);
      setIsPolling(false);
    } else if (status === "queued" || status === "processing") {
      setTimeout(
        () => checkStatus(
          { modelId, remixId, updateStatus, setIsPolling },
          pollInterval
        ),
        pollInterval
      );
    } else {
      throw new Error("Unexpected status value");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while polling for remix status:", error.message);
    }
  }
}
const pollRemixStatus = (modelId, remixId, updateStatus, setIsPolling) => {
  setIsPolling(true);
  return checkStatus(
    { modelId, remixId, updateStatus, setIsPolling },
    POLL_INTERVAL_MS
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pollRemixStatus
});
//# sourceMappingURL=pollRemixStatus.js.map
