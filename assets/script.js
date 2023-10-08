// translateBtn.addEventListener("click", () => {
//     let text = fromText.value.trim(),
//         translateFrom = selectTag[0].value,
//         translateTo = selectTag[1].value;
//     if (!text) return;
//     toText.setAttribute("placeholder", "Translating...");
//     const apiKey = 'e7be84f3f1fca17585c1';
   

//     const countries = 'assets/countries.json';

//     const languageArr = [];

//     fetch(countries)
//         .then(res => res.json())
//         .then(data => {
//             // Check if data is an array
//             if (Array.isArray(data)) {
//                 console.log(data);

//                 data.forEach(item => {
//                     console.log(item);
//                     let text = 'hello'
//                     let translateFrom = 'en-GB';
//                     let translateTo = item.code;


//                     //call the api for each language type
//                     let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

//                     //add the result back into a new array to show content
//                     fetch(apiUrl).then(res => res.json()).then(language => {
//                         console.log(language);
//                         languageArr.push(language.matches[0]);
//                     })



//                 });
//             } else {
//                 console.error('The fetched data is not an array.');
//             }
//             console.log(languageArr);
//             //call a new funtion to go create the boxes
//             makeflags(languageArr); 
            

//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });



//     // fetch(apiUrl).then(res => res.json()).then(data => {
//     //     toText.value = data.responseData.translatedText;
//     //     data.matches.forEach(data => {
//     //         if (data.id === 0) {
//     //             toText.value = data.translation;
//     //         }
//     //     });
//     //     toText.setAttribute("placeholder", "Translation");
//     // });
// });


// function makeflags(languageArr) {
//     console.log('here');
//     console.log(languageArr);

// }

// //function makeFlags(languageArr) {
//   //  const container = document.body; // You can change this to the container element you want

//    // languageArr.forEach(language => {
//      //   const box = document.createElement('div');
//      //   box.className = 'language-box';
//       //  box.textContent = `${language.code}: ${language.name}`;
//        // container.appendChild(box);
//   //  });
// //}


const apiKey = 'e7be84f3f1fca17585c1'; // Replace with your MyMemory API key

function translateWord() {
    const word = document.getElementById("word").value;
    const targetLanguagesSelect = document.getElementById("targetLanguages");
    const targetLanguages = Array.from(targetLanguagesSelect.selectedOptions).map(option => option.value);

    const countries = 'assets/countries.json';

    // Call MyMemory API for each selected language
    const translationPromises = targetLanguages.map(targetLanguage => {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${targetLanguage}&key=${apiKey}`;
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => data.matches[0].translation)
            .catch(error => {
                console.error('Error fetching data:', error);
                return 'Error';
            });
    });

    // Wait for all translations to complete
    Promise.all(translationPromises)
        .then(translations => {
            // Redirect to the display page with the translated words and target languages as query parameters
            const queryString = targetLanguages.map((language, index) => `language${index + 1}=${encodeURIComponent(language)}`).join('&');
            const wordsString = translations.map((translation, index) => `word${index + 1}=${encodeURIComponent(translation)}`).join('&');
            window.location.href = `translated.html?${queryString}&${wordsString}`;
        });
}


function translateWord() {
    const word = document.getElementById("word").value;
    const targetLanguagesSelect = document.getElementById("targetLanguages");
    const targetLanguages = Array.from(targetLanguagesSelect.selectedOptions).map(option => option.value);

    // Call MyMemory API for each selected language
    const translationPromises = targetLanguages.map(targetLanguage => {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${targetLanguage}&key=${apiKey}`;
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => data.matches[0].translation)
            .catch(error => {
                console.error('Error fetching data:', error);
                return 'Error';
            });
    });

    // Wait for all translations to complete
    Promise.all(translationPromises)
        .then(translations => {
            // Redirect to the display page with the translated words and target languages as query parameters
            const queryString = targetLanguages.map((language, index) => `language${index + 1}=${encodeURIComponent(language)}`).join('&');
            const wordsString = translations.map((translation, index) => `word${index + 1}=${encodeURIComponent(translation)}`).join('&');
            window.location.href = `.html?${queryString}&${wordsString}`;
        });
}

function generateRandomWord() {
    const randomWordUrl = 'https://random-word-api.herokuapp.com/word';

    fetch(randomWordUrl)
        .then(response => response.json())
        .then(data => {
            const randomWord = data[0];
            document.getElementById("word").value = randomWord;
        })
        .catch(error => {
            console.error('Error fetching random word:', error);
        });
}
