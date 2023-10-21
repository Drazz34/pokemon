<?php
// Lire le fichier json
$json = file_get_contents("data.json");

// Décoder le json en tableau php
$pokemons = json_decode($json, true);

function getPokemonByName($name, $pokemons)
{
    foreach ($pokemons as $pokemon) {
        if ($pokemon["nom"] == $name) {
            return $pokemon;
        }
    }
    return null;
}


?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Pokemon !</title>
</head>

<body>

    <div class='mode'>
        <label for='dark_mode'><i class='bi bi-sun'></i></label>
        <input type='checkbox' id='dark_mode'>
    </div>

    <form action="" method="GET">
        <div id='choix_pokemon'>
            <p class='liste_pokemon'>Choisis les deux Pokémon qui vont combattre : </p>
            <div class="select_pokemon">
                <select name="pokemon1" id="pokemon1">
                    <option value="">Pokémon 1</option>
                    <?php foreach ($pokemons as $key => $pokemon) : ?>
                        <option value="<?= $pokemon["nom"] ?>"><?= $pokemon["nom"] ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="pokemon2" id="pokemon2">
                    <option value="">Pokémon 2</option>
                    <?php foreach ($pokemons as $key => $pokemon) : ?>
                        <option value="<?= $pokemon["nom"] ?>"><?= $pokemon["nom"] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
        <div class='jouer'>
            <button id='btn_jouer'>Jouer</button>
        </div>
    </form>



    <div class='container'>
        <?php

        if (isset($_GET["pokemon1"]) && $_GET["pokemon1"] != "" && isset($_GET["pokemon2"]) && $_GET["pokemon2"] != "") {
            $selected_pokemon1_data = getPokemonByName($_GET["pokemon1"], $pokemons);
            $selected_pokemon2_data = getPokemonByName($_GET["pokemon2"], $pokemons);
            echo "<style>.container { display: flex;
                justify-content: space-evenly;
                align-items: center;
                flex-wrap: wrap; }</style>";
        }

        if (isset($selected_pokemon1_data)) : ?>
            <!-- Affichage de $selected_pokemon1_data -->
            <div class='container_pokemon'>
                <div class='pokemon' style="border:<?= $selected_pokemon1_data["border"] ?>;box-shadow:<?= $selected_pokemon1_data["box-shadow"] ?>;">
                    <div class='image'><?= $selected_pokemon1_data["img"] ?></div>
                    <div class='texte'>
                        <p><span class='gras'>Nom</span> : <?= $selected_pokemon1_data["nom"] ?></p>
                        <br>
                        <p><span class='gras'>Type</span> : <?= $selected_pokemon1_data["type"] ?></p>
                        <br>
                        <p><span class='gras'>Points de vie</span> : <span id='pv_<?= $selected_pokemon1_data["nom"] ?>'><?= $selected_pokemon1_data["pdv"] ?></span></p>
                    </div>
                </div>
                <div class='bouton'>
                    <button id='att_n_<?= $selected_pokemon1_data["nom"] ?>' class='btn bouton_att_n'>Attaque normale : <?= $selected_pokemon1_data["att_n"] ?></button>
                    <button id='att_s_<?= $selected_pokemon1_data["nom"] ?>' class='btn bouton_att_s'>Attaque spéciale : <?= $selected_pokemon1_data["att_s"] ?></button>
                </div>
            </div>
        <?php endif; ?>

        <div class='milieu'>
            <p class='versus'>vs</p>
            <button class='recommencer'>Recommencer</button>
        </div>

        <?php if (isset($selected_pokemon2_data)) : ?>
            <!-- Affichage de $selected_pokemon2_data -->
            <div class='container_pokemon'>
                <div class='pokemon' style="border:<?= $selected_pokemon2_data["border"] ?>;box-shadow:<?= $selected_pokemon2_data["box-shadow"] ?>;">
                    <div class='image'><?= $selected_pokemon2_data["img"] ?></div>
                    <div class='texte'>
                        <p><span class='gras'>Nom</span> : <?= $selected_pokemon2_data["nom"] ?></p>
                        <br>
                        <p><span class='gras'>Type</span> : <?= $selected_pokemon2_data["type"] ?></p>
                        <br>
                        <p><span class='gras'>Points de vie</span> : <span id='pv_<?= $selected_pokemon2_data["nom"] ?>'><?= $selected_pokemon2_data["pdv"] ?></span></p>
                    </div>
                </div>
                <div class='bouton'>
                    <button id='att_n_<?= $selected_pokemon2_data["nom"] ?>' class='btn bouton_att_n'>Attaque normale : <?= $selected_pokemon2_data["att_n"] ?></button>
                    <button id='att_s_<?= $selected_pokemon2_data["nom"] ?>' class='btn bouton_att_s'>Attaque spéciale : <?= $selected_pokemon2_data["att_s"] ?></button>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <script src="js/main.js"></script>
</body>

</html>