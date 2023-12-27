// בחירת כל האלמנטים שיש להם את הקלאס "btn-you-are"
let btnYouAreElements = document.querySelectorAll(".btn-you-are");
let saveCountryEl = document.querySelector(".save-country");
let saveCityEl = document.querySelector(".save-city");
let citySectionEl = document.querySelector(".city-section");
let countrySectionEl = document.querySelector(".country-section");
let settingTripSectionEl = document.querySelector(".setting-trip-section");
// מוסיף מאזין לאירוע קליק לכל אחד מהכפתורים שנבחרו
btnYouAreElements.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // בחירת האלמנט של הסקציה של הכפתורים
    let buttonsSectionEl = document.querySelector(".buttons-section");
    // בחירת האלמנט של הסקציה של המדינות, תחת ההנחה שקיים אלמנט כזה
    let countrySectionEl = document.querySelector(".country-section");

    // הוספת הקלאס "hidden" לסקציה של הכפתורים כדי להסתיר אותה
    buttonsSectionEl.classList.add("hidden");
    // מחיקת הקלאס "hidden" מהסקציה של המדינות כדי להציג אותה
    countrySectionEl.classList.remove("hidden");
    // saveCountryEl.classList.remove("hidden");
  });
});

saveCityEl.addEventListener("click", function () {
  citySectionEl.classList.add("hidden");
  countrySectionEl.classList.add("hidden");
  settingTripSectionEl.classList.remove("hidden");
});

// הוספת מאזין לאירוע של טעינת הדף
document.addEventListener("DOMContentLoaded", function () {
  // יצירת מערך לאחסון שמות המדינות
  let countries = [];

  // הוספת מאזין לאירוע קליק על הדף
  document.addEventListener("click", function (event) {
    // בחירת האלמנט של תיבת ההצעות
    let suggestionsDiv = document.getElementById("suggestions");
    // בחירת האלמנט של תיבת החיפוש של המדינות
    let countrySearchInput = document.getElementById("countrySearch");

    // בדיקה אם הלחיצה לא התרחשה על תיבת החיפוש או על תיבת ההצעות
    if (
      !suggestionsDiv.contains(event.target) &&
      !countrySearchInput.contains(event.target)
    ) {
      // הסתרת תיבת ההצעות
      suggestionsDiv.style.display = "none";
    }
  });

  // בקשה לשרת לקבלת נתונים על כל המדינות
  fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => {
      // מיפוי הנתונים למערך של שמות מדינות
      countries = data.map((country) => country.name);
    });

  // הוספת מאזין לאירוע של הקשה על המקשים בתיבת החיפוש
  document
    .getElementById("countrySearch")
    .addEventListener("keyup", function (event) {
      saveCountryEl.classList.add("hidden");
      // שמירת הערך שהוקלד
      let input = event.target.value.toLowerCase();
      // סינון המדינות ששמן מתחיל בערך שהוקלד
      let suggestions = countries.filter((country) =>
        country.toLowerCase().startsWith(input)
      );
      // עדכון תיבת ההצעות עם התוצאות
      updateSuggestions(suggestions);
    });
});

// פונקציה לעדכון תיבת ההצעות
function updateSuggestions(suggestions) {
  // בחירת האלמנט של תיבת ההצעות
  let suggestionsDiv = document.getElementById("suggestions");
  // ניקוי תוכן תיבת ההצעות
  suggestionsDiv.innerHTML = "";
  // בדיקה אם יש הצעות להציג
  if (suggestions.length > 0) {
    // יצירת אלמנט עבור כל הצעה והוספתו לתיבת ההצעות
    suggestions.forEach((suggestion) => {
      let div = document.createElement("div");
      div.textContent = suggestion;
      div.onclick = function () {
        // עדכון תיבת החיפוש עם ההצעה שנבחרה והסתרת תיבת ההצעות
        document.getElementById("countrySearch").value = suggestion;
        suggestionsDiv.style.display = "none";
        saveCountryEl.classList.remove("hidden");
      };
      suggestionsDiv.appendChild(div);
    });
    // הצגת תיבת ההצעות
    suggestionsDiv.style.display = "block";
    // אם נבחרה מדינה ונלחץ שמור נעבור לבחירת עיר
    saveCountryEl.addEventListener("click", function () {
      // saveCountryEl.classList.add("hidden");
      countrySectionEl.classList.add("hidden");
      citySectionEl.classList.remove("hidden");
    });
  } else {
    // הסתרת תיבת ההצעות אם אין הצעות
    suggestionsDiv.style.display = "none";
  }
}
