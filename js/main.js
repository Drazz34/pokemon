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
const pv_pokemon2 = document.getElementById("pv_" + pokemon2Nom);
const recommencer = document.querySelector(".recommencer");
const bouton_att_n = document.querySelectorAll(".bouton_att_n");
const bouton_att_s = document.querySelectorAll(".bouton_att_s");

// Lorsque la page est chargée, vérifiez l'état du thème dans le localStorage
document.addEventListener("DOMContentLoaded", function() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "light") {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        label.innerHTML = "<i class='bi bi-moon-stars-fill'></i>";
        dark_mode.checked = true; // Cochez la case pour le mode clair
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        label.innerHTML = "<i class='bi bi-sun'></i>";
        dark_mode.checked = false; // Décochez la case pour le mode sombre
    }
});

// Changer le mode d'affichage entre dark ou light
dark_mode.addEventListener("change", () => {
    if (dark_mode.checked) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        label.innerHTML = "<i class='bi bi-moon-stars-fill'></i>";
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        label.innerHTML = "<i class='bi bi-sun'></i>";
        localStorage.setItem("theme", "dark");
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

// Récupérer les données de data.json
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
    
    // Récupérer et faire correspondre les pokémons sélectionnés avec leurs données
    const selectedPokemon1 = pokemonData.find(pokemon => pokemon.nom === pokemon1Nom);
    const selectedPokemon2 = pokemonData.find(pokemon => pokemon.nom === pokemon2Nom);

    if (!selectedPokemon1 || !selectedPokemon2) {
        return;
    }

    const attaqueSpecialeUtilisee = {
        [selectedPokemon1.nom]: false,
        [selectedPokemon2.nom]: false
    };

    // Appliquer et afficher les dégats reçus
    function appliquerDegats(attaque, cible, pvCible, boutonsCible) {
        const pvActuels = parseInt(pvCible.textContent, 10);
        const nouveauxPv = Math.max(0, pvActuels - attaque);
        pvCible.textContent = nouveauxPv;
        verifierSiPokemonEstKO(cible, pvCible, boutonsCible);
    }

    // Si les points de vie du pokémon tombe à 0 
    function verifierSiPokemonEstKO(pokemon, pvPokemon, boutons) {
        if (parseInt(pvPokemon.textContent, 10) <= 0) {
            desactiverBoutons(boutons);
            setTimeout(() => alert(`${pokemon.nom} est KO !!!`), 100);
            recommencer.style.display = "block";
        }
    }

    // Désactiver les boutons d'attaque
    function desactiverBoutons(boutons) {
        boutons.forEach(bouton => {
            bouton.disabled = true;
            bouton.style.cursor = "not-allowed";
        });
    }

    // Appliquer les attaques
    function setupAttaques(pokemonAttaquant, pokemonCible, pvPokemonCible, boutonsCible) {
        const attNBtn = document.getElementById(`att_n_${pokemonAttaquant.nom}`);
        const attSBtn = document.getElementById(`att_s_${pokemonAttaquant.nom}`);

        attNBtn.addEventListener("click", () => appliquerDegats(pokemonAttaquant.att_n, pokemonCible, pvPokemonCible, boutonsCible));
        attSBtn.addEventListener("click", () => {
            if (attaqueSpecialeUtilisee[pokemonAttaquant.nom]) {
                alert(`${pokemonAttaquant.nom} a déjà utilisé son attaque spéciale !`);
            } else {
                appliquerDegats(pokemonAttaquant.att_s, pokemonCible, pvPokemonCible, boutonsCible);
                attaqueSpecialeUtilisee[pokemonAttaquant.nom] = true;
                attSBtn.style.cursor = "not-allowed";
            }
        });
    }

    setupAttaques(selectedPokemon1, selectedPokemon2, pv_pokemon2, [...bouton_att_n, ...bouton_att_s]);
    setupAttaques(selectedPokemon2, selectedPokemon1, pv_pokemon1, [...bouton_att_n, ...bouton_att_s]);
}

// Revenir à la page de sélection des pokémons
recommencer.addEventListener("click", () => {
    window.location.href = "/pokemon/";
})