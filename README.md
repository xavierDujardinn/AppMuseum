# si on veut un build sur téléphone réel en dehors de l'environnement expo go

faire une fois ça pour init le dossier Android
npx expo run:android

il faut brancher le téléphone en usb

télécharger
le sdk android
https://developer.android.com/studio?hl=fr
jdk version 17 ou plus
https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.msi
pour celui-là faudra redémarrer l'ordi


ajouter fichier
/StarWars/Android/local.properties
sdk.dir=C:\\\Users\\\TON_NOM\\\AppData\\\Local\\\Android\\\Sdk

ensuite
npx expo run:android

c'est normal si c'est long, moi ça me prend ~15 minutes la première fois

Si problème de type path trop long il faut changer le répertoire du projet pour un chemin moins long