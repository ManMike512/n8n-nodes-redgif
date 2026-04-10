import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
  NodeConnectionType,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import { wpiRequest } from "./transport";


import { nicheFields,nicheOperations, tokenOperations } from "./descriptions/index";


export class Redgif implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Redgif",
    name: "redgif",
    icon: "file:redgif.svg",
    usableAsTool: true,
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description:
      "Interact with Redgifs.com API — manage niches and fetch gifs from niches.",
    defaults: { name: "Redgifs.com" },
    inputs: ["main"] as NodeConnectionType[],
    outputs: ["main"] as NodeConnectionType[],
    hints: [
      // ── session/getSessions ──
      {
        message:
          'Output merges input fields with API response. API adds: <code>success</code>, <code>result</code>: array of session name strings — e.g. <code>["session1", "session2"]</code>',
        type: "info",
        location: "outputPane",
        whenToDisplay: "beforeExecution",
        displayCondition: '={{ $parameter["resource"] === "niche" && $parameter["operation"] === "getNiches" }}',
      },
    ],

    properties: [
      // ── Resource Selector ──
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Token", value: "token" },
          { name: "Niche", value: "niche" },
        ],
        default: "niche",
      },

      // ── Operations & Fields per Resource ──
      ...nicheOperations,
      ...nicheFields,
      ...tokenOperations
    ],
  };



  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter("resource", i) as string;
        const operation = this.getNodeParameter("operation", i) as string;

        let responseData: IDataObject;

        switch (resource) {
          case "niche":
            responseData = await executeNiche.call(this, operation, i);
            break;
          case "token":
            responseData = await executeToken.call(this, operation, i);
            break;

          default:
            throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, { itemIndex: i });
        }

        if (Array.isArray(responseData)) {
          returnData.push(
            ...(responseData as IDataObject[]).map((d) => ({
              json: { ...items[i].json, ...d },
              pairedItem: { item: i },
            })),
          );
        } else {
          returnData.push({
            json: { ...items[i].json, ...responseData },
            pairedItem: { item: i },
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

// ═══════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════

/**
 * Gets and validates a bearer token from node parameters
 */
function getBearerToken(executeFn: IExecuteFunctions, i: number): string {
  const bearerToken = executeFn.getNodeParameter("bearerToken", i) as string;

  if (!bearerToken) {
    throw new NodeOperationError(executeFn.getNode(), "Bearer token is required", { itemIndex: i });
  }
  return bearerToken;
}

function getNicheId(executeFn: IExecuteFunctions, i: number): string {
  const nicheId = executeFn.getNodeParameter("nicheId", i) as string;
  if (!nicheId) {
    throw new NodeOperationError(executeFn.getNode(), "Niche ID is required", { itemIndex: i });
  }
  return nicheId;
}



// ═══════════════════════════════════════════════════════════════════
// Resource Execution Handlers
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════

// ── Token ──
async function executeToken(this: IExecuteFunctions, operation: string, i: number): Promise<IDataObject> {
  switch (operation) {
    case "getNiches":
        { 

      return wpiRequest.call(this, "GET", `/auth/temporary`, {}); 
    }
    default:
      throw new NodeOperationError(this.getNode(), `Unknown niche operation: ${operation}`, { itemIndex: i });
  }
}
// ── Niche ──
async function executeNiche(this: IExecuteFunctions, operation: string, i: number): Promise<IDataObject> {
  switch (operation) {
    case "getNiches":
        { 
                  const searchOptions = this.getNodeParameter("searchOptions", i, {}) as IDataObject;
        const nicheId =  getNicheId(this, i);
        const path=`/niches/${nicheId}/gifs`;
        const token= getBearerToken(this, i);
         if (Object.keys(searchOptions).length > 0){
            return wpiRequest.call(this, "GET", path, searchOptions, token);
         }
      return wpiRequest.call(this, "GET", path, {}, token); 
    }
    default:
      throw new NodeOperationError(this.getNode(), `Unknown niche operation: ${operation}`, { itemIndex: i });
  }
}