Technical Story
BE-AUTH-01
Endpoint de création de compte utilisateur


1.Description :
    Etant développeur backend,
    je veux exposer un route API/register,
    Afin de recevoir et enregistrer les nouveaux utilisateur dans MongoDB.

2.Critères d'acceptations (AC)
    -Validation des données: l'API doit retourner une erreur 400 si l'email est mal formé.
     (à supprmé plutard car le front peut bien vérifé si l'mail est bon oui pas).

    -Validation des données: l'API doit retourner une erreur 400 si le mot de passe ne respect pas les standard de sécurité.
    (à supprmé plutard car le front peut bien vérifé si l'mail est bon oui pas)

    -1. Validation des données: l'API doit retourner une erreur 409 si l'email est déjà utilisée.
    -2. Sécurité (hashage): le mot de passe ne doit pas être enregistré en clair. (bcrypt)
    -3. Sécurité (serveur): l'API doit retourner une erreur 500 si il y'a un problème de connexion à MongoDB
    -4. Enregistrement:  un nouveau utilsateur a été créer,  API doit retourner : un message de success "utilisateur enregistré avec success",  un code 201 et les informations du l'utilisateur sans le mot de passe.


3.BDD (gherkin):
        (se scenario appartien au front)
        Scenario 0: Echec d'inscription l'email est mal formé (AC 400)
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête avec un email mal formé
        Then le system doit retourné un code d'erreur (400)
        And le message d'erreur doit être formé "l'Email est mal formé"

        (se scenario appartien au front)
        Scénario 0: Echec d'inscription mot de passe non sécurité (AC 400)
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête avec un un mot de passe non sécurisé
        Then le system doit retourné un code d'erreur (400)
        And le message d'erreur  "mot de passe trop faible"

        Scénario 1: Echec d'inscription l'email est déjà utilisé (AC 409)
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête avec un email déjà utilisé
        Then le system doit retourné un code d'erreur (409)
        And le message d'erreur  "l'email est déjà utilisé"

        Scénario 2: Le mot de passe ne doit être transforme pour assurer la sécurité.
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête avec un mot de passe clair
        Then le système hashe le mot de passe (le transforme en phrase ou lettre incomprise).

        Scénario 3: Echec d'inscription, le serveur est hors usage. (AC 500)
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête
        Then le système doit retourné un code d'erreur (500) et un message d'erreur "il y'a un problème de connexion au server"

        Scénario 4: Inscription Reussie, quand l'utilsateur envoie les information correct (AC 201)
        Given l'endpoint de creation de compte est disponible
        When j'envoie une requête avec les informations valides
        Then le systèm envoie un code success (201) et un message de success "Inscription reuissie"
        And le systèm envoie les informations de l'utilisateur sans son mot de passe.
         







