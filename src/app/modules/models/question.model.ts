export class Question{
    id:number = 0;
    question:string = "";
    answers:Answers[] = []

    constructor() {}
}

export interface Answers{
    text:string,
    value:number,
    visible:boolean
}