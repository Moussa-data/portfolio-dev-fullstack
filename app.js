// ---- BOUTON "Changer le texte" ----
const bouton = document.getElementById("change-text-btn");
const paragraphe = document.getElementById("apropos-texte");

if (bouton && paragraphe) {
    bouton.addEventListener("click", function () {
        paragraphe.textContent =
            "Je progresse chaque jour en développement web et je me rapproche de mon objectif de devenir développeur full-stack.";
    });
}

// ---- PROJET 1 : COMPTEUR ----
let value = 0;

const counterValue = document.getElementById("counter-value");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const btnReset = document.getElementById("btn-reset");

if (counterValue && btnPlus && btnMinus && btnReset) {
    btnPlus.addEventListener("click", () => {
        value++;
        counterValue.textContent = value;
    });

    btnMinus.addEventListener("click", () => {
        value--;
        counterValue.textContent = value;
    });

    btnReset.addEventListener("click", () => {
        value = 0;
        counterValue.textContent = value;
    });
}

// ---- PROJET 2 : CONVERTISSEUR EUR → USD ----
const eurInput = document.getElementById("eur-input");
const convertBtn = document.getElementById("convert-btn");
const usdResult = document.getElementById("usd-result");

if (eurInput && convertBtn && usdResult) {
    convertBtn.addEventListener("click", () => {
        let eur = Number(eurInput.value);

        if (isNaN(eur) || eur === 0) {
            usdResult.textContent = "Entre un montant valide.";
            return;
        }

        let usd = eur * 1.08; // taux simple
        usdResult.textContent = "Résultat : " + usd.toFixed(2) + " $";
    });
}

// ---- PROJET 3 : CITATIONS ----
const quotes = [
    "Continue à avancer, chaque jour compte.",
    "N'abandonne jamais tes rêves.",
    "Tu as le potentiel pour devenir développeur.",
    "La discipline bat la motivation.",
    "Travaille dur et reste patient."
];

const quoteText = document.getElementById("quote-text");
const quoteBtn = document.getElementById("quote-btn");

if (quoteText && quoteBtn) {
    quoteBtn.addEventListener("click", () => {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = quotes[randomIndex];
    });
}

// ---- PROJET 4 : MINI APP MÉTÉO ----
const villes = [
    { nom: "Paris", temperature: 18 },
    { nom: "New York", temperature: 25 },
    { nom: "Tokyo", temperature: 21 },
    { nom: "Dakar", temperature: 32 },
    { nom: "Londres", temperature: 15 }
];

const villeInput = document.getElementById("ville-input");
const meteoBtn = document.getElementById("meteo-btn");
const meteoResultat = document.getElementById("meteo-resultat");

if (villeInput && meteoBtn && meteoResultat) {
    meteoBtn.addEventListener("click", () => {

        let villeCherchee = villeInput.value.toLowerCase().trim();
        let trouve = false;

        for (let ville of villes) {
            if (ville.nom.toLowerCase() === villeCherchee) {
                meteoResultat.textContent =
                    "Température actuelle à " + ville.nom + " : " + ville.temperature + "°C";
                trouve = true;
                break;
            }
        }

        if (!trouve) {
            meteoResultat.textContent = "Ville inconnue ou non trouvée.";
        }

    });
}

// ---- PROJET 5 : STATISTIQUES (somme et moyenne) ----
const statsBtn = document.getElementById("stats-btn");
const statsResult = document.getElementById("stats-result");
const nombres = [5, 12, 8, 20, 3];

if (statsBtn && statsResult) {
    statsBtn.addEventListener("click", () => {
        let somme = 0;

        for (let n of nombres) {
            somme += n;
        }

        let moyenne = somme / nombres.length;

        statsResult.textContent =
            "Somme = " + somme + " | Moyenne = " + moyenne.toFixed(2);
    });

    // ---- FORMULAIRE DE CONTACT ----
const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactMessage = document.getElementById("contact-message");
const contactResult = document.getElementById("contact-result");

if (contactForm && contactName && contactEmail && contactMessage && contactResult) {
    contactResult.textContent = "";

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // empêche le rechargement de la page

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        if (!name || !email || !message) {
            contactResult.textContent = "Merci de remplir tous les champs.";
            contactResult.style.color = "#ff8080";
            return;
        }

        // vérification très simple de l'email
        if (!email.includes("@") || !email.includes(".")) {
            contactResult.textContent = "Merci d'entrer un email valide.";
            contactResult.style.color = "#ff8080";
            return;
        }

        // Si tout est bon
        contactResult.textContent = "Message simulé comme envoyé 👍 (pas encore de vrai backend).";
        contactResult.style.color = "#4db8ff";

        // On peut vider les champs
        contactName.value = "";
        contactEmail.value = "";
        contactMessage.value = "";
    });
}

}
