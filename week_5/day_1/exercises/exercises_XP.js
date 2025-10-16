/***********************
 * Exercise 1 : Comparison
 ***********************/
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is <= 10`);
    } else {
      reject(`${num} is > 10`);
    }
  });
}

// Tests (donnés dans l'énoncé)
// Doit reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error));
// Doit resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error));


/***********************
 * Exercise 2 : Promises
 ***********************/
const successIn4s = new Promise(resolve => {
  setTimeout(() => resolve("success"), 4000);
});


successIn4s.then(msg => console.log(msg));


/***********************
 * Exercise 3 : Resolve & Reject
 ***********************/
const pResolved = Promise.resolve(3);
pResolved.then(v => console.log(v)); 

const pRejected = Promise.reject("Boo!");
pRejected.catch(err => console.log(err));
