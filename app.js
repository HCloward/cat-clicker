
/* ======= Model ======= */

var model = {
    currentCat: null,
    adminView: false,
    cats: [
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
    ]
};

/* ======= Octopus ======= */

var octopus = {
    
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.count++;
        catView.render();
    },

    // set adminView to true or false
    adminVisible: function() {
        if (model.adminView === false) {
            model.adminView = true;

        } else {
            model.adminView = false;
        }
    },

    // open admin view
    openAdmin: function() {
        if (model.adminView == true) {
            adminForm.classList.remove('closed');
        }
    },

    // close admin view
    closeAdmin: function() {
        if (model.adminView == false) {
        var adminForm = document.getElementById('adminForm');
        adminForm.classList.add('closed');
        }
    },

    // update cat with new values
    updateCat: function() {
        var form = document.getElementById('updateForm');
        var catName = form.elements['catName'];
        var catImage = form.elements['catImage'];
        var catClicks = form.elements['catClicks'];
        if (catName.value != '') {
        model.currentCat.name = catName.value;
        }
        if (catImage.value != '') {
        model.currentCat.image = catImage.value;
        }
        if (catClicks.value != '') {
        model.currentCat.count = catClicks.value;
        }

        catView.render();
        catListView.render();
        
        catName.value = '';
        catImage.value = '';
        catClicks.value = '';
        octopus.adminVisible();
        octopus.closeAdmin();
        
    }
};

/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        // render this view (update the DOC elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.count;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.image;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('catList');

        //render this view (update the DOm elements with the right values)
        this.render();
    }, 

    render: function() {
        var cat, catName, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        //loop over the cats
        for(i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            //make a new cat list item and set its text
            catName = document.createElement('li');
            catName.textContent = cat.name;

            // on click, setCurrentCat and render teh catview
            // (this uses our closure-in-a-loop trick to connect the value
            // of the cat variable to the click event function)
            catName.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    var form = document.getElementById('updateForm');
                    var catFormName = form.elements['catName'];
                    var catImage = form.elements['catImage'];
                    var catClicks = form.elements['catClicks'];
                    catFormName.placeholder = model.currentCat.name;
                    catImage.placeholder = model.currentCat.image;
                    catClicks.placeholder = model.currentCat.count;
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(catName);
        }
    }
};

var adminView = {
    init: function() {
        var adminBtn = document.getElementById('adminBtn');
        var saveBtn = document.getElementById('saveBtn');
        var cancelLink = document.getElementById('cancelLink');

        adminBtn.addEventListener('click', function() {
            octopus.adminVisible();
            octopus.openAdmin();
            octopus.closeAdmin();
        });

        saveBtn.addEventListener('click', function() {
            octopus.updateCat();
            octopus.closeAdmin();
        });

        cancelLink.addEventListener('click', function() {
            var form = document.getElementById('updateForm');
            catName = form.elements['catName'];
            catImage = form.elements['catImage'];
            catClicks = form.elements['catClicks'];
            catName.value = '';
            catImage.value = '';
            catClicks.value = '';
            octopus.adminVisible();
            octopus.closeAdmin();
        });
    }
};

// make it go!
octopus.init();


// my original code:

// document.body.innerHTML = `<div class="tab">
//                                 <ul id="catList"></ul>
//                             </div>`;



// // Let's loop over the cats in our array
// for (var i = 0; i < cats.length; i++) {

//     // This is the cat we're on...
//     var cat = cats[i];
    
//     // We're creating a DOM element for the cat
//     var listUl = document.getElementById('catList');
//     var catName = document.createElement('li');
//     catName.textContent = cat.name;

//     var elem = document.createElement('div');
    
    

//     // ... and when we click, update the view to display the cat name clicked
//     catName.addEventListener('click', (function(catCopy) {
//         return function() {
//             elem.innerHTML = `<div class="row">
//                         <div class="column">
//                             <div id="first" class="card">
//                             <div class="container">
//                                 <h2>${catCopy.name}</h2>
//                                 <p>Number of clicks: ${catCopy.count}</p>
//                             </div>
//                         <img src="${catCopy.image}" alt="${catCopy.name}" style="width:100%">
//                         </div>
//                         </div>`;
            
//             document.body.appendChild(elem);
//             var catPic = document.querySelector('img');
//             var catCount = document.querySelector('p');
//             catPic.addEventListener('click', function() {
//                 catCopy.count += 1;
//                 catCount.innerHTML = "Number of clicks: " + catCopy.count;
//             });
//         };
//     })(cat));

    
    
//     listUl.appendChild(catName);
// };


