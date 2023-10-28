const form = document.getElementById("form");
const pokemon1Select = document.getElementById("pokemon1");
const pokemon2Select = document.getElementById("pokemon2");
const btn_jouer = document.getElementById("btn_jouer");
const dark_mode = document.getElementById("dark_mode");
const label = document.querySelector("label");
const container = document.querySelector(".container");

const pokemon1Nom = getParameterByName("pokemon1");
const pokemon2Nom = getParameterByName("pokemon2");

const att_n_pokemon1 = document.getElementById("att_n_" + pokemon1Nom);
const att_s_pokemon1 = document.getElementById("att_s_" + pokemon1Nom);
const pv_pokemon1 = document.getElementById("pv_" + pokemon1Nom);
const att_n_pokemon2 = document.getElementById("att_n_" + pokemon2Nom);
const att_s_pokemon2 = document.getElementById("att_s_" + pokemon2Nom);
const pv_pokemon2 = document.getElementById("pv_" + pokemon1Nom);
const recommencer = document.querySelector(".recommencer");
const bouton_att_n = document.querySelectorAll(".bouton_att_n");
const bouton_att_s = document.querySelectorAll(".bouton_att_s");

// let attaque_speciale_pikachu = false;
// let attaque_speciale_tiplouf = false;
// let attaque_speciale_bulbizarre = false;

dark_mode.addEventListener("change", () => {
    if (dark_mode.checked) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        label.innerHTML = "<i class='bi bi-moon-stars-fill'></i>";
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        label.innerHTML = "<i class='bi bi-sun'></i>";
    }
});

// récupère le nom du pokemon dans l'URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let pokemonData;

fetch("/pokemon/data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau lors de la tentative de récupération du fichier 'data.json'.");
        }
        return response.json();
    })
    .then(data => {
        pokemonData = data;
        setupEventListeners();
    })
    .catch(error => {
        console.error("Problème avec l'opération fetch : ", error.message);
});

function setupEventListeners() {
    console.log(pokemonData);
    // att_n_pokemon1.addEventListener("click", () => {
    //     let pv_pokemon2_val = parseInt(pv_pokemon2.textContent) - ici la valeur de l'attaque;
    
    //     if (pv_bulbizarre_val <= 0) {
    //         pv_bulbizarre.textContent = 0;
    //         bouton_att_n.forEach(e => {
    //             e.disabled = true;
    //         });
    //         bouton_att_s.forEach(e => {
    //             e.disabled = true;
    //         })
    
    //         setTimeout(() => {
    //             alert("Bulbizarre est KO!!!");
    //         }, 100);
    
    //         bouton_att_n.forEach(e => {
    //             e.style.cursor = "not-allowed";
    //         })
    //         bouton_att_s.forEach(e => {
    //             e.style.cursor = "not-allowed";
    //         })
    
    //         recommencer.style.display = "block";
    //     } else {
    //         pv_bulbizarre.textContent = pv_bulbizarre_val;
    //     }
    // })
}



// att_s_pikachu.addEventListener("click", () => {
//     let pv_bulbizarre_initial = parseInt(pv_bulbizarre.textContent);

//     let pv_bulbizarre_val = pv_bulbizarre_initial - attaqueSpecialePikachu;

//     if (attaque_speciale_pikachu) {
//         alert("Pikachu a déjà utilisé son attaque spéciale !");
//         pv_bulbizarre_val = pv_bulbizarre_initial;
//     } else {
//         attaque_speciale_pikachu = true;
//     }

//     if (pv_bulbizarre_val <= 0) {
//         pv_bulbizarre.textContent = 0;
//         bouton_att_n.forEach(e => {
//             e.disabled = true;
//         });
//         bouton_att_s.forEach(e => {
//             e.disabled = true;
//         })

//         setTimeout(() => {
//             alert("Bulbizarre est KO!!!");
//         }, 100);

//         bouton_att_n.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })
//         bouton_att_s.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })

//         recommencer.style.display = "block";
//     } else {
//         pv_bulbizarre.textContent = pv_bulbizarre_val;
//     }
// })

