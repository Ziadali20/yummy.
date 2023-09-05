function openSideNav() {
  $(".side-nav-menu").animate({
      left: 0
  }, 500)


  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");


  for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
          top: 0
      }, (i + 5) * 100)
  }
}
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
      left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");


  $(".links li").animate({
      top: 300
  }, 500)
}
closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav()
  } else {
      openSideNav()
  }
})

async function getApi(apiLink)
{
  let apiData=await fetch(apiLink);
  return  apiData.json();
}

let siteContent=document.querySelector('.featured') 
async function displayHome() {
    siteContent.innerHTML='';
    $(".inner-loading-screen").fadeIn(300);
  apiData= await getApi('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    for (let i = 0; i < apiData.meals.length; i++) {
      siteContent.innerHTML += `
        <div class="col-lg-3">
          <div class="card meal position-relative">
            <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
            <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5> 
            <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
              <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)
    
    let meal = document.querySelectorAll('.meal');
    meal.forEach(function (copymeal) {
      copymeal.addEventListener('click', async function () {
        let feId = this.querySelector('.featured-id').textContent;
        localStorage.setItem('id', feId);
        let id=localStorage.getItem('id')
        displayMealDetails(id)
    });
    });
}
displayHome();

async function getArea() {
    siteContent.innerHTML='';
    $(".inner-loading-screen").fadeIn(300)
    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    for (let i = 0; i < apiData.meals.length; i++) {
      siteContent.innerHTML += `
        <div class="col-lg-3">
        <div class="rounded-2 text-center ar">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3 class='title'>${apiData.meals[i].strArea}</h3>
        </div>
        </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)

    let meal = document.querySelectorAll('.ar');
  meal.forEach(function (copyar) {
    copyar.addEventListener('click', async function () {
      let countryId = this.querySelector('.title').textContent;
      siteContent.innerHTML='';
      displayArea(countryId)
    
    });
  });
}
async function getCategories() {
    $(".inner-loading-screen").fadeIn(300)

    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    siteContent.innerHTML='';
    for (let i = 0; i < apiData.categories.length; i++) {
      siteContent.innerHTML += `
        <div class="col-lg-3">
          <div class="card meal position-relative">
            <img src='${apiData.categories[i].strCategoryThumb}' class="featured-image h-100 w-100 ">
            <h5 class="featured-id d-none">${apiData.categories[i].idCategory}</h5>
            <div class="layer position-absolute text-center px-3">
              <h4 class='text-uppercase title'>${apiData.categories[i].strCategory}</h4>
              <p class='text-capitalize'>${apiData.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
          </div>
        </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)

    let meal = document.querySelectorAll('.meal');
  meal.forEach(function (copymeal) {
    copymeal.addEventListener('click', async function () {
      let title = this.querySelector('.title').textContent;
      displayCategories(title)
  
    });
  });

}
async function getIngredients() {
    $(".inner-loading-screen").fadeIn(300)
    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    siteContent.innerHTML = '';
    for (let i = 0; i < apiData.meals.length; i++) {
      const ingredient = apiData.meals[i].strIngredient;
      const description = apiData.meals[i].strDescription || '';
      siteContent.innerHTML += `
        <div class="col-lg-3">
          <div class="rounded-2 text-center ar">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class='title'>${ingredient}</h3>
            <p>${description.split(" ").slice(0, 24).join(" ")}</p>
          </div>
        </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)

    let meal = document.querySelectorAll('.ar');
    meal.forEach(function (copyar) {
      copyar.addEventListener('click', async function () {
        let ingredientsId = this.querySelector('.title').textContent;
        siteContent.innerHTML = '';
        displayIngredients(ingredientsId);
      });
    });
}
async function displayArea(countryId)
  {
    $(".inner-loading-screen").fadeIn(300)

    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryId}`);
    for (let i = 0; i < apiData.meals.length; i++) {
      siteContent.innerHTML += `
      <div class="col-lg-3">
        <div class="card meal position-relative">
          <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
          <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5> 
          <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
            <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
          </div>
        </div>
      </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)

    let meal = document.querySelectorAll('.meal');
        meal.forEach(function (copymeal) {
          copymeal.addEventListener('click', async function () {
            let feId = this.querySelector('.featured-id').textContent;
            localStorage.setItem('id', feId);
            let id=localStorage.getItem('id')
            siteContent.innerHTML='';
            displayMealDetails(id)
        });
        });
}
async function displayCategories(title)
  {
    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${title}`);
    let fe = siteContent;
    fe.innerHTML = '';
    for (let i = 0; i < apiData.meals.length; i++) {
      fe.innerHTML += `
        <div class="col-lg-3">
          <div class="card meal position-relative">
            <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
            <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5>
            <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
              <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
    }
    let meal = document.querySelectorAll('.meal');
    meal.forEach(function (copymeal) {
      copymeal.addEventListener('click', async function () {
        let feId = this.querySelector('.featured-id').textContent;
        localStorage.setItem('id', feId);
        let id = localStorage.getItem('id');
        siteContent.innerHTML = '';
        displayMealDetails(id);
      });
    });
}
async function displayIngredients(ing)
  {
    $(".inner-loading-screen").fadeIn(300)
    apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    for (let i = 0; i < apiData.meals.length; i++) {
      siteContent.innerHTML += `
        <div class="col-lg-3">
          <div class="card meal position-relative">
            <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
            <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5> 
            <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
              <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
    }
    $(".inner-loading-screen").fadeOut(300)

    let meal = document.querySelectorAll('.meal');
    meal.forEach(function (copymeal) {
      copymeal.addEventListener('click', async function () {
        let feId = this.querySelector('.featured-id').textContent;
        localStorage.setItem('id', feId);
        let id = localStorage.getItem('id');
        siteContent.innerHTML = '';
        displayMealDetails(id);
      });
    });
}
async function displayMealDetails(id)
  {

    siteContent.innerHTML='';
    $(".inner-loading-screen").fadeIn(300)

  apiData= await getApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  siteContent.innerHTML=`
  <div class="col-lg-4 image-container">
  <img src="${apiData.meals[0].strMealThumb}" class="w-100 mainImage">
  <h2 class='text-uppercase'>${apiData.meals[0].strMeal}</h2>
  </div>
  <div class="col-lg-8">
  <div class="meal-details d-flex justify-content-center flex-column px-lg-5">
  <div class="sp-desc">
  <h2>Instructions</h2>
  <p>${apiData.meals[0].strInstructions}</p>
  </div>
    <h3>Area:${apiData.meals[0].strArea}</h3>
    <h3>Category:${apiData.meals[0].strCategory}</h3>   
  <div >
  <ul class="recipes list-unstyled d-flex g-3 flex-wrap"> 
  </ul>
  </div>
  <h3>Tags: <span class='alert alert-danger m-2 p-1'>${apiData.meals[0].strTags}</span></h3>
    <div class="d-flex">
  <a href="${apiData.meals[0].strSource}" target="_blank"><button class="btn btn-success me-3">Source</button></a>
  <a href="${apiData.meals[0].strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
  </div>
    <div>
      
    </div>

  </div>
  </div>
  `;
  let recipesContainer=document.querySelector('.recipes');
  for(let i=1;i<=20;i++)
  { 
    let ingredient=apiData.meals[0][`strIngredient${i}`];
    let measure=apiData.meals[0][`strMeasure${i}`];

    if(ingredient!=''&&measure!='')
    {
      let recipes=measure+ingredient;
      recipesContainer.innerHTML+=`
      <li class="alert alert-info m-2 p-1">${recipes}</li>
      `
    }
  }
  localStorage.removeItem('id')
  $(".inner-loading-screen").fadeOut(300)

}
function getSearch() {
  siteContent.innerHTML = '';
  siteContent.innerHTML += `
  <div class="row py-4">
    <div class="col-lg-6">
      <input type="text" class="form-control searchByName" placeholder="Search by Name">
    </div>
    <div class="col-lg-6">
  <input type="text" class="form-control searchByLetter" placeholder="Search by First Letter" maxlength="1">
    </div>
  </div>

<div class="row searchResults">

</div>
</div>

  `;
  let searchResults=document.querySelector('.searchResults');

  let term=document.querySelector('.searchByName')
  term.addEventListener('input',function()
  {
    if(term.value=='')
    {
      searchResults.innerHTML='';
    }
    else{
      searchResults.innerHTML='';
      displaySearchByName(term.value);
    }
  })
  let letter=document.querySelector('.searchByLetter')
  letter.addEventListener('input',function()
  {
    if(letter.value=='')
    {

      searchResults.innerHTML='';
      
    }
    else{
      searchResults.innerHTML='';
      displaySearchByFirst(letter.value);
    }
  })
  // $(".inner-loading-screen").fadeIn(300)
}
async function displaySearchByName(term)
{

    let searchResults=document.querySelector('.searchResults');
    apiData=await getApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    if(apiData.meals===null)
    {
      searchResults.innerHTML=`
    <p class='text-danger'>No results found.</p>
    ` 
    }

    else{
      for (let i = 0; i < apiData.meals.length; i++) {
        searchResults.innerHTML += `
          <div class="col-lg-3">
            <div class="card meal position-relative">
              <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
              <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5> 
              <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
                <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
              </div>
            </div>
          </div>
        `;
      }
      let meal = document.querySelectorAll('.meal');
      meal.forEach(function (copymeal) {
        copymeal.addEventListener('click', async function () {
          let feId = this.querySelector('.featured-id').textContent;
          localStorage.setItem('id', feId);
          let id=localStorage.getItem('id')
          displayMealDetails(id)
      });
      });
    }
}
async function displaySearchByFirst(letter)
{
    apiData=await getApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let searchResults=document.querySelector('.searchResults');
    if(apiData.meals===null)
    {
      searchResults.innerHTML=`
    <p class='text-danger'>No results found.</p>
    ` 
    }
    
else{
  for (let i = 0; i < apiData.meals.length; i++) {
    searchResults.innerHTML += `
      <div class="col-lg-3">
        <div class="card meal position-relative">
          <img src='${apiData.meals[i].strMealThumb}' class="featured-image h-100 w-100 ">
          <h5 class="featured-id d-none">${apiData.meals[i].idMeal}</h5> 
          <div class="layer position-absolute d-flex justify-content-start align-items-center px-3">
            <h2 class=' text-uppercase'>${apiData.meals[i].strMeal}</h2>
          </div>
        </div>
      </div>
    `;
  }
  let meal = document.querySelectorAll('.meal');
  meal.forEach(function (copymeal) {
    copymeal.addEventListener('click', async function () {
      let feId = this.querySelector('.featured-id').textContent;
      localStorage.setItem('id', feId);
      let id=localStorage.getItem('id')
      displayMealDetails(id)
  });
  });
}
}