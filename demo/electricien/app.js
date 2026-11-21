/* =============================================================
   Atelier Ampère — interactions
   1. Bouton mode sombre / mode clair (choix mémorisé)
   2. Formulaire de devis : vérification des champs (démo, rien n'est envoyé)
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- 1. Thème ----------
  var boutonTheme = document.getElementById('boutonTheme');
  if (boutonTheme) {
    var majLibelle = function () {
      var sombre = document.documentElement.getAttribute('data-theme') === 'sombre';
      boutonTheme.setAttribute('aria-label', sombre ? 'Passer en mode clair' : 'Passer en mode sombre');
    };
    majLibelle();

    boutonTheme.addEventListener('click', function () {
      var nouveau = document.documentElement.getAttribute('data-theme') === 'sombre' ? 'clair' : 'sombre';
      document.documentElement.setAttribute('data-theme', nouveau);
      try { localStorage.setItem('ampere-theme', nouveau); } catch (e) { /* navigation privée : tant pis */ }
      majLibelle();
    });
  }

  // ---------- 2. Formulaire de devis ----------
  var formulaire = document.getElementById('formulaireDevis');
  if (formulaire) {
    var merci = document.getElementById('merci');

    var verifier = function (id, test, message) {
      var champ = document.getElementById(id);
      var erreur = document.getElementById('erreur-' + id);
      var ok = test(champ.value.trim());
      champ.closest('.champ').classList.toggle('a-erreur', !ok);
      champ.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (erreur) erreur.textContent = ok ? '' : message;
      return ok;
    };

    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = [
        verifier('nom', function (v) { return v.length >= 2; }, 'Indiquez votre nom.'),
        verifier('telephone', function (v) { return /^(\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v); }, 'Numéro attendu au format 06 12 34 56 78.'),
        verifier('commune', function (v) { return v.length >= 2; }, 'Indiquez la commune des travaux.')
      ].every(Boolean);

      if (!ok) {
        formulaire.querySelector('[aria-invalid="true"]').focus();
        merci.hidden = true;
        return;
      }

      var prenom = document.getElementById('nom').value.trim().split(' ')[0];
      merci.textContent = 'Merci ' + prenom + ' ! Sur un vrai site, votre demande serait maintenant envoyée et on vous rappellerait dans la journée.';
      merci.hidden = false;
      formulaire.reset();
    });
  }
});
