const gtuText = `1. OBJET DE L’APPLICATION
L’application a pour objectif d’accompagner la visite de l’exposition en proposant des jeux et contenus ludiques liés aux œuvres et aux thématiques présentées. Elle est destinée aux visiteurs de l’exposition et ne doit être utilisée que dans ce cadre.

2. CONDITIONS D’ACCÈS
L’utilisation de l’application est gratuite pendant la durée de l’exposition.
L’utilisateur doit disposer d’un smartphone ou d’une tablette compatible et, le cas échéant, d’une connexion internet ou au réseau local mis à disposition sur le lieu d’exposition.
L’application est proposée « en l’état » : l’organisateur ne garantit pas son fonctionnement sur tous les appareils ou versions de système.

3. RÈGLES DE BONNE CONDUITE
L’utilisateur s’engage à :
• Utiliser l’application dans le respect des autres visiteurs et du personnel.
• Ne pas gêner la circulation (volume sonore raisonnable, pas de comportements dangereux).
• Ne pas tenter de modifier ou perturber le fonctionnement technique de l’application.

4. DONNÉES PERSONNELLES
L’application ne collecte que les données strictement nécessaires au bon fonctionnement des jeux et à la mesure anonyme de la fréquentation.
Si des données personnelles (ex. prénom, score, e-mail) sont demandées, elles sont utilisées uniquement dans le cadre de l’exposition.
Conformément à la réglementation, l’utilisateur peut demander l’accès, la rectification ou la suppression de ses données en contactant l’organisateur.

5. PROPRIÉTÉ INTELLECTUELLE
Les contenus de l’application (textes, images, sons, jeux, interfaces) sont protégés par le droit d’auteur. Toute reproduction ou diffusion en dehors de la visite sans autorisation est interdite.

6. RESPONSABILITÉ
L’organisateur ne peut être tenu responsable :
• Des dommages résultant d’une mauvaise utilisation de l’application.
• Des problèmes techniques liés au matériel de l’utilisateur (batterie, panne...).
• D’une indisponibilité temporaire ou définitive de l’application.

7. MODIFICATION DU RÈGLEMENT
L’organisateur se réserve le droit de modifier le présent règlement à tout moment. La version à jour est applicable dès sa mise à disposition dans l’application.

8. CONTACT
Pour toute question, l’utilisateur peut s’adresser au personnel sur place ou utiliser les coordonnées fournies par l’organisateur sur le site officiel`;

// Loads gtu. We'll have to adapt it to the translation module later
export const getGtuText = async () => {
    return gtuText;
};