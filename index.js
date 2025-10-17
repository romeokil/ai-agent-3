import dotenv from 'dotenv'
import readlineSync from 'readline-sync';
import { GoogleGenAI, Type } from '@google/genai';
const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);
dotenv.config();

function addition(num1,num2){
    return num1+num2;
}

function substraction(num1,num2){
    return num1-num2;
}

function multiplication(num1,num2){
    return num1*num2;
}

function division(num1,num2){
    if(num2==0){
        console.log(`Sorry can't divide with 0`);
        return ;
    }
    return num1/num2;
}

// just for reference we are writting ,
// we will omit this function later.
const weatherFunctionDeclaration = {
  name: 'get_current_temperature',
  description: 'Gets the current temperature for a given location.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: 'The city name, e.g. San Francisco',
      },
    },
    required: ['location'],
  },
};

const additionFunctionDeclaration ={
    // first me hmlog function ka naam likhte hai.
    name:'addition',
    description:'Basically takes two inputs num1 and num2 and return their sum',
    parameters:{
        properties:{
            num1:{
                type:Type.OBJECT,
                description:'Can be any number Example: num1=10'
            },
            num2:{
                type:Type.OBJECT,
                description:'Can be any number Example: num2=5'
            }
        },
        required:['num1','num2'],
    }
}

const SubstractionFunctionDeclaration ={
    // first me hmlog function ka naam likhte hai.
    name:'substraction',
    description:'Basically takes two inputs num1 and num2 and return their substract',
    parameters:{
        properties:{
            num1:{
                type:Type.OBJECT,
                description:'Can be any number Example: num1=4'
            },
            num2:{
                type:Type.OBJECT,
                description:'Can be any number Example: num2=5'
            }
        },
        required:['num1','num2'],
    }
}
const MultiplicationFunctionDeclaration ={
    // first me hmlog function ka naam likhte hai.
    name:'multiplication',
    description:'Basically takes two inputs num1 and num2 and return their multiplication',
    parameters:{
        properties:{
            num1:{
                type:Type.OBJECT,
                description:'Can be any number Example: num1=10'
            },
            num2:{
                type:Type.OBJECT,
                description:'Can be any number Example: num2=2'
            }
        },
        required:['num1','num2'],
    }
}

const DivisionFunctionDeclaration ={
    // first me hmlog function ka naam likhte hai.
    name:'division',
    description:'Basically takes two inputs num1 and num2 and return their division. But make sure second parameter that is num2 must not be 0 if it is 0 then dont do any operation simple return',
    parameters:{
        properties:{
            num1:{
                type:Type.OBJECT,
                description:'Can be any number Example: num1=10'
            },
            num2:{
                type:Type.OBJECT,
                description:'Can be any number Example: num2=2 && num2!==0'
            }
        },
        required:['num1','num2'],
    }
}

function main(){
    var userQuestion= readlineSync.question('May I have your name? ');
    console.log('Hi ' + userQuestion + '!');
    main();
}
main();


