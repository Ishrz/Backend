import {tool,createAgent} from "langchain"
import {ChatMistralAI} from "@langchain/mistralai"
import * as z from "zod"



const emailTool = tool(
        sendEmail,
        {
            name:"emailTool",
            description:"send email to provided email with content",
            schema: z.object({
                to:z.string().describe("recepient of email"),
                html:z.string().describe("html content of email"),
                subject:z.string().describe("subject of email")
            })
        }
)



const mistralLlm = new ChatMistralAI({
    model:"mistral-small",
})

export const agent = createAgent({
    model:mistralLlm,
    tools:[emailTool]

})