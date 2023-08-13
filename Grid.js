import Paint from './Paint.js';
import State from './State.js';

const Grid = {
  squareSize: 50, // Initial square size
    
  canvas: null,

  init(data) {
    this.data = State.mapArray;
    this.canvas = document.getElementById('gridCanvas');

    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.canvas.style.position = 'absolute';
      this.canvas.style.left = '50%';
      this.canvas.style.top = '50%';
      this.canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
     

    // Add keydown event listener for zooming
      //document.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.renderGrid(data);

    // Initialize Paint module with gridData       
      Paint.init(data);
      this.updatePaintCanvasSize(Math.ceil(Math.sqrt(this.data.length))); // Update paintCanvas size
   
      } else {
      console.error("Canvas not found");
    }
  },

      

  renderGrid(data) {
    const gridCanvas = document.getElementById('gridCanvas');

    if (gridCanvas) {
      const ctx = gridCanvas.getContext('2d');
     
      const squareSize = this.squareSize; // Relative to Zooming in and out

      const canvasWidth =  data.length * squareSize;
      const canvasHeight = data[0].length * squareSize;

      gridCanvas.width =  canvasWidth ;
      gridCanvas.height = canvasHeight ;

      //console.log(data)

      data.forEach((col, x) => {
        col.forEach((_, y) => {

          ctx.fillStyle = data[x][y].fill;
          ctx.fillRect(x*squareSize, y*squareSize, squareSize, squareSize);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = squareSize/20;
          ctx.strokeRect(x*squareSize, y*squareSize, squareSize, squareSize);
  
          // if (squareSize > 63) { // Only render text if squareSize is larger than 20
          //   ctx.fillStyle = 'white';
          //   ctx.font = 'Bold ' + squareSize/5 + 'px Arial';
          //   ctx.textAlign = 'center';
          //   ctx.textBaseline = 'middle';
          //   ctx.fillText(data[x][y].name, (x* squareSize) + (squareSize / 2), (y* squareSize) + (squareSize / 2));
          // }

          if (squareSize > 63) {
            const maxTextWidth = squareSize * 0.9; // Allow 90% of the square width for text
            const lineHeight = squareSize / 5; // Adjust the line height as needed
            
            const words = data[x][y].name.split(' ');
            const lines = [];
            let currentLine = words[0];
            
            for (let i = 1; i < words.length; i++) {
              const testLine = currentLine + ' ' + words[i];
              const testWidth = ctx.measureText(testLine).width;
              
              if (testWidth <= maxTextWidth) {
                currentLine = testLine;
              } else {
                lines.push(currentLine);
                currentLine = words[i];
              }
            }
            
            lines.push(currentLine); // Add the last line
            
            ctx.fillStyle = 'white';
            ctx.font = 'Bold ' + lineHeight + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Render wrapped text lines
            for (let i = 0; i < lines.length; i++) {
              const lineY = (y * squareSize) + (squareSize / 2) - (lineHeight * (lines.length - 1) / 2) + (lineHeight * i);
              ctx.fillText(lines[i], (x * squareSize) + (squareSize / 2), lineY);
            }
          }
         


        })

      })

     
    } else {
      console.error("gridCanvas not found");
    }
    
    this.updatePaintCanvas();
  },

  updatePaintCanvasSize() {
    const paintCanvas = document.getElementById('paintCanvas');
    if (paintCanvas) {

      const squareSize = this.squareSize; // Relative to Zooming in and out

      const canvasWidth =  State.mapArray.length * squareSize;
      const canvasHeight = State.mapArray[0].length * squareSize;

      paintCanvas.width = canvasWidth;
      paintCanvas.height = canvasHeight;
      
      this.updatePaintCanvas(); // Update other properties/styles for paintCanvas
    } else {
      console.error("paintCanvas not found");
    }
},

  updatePaintCanvas() {

    const paintCanvas = document.getElementById('paintCanvas');
    
    if (paintCanvas) {

      paintCanvas.width = this.canvas.width;
      paintCanvas.height = this.canvas.height;
   
    }
  },

  getCurrentData() {
    return State.mapArray;
  },
};

export default Grid;
