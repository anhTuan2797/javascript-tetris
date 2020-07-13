document.addEventListener('DOMContentLoaded',() =>{
   const grid = document.querySelector('.grid');
   const squares = document.querySelector('.grid div');
   const width = 15;
   const oBlock = [[0,1,width,width+1],[0,1,width,width+1],[0,1,width,width+1],[0,1,width,width+1]];
   const iBlock = [[1,width+1,width*2+1],[0,1,2],[1,width+1,width*2+1],[0,1,2]];
   const lBlock = [[0,width,2*width,2*width+1],[2*width,2*width+1,2*width+2,width+2],[1,2,width+2,2*width+2],[0,1,2,width]];
   const zBlock = [[0,1,width+1,width+2],[1,width,width+1,width*2],[0,1,width+1,width+2],[1,width,width+1,width*2]];
   const tBlock = [[0,1,2,width+1],[0,width,width*2,width+1],[2*width,2*width+1,2*width+2,width+1],[2,width+2,width*2+2,width+1]];
   

});