import {createAgent} from "langchain"
import {ChatMistralAI} from "@langchain/mistralai"
import { DynamicStructuredTool } from "@langchain/core/tools"
import * as z from "zod"
import sendEmail from "./mail.service.js"

//email tool - properly structured for Mistral AI
const emailTool = new DynamicStructuredTool({
    name: "emailTool",
    description: "send email to provided email with content",
    schema: z.object({
        to: z.string().describe("recipient of email"),
        html: z.string().describe("html content of email"),
        subject: z.string().describe("subject of email")
    }),
    func: async (input) => {
        try {
            const result = await sendEmail(input);
            return result;
        } catch (error) {
            return `Error sending email: ${error.message}`;
        }
    }
})


//mistral ai model setup
const mistralLlm = new ChatMistralAI({
    model:"mistral-small",
})


//creating agent for tool calling
export const agent = createAgent({
    model:mistralLlm,
    tools:[emailTool]

})