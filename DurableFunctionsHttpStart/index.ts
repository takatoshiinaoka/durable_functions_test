import * as df from "durable-functions"
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpStart: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    const client = df.getClient(context);

    /* client.startNewでオーケストレーション開始 */ 
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    /* client.createCheckStatusResponseでHTTP応答が返される */ 
    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};

export default httpStart;
