/* =============================================================
   Atelier Ampère — interactions
   1. Bouton mode sombre / mode clair (choix mémorisé)
   2. Tableau électrique : un disjoncteur = un service
   3. Formulaire de devis : vérification des champs (démo, rien n'est envoyé)
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

  // ---------- 2. Tableau électrique ----------
  var services = {
    depannage: {
      titre: 'Dépannage',
      texte: "Plus de courant, disjoncteur qui saute, prise qui chauffe : on trouve la cause et on répare, sans vous vendre ce dont vous n'avez pas besoin.",
      delai: 'sous 24 h en semaine',
      tarif: 'déplacement + diagnostic dès 69 € TTC'
    },
    normes: {
      titre: 'Mise aux normes',
      texte: "Tableau vétuste, pas de différentiel, prises sans terre : on remet votre installation en conformité avec la norme NF C 15-100, pièce par pièce si besoin.",
      delai: 'devis sous 48 h, travaux en 1 à 3 jours',
      tarif: 'tableau neuf posé dès 890 € TTC'
    },
    renovation: {
      titre: 'Rénovation',
      texte: "Appartement ou maison à refaire : plan des circuits, saignées, prises, éclairage et tableau. On travaille avec vos autres artisans pour respecter le planning.",
      delai: 'selon surface, planning fixé au devis',
      tarif: 'sur devis après visite'
    },
    borne: {
      titre: 'Borne de recharge',
      texte: "Installation d'une borne pour voiture électrique en maison ou en copropriété, avec la qualification qui vous ouvre droit aux aides et au crédit d'impôt.",
      delai: 'pose en une demi-journée',
      tarif: 'borne 7 kW posée dès 1 290 € TTC'
    },
    eclairage: {
      titre: 'Éclairage',
      texte: "Spots encastrés, rubans LED, éclairage extérieur et détecteurs : un éclairage qui consomme moins et qui met vos pièces en valeur.",
      delai: 'intervention sous une semaine',
      tarif: 'point lumineux dès 95 € TTC'
    },
    domotique: {
      titre: 'Domotique',
      texte: "Volets, chauffage et lumières pilotés depuis votre téléphone, programmation des absences et suivi de consommation. On installe du matériel ouvert, pas d'abonnement imposé.",
      delai: 'étude puis pose en 1 à 2 jours',
      tarif: 'sur devis après visite'
    }
  };

  var modules = document.querySelectorAll('.module');
  var detail = document.getElementById('detailService');

  if (modules.length && detail) {
    var afficher = function (cle) {
      var s = services[cle];
      if (!s) return;
      detail.querySelector('.detail-titre').textContent = s.titre;
      detail.querySelector('.detail-texte').textContent = s.texte;
      var dd = detail.querySelectorAll('.detail-infos dd');
      dd[0].textContent = s.delai;
      dd[1].textContent = s.tarif;
    };

    modules.forEach(function (module) {
      module.addEventListener('click', function () {
        // Un seul circuit allumé à la fois
        modules.forEach(function (m) { m.setAttribute('aria-pressed', 'false'); });
        module.setAttribute('aria-pressed', 'true');
        afficher(module.dataset.service);
      });
    });
  }

  // ---------- 3. Formulaire de devis ----------
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
