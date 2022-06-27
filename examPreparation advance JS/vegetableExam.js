class VegetableStore {
  constructor(owner, location) {
    this.owner = owner;
    this.location = location;
    this.availableProducts = [];
  }

  loadingVegetables(vegetables) {
    let successfullyAdded = [];
    for (let line of vegetables) {
      let [type, quantity, price] = line.split(" ");
      quantity = Number(quantity);
      price = Number(price);

      let currentVegetable = this.availableProducts.find((x) => x.type == type);

      if (currentVegetable == undefined) {
        this.availableProducts.push({
          type,
          quantity,
          price,
        });

        successfullyAdded.push(type);
      } else {
        currentVegetable.quantity += quantity;
        if (price > currentVegetable.price) {
          currentVegetable.price = price;
        }
      }
    }

    return `Successfully added ${successfullyAdded.join(", ")}`
  }

  buyingVegetables (selectedProducts) {
     let totalPrice = 0;
     for (let line of selectedProducts) {
        let [typeOfBuying , quantityOfBuying] = line.split(" ");
        quantityOfBuying = Number(quantityOfBuying);
        let veg = this.availableProducts.find(x => x.type == typeOfBuying);

        if(veg == undefined) {
           throw new Error (`${typeOfBuying} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
        }

        if(veg.quantity < quantityOfBuying) {
            throw new Error (`The quantity ${quantityOfBuying} for the vegetable ${typeOfBuying} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
        }

        totalPrice += veg.price * quantityOfBuying;
        veg.quantity -= quantityOfBuying;

    }
    return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`
  }

  rottingVegetable (type, quantity) {
     let veg = this.availableProducts.find(x => x.type == type);

     if(veg == undefined) {
        throw new Error (`${type} is not available in the store.`);
     }

     if(veg.quantity < quantity) {
        veg.quantity = 0;
        return `The entire quantity of the ${type} has been removed.`
     }

     veg.quantity -= quantity;

     return `Some quantity of the ${type} has been removed.`;
  }

  revision () {
    let first = "Available vegetables:"
    let sorted = this.availableProducts.sort((a , b) => Number(a.price) - Number(b.price));
    let arr = []
    for (let veg of sorted) {
        arr.push(`${veg.type}-${veg.quantity}-$${veg.price}`);
    }
    let third = `The owner of the store is ${this.owner}, and the location is ${this.location}.` 

    return `${first}\n${arr.join("\n")}\n${third}`;
  }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia"); 

console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"])); 

console.log(vegStore.rottingVegetable("Okra", 1)); 

console.log(vegStore.rottingVegetable("Okra", 2.5)); 

console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"])); 

console.log(vegStore.revision()); 
