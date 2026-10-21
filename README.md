# MEGA DEVIS PRO — GitHub + Cloudflare Pages

Projet Cloudflare Pages (advanced mode `_worker.js`), D1 et KV, application de devis.

## Déploiement
1. Installer Node.js 20+ puis `npm install`.
2. Exécuter `npm run build` : compile `src/worker.js` en `public/_worker.js`.
3. Sur Cloudflare, créer/associer la base D1 et le namespace KV utilisant les IDs indiqués dans `wrangler.toml`.
4. Appliquer `npx wrangler d1 migrations apply systeme-d1 --remote`.
5. **Initialiser le Super Admin** via une opération privée, détaillée ci-dessous.
6. Publier : `npm run deploy`, ou connecter GitHub à Cloudflare Pages avec commande de build `npm run build` et dossier de sortie `public`. Ajouter les bindings D1 `SYSTEME_DB` et KV `SYSTEME_KV` dans le tableau de bord Pages (production et aperçu).

## Initialisation Super Admin
La commande `node scripts/init-admin.mjs` prépare une instruction SQL paramétrée avec un hash PBKDF2 et un sel aléatoire. La sortie est affichée dans votre terminal : appliquer la requête à D1 via la console d'administration Cloudflare. Ne jamais intégrer la sortie dans le dépôt GitHub. Valeurs initiales : `mega@services.local` / `secret`, changement obligatoire à la première connexion. **Ne pas exposer le mot de passe initial après mise en service.**

## Comptes et sécurité
Cookie sécurisé HttpOnly, SameSite=Lax. Une URL HTTPS est obligatoire en production. Sessions et permissions validées côté serveur. Les entreprises sont isolées. Les membres sont inscrits avec un mot de passe d'au moins 12 caractères. PBKDF2-SHA256 210000 itérations; rehausser vers Argon2id quand runtime adapté. Authentification Super Admin via un compte distinct.

## Export et livraisons
PDF, DOCX, XLSX générés côté serveur depuis les devis enregistrés. Les propriétaires des devis peuvent télécharger leurs documents. La commande à distance enregistre **un paiement non confirmé** ; Wave doit être vérifié manuellement par l'administrateur avant livraison. Aucun envoi WhatsApp/e-mail automatique n'est fourni sans les accès API des prestataires. Les exports PDF utilisent Helvetica basique, et remplacent certains caractères accentués : une police Unicode embarquée est conseillée avant un usage intensif.

## Limitations et travaux à prévoir
- Les paramètres d'entête légers sont conservés localement (pas une base complète). Les entêtes déjà enregistrés dans les devis sont stockés dans D1.
- Le retrait en agence n'exige pas Wave. Les commandes distantes nécessitent la validation manuelle du paiement.
- L'assistance Super Admin génère un jeton unique de 15 minutes. Le titulaire le saisit via `POST /api/reset-password` (`{ "token":"...", "password":"..." }`) : ajouter un formulaire public de réinitialisation avant exploitation.
- La suppression de membres est une désactivation réversible, afin de préserver les devis et journaux.
- Les emails et WhatsApp ne sont pas envoyés automatiquement.
- Certaines fonctions complémentaires souhaitées (import CSV, stockage d'images, catalogue complet de domaines, personnalisation fine, webhooks Wave, prise en charge parfaite du PDF multilingue) nécessitent un développement et des tests supplémentaires.
- Tester le build, la migration D1, la session, les exports et les permissions sur l'environnement Cloudflare avant mise en production.
