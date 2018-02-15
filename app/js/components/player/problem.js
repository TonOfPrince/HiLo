// The problem:
var a = [2, 3, 4]
var b = ['Cats','Frogs', 'Dogs'];
var newArray = [];

a.forEach(function(item, index, array){
    console.log(index);
    var newItem = b[index].toLowerCase();
    newItem = (2*item) + ' ' + newItem;
    newArray.push(newItem);
});
console.log(newArray);
// I want to see a newArray that looks like this:
// ['4 cats', '6 frogs', '8 dogs']

// Why does the above code blow up, and what can we do to fix it?