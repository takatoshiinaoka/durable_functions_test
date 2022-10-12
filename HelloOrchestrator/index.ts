/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

import * as df from "durable-functions"

const orchestrator = df.orchestrator(function* (context) {
    const outputs = [];
    
    /* ひとつづつ実行する場合 */ 
    // // Replace "Hello" with the name of your Durable Activity Function.
    // outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
    // outputs.push(yield context.df.callActivity("Hello", "Seattle"));
    // outputs.push(yield context.df.callActivity("Hello", "London"));
    // // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
    // return outputs;


    /* 一括で実行する場合 */ 
    // Replace "Hello" with the name of your Durable Activity Function.
    outputs.push(context.df.callActivity("Hello", "Tokyo"));
    outputs.push(context.df.callActivity("Goodbye", "Seattle"));
    outputs.push(context.df.callActivity("Hello", "London"));

    // returns ["Hello Tokyo!", "Goodbye Seattle!", "Hello London!"]
    const results = yield context.df.Task.all(outputs);

    
    return results;

    
});

export default orchestrator;

