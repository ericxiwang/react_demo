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


}










const a = new List_operation([6,5,4,3,2,1,0,10]);
console.log(a.List_reverse());
console.log("AAA",a.Bubble_sort());