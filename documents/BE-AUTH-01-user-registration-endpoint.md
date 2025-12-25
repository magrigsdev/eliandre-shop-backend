titre : Endpoint d'enregistrement utilisateur (API/register)
Type: Technical Story
Id: BE-AUTH-01
Composant : securité/Authentification
Statut: A faire
Release: 1.0
Priorité: Elevée


1.Description :

    Etant développeur backend,
    je veux exposer un route APIPOST /api/register,
    Afin de permettre la création de nouveaux comptes  avec un stockage sécurisé dans MongoDB.

2.Critères d'acceptations (AC)

    AC1- Validation des données
        - L'API retourne une erreur 400 si l'email est manquant, vide ou mal formaté.
        - L'API retourn une erreur 400 si le mot de passe  est manquant ou ne restpect pas les standard de sécurité( minimum 12 caractères, 1 majuscule, 1 chiffre, caractère special).
        - L'API retourne une erreur 400 si le nom est d'utilsateur est manquant ou invalide.
    
    AC2- Unicité de l'email
        - l'API retourne une erreur 409 si l'email existe déjà en base de données.

    AC3- Sécurité de mot de passe
        - le mot de passe doit être hashé avec bcrypt avant d'être stocké.
        - le mot de passe en clair ne doit jamais être stocké ou loggé.

    AC4- Enregistrement réussi
        - Lors d'une enregistrement valide, l'API retourne un code 201.
        - la réponse contient un message de succès et les données utilisateur (id, email, nom, prenom) sans mot de passe.

    AC5- Gestion des erreurs
        - l'API retourn une erreur 500 en cas de problème de connexion MongoDB ou erreur interne.
        - le message d'erreur ne doit pas exposer d'information sensibles.



3.BDD (gherkin):
    
    Feature: Enregistrement d'un nouvel utilisateur
        Background:
            Given l'API backend est démarrée
            And la base de donnée MongoDB est accessible

        Scenario: Echec - Email mal formaté
            When j'envoie une requête POST avec un email inavlid
            Then le systèm retourn un code 400
        
        Scenario: Echec - Mot de passe non sécurisé 
            When j'envoie une requête POST avec un mot de passe manquant
            Then le systèm retourn un code 400
            And le système retourn un message d'erreur " le mot de passe est invalide"

        Scenario: Echec - Nom manquant 
            When j'envoie une requête POST avec un nom vide
            Then le systèm retourn un code 400
            And le système retourn un message d'erreur "le nom est invalide"

        Scenario: Echec - Email existe déjà 
            When j'envoie une requête POST avec un email déjà utilisé
            Then le systèm retourn un code 400
            And le système retourn un message d'erreur "L'email existe déjà"

        Scenario: Securité - le mot de passe doit être hashé 
            When j'envoie une requête POST avec un mot de passe valide
            And  le systèm hash le mot de passe
        
        Scenario: Sucess - Inscription valide
            When j'envoie une requête POST avec les données valides
            Then le systèm retourn un code 201
            And le système retourn les données de utilisateur sauf son mot de passe.






