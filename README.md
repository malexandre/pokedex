# Mediflash - Pokedex Interview Starter

## Comment lancer le client

```bash
cd client
npm install
npm start
```

## Comment lancer le server

```bash
cd server
yarn
yarn start:dev
```

## Question

**Si 5 devs rejoignent ton équipe demain et que ton application est en production, quelles sont les améliorations à apporter à l'environnement de Dev et pourquoi ?**

Classé par priorité :

- Mettre en place une config eslint/prettier sur la partie client. Il est important de ne pas polluer les commits par du reformating dans le cas où les différents membres de l'équipe n'ont pas exactement le même style de code. Travaillant seul et sur un petit projet, j'ai préféré ne pas prendre le temps de le faire, mais dès qu'on travaille en équipe, c'est pour moi un élément important.
- Mettre en place une politique sur le workflow git, comme par exemple Gitflow. Il est important de définir cette politique pour qu'elle soit claire pour tout le monde, y compris pour de futurs arrivants. Il est aussi important que tout le monde ne travail pas directement sur la branch de production, qui doit rester stable.
- Mettre en place une CI pour ne pas accepter les PR, merge ou commits sur la branche de production qui ne passent pas les tests. La branche de production doit rester stable, et empêcher des bugs détectés par notre CI d'être déployé est important.
- Mettre en place différente pipelines de tests (au minimum un environnement staging et un environnement production, mais s'il est aussi possible d'avoir des envrionnements de tests pour les PR, c'est pratique aussi).
- Construire ou utiliser une librairie de composants graphiques. Les composants de base qu'on trouve dans une librairie comme Bootstrap permettent de rendre le développement de nouvelles interfaces beaucoup plus rapides, et permet aussi de garder une identité visuelle constante au travers du produit.
- Utiliser des semantic commit mesasges. Ils permettent d'uniformiser les messages de commit, et de générer facilement des changelogs.