// att_n_bulbizarre.addEventListener("click", () => {
//     let pv_pikachu_val = parseInt(pv_pikachu.textContent) - attaqueNormaleBulbizarre;

//     if (pv_pikachu_val <= 0) {
//         pv_pikachu.textContent = 0;
//         bouton_att_n.forEach(e => {
//             e.disabled = true;
//         });
//         bouton_att_s.forEach(e => {
//             e.disabled = true;
//         })
//         setTimeout(() => {
//             alert("Pikachu est KO!!!");
//         }, 100);
//         bouton_att_n.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })
//         bouton_att_s.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })
//         recommencer.style.display = "block";
//     } else {
//         pv_pikachu.textContent = pv_pikachu_val;
//     }
// })

// att_s_bulbizarre.addEventListener("click", () => {
//     let pv_pikachu_initial = parseInt(pv_pikachu.textContent);

//     let pv_pikachu_val = pv_pikachu_initial - attaqueSpecialeBulbizarre;

//     if (attaque_speciale_bulbizarre) {
//         alert("Bulbizarre a déjà utilisé son attaque spéciale !");
//         pv_pikachu_val = pv_pikachu_initial;
//     } else {
//         attaque_speciale_bulbizarre = true;
//     }

//     if (pv_pikachu_val <= 0) {
//         pv_pikachu.textContent = 0;
//         bouton_att_n.forEach(e => {
//             e.disabled = true;
//         });
//         bouton_att_s.forEach(e => {
//             e.disabled = true;
//         })
//         setTimeout(() => {
//             alert("Pikachu est KO!!!");
//         }, 100);
//         bouton_att_n.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })
//         bouton_att_s.forEach(e => {
//             e.style.cursor = "not-allowed";
//         })
//         recommencer.style.display = "block";
//     } else {
//         pv_pikachu.textContent = pv_pikachu_val;
//     }
// })

// recommencer.addEventListener("click", () => {
//     // Réinitialiser les points de vie de Tiplouf et Pikachu
//     pv_bulbizarre.textContent = "60";
//     pv_pikachu.textContent = "70";

//     // Réactiver les boutons d'attaque
//     bouton_att_n.forEach(e => {
//         e.disabled = false;
//         e.style.cursor = "pointer";
//     })

//     bouton_att_s.forEach(e => {
//         e.disabled = false;
//         e.style.cursor = "pointer";
//     })

//     attaque_speciale_pikachu = false;
//     attaque_speciale_bulbizarre = false;
    
//     // Cacher le bouton de recommencement
//     recommencer.style.display = "none";
// })

// function lancerCombat() {
//     // Obtenez le nom du premier Pokémon choisi par l'utilisateur
//     let nom_pokemon_1 = document.getElementById("menu_deroulant_pokemon_1").value;
//     // Obtenez le nom du second Pokémon choisi par l'utilisateur
//     let nom_pokemon_2 = document.getElementById("menu_deroulant_pokemon_2").value;

//     // Obtenez les informations du premier Pokémon
//     let pokemon_1 = pokemons[nom_pokemon_1];
//     // Obtenez les informations du second Pokémon
//     let pokemon_2 = pokemons[nom_pokemon_2];

//     // Enregistrez les éléments HTML représentant les PV des deux Pokémon
//     let pv_pokemon_1 = document.getElementById("pv_" + nom_pokemon_1);
//     let pv_pokemon_2 = document.getElementById("pv_" + nom_pokemon_2);

//     // Configurez le gestionnaire d'événements pour l'attaque du premier Pokémon
//     document.getElementById("att_n_" + nom_pokemon_1).addEventListener("click", () => {
//         let pv_cible_val = parseInt(pv_pokemon_2.textContent) - pokemon_1['attaque_normale'];
//         // le reste du code suit...
//     });

//     // Configurez le gestionnaire d'événements pour l'attaque du second Pokémon
//     document.getElementById("att_n_" + nom_pokemon_2).addEventListener("click", () => {
//         let pv_cible_val = parseInt(pv_pokemon_1.textContent) - pokemon_2['attaque_normale'];
//         // le reste du code suit...
//     });
// }