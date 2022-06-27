class Garden {
  constructor(spaceAvailable, plants, storage) {
    this.spaceAvailable = spaceAvailable;
    this.plants = [];
    this.storage = [];
  }

  addPlant(plantName, spaceRequired) {
    if (spaceRequired > this.spaceAvailable) {
      throw new Error("Not enough space in the garden.");
    } else {
      this.plants.push({
        plantName,
        spaceRequired,
        ripe: false,
        quantity: 0
      });

      this.spaceAvailable -= spaceRequired;
      return `The ${plantName} has been successfully planted in the garden.`
    }
  }

  ripenPlant(plantName, quantity) {
     let plant = this.plants.find(p => p.plantName == plantName);
     if(plant == undefined) {
        throw new Error(`There is no ${plantName} in the garden.`);
     }

     if(plant.ripe) {
       throw new Error(`The ${plantName} is already ripe.`)
     }

     if(quantity < 1) {
        throw new Error ("The quantity cannot be zero or negative.");
     }

     plant.ripe = true;
     plant.quantity += quantity;
     if(plant.quantity == 1) {
        return `${quantity} ${plantName} has successfully ripened.`
     } else {
        return `${quantity} ${plantName}s have successfully ripened.`
     }
  }

  harvestPlant(plantName) {
    let plant = this.plants.find(p => p.plantName == plantName);
     if(plant == undefined) {
        throw new Error(`There is no ${plantName} in the garden.`);
     }

     if(plant.ripe == false) {
        throw new Error (`The ${plantName} cannot be harvested before it is ripe.`);
     }
     this.spaceAvailable += plant.spaceRequired;
     let name = plant.plantName;
     let quantity = plant.quantity;
     this.storage.push({
        name,
        quantity
     })
     let index = this.plants.indexOf(plant);
     this.plants.splice(index , 1);

     return `The ${plantName} has been successfully harvested.`
  }

  generateReport() {
      let first = `The garden has ${this.spaceAvailable} free space left.`;
      let sorted = this.plants.sort(function(a, b) {
          let nameA = a.plantName.toUpperCase(); // ignore upper and lowercase
          let nameB = b.plantName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
                return 1; // nameB comes first
            }
            return 0;  // names must be equal
        });
      let second = [];
      for(let plant of sorted) {
         second.push(plant.plantName);
      }
      let third = "";
      if(this.storage.length == 0) {
        third = "Plants in storage: The storage is empty.";
      } else {
        let arr = [];
        for(let item of this.storage) {
            let [key , value] = Object.entries(item);
            arr.push(`${key[1]} (${value[1]})`);
        }
        third = `Plants in storage: ${arr.join(", ")}`
      }

      return `${first}\nPlants in the garden: ${second.join(", ")}\n${third}`;
  }
}

const myGarden = new Garden(250) 

console.log(myGarden.addPlant('apple', 20)); 

console.log(myGarden.addPlant('orange', 200)); 

console.log(myGarden.addPlant('raspberry', 10)); 

console.log(myGarden.ripenPlant('apple', 10)); 

console.log(myGarden.ripenPlant('orange', 1)); 

console.log(myGarden.harvestPlant('orange')); 

console.log(myGarden.generateReport()); 

// The garden has 220 free space left.\n
// Plants in the garden: apple, raspberry\n
// Plants in storage: orange (1)'
