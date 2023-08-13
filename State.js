import Grid from './Grid.js';


const State = {
  mapArray: [],
  defaultFill: '#2596be',

  // Returns an array of columns and rows from which the map is generated. 
  generateMap(genWidth, genHeight) {

    const rows = Array.from({ length: genWidth }, (_, x) => {
      const columns = Array.from({ length: genHeight }, (_, y) => ({
        name: '',
        fill: this.defaultFill,
        text: ''
      }));
      return columns;
    });
    console.log('generateMap() returned this:', rows)
    return rows;
  },

  // Placeholder that returns a random colour to be entered against fill above. 
  getRandomColor() {
    const colors = ['red', 'pink', 'green', 'cyan', 'orange', 'purple'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  },

  //Exports the MasterArray as JSON data to a file. 
  exportJSONData(data) {
    const fileName = prompt('Enter a file name:', 'data.json');
    const projectTitle = document.getElementById('projectTitle');
          projectTitle.textContent = fileName + '.json' || 'Untitled';
          console.log('Project title updated:', projectTitle.textContent);
        

    if (!fileName) {
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  },

  init() {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight; 
    
    const fullWidth = Math.floor(screenWidth / Grid.squareSize);
    const fullHeight = Math.floor(screenHeight / Grid.squareSize);

    //console.log('State.init()')
    this.mapArray = this.generateMap(fullWidth,fullHeight); 
    Grid.init(this.mapArray);
    
    
  },

  

};
export default State;
