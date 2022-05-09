# Groupomania Social Network

## Prérequis

Vous devez au préalable installer sur votre machine :

- MySQL Server
- NodeJs
- npm

> Afin d'accéder aux fonctionnalités de modérateur vous devez mettre à jour un utilisateur depuis la base de donnée

        update users set role='ADMIN' where id=<user_id>

## Installation

### Backend

##### Configuration

1.  Ajouter un fichier .env à la racine du dossier "backend"
2.  Compléter les variables de configuration et sauvegarder le fichier

        DB_HOSTNAME = "<DB_HOSTNAME>"
        DB_NAME = "<DB_NAME>"
        DB_PORT = "<DB_PORT>"
        DB_USER = "<DB_USER>"
        DB_PASSWORD = "<DB_PASSWORD>"
        JWT_SECRET = "<CHOOSE_A_SECRET>"

3.  Depuis le dossier /backend exécuter la commande suivante :

        npm install

### Frontend

1.  Depuis le dossier /frontend exécuter la commande suivante :

        npm install

## Execution

##### Backend

1.  Ouvrez un terminal dans le dossier /backend et éxécutez la commande suivante :

        npm run start

##### Frontend

1.  Ouvrez un terminal dans le dossier /frontend et éxécutez la commande suivante :

        npm run start
