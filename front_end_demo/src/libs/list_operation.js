export class List_operation {
    constructor(input_list)
    {
        this.input_list = input_list;
    }

    List_reverse() {

    let array_len = this.input_list.length;
    console.log('listlen',array_len);
    let loop_len = parseInt(this.input_list.length/2);

    for (let i=0;i<loop_len;i++){

        [this.input_list[i],this.input_list[array_len-1]] = [this.input_list[array_len-1],this.input_list[i]]
        array_len--;
    }


    return this.input_list;
    }

    Bubble_sort() {

    let loop_len = this.input_list.length;
    for (let i=0;i<loop_len-1;i++){
        for (let j=0;j<loop_len-i-1;j++) {
            if (Number(this.input_list[j])>Number(this.input_list[j+1])){
                [this.input_list[j],this.input_list[j+1]]=[this.input_list[j+1],this.input_list[j]]
            }

        }
    }
    console.log("return sorted list",this.input_list)
    return this.input_list;
    }

    Parenthesis_checker()   
    {
        let pattern = {"(":")", "[":"]", "{":"}"};
        let array_len = this.input_list.length;
        let stack = [];

        for (let i=0;i<array_len; i++)
            {
            if (pattern[this.input_list[i]])
                {
                stack.push(this.input_list[i]);

                }
            else if (Object.values(pattern).includes(this.input_list[i]))
                {
                    if (pattern[stack.pop()] !== this.input_list[i])
                    {
             
                        return false;
                    }
                }
            else
            {
                return false
            }
        }
        return stack.length === 0;
    }

    _fib(n){
        if (n<2)
        {
            return n;
        }
        else
        {
            return this._fib(n-1) + this._fib(n-2);
        }
    }

    FibonacciSeq_generator()
    {
        const series = [];
        for (let i = 0; i < this.input_list; i++) {
        series.push(this._fib(i));
        }
        return series;
    }

    Find_duplicates(){
        let return_result = []
        for (let each_item of this.input_list){

            if (return_result.includes(each_item)){
            }
            else
            { 
                return_result.push(each_item)
            }
        }
        return return_result
    }
    

}











//const a = new List_operation("(((((((((((((([{}]))))))[(]))))))))");
//console.log("parentheses",a.Parenthesis_checker())


//const b = new List_operation("10");
//console.log("parentheses",b.FibonacciSeq_generator())


const c = new List_operation(["1","1","1","2","2","2"]);
console.log("duplicate list ==========",c.Find_duplicates())