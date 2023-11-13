const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let [NK, origin] = fs.readFileSync(filePath).toString().trim().split("\n");
let [n, k] = NK.split(" ").map(Number);
origin = origin.split(" ").map(Number);
let people = [];

function main() {
    let count = 0;
    while(1) {
        count++;
        first();
        second();
        third();
        if(origin.filter(e=>e===0).length >= k) return count;
    }
}
console.log(main())

function third() {
    if(!people.includes(0) && origin[0]!==0) {
        people.push(0);
        origin[0]--;
    }
}

//먼저 올라간 사람부터 = people 0부터 맞음 
//앞선 칸 사람이 다음칸 안정성 0 이라 안간경우도 있으니 앞선칸 사람 존재 고려 
function second() {
    for(let i=0; i<people.length; i++) {
        const idx = people[i];
        if(origin[idx+1]!==0 && people[i-1]!==idx+1) {
            origin[idx+1]--;
            people[i]++;
        }
    }
    isArrive();
}

function first() {
    const last = origin.pop();
    origin.unshift(last);
    if(people.length > 0) {
        people = people.map(e=>e+1);
        isArrive();
    }
}

function isArrive() {
    if(people.length > 0 && people[0] === n-1) {
        people.shift();
    }
}

//1번은 따로 함수 빼서 원소와 사람(원본 배열, 사람 배열) 모두 한칸씩 전진 
    //전진 = 원본은 pop해서 그걸 unshift, 사람 배열은 모두 +1 (n보다 크면 pop)
//2번은 
    //--> 원본 배열들[사람 배열들+1]=0 조사 후 아니면, 사람 배열+1 & 원본 배열[사람+1]--
    //앞선 칸에 사람 이미 있는건 고려가 되나 
//3번은 사람 배열 중에 0이 없고, 원본 배열[0]!==0 이면 
    //원본 배열[0]--, 사람 배열에 0 추가 
//4번은 아래 
    //while문 끝에 원본에서 0이 몇갠지 검사 - count를 주어서 검사 시 종료조건 충족되면 return count

//사람 배열은 현재 사람 있는 index 저장하면 될듯