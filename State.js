const State = {
  mapArray: [],

  // Returns an array of columns and rows from which the map is generated. 
  generateMap(numEntries, gridSize) {

    const rows = Array.from({ length: numEntries }, (_, x) => {
      const columns = Array.from({ length: numEntries }, (_, y) => ({
        name: `Item ${x} - ${y}`,
        fill: this.getRandomColor(),
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
    this.mapArray = this.generateMap(10, 10); // Default 10x10 grid

    
  },

};
export default State;