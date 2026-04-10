import type { IExecuteFunctions, IDataObject, IHttpRequestMethods, IHttpRequestOptions, JsonObject } from "n8n-workflow";
import { NodeApiError } from "n8n-workflow";


// ═══════════════════════════════════════════════════════════════════
// HTTP Request Helper
// ═══════════════════════════════════════════════════════════════════

/**
 * Makes an HTTP request to the WWebJS API.
 */
export async function wpiRequest(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  query: IDataObject = {},
  token?: string,
): Promise<IDataObject> {
  const baseUrl ="https://api.redgifs.com/v2";

  const options: IHttpRequestOptions = {
    method,
    url: `${baseUrl}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    qs: query,
  };

  if (token) {
    options.headers!["Authorization"] = `Bearer ${token}`;
  }



  try {
    return (await this.helpers.httpRequest(options)) as IDataObject;
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject, {
      message: `WWebJS API request failed: ${(error as Error).message}`,
    });
  }
}

