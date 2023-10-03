const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchageIcon = document.querySelector(".exchange"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

    selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    const apiKey = 'e7be84f3f1fca17585c1';
   

    const countries = 'assets/countries.json';

    const languageArr = [];

    fetch(countries)
        .then(res => res.json())
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data)) {
                console.log(data);

                data.forEach(item => {
                    console.log(item);
                    let text = 'hello'
                    let translateFrom = 'en-GB';
                    let translateTo = item.code;


                    //call the api for each language type
                    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

                    //add the result back into a new array to show content
                    fetch(apiUrl).then(res => res.json()).then(language => {
                        console.log(language);
                        languageArr.push(language.matches[0]);
                    })



                });
            } else {
                console.error('The fetched data is not an array.');
            }
            console.log(languageArr);
            //call a new funtion to go create the boxes
            makeflags(languageArr); 
            

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



    // fetch(apiUrl).then(res => res.json()).then(data => {
    //     toText.value = data.responseData.translatedText;
    //     data.matches.forEach(data => {
    //         if (data.id === 0) {
    //             toText.value = data.translation;
    //         }
    //     });
    //     toText.setAttribute("placeholder", "Translation");
    // });
});


function makeflags(languageArr) {
    console.log('here');
    console.log(languageArr);

}

//function makeFlags(languageArr) {
  //  const container = document.body; // You can change this to the container element you want

   // languageArr.forEach(language => {
     //   const box = document.createElement('div');
     //   box.className = 'language-box';
      //  box.textContent = `${language.code}: ${language.name}`;
       // container.appendChild(box);
  //  });
//}

function makeFlags(languageArr) {
    const container = document.body; // You can change this to the container element you want

    languageArr.forEach(language => {
        const box = document.createElement('div');
        box.className = 'language-box';

        // Create an image element
        const flagImg = document.createElement('img');
        flagImg.src = `path/to/flags/${language.code}.png`; // Replace with the actual path to your flag images
        flagImg.alt = `${language.code} Flag`;
        flagImg.className = 'flag-image';

        // Append the image to the box
        box.appendChild(flagImg);

        // Create a span for the language name
        const languageName = document.createElement('span');
        languageName.textContent = language.name;

        // Append the language name to the box
        box.appendChild(languageName);

        // Append the box to the container
        container.appendChild(box);
    });
}

// Assuming languageArr is already defined
const languageArr = [
    { code: 'en-GB', name: 'English' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'ma-MA', name: 'Mandarin' },
    { code: 'fr-FR', name:'French'  },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'nl-NL', name: 'Dutch' },
    { code: 'he-IL', name: 'Hebrew' },
    { code: 'sv-SE', name: 'Swedish' },
    { code: 'fi-FI', name: 'Finnish' },
    { code: 'da-DK', name: 'Danish' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'th-TH', name: 'Thai' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'pt-PT', name: 'Portuguese' },

    // Add more languages as needed
];

window.onload = function () {
    makeFlags(languageArr);
};