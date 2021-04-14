// Content
const content = document.querySelector('.content');
const listCourses = document.querySelector('.list-courses');

//Buttons
const cleanCarBtn = document.querySelector('.clean-car');
const addCourseBtn = document.querySelector('.courses');

//Array of courses
let carArticles = []

// Principal Function
loadEventListener();


//Functions
function loadEventListener() {

    // Add course
    addCourseBtn.addEventListener('click', addCourse);

    // Delete course
    content.addEventListener('click', deleteCourse);

    // Delete all courses of shopCar
    cleanCarBtn.addEventListener('click', () => {
        carArticles = [];

        clearShopCar();
    });

}

function addCourse (e) {

   e.preventDefault();

   if (e.target.classList.contains('add-course-btn')) {
       const course = e.target.parentElement.parentElement;

       showCourseDetails(course);
   }
}

function deleteCourse(e) {

    if(e.target.classList.contains('delete-course')) {
        const courseId = e.target.getAttribute('data-id');
        
        carArticles = carArticles.filter(course => course.id !== courseId );

        showShopCar();
    }
}

function showShopCar() {

    clearShopCar();

    carArticles.forEach(course => {
        const { image, title, price, quantity, id } = course;


        const row = document.createElement('div');
        row.classList.add('item-course');
        row.innerHTML = `
            <img src="${image}"/>
            <p>${title}</p>
            <p class="price">${price}</p>
            <p>${quantity}</p>
            <a href="#" class="delete-course" data-id="${id}"> X </a>

        `;

        listCourses.appendChild(row);
    });
}

function showCourseDetails (course) {

    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('.info-course h4').textContent,
        price: course.querySelector('.info-course .price .offer').textContent,
        id: course.querySelector('.info-course a').getAttribute('data-id'),
        quantity: 1,

    }

    const exists = carArticles.some( course => course.id === infoCourse.id );

    if(exists) {

        const courses = carArticles.map( course => {
            if(course.id === infoCourse.id) {
                course.quantity++;

                return course;
            } 
            else {
                return course;
            }

        });

        carArticles = [...carArticles];
    } else {
        carArticles = [...carArticles, infoCourse];
    }

    showShopCar();
}


function clearShopCar() {
    while(listCourses.firstChild) {
        listCourses.removeChild(listCourses.firstChild);
    }
}