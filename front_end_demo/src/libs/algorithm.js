//

export function List_reverse(input_list){

    let array_len = input_list.length;
    console.log('listlen',array_len);
    let loop_len = parseInt(input_list.length/2);

    for (let i=0;i<loop_len;i++){

        [input_list[i],input_list[array_len-1]] = [input_list[array_len-1],input_list[i]]
        array_len--;
    }


    return input_list;


}

console.log("AAA",List_reverse([1,2,3,4]));


export function Bubble_sort(input_list){

    let loop_len = input_list.length;
    for (let i=0;i<loop_len;i++){
        for (let j=0;j<loop_len-i;j++) {
            if (input_list[j]>input_list[j+1]){
                [input_list[j],input_list[j+1]]=[input_list[j+1],input_list[j]]
            }

        }
    }
    console.log(input_list)
return input_list;
}


export function gothrough_hash(input_hash){
let haha =  Object.entries(input_hash);


let bb = Object.values(input_hash);


for (let i=0;i<input_hash.length;i++)
{
    console.log(input_hash[i])
}


}
