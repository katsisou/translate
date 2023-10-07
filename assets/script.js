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

    
const translations = {
    en: ["apple", "banana", "car", "dog", "elephant", "flower", "guitar", "house", "ice cream", "jacket"],
    es: ["manzana", "plátano", "coche", "perro", "elefante", "flor", "guitarra", "casa", "helado", "chaqueta"],
    ma: ["苹果", "香蕉", "汽车", "狗", "大象", "花", "吉他", "房子", "冰淇淋", "夹克"],
    fr: ["pomme", "banane", "voiture", "chien", "éléphant", "fleur", "guitare", "maison", "glace", "veste"],
    kr: ["사과", "바나나", "자동차", "개", "코끼리", "꽃", "기타", "집", "아이스크림", "자켓"],
    de: ["Apfel", "Banane", "Auto", "Hund", "Elefant", "Blume", "Gitarre", "Haus", "Eis", "Jacke"],
    it: ["mela", "banana", "auto", "cane", "elefante", "fiore", "chitarra", "casa", "gelato", "giacca"],
    nl: ["appel", "banaan", "auto", "hond", "olifant", "bloem", "gitaar", "huis", "ijs", "jas"],
    il: ["תפוח", "בננה", "מכונית", "כלב", "פיל", "פרח", "גיטרה", "בית", "גלידה", "קקטוס"],
    se: ["äpple", "banan", "bil", "hund", "elefant", "blomma", "gitarr", "hus", "glass", "jacka"],
    fi: ["omena", "banaani", "auto", "koira", "elefantti", "kukka", "kitara", "talo", "jäätelö", "takki"],
    dk: ["æble", "banan", "bil", "hund", "elefant", "blomst", "guitar", "hus", "is", "jakke"],
    in: ["सेब", "केला", "कार", "कुत्ता", "हाथी", "फूल", "गिटार", "घर", "आइसक्रीम", "जैकेट"],
    th: ["แอปเปิ้ล", "กล้วย", "รถ", "หมา", "ช้าง", "ดอกไม้", "กีตาร์", "บ้าน", "ไอศกรีม", "แจ็กเก็ต"],
    jp: ["りんご", "バナナ", "車", "犬", "象", "花", "ギター", "家", "アイスクリーム", "ジャケット"],
    pt: ["maçã", "banana", "carro", "cachorro", "elefante", "flor", "guitarra", "casa", "sorvete", "jaqueta"]
};

function generateRandomWord() {
    const language = document.getElementById("language").value;
    const words = translations[language];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    // Redirect to the display page with the generated word as a query parameter
    window.location.href = `translated.html?word=${encodeURIComponent(randomWord)}`;
}


//       // Function to get the query parameter from the URL
//                             function getQueryParam(name) {
//         const urlParams = new URLSearchParams(window.location.search);
//                             return urlParams.get(name);
//       }

//                             // Function to decode the query parameter and get the words
//                             function getWordsFromQueryParam() {
//         const encodedWords = getQueryParam('words');
//                             if (encodedWords) {
//           return JSON.parse(decodeURIComponent(encodedWords));
//         }
//                             return [];
//       }

//                             // Function to display the words on the page
//                             function displayWords() {
//         const words = getWordsFromQueryParam();
//                             const wordList = document.getElementById('word-list');

//         words.forEach(word => {
//           const listItem = document.createElement('li');
//                             listItem.textContent = word;
//                             wordList.appendChild(listItem);
//         });
//       }

//                             // Call the displayWords function when the page loads
//                             window.onload = displayWords;
              
// // Modify your generateRandomWord function

// function generateRandomWords() {
//     const language = document.getElementById("language").value;
//     const words = translations[language];
//     const numberOfWords = 5; // Change this to the desired number of words
//     const randomWords = [];

//     for (let i = 0; i < numberOfWords; i++) {
//         const randomIndex = Math.floor(Math.random() * words.length);
//         const randomWord = words[randomIndex];
//         randomWords.push(randomWord);
//     }

//     // Redirect to the display page with the generated words as a query parameter
//     window.location.href = `translated.html?words=${encodeURIComponent(JSON.stringify(randomWords))}`;
// }
