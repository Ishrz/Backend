import "dotenv/config"
import { HumanMessage} from "langchain"
import readline from "readline/promises";
import { sendEmail } from "./mail.service.js";
import { agent } from "./ai.service.js";
import {tavily} from "@tavily/core" 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ANSI color codes
const colors = {
    blue: "\x1b[34m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    reset: "\x1b[0m"
};

const messages= []

// while(true){
//    try {
//      const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
    
//     messages.push(new HumanMessage(userInput))

//     const response = await agent.invoke({messages})

//     // console.log(response)

//     messages.push(response.messages[response.messages.length-1])

//     console.log(colors.green + "\n🤖 AI: " + colors.reset + colors.cyan + response.messages[response.messages.length-1].content + colors.reset)
//     console.log(colors.gray + "\n" + "─".repeat(50) + colors.reset)
    
//    } catch (error) {
//     console.log(error)
//    }
    
// }




const tvly = tavily(process.env.TAVILY_API_KEY)

const response = await tvly.search("Who is Leo Messi?");

console.log(response.results[0].content);