import dotenv from 'dotenv'
dotenv.config();

import readlineSync from 'readline-sync';

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



var userQuestion= readlineSync.question('May I have your name? ');
console.log('Hi ' + userQuestion + '!');

