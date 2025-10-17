import dotenv from 'dotenv'
import readlineSync from 'readline-sync';
import { GoogleGenAI, Type } from '@google/genai';
dotenv.config();


// Step-1-->  custom function which we want to build


function addition(num1, num2) {
    return num1 + num2;
}

function substraction(num1, num2) {
    return num1 - num2;
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 == 0) {
        console.log(`Sorry can't divide with 0`);
        return;
    }
    return num1 / num2;
}

// Step-2-->  uske baad apun function declaration krte hai.

const additionFunctionDeclaration = {
    // first me hmlog function ka naam likhte hai.
    name: 'addition',
    description: 'Basically takes two inputs num1 and num2 and return their sum',
    parameters: {
        type: Type.OBJECT,
        properties: {
            num1: {
                type: Type.NUMBER,
                description: 'It is a number, e.g. num1=10'
            },
            num2: {
                type: Type.NUMBER,
                description: 'It is a number, e.g. num2=5'
            }
        },
        required: ['num1', 'num2'],
    }
}

const SubstractionFunctionDeclaration = {
    // first me hmlog function ka naam likhte hai.
    name: 'substraction',
    description: 'Basically takes two inputs num1 and num2 and return their substract',
    parameters: {
        type: Type.OBJECT,
        properties: {
            num1: {
                type: Type.NUMBER,
                description: 'It is a number , e.g. num1=4'
            },
            num2: {
                type: Type.NUMBER,
                description: 'It is a number, , e.g. num2=5'
            }
        },
        required: ['num1', 'num2'],
    }
}
const MultiplicationFunctionDeclaration = {
    // first me hmlog function ka naam likhte hai.
    name: 'multiplication',
    description: 'Basically takes two inputs num1 and num2 and return their multiplication',
    parameters: {
        type: Type.OBJECT,
        properties: {
            num1: {
                type: Type.NUMBER,
                description: 'It is a number, , e.g.  num1=10'
            },
            num2: {
                type: Type.NUMBER,
                description: 'It is a number, , e.g. num2=2'
            }
        },
        required: ['num1', 'num2'],
    }
}

const DivisionFunctionDeclaration = {
    // first me hmlog function ka naam likhte hai.
    name: 'division',
    description: 'Basically takes two inputs num1 and num2 and return their division. But make sure second parameter that is num2 must not be 0 if it is 0 then dont do any operation simple return',
    parameters: {
        type: Type.OBJECT,
        properties: {
            num1: {
                type: Type.NUMBER,
                description: 'It is a number , e.g. num1=10'
            },
            num2: {
                type: Type.NUMBER,
                description: 'It is a number, e.g. num2=2 && num2!==0'
            }
        },
        required: ['num1', 'num2'],
    }
}

// Step-3-->  Hmlog basically tools access dete jo bhi functionsdeclarations hmlog abhi tk kiye hai.
// or jitna bhi function hmlog ek hi me daal skte hai because ye array lete hai functionsdeclarations ka.
const config = {
    tools: [{
        functionDeclarations: [additionFunctionDeclaration, SubstractionFunctionDeclaration, MultiplicationFunctionDeclaration, DivisionFunctionDeclaration]
    }]
};

// Step-4-->  (Optional)  hmlog saare function ko map kr diye hai taaki hmlog aaram se function call kr ske.

// Function Map
const availableFunctions = {
    addition: addition,
    substraction: substraction,
    multiplication: multiplication,
    division: division,
    // Add any other functions here
};


// Step-5--> Ye hmara custom function or ai client initialization hai or esme bhi aisa hai ki hmlog apna starting conversation and jo bhi conversation ho rha hai jaisa ki kon sa function call hua and then phir hmlog wo call kiye (hmara model aisa ni krta hai wo bs btata hai krte hmhi log hai.) and jo bhi response milega hmko usko bhi contents or history me push krte rehna pdta hai taaki  model ko context milta rhe and usse aage jaake koi bhi chiz puche toh wo bta pae.

async function askquestion(userQuestion) {
    const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

    const initialMessage = { role: 'user', parts: [{ text: userQuestion }] };
    // Send request with function declarations
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: initialMessage,
        config: config
    });

    // console.log(response.functionCalls[0]);
    if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0];
        console.log("\n🤖 Model requested a function call:");
        console.log(`- Function Name: ${functionCall?.name}`);
        console.log(`- Arguments: ${JSON.stringify(functionCall?.args)}`);

        // Check if the function name exists in your map
        if (availableFunctions[functionCall.name]) {
            console.log('corresponding function exist',availableFunctions[functionCall?.name])
            // Execute the local function with the arguments provided by the model
            const functionToCall = availableFunctions[functionCall.name];
            console.log(functionToCall);
            console.log(functionCall?.args?.num1);
            console.log(functionCall?.args?.num2);
            // respective function call addition or substraction or multiplication and division
            const result = functionToCall(functionCall.args.num1, functionCall.args.num2);

            console.log(`- Function Result: ${result}`);

            // Prepare the function response part
            const functionResponsePart = {
                functionResponse: {
                    name: functionCall.name,
                    response: {
                        result: result, // Send the calculated result back
                    },
                },
            };

            // --- Second API Call ---
            // Send the function result back to the model for the final, human-readable answer
            const finalResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [initialMessage, { role: 'function', parts: [functionResponsePart] }],
                config: config
            });
            
            // Output the final text response
            console.log("\n✅ Final Answer from Model:");
            console.log(finalResponse.text);

        } else {
            console.error(`Error: Unknown function name "${functionCall.name}" requested by the model.`);
        }
    } else {
        // If no function call was made, just print the model's text
        console.log("\n✅ Model responded directly:");
        console.log(response.text);
    }
}

// Step-6--> Hmara main function call jaaha se saara kahani start ho rha hai.
async function main() {
    var userQuestion = readlineSync.question('What are kind of operation you want write the operation and give two no as well? ');
    console.log('Hi ' + userQuestion + '!');
    await askquestion(userQuestion);
    // main();
}
main();


