const btn_jouer = document.getElementById("btn_jouer");
const dark_mode = document.getElementById("dark_mode");
const label = document.querySelector("label");
const container = document.querySelector(".container");
const att_n_pikachu = document.getElementById("att_n_pikachu");
const att_s_pikachu = document.getElementById("att_s_pikachu");
const pv_pikachu = document.getElementById("pv_pikachu");
const att_n_tiplouf = document.getElementById("att_n_tiplouf");
const att_s_tiplouf = document.getElementById("att_s_tiplouf");
const pv_tiplouf = document.getElementById("pv_tiplouf");
const att_n_bulbizarre = document.getElementById("att_n_bulbizarre");
const att_s_bulbizarre = document.getElementById("att_s_bulbizarre");
const pv_bulbizarre = document.getElementById("pv_bulbizarre");
const recommencer = document.querySelector(".recommencer");
const bouton_att_n = document.querySelectorAll(".bouton_att_n");
const bouton_att_s = document.querySelectorAll(".bouton_att_s");

let attaque_speciale_pikachu = false;
let attaque_speciale_tiplouf = false;
let attaque_speciale_bulbizarre = false;

// btn_jouer.addEventListener("click", () => {
//     container.style.display = "flex";
//     btn_jouer.style.display = "none";
// })

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

att_n_pikachu.addEventListener("click", () => {
    let pv_bulbizarre_val = parseInt(pv_bulbizarre.textContent) - attaqueNormalePikachu;

    if (pv_bulbizarre_val <= 0) {
        pv_bulbizarre.textContent = 0;
        bouton_att_n.forEach(e => {
            e.disabled = true;
        });
        bouton_att_s.forEach(e => {
            e.disabled = true;
        })

        setTimeout(() => {
            alert("Bulbizarre est KO!!!");
        }, 100);

        bouton_att_n.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        bouton_att_s.forEach(e => {
            e.style.cursor = "not-allowed";
        })

        recommencer.style.display = "block";
    } else {
        pv_bulbizarre.textContent = pv_bulbizarre_val;
    }
})

att_s_pikachu.addEventListener("click", () => {
    let pv_bulbizarre_initial = parseInt(pv_bulbizarre.textContent);

    let pv_bulbizarre_val = pv_bulbizarre_initial - attaqueSpecialePikachu;

    if (attaque_speciale_pikachu) {
        alert("Pikachu a déjà utilisé son attaque spéciale !");
        pv_bulbizarre_val = pv_bulbizarre_initial;
    } else {
        attaque_speciale_pikachu = true;
    }

    if (pv_bulbizarre_val <= 0) {
        pv_bulbizarre.textContent = 0;
        bouton_att_n.forEach(e => {
            e.disabled = true;
        });
        bouton_att_s.forEach(e => {
            e.disabled = true;
        })

        setTimeout(() => {
            alert("Bulbizarre est KO!!!");
        }, 100);

        bouton_att_n.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        bouton_att_s.forEach(e => {
            e.style.cursor = "not-allowed";
        })

        recommencer.style.display = "block";
    } else {
        pv_bulbizarre.textContent = pv_bulbizarre_val;
    }
})

att_n_bulbizarre.addEventListener("click", () => {
    let pv_pikachu_val = parseInt(pv_pikachu.textContent) - attaqueNormaleBulbizarre;

    if (pv_pikachu_val <= 0) {
        pv_pikachu.textContent = 0;
        bouton_att_n.forEach(e => {
            e.disabled = true;
        });
        bouton_att_s.forEach(e => {
            e.disabled = true;
        })
        setTimeout(() => {
            alert("Pikachu est KO!!!");
        }, 100);
        bouton_att_n.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        bouton_att_s.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        recommencer.style.display = "block";
    } else {
        pv_pikachu.textContent = pv_pikachu_val;
    }
})

att_s_bulbizarre.addEventListener("click", () => {
    let pv_pikachu_initial = parseInt(pv_pikachu.textContent);

    let pv_pikachu_val = pv_pikachu_initial - attaqueSpecialeBulbizarre;

    if (attaque_speciale_bulbizarre) {
        alert("Bulbizarre a déjà utilisé son attaque spéciale !");
        pv_pikachu_val = pv_pikachu_initial;
    } else {
        attaque_speciale_bulbizarre = true;
    }

    if (pv_pikachu_val <= 0) {
        pv_pikachu.textContent = 0;
        bouton_att_n.forEach(e => {
            e.disabled = true;
        });
        bouton_att_s.forEach(e => {
            e.disabled = true;
        })
        setTimeout(() => {
            alert("Pikachu est KO!!!");
        }, 100);
        bouton_att_n.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        bouton_att_s.forEach(e => {
            e.style.cursor = "not-allowed";
        })
        recommencer.style.display = "block";
    } else {
        pv_pikachu.textContent = pv_pikachu_val;
    }
})

recommencer.addEventListener("click", () => {
    // Réinitialiser les points de vie de Tiplouf et Pikachu
    pv_bulbizarre.textContent = "60";
    pv_pikachu.textContent = "70";

    // Réactiver les boutons d'attaque
    bouton_att_n.forEach(e => {
        e.disabled = false;
        e.style.cursor = "pointer";
    })

    bouton_att_s.forEach(e => {
        e.disabled = false;
        e.style.cursor = "pointer";
    })

    attaque_speciale_pikachu = false;
    attaque_speciale_bulbizarre = false;
    
    // Cacher le bouton de recommencement
    recommencer.style.display = "none";
})

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