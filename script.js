let arr=[[],[],[],[],[],[],[],[],[],[]]
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

let board=[[],[],[],[],[],[],[],[],[],[]]

function fillboard(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!=0 && board[i][j]!==undefined){
                arr[i][j].value= board[i][j]
            }
            else arr[i][j].value=''
        }
    }
}


GetPuzzle.onclick=async function(){
    let diffindex= document.getElementById("level").selectedIndex;
    let val= document.getElementById("level")[diffindex].value;
    let response= await fetch(`https://sugoku.onrender.com/board?difficulty=${val}`);
    console.log(val)
    let data= await response.json()
    console.log(data)
    board= data.board
    fillboard(board);
}

document.getElementById('SolvePuzzle').addEventListener('click', () => {
    solve(board);
});

function isSafe(row,col,val,n,board){
    for(let i=0;i<n;i++){
        //row check 
        if(board[row][i]===val) return false;
        // col check
        if(board[i][col]===val) return false;
        // 3*3 check
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)]   === val
          ) return false;
    }
    return true;
}

function solve(board){
    let n=9;
    for(let row=0;row<n;row++){
        for(let col=0;col<n;col++){
            if(board[row][col]==0){
                for(let val=1;val<=9;val++){
                    if(isSafe(row,col,val,n,board)){
                        board[row][col]=val;
                        if(solve(board)) return true;
                        else board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    fillboard(board)
}





