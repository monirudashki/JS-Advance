class SmartHike {
    constructor(username) {
        this.username = username;
        this.goals = {};
        this.listOfHikes = [];
        this.resources = 100;
    }

    addGoal (peak, altitude) {
        if(!this.goals.hasOwnProperty(peak)) {
            this.goals[peak] = altitude;

            return `You have successfully added a new goal - ${peak}`
        };

        return `${peak} has already been added to your goals`
    }

    hike (peak, time, difficultyLevel) {
        if (!this.goals.hasOwnProperty(peak)) {
            throw new Error (`${peak} is not in your current goals`);
        } 
        if(this.resources < 1) {
                throw new Error ("You don't have enough resources to start the hike");
        }
        
        if(this.resources - time * 10 < 1) {
           return "You don't have enough resources to complete the hike" 
        }

        this.resources -= time * 10;

        this.listOfHikes.push({
            peak,
            time,
            difficultyLevel
        });

        return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
    }

    rest (time) {
        this.resources += time * 10;

        if(this.resources >= 100) {
            this.resources = 100;
            return `Your resources are fully recharged. Time for hiking!`
        }

        return `You have rested for ${time} hours and gained ${time*10}% resources`
    }

    showRecord (criteria) {
        if (this.listOfHikes.length == 0) {
            return `${this.username} has not done any hiking yet`;
        }

        if (criteria == "easy") {
           let arr = this.listOfHikes.filter((x) => x.difficultyLevel == "easy");
           if(arr.length == 0) {
             return `${this.username} has not done any ${criteria} hiking yet`;
           }

           let sorted = arr.sort((a, b) => a.time - b.time);

           return `${this.username}'s best ${criteria} hike is ${sorted[0].peak} peak, for ${sorted[0].time} hours`
        } 

        if (criteria == "hard") {
            let arr = this.listOfHikes.filter((x) => x.difficultyLevel == "hard");
           if(arr.length == 0) {
             return `${this.username} has not done any ${criteria} hiking yet`;
           }

           let sorted = arr.sort((a, b) => a.time - b.time);

           return `${this.username}'s best ${criteria} hike is ${sorted[0].peak} peak, for ${sorted[0].time} hours`
        }

        if(criteria == "all") {
            let first = "All hiking records:";
            let arr = [];

            for (let p of this.listOfHikes) {
                arr.push(`${this.username} hiked ${p.peak} for ${p.time} hours`);
            }

            return `${first}\n${arr.join("\n")}`
        }
    }
}

const user = new SmartHike('Vili'); 

user.addGoal('Musala', 2925); 

user.hike('Musala', 8, 'hard'); 

console.log(user.showRecord('easy')); 

user.addGoal('Vihren', 2914); 

user.hike('Vihren', 4, 'hard'); 

console.log(user.showRecord('hard')); 

user.addGoal('Rui', 1706); 

user.hike('Rui', 3, 'easy'); 

console.log(user.showRecord('all')); 
