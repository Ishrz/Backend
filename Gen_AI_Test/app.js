import "dotenv/config"
import {ChatMistralAI} from "@langchain/mistralai"
import {createAgent, HumanMessage ,tool} from "langchain"
import * as z from "zod";
import readline from "readline/promises";
// import stream from "stream";
import { sendEmail } from "./mail.service.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

const agent = createAgent({
    model:mistralLlm,
    tools:[emailTool]

})

// ANSI color codes
const colors = {
    blue: "\x1b[34m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    reset: "\x1b[0m"
};

// Create a null stream to suppress readline's automatic echo
// const nullStream = new stream.Writable({
//     write() {}
// });


const messages= []

while(true){
   try {
     const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
    
    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({messages})

    // console.log(response)

    messages.push(response.messages[response.messages.length-1])

    console.log(colors.green + "\n🤖 AI: " + colors.reset + colors.cyan + response.messages[response.messages.length-1].content + colors.reset)
    console.log(colors.gray + "\n" + "─".repeat(50) + colors.reset)
    
   } catch (error) {
    console.log(error)
   }
    // console.log(messages)
}