// 리브로수를 키우기 위해서는 특수 영양제를 필요로 합니다. 특수 영양제는 1 x 1 땅에 있는 리브로수의 높이를 1 증가
// 각각의 특수 영양제는 이동 규칙에 따라 움직이는데, 이동 규칙은 이동 방향과 이동 칸 수로 주어집니다. 이동 방향의 경우 1번부터 8번까지 → ↗ ↑ ↖ ← ↙ ↓ ↘
// 격자의 모든 행,열은 각각 끝과 끝이 연결
// 초기 특수 영양제는 n x n 격자의 좌하단의 4개의 칸

// 특수 영양제를 이동 규칙에 따라 이동시킵니다.

// 특수 영양제를 이동 시킨 후 해당 땅에 특수 영양제를 투입합니다. 투입 후 땅에 있던 특수 영양제는 사라지게 됩니다.

// 특수 영양제를 투입한 리브로수의 대각선으로 인접한 방향에 높이가 1 이상인 리브로수가 있는 만큼 높이가 더 성장합니다. 대각선으로 인접한 방향이 격자를 벗어나는 경우에는 세지 않습니다.

// 특수 영양제를 투입한 리브로수를 제외하고 높이가 2 이상인 리브로수는 높이 2를 베어서 잘라낸 리브로수로 특수 영양제를 사고, 해당 위치에 특수 영양제를 올려둡니다.

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let [nm, ...arrayAndRules] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m] = nm.split(" ").map(Number);
let ground = [];
let rules = [];

for(let i=0; i<n; i++) {
    ground.push(arrayAndRules[i].split(" ").map(Number));
}
for(let i=n; i<n+m; i++) {
    rules.push(arrayAndRules[i].split(" ").map(Number));
}
// console.log("ground", ground);
// console.log("rules", rules);

//첫 스페셜 좌표 배열 좌하단 4개로 정의 const speacial = [idx]

//스페셜 배열 해당 년도 규칙에 따라 이동
    //단위이동 move 구하고 각 스페션 좌표마다 더함 
    //넘어가는 것 처리 %
//이동된 스페셜 배열에 따라 ground++
//스페셜 배열 하나하나마다 각 대각선이 0인지 여부에 따라 개수 count 후 +=count
//스페셜 배열 제외하고 ground>=2 이면 => 2차감 후 스페셜 배열2에 추가 
//스페셜 배열1 초기화

const directionBook = [[0,0], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1], [1,0], [1,1]]
let speacial = [[n-2, 0], [n-2, 1], [n-1, 0], [n-1, 1]]; //0년차 초기값 
const diag = [[-1,-1], [-1,1], [1,-1], [1,1]];

function main() {
    for(let i=0; i<m; i++) {
        year(i);
    }
    let sum = 0;
    for(let a=0; a<n; a++) {
        for(let b=0; b<n; b++) {
            sum += ground[a][b];
        }
    }
    return sum;
}

function year(y) {
    const [dIdx, moveNum] = rules[y];
    const move = directionBook[dIdx].map(e=>e*moveNum);
    // const move = [-5, 8];
    // console.log("speacial", speacial)
    // console.log("move", move);

    //special 이동 후 그자리 ground++ 
    for(let i=0; i<speacial.length; i++) { //좌표 개수마다
        speacial[i] = speacial[i].map((v,idx)=>speacial[i][idx]+move[idx]);
        // console.log("speacial!", speacial[i])
        const [x, y] = speacial[i];
        if(x>=0) speacial[i][0] = x%n;
        else speacial[i][0] = ((x%n) + n)%n;
        if(y>=0) speacial[i][1] = y%n;
        else speacial[i][1] = ((y%n) + n)%n;
        
        ground[speacial[i][0]][speacial[i][1]]++;
    } 
    // console.log("speacial", speacial);
    // console.log("ground", ground);

    //대각선>0 이면 ground++
    for(let i=0; i<speacial.length; i++) {
        const [x,y] = speacial[i];
        for(let k=0; k<4; k++) {
            const [px, py] = diag[k];
            const X = x+px;
            const Y = y+py;
            if(X>=0 && Y>=0 && X<n && Y<n) {
                if(ground[X][Y] > 0) ground[x][y]++;
            }
        }
    }
    // console.log("ground", ground);

    const newSpecial = [];
    for(let i=0; i<n; i++) {
        for(let k=0; k<n; k++) {
            const coord = [i,k];
            if(speacial.some(e=>e[0]===i && e[1]===k)) {
                // console.log("coord", coord)
                continue;
            }
            if(ground[i][k] >= 2) {
                ground[i][k]-=2;
                newSpecial.push(coord);
            }
        }
    }
    // console.log("ground", ground);
    // console.log("newSpecial", newSpecial);
    
    speacial = newSpecial.slice(e=>[...e]);
}

console.log(main())