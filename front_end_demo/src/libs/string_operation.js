export class String_operator {
    constructor(input_string){
        this.input_string = input_string;
    }
    test(){

        console.log(this.input_string);
    }



}


const a = new String_operator('test');
a.test();