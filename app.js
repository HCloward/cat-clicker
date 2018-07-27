
var cats = [
    {
        name: "Benjamin",
        image: "images/benjamin.jpg",
        count: 0
    },
    {
        name: "Leia",
        image: "images/leia.jpg",
        count: 0
    },
    {
        name: "Agamemnon",
        image: "images/agamemnon.jpg",
        count: 0
    },
    {
        name: "Franklin",
        image: "images/franklin.jpg",
        count: 0
    },
    {
        name: "Tom",
        image: "images/tom.jpg",
        count: 0
    }
];

document.body.innerHTML = `<div class="tab">
                                <ul id="catList"></ul>
                            </div>`;



// Let's loop over the numbers in our array
for (var i = 0; i < cats.length; i++) {

    // This is the cat we're on...
    var cat = cats[i];
    
    // We're creating a DOM element for the cat
    var listUl = document.getElementById('catList');
    var catName = document.createElement('li');
    catName.textContent = cat.name;

    var elem = document.createElement('div');
    
    

    // ... and when we click, alert the value of `num`
    catName.addEventListener('click', (function(catCopy) {
        return function() {
            elem.innerHTML = `<div class="row">
                        <div class="column">
                            <div id="first" class="card">
                            <div class="container">
                                <h2>${catCopy.name}</h2>
                                <p>Number of clicks: ${catCopy.count}</p>
                            </div>
                        <img src="${catCopy.image}" alt="${catCopy.name}" style="width:100%">
                        </div>
                        </div>`;
            
            document.body.appendChild(elem);
            var catPic = document.querySelector('img');
            var catCount = document.querySelector('p');
            catPic.addEventListener('click', function() {
                catCopy.count += 1;
                catCount.innerHTML = "Number of clicks: " + catCopy.count;
            });
        };
    })(cat));

    
    
    listUl.appendChild(catName);
};


