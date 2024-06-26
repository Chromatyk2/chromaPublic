import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function StartPedandex(props) {
    const pedandex = [
        {
            "nom": "Bulbizarre",
            "description": "Bulbizarre est un Pokémon de type Plante/Poison. Il possède une graine sur le dos depuis sa naissance. Elle se développe en même temps que lui. Bulbizarre a pour habitude de dormir en plein soleil. Si la plante sur son dos venait à être arrachée, il pourrait en faire pousser une nouvelle en une nuit."
        },
        {
            "nom": "Herbizarre",
            "description": "Herbizarre est un Pokémon de type Plante/Poison. Sa taille et son poids augmentent considérablement. Si on regarde bien, on peut voir le bourgeon de la plante qui poussera plus tard sur son dos."
        },
        {
            "nom": "Florizarre",
            "description": "Florizarre est un Pokémon de type Plante/Poison. Quand il ouvre son énorme fleur, ses pétales dégagent un parfum entêtant. La fleur ne s'épanouit que s'il se sent en sécurité."
        },
        {
            "nom": "Salamèche",
            "description": "Salamèche est un Pokémon de type Feu. La flamme au bout de sa queue indique son état de santé et son humeur. Si la flamme vacille, c'est que Salamèche est heureux. En revanche, si la flamme brûle avec une grande intensité, il est en colère."
        },
        {
            "nom": "Reptincel",
            "description": "Reptincel est un Pokémon de type Feu. Il brûle de flammes dans tout son corps. La température peut atteindre plus de 900 degrés Fahrenheit. Si on l'attaque, il riposte en crachant des flammes."
        },
        {
            "nom": "Dracaufeu",
            "description": "Dracaufeu est un Pokémon de type Feu/Vol. C'est un dragon doté de la capacité de voler et de cracher du feu. Il est extrêmement rare et puissant, capable de brûler tout ce qui l'entoure avec ses flammes."
        },
        {
            "nom": "Carapuce",
            "description": "Carapuce est un Pokémon de type Eau. Il préfère l'eau. D'ailleurs, sa carapace est très résistante. Elle repousse même les attaques de type Feu."
        },
        {
            "nom": "Carabaffe",
            "description": "Carabaffe est un Pokémon de type Eau. En grandissant, son corps devient plus grand et son énorme queue lui permet d'être plus stable quand il nage."
        },
        {
            "nom": "Tortank",
            "description": "Tortank est un Pokémon de type Eau. Sa carapace est un mélange de chair et de métal. Elle est très dure. On dit que sa queue est si puissante qu'elle peut renverser un immeuble."
        },
        {
            "nom": "Chenipan",
            "description": "Chenipan est un Pokémon de type Insecte. Il avance en rampant. Son corps est mou, il est donc vulnérable aux attaques. Quand il se sent menacé, il se protège en érigeant sa cuticule."
        },
        {
            "nom": "Chrysacier",
            "description": "Chrysacier est un Pokémon de type Insecte. Sa cuticule est tellement dure qu'elle ne peut pas être pénétrée, même par une lame. Il reste immobile pour éviter d'être attaqué."
        },
        {
            "nom": "Papilusion",
            "description": "Papilusion est un Pokémon de type Insecte/Vol. Il dégage une poussière qui, en contact avec l'air, devient une poudre aux écailles colorées. Si cette poudre touche les yeux, cela les brûle."
        },
        {
            "nom": "Aspicot",
            "description": "Aspicot est un Pokémon de type Insecte/Poison. Il libère un poison aigu de ses pattes antérieures. Si vous êtes piqué, vous ressentirez une douleur pendant 3 jours."
        },
        {
            "nom": "Coconfort",
            "description": "Coconfort est un Pokémon de type Insecte/Poison. Le Pokémon passe la majeure partie de sa vie immobile, caché sous les feuilles. Le venin de Coconfort est très puissant."
        },
        {
            "nom": "Dardargnan",
            "description": "Dardargnan est un Pokémon de type Insecte/Poison. Il peut injecter un poison mortel dans son ennemi grâce à son dard. Dardargnan est très grand et agressif."
        },
        {
            "nom": "Roucool",
            "description": "Roucool est un Pokémon de type Normal/Vol. Il picore le sol pour y trouver des insectes. Si le Roucool ne trouve pas assez de nourriture, il s'envole vers une autre région."
        },
        {
            "nom": "Roucoups",
            "description": "Roucoups est un Pokémon de type Normal/Vol. Quand il s'envole, il dégage un puissant bourdonnement. Si on l'attaque, il contre-attaque avec ses griffes tranchantes."
        },
        {
            "nom": "Roucarnage",
            "description": "Roucarnage est un Pokémon de type Normal/Vol. Il vole dans les airs à une vitesse de Mach 2. Roucarnage est très territorial et défend son espace avec agressivité."
        },
        {
            "nom": "Rattata",
            "description": "Rattata est un Pokémon de type Normal. Il est très actif pendant la nuit. Il est aussi prolifique. Le Rattata peut donner naissance à 5 petits par portée."
        },
        {
            "nom": "Rattatac",
            "description": "Rattatac est un Pokémon de type Normal. Il est très intelligent et peut mémoriser la disposition de tout ce qui l'entoure, même dans l'obscurité. Si l'un de ses membres est coupé, il le fera repousser."
        },
        {
            "nom": "Piafabec",
            "description": "Piafabec est un Pokémon de type Normal/Vol. Il crie à haute voix pour avertir ses alliés. Si Piafabec est triste ou malade, sa voix devient plus faible."
        },
        {
            "nom": "Rapasdepic",
            "description": "Rapasdepic est un Pokémon de type Normal/Vol. Il a une très bonne mémoire. Si on le prend dans ses bras, il pourra s'en souvenir toute sa vie."
        },
        {
            "nom": "Abo",
            "description": "Abo est un Pokémon de type Poison. Il a une queue siffle. Quand il siffle, le vent sort du corps du Abo. Ce son est très effrayant."
        },
        {
            "nom": "Arbok",
            "description": "Arbok est un Pokémon de type Poison. Ce Pokémon a été une fois découvert au cours de l'Antiquité. Il est dit que si sa bosse au-dessus de sa tête se soulève, il devient malade."
        },
        {
            "nom": "Pikachu",
            "description": "Pikachu est un Pokémon de type Électrique. Il peut se déplacer à une vitesse de 1,2 kilomètres par seconde. On pense que son métabolisme est plus rapide que les autres Pokémon."
        },
        {
            "nom": "Raichu",
            "description": "Raichu est un Pokémon de type Électrique. Ce Pokémon l'énergie électrique a la capacité de dépasser le mur de la frustration. une où électriques avec Il électrifie par nature."
        },
        {
            "nom": "Sabelette",
            "description": "Sabelette est un Pokémon de type Sol. Il est rapide à courir. Il habite dans des déserts et d'autres endroits où les terres sèches."
        },
        {
            "nom": "Sablaireau",
            "description": "Sablaireau est un Pokémon de type Sol. Il est très intelligent. Quand il est prêt à se battre, il se promène dans son grand lac."
        },
        {
            "nom": "Nidoran♀",
            "description": "Nidoran♀ est un Pokémon de type Poison. Il a un corps robuste et une double couche d'éperons."
        },
        {
            "nom": "Nidorina",
            "description": "Nidorina est un Pokémon de type Poison. Ils ont des épines de type détail, à. é la leurs. dans"
        },
        {
            "nom": "Nidoqueen",
            "description": "Nidoqueen est un Pokémon de type Poison/Terre. C'est une femelle dominante qui protège son territoire avec férocité. Elle possède une armure corporelle robuste et des griffes acérées pour combattre ses ennemis."
        },
        {
            "nom": "Nidoran♂",
            "description": "Nidoran♂ est un Pokémon de type Poison. Il possède des glandes qui sécrètent un poison puissant, qu'il utilise pour se défendre contre les prédateurs. Il est très territorial et peut devenir agressif facilement."
        },
        {
            "nom": "Nidorino",
            "description": "Nidorino est un Pokémon de type Poison. Quand il est en colère ou excité, ses épines sécrètent un poison encore plus puissant. Il utilise ses cornes pour combattre et défendre son territoire."
        },
        {
            "nom": "Nidoking",
            "description": "Nidoking est un Pokémon de type Poison/Terre. Il possède une force physique immense et une peau dure comme de la pierre. Il utilise ses cornes et sa queue pour attaquer avec une puissance dévastatrice."
        },
        {
            "nom": "Mélofée",
            "description": "Mélofée est un Pokémon de type Fée. Ce Pokémon est connu pour sa douceur et sa capacité à apaiser les autres. Il est souvent vu dans les endroits calmes et paisibles, où il chante des mélodies envoûtantes."
        },
        {
            "nom": "Mélodelfe",
            "description": "Mélodelfe est un Pokémon de type Fée. Sa voix peut guérir les blessures émotionnelles et apaiser les âmes tourmentées. Mélodelfe est très sensible aux émotions des autres et essaie toujours d'aider ceux qui en ont besoin."
        },
        {
            "nom": "Goupix",
            "description": "Goupix est un Pokémon de type Feu. Il possède une fourrure douce et chaude qui lui permet de survivre dans des environnements glacés. Goupix contrôle ses flammes internes pour maintenir sa température corporelle."
        },
        {
            "nom": "Feunard",
            "description": "Feunard est un Pokémon de type Feu. Il est connu pour sa ruse et son intelligence. Feunard manipule les flammes pour créer des illusions et se protéger des prédateurs. Il est très agile et rapide."
        },
        {
            "nom": "Rondoudou",
            "description": "Rondoudou est un Pokémon de type Normal/Fée. Sa voix mélodieuse apaise les cœurs et endort même les plus agités. Rondoudou flotte paisiblement dans les airs en chantant des berceuses douces."
        },
        {
            "nom": "Grodoudou",
            "description": "Grodoudou est un Pokémon de type Normal/Fée. Il continue d'émettre des ondes apaisantes qui ont un effet calmant sur ceux qui les entendent. Grodoudou est un protecteur doux mais déterminé de son territoire."
        },
        {
            "nom": "Nosferapti",
            "description": "Nosferapti est un Pokémon de type Poison/Vol. Il se nourrit du sang de ses proies endormies la nuit. Nosferapti se déplace silencieusement et utilise sa vision nocturne pour chasser efficacement."
        },
        {
            "nom": "Nosferalto",
            "description": "Nosferalto est un Pokémon de type Poison/Vol. Ses crocs acérés injectent un venin puissant qui paralyse ses proies. Nosferalto est très agile en vol et peut attaquer avec une précision mortelle."
        },
        {
            "nom": "Mystherbe",
            "description": "Mystherbe est un Pokémon de type Plante/Poison. Il se cache dans les buissons en attendant que sa proie passe à proximité. Mystherbe utilise des spores toxiques pour paralyser ses ennemis."
        },
        {
            "nom": "Ortide",
            "description": "Ortide est un Pokémon de type Plante/Poison. Il libère un parfum doux mais toxique pour éloigner les prédateurs. Ortide est capable de manipuler les plantes autour de lui pour se camoufler."
        },
        {
            "nom": "Rafflesia",
            "description": "Rafflesia est un Pokémon de type Plante/Poison. Sa taille imposante et son odeur nauséabonde dissuadent toute tentative d'approche. Rafflesia est capable d'attirer les insectes avec son apparence trompeuse."
        },
        {
            "nom": "Paras",
            "description": "Paras est un Pokémon de type Insecte/Plante. Il se nourrit de champignons et utilise ses spores pour paralyser ses ennemis. Paras forme une symbiose avec le champignon sur son dos."
        },
        {
            "nom": "Parasect",
            "description": "Parasect est un Pokémon de type Insecte/Plante. Le champignon sur son dos a complètement pris le contrôle de son corps. Parasect est souvent vu dans les forêts humides où il chasse ses proies."
        },
        {
            "nom": "Mimitoss",
            "description": "Mimitoss est un Pokémon de type Insecte/Poison. Il utilise des poudres toxiques pour se défendre et immobiliser ses ennemis. Mimitoss est souvent trouvé près des marécages et des zones humides."
        },
        {
            "nom": "Aéromite",
            "description": "Aéromite est un Pokémon de type Insecte/Poison. Il est capable de voler silencieusement et de libérer des poudres toxiques en vol. Aéromite est un prédateur efficace dans les environnements urbains."
        },
        {
            "nom": "Taupiqueur",
            "description": "Taupiqueur est un Pokémon de type Sol. Il creuse des tunnels souterrains à une vitesse incroyable. Taupiqueur est souvent trouvé dans les prairies où il chasse des petits Pokémon pour se nourrir."
        },
        {
            "nom": "Triopikeur",
            "description": "Triopikeur est un Pokémon de type Sol. Il possède trois têtes qui travaillent ensemble pour creuser des tunnels complexes. Triopikeur est très territorial et défend férocement son territoire."
        },
        {
            "nom": "Miaouss",
            "description": "Miaouss est un Pokémon de type Normal. Il est très agile et peut se faufiler silencieusement pour voler de la nourriture. Miaouss est souvent associé aux villes où il chasse les rongeurs et les restes de nourriture."
        },
        {
            "nom": "Persian",
            "description": "Persian est un Pokémon de type Normal. Il possède une démarche élégante et une fourrure soyeuse. Persian utilise ses griffes acérées pour se défendre et chasser. Il est souvent vu dans les endroits luxueux et bien entretenus."
        },
        {
            "nom": "Psykokwak",
            "description": "Psykokwak est un Pokémon de type Eau. Il a un cou roux dans son corps et un est bien propre pour savoir comment de sa nourriture après avoir la formule de son corps."
        },
        {
            "nom": "Akwakwak",
            "description": "Akwakwak est un Pokémon de type Eau. Il est. le décrire. leur pour cette arrière."
        },
        {
            "nom": "Férosinge",
            "description": "Férosinge est un Pokémon de type Combat. Il est extrêmement agile et rapide, capable de grimper aux arbres et de se balancer de branche en branche avec facilité. Férosinge utilise ses poings pour donner des coups rapides et précis."
        },
        {
            "nom": "Colossinge",
            "description": "Colossinge est un Pokémon de type Combat. Évolué à partir de Férosinge, il est encore plus grand et plus fort. Colossinge est connu pour sa puissance brute et peut terrasser ses ennemis avec des coups de poing dévastateurs."
        },
        {
            "nom": "Caninos",
            "description": "Caninos est un Pokémon de type Feu. Il est fidèle et courageux, prêt à tout pour protéger son dresseur. Caninos possède une fourrure dense et résistante au feu."
        },
        {
            "nom": "Arcanin",
            "description": "Arcanin est un Pokémon de type Feu. Il est extrêmement rapide et agile. Arcanin est connu pour sa loyauté absolue envers son dresseur et sa capacité à parcourir de longues distances en un temps record."
        },
        {
            "nom": "Ptitard",
            "description": "Ptitard est un Pokémon de type Eau. Il vit dans des eaux propres. Il doit éviter ses prédateurs quand on est sur le pied"
        },
        {
            "nom": "Tetarte",
            "description": "Tetarte est un Pokémon de type Eau. Ce Pokémon est très patient et habile. L'eau d'Alola Il "
        },
        {
            "nom": "Tartard",
            "description": "Tartard est un Pokémon de type Eau. Il est connu pour sa grande force physique et sa capacité à nager rapidement. Tartard peut également produire des ondes soniques en hurlant, ce qui peut paralyser ses ennemis."
        },
        {
            "nom": "Abra",
            "description": "Abra est un Pokémon de type Psy. Il est connu pour sa capacité à se téléporter instantanément pour éviter le danger. Abra passe la plupart de son temps à dormir pour économiser son énergie psychique."
        },
        {
            "nom": "Kadabra",
            "description": "Kadabra est un Pokémon de type Psy. Il possède des pouvoirs psychiques très puissants. Kadabra peut lire dans les pensées des autres et plier des cuillères en métal avec son esprit."
        },
        {
            "nom": "Alakazam",
            "description": "Alakazam est un Pokémon de type Psy. Il est extrêmement intelligent et possède un QI de plus de 5000. Alakazam utilise ses pouvoirs psychiques pour manipuler des objets à distance et résoudre des problèmes complexes."
        },
        {
            "nom": "Machoc",
            "description": "Machoc est un Pokémon de type Combat. Il est très musclé et possède une grande force physique. Machoc s'entraîne constamment pour devenir plus fort et perfectionner ses techniques de combat."
        },
        {
            "nom": "Machopeur",
            "description": "Machopeur est un Pokémon de type Combat. Il est encore plus fort que Machoc et peut soulever des poids très lourds. Machopeur utilise ses poings pour frapper avec une force dévastatrice."
        },
        {
            "nom": "Mackogneur",
            "description": "Mackogneur est un Pokémon de type Combat. Il est connu pour sa force brutale et sa résistance incroyable. Mackogneur peut briser des blocs de béton avec ses poings et est craint par de nombreux dresseurs."
        },
        {
            "nom": "Chétiflor",
            "description": "Chétiflor est un Pokémon de type Plante. Il est souvent trouvé dans les zones humides où il se cache sous les feuilles. Chétiflor utilise son parfum doux pour attirer ses proies et se nourrir."
        },
        {
            "nom": "Boustiflor",
            "description": "Boustiflor est un Pokémon de type Plante/Poison. Il possède une grande fleur sur sa tête qui produit un parfum enivrant. Boustiflor attire ses proies avec ce parfum et les capture avec ses tentacules venimeux."
        },
        {
            "nom": "Empiflor",
            "description": "Empiflor est un Pokémon de type Plante/Poison. Il est connu pour sa capacité à digérer presque n'importe quoi. Empiflor utilise ses tentacules pour saisir sa proie et l'absorber lentement."
        },
        {
            "nom": "Tentacool",
            "description": "Tentacool est un Pokémon de type Eau/Poison. Il est capable de flotter silencieusement sur l'eau en attendant sa proie. Tentacool utilise ses tentacules pour empoisonner et immobiliser ses ennemis."
        },
        {
            "nom": "Tentacruel",
            "description": "Tentacruel est un Pokémon de type Eau/Poison. Il possède de longs tentacules et des épines venimeuses. Tentacruel est très agile dans l'eau et peut se déplacer rapidement pour capturer sa proie."
        },
        {
            "nom": "Racaillou",
            "description": "Racaillou est un Pokémon de type Roche/Sol. Il est souvent trouvé dans les montagnes où il se cache sous les rochers. Racaillou utilise ses griffes acérées pour creuser des tunnels et se protéger des prédateurs."
        },
        {
            "nom": "Gravalanch",
            "description": "Gravalanch est un Pokémon de type Roche/Sol. Il possède une carapace solide qui le protège des attaques physiques. Gravalanch roule rapidement pour écraser ses ennemis avec son corps lourd."
        },
        {
            "nom": "Grolem",
            "description": "Grolem est un Pokémon de type Roche/Sol. Il est extrêmement massif et lourd. Grolem peut lancer des rochers avec une grande précision et force. Il est souvent vu dans les montagnes où il protège son territoire."
        },
        {
            "nom": "Ponyta",
            "description": "Ponyta est un Pokémon de type Feu. Il est connu pour sa crinière enflammée qui brille intensément. Ponyta peut galoper à des vitesses extrêmement élevées, laissant derrière lui des traînées de feu."
        },
        {
            "nom": "Galopa",
            "description": "Galopa est un Pokémon de type Feu. Il est très gracieux et rapide. Galopa peut sauter au-dessus des obstacles avec agilité et utiliser sa queue enflammée pour attaquer ses ennemis."
        },
        {
            "nom": "Ramoloss",
            "description": "Ramoloss est un Pokémon de type Eau/Psy. Il est lent et oublie les choses facilement. Ramoloss est souvent vu en train de flotter paisiblement dans l'eau, perdu dans ses pensées."
        },
        {
            "nom": "Flagadoss",
            "description": "Flagadoss est un Pokémon de type Eau/Psy. Il possède des pouvoirs psychiques très puissants malgré son apparence somnolente. Flagadoss utilise ses pouvoirs pour manipuler son environnement et se protéger des prédateurs."
        },
        {
            "nom": "Magnéti",
            "description": "Magnéti est un Pokémon de type Électrique/Acier. Il possède un corps magnétique qui lui permet de flotter et de se déplacer librement. Magnéti génère de l'électricité en tournant ses aimants internes."
        },
        {
            "nom": "Magnéton",
            "description": "Magnéton est un Pokémon de type Électrique/Acier. Il est formé par la fusion de trois Magnéti. Magnéton génère un champ magnétique puissant qui peut perturber les appareils électroniques à proximité."
        },
        {
            "nom": "Canarticho",
            "description": "Canarticho est un Pokémon de type Normal/Vol. Il possède un plumage coloré et une longue tige sur sa tête qui ressemble à un poireau. Canarticho est agile en vol et utilise son bec pointu pour attraper sa proie."
        },
        {
            "nom": "Doduo",
            "description": "Doduo est un Pokémon de type Normal/Vol. Il a deux têtes distinctes qui fonctionnent indépendamment. Doduo court rapidement sur ses pattes et peut éviter habilement les obstacles tout en gardant un œil sur son environnement."
        },
        {
            "nom": "Dodrio",
            "description": "Dodrio est un Pokémon de type Normal/Vol. Évolué à partir de Doduo, il a maintenant trois têtes. Dodrio est rapide et agile en vol, attaquant ses ennemis avec ses becs tranchants et ses puissantes pattes."
        },
        {
            "nom": "Otaria",
            "description": "Otaria est un Pokémon de type Eau. Il vit dans des eaux froides et possède une couche de graisse pour le protéger du froid. Otaria utilise ses crocs acérés pour capturer des proies et se défendre des prédateurs."
        },
        {
            "nom": "Lamantine",
            "description": "Lamantine est un Pokémon de type Eau/Glace. Il a évolué à partir d'Otaria et possède une peau épaisse qui le protège du froid extrême. Lamantine nage gracieusement dans l'eau en utilisant ses nageoires pour se déplacer."
        },
        {
            "nom": "Tadmorv",
            "description": "Tadmorv est un Pokémon de type Poison. Il se nourrit de déchets toxiques et est souvent trouvé près des zones industrielles. Tadmorv peut émettre des gaz toxiques pour repousser ses ennemis et capturer sa nourriture."
        },
        {
            "nom": "Grotadmorv",
            "description": "Grotadmorv est un Pokémon de type Poison. Évolué à partir de Tadmorv, il est encore plus grand et toxique. Grotadmorv utilise ses liquides corporels corrosifs pour attaquer et dissoudre ses ennemis."
        },
        {
            "nom": "Kokiyas",
            "description": "Kokiyas est un Pokémon de type Eau. Il possède une coquille dure qui le protège des prédateurs. Kokiyas se cache souvent dans les cours d'eau calmes et utilise ses pinces pour attraper des petits insectes aquatiques."
        },
        {
            "nom": "Crustabri",
            "description": "Crustabri est un Pokémon de type Eau/Glace. Il a évolué à partir de Kokiyas et possède une carapace glacée qui reflète la lumière du soleil. Crustabri nage gracieusement dans l'eau et est capable de se déplacer sur la glace."
        },
        {
            "nom": "Fantominus",
            "description": "Fantominus est un Pokémon de type Spectre/Poison. Il est transparent et peut devenir invisible à volonté. Fantominus effraie ses ennemis en leur infligeant des malédictions et en les piégeant dans des illusions."
        },
        {
            "nom": "Spectrum",
            "description": "Spectrum est un Pokémon de type Spectre/Poison. Évolué à partir de Fantominus, il possède des pouvoirs spectaculaires pour manipuler l'esprit de ses adversaires. Spectrum hante souvent les endroits sombres et abandonnés."
        },
        {
            "nom": "Ectoplasma",
            "description": "Ectoplasma est un Pokémon de type Spectre/Poison. Il a évolué à partir de Spectrum et est extrêmement dangereux. Ectoplasma se nourrit des émotions négatives des humains et peut absorber leur énergie vitale."
        },
        {
            "nom": "Onix",
            "description": "Onix est un Pokémon de type Roche/Sol. Il est extrêmement grand et robuste. Onix creuse des tunnels dans la terre en utilisant son corps massif et peut se déplacer rapidement pour surprendre ses ennemis."
        },
        {
            "nom": "Soporifik",
            "description": "Soporifik est un Pokémon de type Psy. Il possède un rythme de sommeil lent et utilise des ondes cérébrales pour endormir ses ennemis. Soporifik est souvent vu en train de flotter paisiblement dans les airs."
        },
        {
            "nom": "Hypnomade",
            "description": "Hypnomade est un Pokémon de type Psy. Évolué à partir de Soporifik, il est capable de manipuler les rêves des autres. Hypnomade hypnotise ses ennemis en utilisant des motifs lumineux et peut les contrôler à sa guise."
        },
        {
            "nom": "Krabby",
            "description": "Krabby est un Pokémon de type Eau. Il possède une pince robuste qu'il utilise pour attraper sa nourriture et se défendre des prédateurs. Krabby est souvent trouvé près des côtes et dans les eaux peu profondes."
        },
        {
            "nom": "Krabboss",
            "description": "Krabboss est un Pokémon de type Eau. Évolué à partir de Krabby, il a maintenant deux grosses pinces puissantes. Krabboss est un combattant redoutable sous l'eau, capable de briser des rochers avec ses pinces."
        },
        {
            "nom": "Voltorbe",
            "description": "Voltorbe est un Pokémon de type Électrique. Il ressemble à une Poké Ball avec des yeux. Voltorbe stocke de l'électricité et peut s'autodétruire avec une explosion électrique si menacé."
        },
        {
            "nom": "Électrode",
            "description": "Électrode est un Pokémon de type Électrique. Évolué à partir de Voltorbe, il est encore plus chargé d'électricité. Électrode peut rouler à grande vitesse et explose violemment lorsqu'il est attaqué."
        },
        {
            "nom": "Noeunoeuf",
            "description": "Noeunoeuf est un Pokémon de type Plante/Psy. Il est composé de deux œufs reliés par une cordelette. Noeunoeuf utilise des pouvoirs psy pour communiquer et se protéger des prédateurs."
        },
        {
            "nom": "Noadkoko",
            "description": "Noadkoko est un Pokémon de type Plante/Psy. Il est formé par l'évolution de Noeunoeuf en une structure complexe de plusieurs têtes. Noadkoko utilise ses pouvoirs psy pour coordonner les actions de ses têtes et se défendre."
        },
        {
            "nom": "Osselait",
            "description": "Osselait est un Pokémon de type Sol. Il porte un crâne d'os de sa mère comme casque. Osselait utilise l'os pour se défendre et apprendre à combattre. Il est très protecteur envers son os et peut être très agressif."
        },
        {
            "nom": "Ossatueur",
            "description": "Ossatueur est un Pokémon de type Sol. Il a évolué à partir d'Osselait et possède une grande ossature. Ossatueur utilise son os géant comme arme et est respecté pour sa force au combat."
        },
        {
            "nom": "Kicklee",
            "description": "Kicklee est un Pokémon de type Combat. Il est spécialisé dans les coups de pied rapides et puissants. Kicklee peut sauter très haut et donner des coups de pied précis pour vaincre ses adversaires."
        },
        {
            "nom": "Tygnon",
            "description": "Tygnon est un Pokémon de type Combat. Il excelle dans les techniques de combat rapproché. Tygnon utilise ses poings redoutables pour donner des coups de poing rapides et précis."
        },
        {
            "nom": "Excelangue",
            "description": "Excelangue est un Pokémon de type Normal. Il a une longue langue collante qu'il utilise pour attraper des proies hors de portée. Excelangue est très précis avec sa langue et peut immobiliser ses ennemis efficacement."
        },
        {
            "nom": "Smogo",
            "description": "Smogo est un Pokémon de type Poison. Il émet des gaz toxiques qui peuvent être dangereux pour la santé. Smogo flotte dans l'air en se déplaçant avec l'aide des courants atmosphériques."
        },
        {
            "nom": "Smogogo",
            "description": "Smogogo est un Pokémon de type Poison. Évolué à partir de Smogo, il est encore plus toxique et libère des quantités massives de gaz nocifs. Smogogo peut créer un nuage de smog épais pour se cacher et attaquer."
        },
        {
            "nom": "Rhinocorne",
            "description": "Rhinocorne est un Pokémon de type Sol/Roche. Il a une corne solide sur son museau qu'il utilise pour charger ses ennemis. Rhinocorne est robuste et peut courir à grande vitesse sur des terrains difficiles."
        },
        {
            "nom": "Rhinoferos",
            "description": "Rhinoferos est un Pokémon de type Sol/Roche. Évolué à partir de Rhinocorne, il a maintenant deux cornes puissantes. Rhinoferos est extrêmement fort et peut détruire des rochers avec ses puissantes charges."
        },
        {
            "nom": "Leveinard",
            "description": "Leveinard est un Pokémon de type Normal. Il est connu pour sa capacité à guérir les autres Pokémon en les touchant avec ses mains. Leveinard est doux et attentionné envers les blessés et les malades."
        },
        {
            "nom": "Saquedeneu",
            "description": "Saquedeneu est un Pokémon de type Plante. Il a de longs bras flexibles qu'il utilise pour attraper des proies et se balancer de branche en branche. Saquedeneu est souvent trouvé dans les forêts denses."
        },
        {
            "nom": "Kangourex",
            "description": "Kangourex est un Pokémon de type Normal. Il porte un bébé Kangourex dans sa poche ventrale. Kangourex est extrêmement protecteur envers ses petits et peut utiliser sa queue pour donner des coups puissants."
        },
        {
            "nom": "Hypotrempe",
            "description": "Hypotrempe est un Pokémon de type Eau/Dragon. Il ressemble à une petite anguille avec des branchies et des nageoires. Hypotrempe nage gracieusement dans l'eau et utilise ses antennes pour détecter les courants marins."
        },
        {
            "nom": "Hypocean",
            "description": "Hypocean est un Pokémon de type Eau/Dragon. Évolué à partir d'Hypotrempe, il a développé des capacités de nage et de combat améliorées. Hypocean est rapide et agile sous l'eau, capable de plongées profondes."
        },
        {
            "nom": "Poissirène",
            "description": "Poissirène est un Pokémon de type Eau. Il possède une queue en forme de poisson qui lui permet de nager rapidement dans l'eau. Poissirène utilise ses charmes pour attirer les proies et se défendre des prédateurs."
        },
        {
            "nom": "Poissoroy",
            "description": "Poissoroy est un Pokémon de type Eau. Évolué à partir de Poissirène, il a une queue plus grande et plus puissante. Poissoroy nage avec grâce et peut créer de puissants courants d'eau pour désorienter ses ennemis."
        },
        {
            "nom": "Stari",
            "description": "Stari est un Pokémon de type Eau. Il a un corps en forme d'étoile de mer avec des bras minces. Stari se déplace lentement au fond de l'océan et régénère ses membres s'ils sont coupés."
        },
        {
            "nom": "Staross",
            "description": "Staross est un Pokémon de type Eau/Psy. Évolué à partir de Stari, il a plusieurs bras et est capable de générer des ondes cérébrales pour attaquer ses ennemis. Staross est vénéré comme un symbole de sagesse par certaines cultures."
        },
        {
            "nom": "M. Mime",
            "description": "M. Mime est un Pokémon de type Psy/Fée. Il est capable de créer des barrières invisibles en manipulant des ondes psychiques. M. Mime utilise ses talents pour divertir les autres et se protéger des attaques ennemies."
        },
        {
            "nom": "Insécateur",
            "description": "Insécateur est un Pokémon de type Insecte/Vol. Il possède de puissantes pinces qu'il utilise pour couper des branches et se battre contre ses ennemis. Insécateur est agile en vol et peut capturer ses proies avec précision."
        },
        {
            "nom": "Lippoutou",
            "description": "Lippoutou est un Pokémon de type Glace/Psy. Il contrôle la glace en utilisant des pouvoirs psychiques. Lippoutou danse gracieusement pour attaquer et peut geler ses ennemis avec des rayons de froid."
        },
        {
            "nom": "Élektek",
            "description": "Élektek est un Pokémon de type Électrique. Il stocke de l'électricité dans son corps et peut libérer des décharges électriques puissantes. Élektek se déplace à grande vitesse et est souvent trouvé près des centrales électriques."
        },
        {
            "nom": "Magmar",
            "description": "Magmar est un Pokémon de type Feu. Il contrôle le feu en utilisant des poches de magma dans son corps. Magmar peut générer des flammes intenses qui brûlent ses ennemis."
        },
        {
            "nom": "Scarabrute",
            "description": "Scarabrute est un Pokémon de type Insecte. Il a une carapace dure et des mandibules puissantes qu'il utilise pour mordre et écraser ses proies. Scarabrute est connu pour sa force physique et sa ténacité au combat."
        },
        {
            "nom": "Tauros",
            "description": "Tauros est un Pokémon de type Normal. Il est extrêmement fougueux et charge souvent ses ennemis tête baissée. Tauros vit en troupeaux dans les plaines et est respecté pour sa force et son endurance."
        },
        {
            "nom": "Magicarpe",
            "description": "Magicarpe est un Pokémon de type Eau. Il est faible et incapable de se défendre, mais il peut évoluer en un Pokémon très puissant, le redoutable Léviator, après une longue période d'entraînement."
        },
        {
            "nom": "Léviator",
            "description": "Léviator est un Pokémon de type Eau/Vol. Évolué à partir de Magicarpe, il est redoutable en combat avec sa grande taille et ses crocs acérés. Léviator peut voler au-dessus de l'eau et attaquer ses proies avec précision."
        },
        {
            "nom": "Lokhlass",
            "description": "Lokhlass est un Pokémon de type Eau/Glace. Il est célèbre pour sa capacité à transporter des personnes sur son dos à travers les océans. Lokhlass possède une peau épaisse qui le protège du froid extrême."
        },
        {
            "nom": "Métamorph",
            "description": "Métamorph est un Pokémon de type Normal. Il peut transformer son corps pour prendre l'apparence de n'importe quel autre Pokémon. Métamorph utilise cette capacité pour tromper ses ennemis et se fondre dans son environnement."
        },
        {
            "nom": "Évoli",
            "description": "Évoli est un Pokémon de type Normal. Il a la capacité unique de se transformer en plusieurs formes différentes, en fonction des conditions environnementales. Évoli est recherché pour sa capacité d'évolution polyvalente."
        },
        {
            "nom": "Aquali",
            "description": "Aquali est un Pokémon de type Eau. Évolué à partir d'Évoli exposé à une Pierre Eau, il a une fourrure hydrophobe et des capacités aquatiques supérieures. Aquali nage gracieusement et utilise des attaques d'eau puissantes."
        },
        {
            "nom": "Voltali",
            "description": "Voltali est un Pokémon de type Électrique. Évolué à partir d'Évoli exposé à une Pierre Foudre, il accumule de l'électricité statique dans son pelage. Voltali est rapide et utilise des attaques électriques pour paralyser ses ennemis."
        },
        {
            "nom": "Pyroli",
            "description": "Pyroli est un Pokémon de type Feu. Évolué à partir d'Évoli exposé à une Pierre Feu, il contrôle les flammes qui brûlent intensément sur son corps. Pyroli utilise des attaques de feu pour incinérer ses adversaires."
        },
        {
            "nom": "Porygon",
            "description": "Porygon est un Pokémon de type Normal. Il est le premier Pokémon créé artificiellement. Porygon est composé de données numériques et peut se déplacer à travers les environnements virtuels avec facilité."
        },
        {
            "nom": "Amonita",
            "description": "Amonita est un Pokémon de type Roche/Eau. Il s'agit d'un ancien Pokémon qui a été ramené à la vie à partir d'un fossile. Amonita se cache souvent dans les récifs marins et utilise ses tentacules pour capturer sa nourriture."
        },
        {
            "nom": "Amonistar",
            "description": "Amonistar est un Pokémon de type Roche/Eau. Il a évolué à partir d'Amonita et possède une coquille dure comme la pierre. Amonistar utilise ses tentacules pour attraper sa proie et se protéger des prédateurs."
        },
        {
            "nom": "Kabuto",
            "description": "Kabuto est un Pokémon de type Roche/Eau. Il ressemble à un ancien Pokémon fossile. Kabuto utilise ses pinces pour se déplacer sur terre et dans l'eau, et il est souvent trouvé dans les environnements côtiers."
        },
        {
            "nom": "Kabutops",
            "description": "Kabutops est un Pokémon de type Roche/Eau. Il a évolué à partir de Kabuto et possède des lames tranchantes sur ses bras. Kabutops est un redoutable prédateur aquatique capable de découper ses proies en un instant."
        },
        {
            "nom": "Ptéra",
            "description": "Ptéra est un Pokémon de type Roche/Vol. Il est connu pour sa vitesse et son agilité en vol. Ptéra est un prédateur aérien redoutable qui attaque ses proies avec ses griffes acérées et sa vitesse étonnante."
        },
        {
            "nom": "Ronflex",
            "description": "Ronflex est un Pokémon de type Normal. Il est extrêmement paresseux et passe la plupart de son temps à dormir et à manger. Ronflex peut manger des quantités incroyables de nourriture en une seule fois."
        },
        {
            "nom": "Artikodin",
            "description": "Artikodin est un Pokémon de type Glace/Vol. Il contrôle la glace et peut créer des tempêtes de neige en battant des ailes. Artikodin est un gardien légendaire des régions glacées et est vénéré par certaines tribus."
        },
        {
            "nom": "Électhor",
            "description": "Électhor est un Pokémon de type Électrique/Vol. Il génère de puissantes décharges électriques qui peuvent détruire des bâtiments. Électhor est un légendaire oiseau de tonnerre qui apparaît lors des tempêtes électriques."
        },
        {
            "nom": "Sulfura",
            "description": "Sulfura est un Pokémon de type Feu/Vol. Il contrôle le feu et peut générer des flammes intenses qui brûlent tout sur leur passage. Sulfura est vénéré comme un symbole de purification par certaines cultures."
        },
        {
            "nom": "Minidraco",
            "description": "Minidraco est un Pokémon de type Dragon. Il est connu pour sa petite taille et son apparence mignonne. Minidraco est curieux et explore souvent son environnement en sautillant de branche en branche."
        },
        {
            "nom": "Draco",
            "description": "Draco est un Pokémon de type Dragon. Il a grandi à partir de Minidraco et commence à développer des pouvoirs draconiques. Draco est agile et rapide en vol, et il est respecté par d'autres Pokémon pour sa force naissante."
        },
        {
            "nom": "Dracolosse",
            "description": "Dracolosse est un Pokémon de type Dragon/Vol. Il a évolué à partir de Draco et est désormais un dragon majestueux capable de voler sur de longues distances. Dracolosse est respecté comme le roi des cieux."
        },
        {
            "nom": "Mewtwo",
            "description": "Mewtwo est un Pokémon de type Psy. Il a été créé génétiquement en utilisant l'ADN de Mew. Mewtwo possède une intelligence et des pouvoirs psychiques incroyables, ce qui en fait l'un des Pokémon les plus redoutables."
        },
        {
            "nom": "Mew",
            "description": "Mew est un Pokémon de type Psy. Il est considéré comme l'ancêtre de tous les Pokémon. Mew est capable d'apprendre n'importe quelle technique, ce qui en fait l'un des Pokémon les plus mystérieux et recherchés."
        },
        {
            "nom": "Germignon",
            "description": "Germignon est un Pokémon de type Plante. Il possède une grande feuille sur la tête qui capte la lumière du soleil pour nourrir son corps. Germignon se déplace en sautillant et utilise des attaques de plantes pour se défendre."
        },
        {
            "nom": "Macronium",
            "description": "Macronium est un Pokémon de type Plante. Évolué à partir de Germignon, il possède maintenant des feuilles plus larges et plus puissantes. Macronium utilise ses pattes pour creuser et se nourrir de nutriments dans le sol."
        },
        {
            "nom": "Méganium",
            "description": "Méganium est un Pokémon de type Plante. Évolué à partir de Macronium, il a des fleurs qui dégagent un parfum apaisant. Méganium utilise ses pouvoirs de guérison pour soigner les blessures des autres Pokémon."
        },
        {
            "nom": "Héricendre",
            "description": "Héricendre est un Pokémon de type Feu. Il a le dos recouvert de piquants enflammés qui s'enflamment lorsqu'il est menacé. Héricendre roule en boule pour se protéger et utilise des attaques de feu pour repousser ses ennemis."
        },
        {
            "nom": "Feurisson",
            "description": "Feurisson est un Pokémon de type Feu. Évolué à partir d'Héricendre, il a des piquants de feu plus longs et plus puissants. Feurisson contrôle le feu avec précision et peut créer des boules de feu pour attaquer."
        },
        {
            "nom": "Typhlosion",
            "description": "Typhlosion est un Pokémon de type Feu. Évolué à partir de Feurisson, il a un dos entièrement enflammé. Typhlosion peut générer des explosions de feu qui brûlent tout sur leur passage, faisant de lui un redoutable combattant."
        },
        {
            "nom": "Kaiminus",
            "description": "Kaiminus est un Pokémon de type Eau. Il a une mâchoire puissante et des dents tranchantes qu'il utilise pour mordre ses ennemis. Kaiminus est capable de nager à grande vitesse et de chasser efficacement dans l'eau."
        },
        {
            "nom": "Crocrodil",
            "description": "Crocrodil est un Pokémon de type Eau/Ténèbres. Évolué à partir de Kaiminus, il a une peau épaisse et sombre qui lui sert de protection. Crocrodil est un prédateur furtif qui attaque ses proies avec des crocs acérés."
        },
        {
            "nom": "Aligatueur",
            "description": "Aligatueur est un Pokémon de type Eau. Évolué à partir de Crocrodil, il est encore plus grand et plus imposant. Aligatueur peut mordre ses ennemis avec une force incroyable et nager rapidement pour attraper sa proie."
        },
        {
            "nom": "Fouinette",
            "description": "Fouinette est un Pokémon de type Normal. Agile et curieux, il est toujours en mouvement à la recherche de nourriture. Fouinette utilise sa queue pour se balancer et éviter les attaques ennemies."
        },
        {
            "nom": "Fouinar",
            "description": "Fouinar est un Pokémon de type Normal. Évolué à partir de Fouinette, il a une fourrure dense et soyeuse. Fouinar est un bon grimpeur et peut se faufiler silencieusement pour surprendre ses ennemis."
        },
        {
            "nom": "Hoothoot",
            "description": "Hoothoot est un Pokémon de type Normal/Vol. Il est actif la nuit et a une horloge biologique précise. Hoothoot tourne sa tête à 360 degrés pour surveiller son environnement et utilise des attaques de vent pour se défendre."
        },
        {
            "nom": "Noarfang",
            "description": "Noarfang est un Pokémon de type Normal/Vol. Évolué à partir de Hoothoot, il a des ailes plus grandes et une vision nocturne améliorée. Noarfang est capable de voler silencieusement et d'attaquer ses proies avec précision."
        },
        {
            "nom": "Coxy",
            "description": "Coxy est un Pokémon de type Insecte. Il vit en colonies et communique avec les autres Coxy en utilisant des signaux lumineux. Coxy peut aveugler ses ennemis en projetant de la poudre toxique."
        },
        {
            "nom": "Coxyclaque",
            "description": "Coxyclaque est un Pokémon de type Insecte/Vol. Évolué à partir de Coxy, il a des ailes qui lui permettent de voler rapidement. Coxyclaque forme des essaims pour repousser les prédateurs et attaquer en groupe."
        },
        {
            "nom": "Mimigal",
            "description": "Mimigal est un Pokémon de type Insecte/Poison. Il tisse des toiles collantes pour piéger ses proies et se déplacer facilement dans son environnement. Mimigal peut paralyser ses ennemis avec du poison venimeux."
        },
        {
            "nom": "Migalos",
            "description": "Migalos est un Pokémon de type Insecte/Poison. Évolué à partir de Mimigal, il a des crochets venimeux et des toiles plus solides. Migalos utilise des attaques de poison pour affaiblir ses ennemis avant de les attaquer."
        },
        {
            "nom": "Nostenfer",
            "description": "Nostenfer est un Pokémon de type Poison/Vol. Évolué à partir de Nosferalto, il est agile en vol et attaque ses proies silencieusement. Nostenfer boit le sang de ses victimes et peut voir dans l'obscurité totale."
        },
        {
            "nom": "Loupio",
            "description": "Loupio est un Pokémon de type Eau/Électrique. Il a une queue lumineuse qui clignote pour communiquer avec les autres Loupio. Loupio utilise des attaques électriques pour paralyser ses proies et se défendre des prédateurs."
        },
        {
            "nom": "Lanturn",
            "description": "Lanturn est un Pokémon de type Eau/Électrique. Évolué à partir de Loupio, il a développé une lumière plus intense et une capacité à détecter les courants marins. Lanturn utilise son corps lumineux pour attirer les proies dans l'obscurité des profondeurs."
        },
        {
            "nom": "Pichu",
            "description": "Pichu est un Pokémon de type Électrique. Il est le pré-évolution de Pikachu et est connu pour sa grande curiosité et son innocence. Pichu peut libérer de petites décharges électriques involontairement lorsque excité."
        },
        {
            "nom": "Mélo",
            "description": "Mélo est un Pokémon de type Fée. Il a une voix mélodieuse qui apaise ceux qui l'entendent. Mélo utilise ses pouvoirs de guérison pour soulager la douleur des autres Pokémon."
        },
        {
            "nom": "Toudoudou",
            "description": "Toudoudou est un Pokémon de type Normal/Fée. Il a des cordes vocales spéciales qui lui permettent de chanter des mélodies captivantes. Toudoudou peut endormir ses ennemis avec ses chansons douces et mélodieuses."
        },
        {
            "nom": "Togepi",
            "description": "Togepi est un Pokémon de type Fée. Il porte une coquille d'œuf douce comme protection. Togepi utilise son charme mignon pour apaiser les conflits et favoriser l'harmonie entre les Pokémon."
        },
        {
            "nom": "Togetic",
            "description": "Togetic est un Pokémon de type Fée/Vol. Évolué à partir de Togepi, il a des ailes légères et une aura de bonheur qui apporte chance à ceux qui le rencontrent. Togetic soigne les blessures émotionnelles avec son pouvoir de guérison."
        },
        {
            "nom": "Natu",
            "description": "Natu est un Pokémon de type Psy/Vol. Il a une connexion profonde avec les forces mystiques de la nature. Natu prédit l'avenir en observant les mouvements des étoiles et utilise des attaques psychiques pour se défendre."
        },
        {
            "nom": "Xatu",
            "description": "Xatu est un Pokémon de type Psy/Vol. Évolué à partir de Natu, il a la capacité de prédire l'avenir en observant les mouvements des étoiles. Xatu utilise des attaques psychiques pour se défendre et protéger ses proches."
        },
        {
            "nom": "Wattouat",
            "description": "Wattouat est un Pokémon de type Électrique. Il a une laine qui génère de l'électricité statique. Wattouat utilise des attaques de type Électrique pour se défendre et transmettre des décharges électriques à ses ennemis."
        },
        {
            "nom": "Lainergie",
            "description": "Lainergie est un Pokémon de type Électrique. Évolué à partir de Wattouat, il a une laine encore plus électrifiée. Lainergie utilise des attaques de type Électrique pour se protéger et paralyser ses ennemis."
        },
        {
            "nom": "Pharamp",
            "description": "Pharamp est un Pokémon de type Électrique. Évolué à partir de Lainergie, il a une laine qui émet une lumière brillante. Pharamp utilise des attaques de type Électrique pour défendre son territoire et illuminer les nuits sombres."
        },
        {
            "nom": "Joliflor",
            "description": "Joliflor est un Pokémon de type Plante. Il a une couronne de fleurs colorées et un parfum envoûtant. Joliflor utilise des attaques de type Plante pour défendre son territoire et manipuler la nature à son avantage."
        },
        {
            "nom": "Marill",
            "description": "Marill est un Pokémon de type Eau/Fée. Il a une fourrure bleue épaisse qui flotte sur l'eau. Marill utilise des attaques de type Eau et Fée pour nager rapidement et se défendre contre les prédateurs."
        },
        {
            "nom": "Azumarill",
            "description": "Azumarill est un Pokémon de type Eau/Fée. Évolué à partir de Marill, il a des oreilles longues et un corps robuste. Azumarill utilise des attaques de type Eau et Fée pour défendre ses proches et protéger son territoire aquatique."
        },
        {
            "nom": "Simularbre",
            "description": "Simularbre est un Pokémon de type Roche. Il a un corps solide et des racines qui ressemblent à des bras. Simularbre utilise des attaques de type Roche pour défendre son territoire et s'ancrer solidement au sol."
        },
        {
            "nom": "Tarpaud",
            "description": "Tarpaud est un Pokémon de type Eau. Évolué à partir de Têtarte, il a une gorge élastique qui lui permet de croasser très fort. Tarpaud utilise des attaques de type Eau pour repousser ses ennemis et protéger ses proches."
        },
        {
            "nom": "Granivol",
            "description": "Granivol est un Pokémon de type Insecte/Vol. Il a des ailes transparentes et un corps léger qui lui permettent de voler avec agilité. Granivol utilise des attaques de type Insecte et Vol pour se défendre et échapper aux prédateurs."
        },
        {
            "nom": "Floravol",
            "description": "Floravol est un Pokémon de type Insecte/Vol. Évolué à partir de Granivol, il a une allure gracieuse et des pétales colorés qui ressemblent à des ailes. Floravol utilise des attaques de type Insecte et Vol pour se protéger et polliniser les fleurs."
        },
        {
            "nom": "Cotovol",
            "description": "Cotovol est un Pokémon de type Insecte/Vol. Évolué à partir de Floravol, il a un corps robuste et des ailes qui brillent comme des joyaux. Cotovol utilise des attaques de type Insecte et Vol pour protéger ses proches et défendre son territoire."
        },
        {
            "nom": "Capumain",
            "description": "Capumain est un Pokémon de type Normal. Il a une queue préhensile qu'il utilise pour grimper et se balancer. Capumain utilise des attaques de type Normal pour se défendre et jouer avec ses congénères."
        },
        {
            "nom": "Tournegrin",
            "description": "Tournegrin est un Pokémon de type Plante. Il a une fleur sur sa tête qui tourne avec le mouvement du soleil. Tournegrin utilise des attaques de type Plante pour se défendre et capturer l'énergie solaire."
        },
        {
            "nom": "Héliatronc",
            "description": "Héliatronc est un Pokémon de type Plante. Évolué à partir de Tournegrin exposé à une Pierre Soleil, il a des pétales lumineux et une énergie solaire concentrée. Héliatronc utilise des attaques de type Plante pour absorber la lumière et se protéger."
        },
        {
            "nom": "Yanma",
            "description": "Yanma est un Pokémon de type Insecte/Vol. Il a des yeux qui lui permettent de voir à 360 degrés. Yanma utilise des attaques de type Insecte et Vol pour se défendre et voler avec agilité."
        },
        {
            "nom": "Axoloto",
            "description": "Axoloto est un Pokémon de type Eau. Il a des branchies qui lui permettent de respirer sous l'eau. Axoloto utilise des attaques de type Eau pour nager rapidement et se défendre contre les prédateurs aquatiques."
        },
        {
            "nom": "Maraiste",
            "description": "Maraiste est un Pokémon de type Eau/Ténèbres. Évolué à partir d'Axoloto, il a une peau épaisse et des antennes qui détectent les mouvements dans l'eau. Maraiste utilise des attaques de type Eau et Ténèbres pour chasser ses proies et se défendre."
        },
        {
            "nom": "Mentali",
            "description": "Mentali est un Pokémon de type Psy. Évolué à partir d'Évoli exposé à une Pierre Lune, il a des pouvoirs psychiques puissants. Mentali utilise des attaques de type Psy pour se défendre et influencer ses adversaires."
        },
        {
            "nom": "Noctali",
            "description": "Noctali est un Pokémon de type Ténèbres. Évolué à partir d'Évoli exposé à une Pierre Nuit, il a une agilité et une discrétion extraordinaires. Noctali utilise des attaques de type Ténèbres pour se camoufler et attaquer ses ennemis."
        },
        {
            "nom": "Cornèbre",
            "description": "Cornèbre est un Pokémon de type Ténèbres/Vol. Il a un bec tranchant et un plumage sombre qui le rendent invisible dans l'obscurité. Cornèbre utilise des attaques de type Ténèbres et Vol pour effrayer ses ennemis et voler avec agilité."
        },
        {
            "nom": "Roigada",
            "description": "Roigada est un Pokémon de type Eau. Évolué à partir de Ptitard, il a une queue qui émet des ondes sonores. Roigada utilise des attaques de type Eau pour repousser ses ennemis et se défendre dans l'eau."
        },
        {
            "nom": "Zarbi",
            "description": "Zarbi est un Pokémon de type Psy. Il est connu pour ses formes mystérieuses et ses inscriptions sur son corps. Zarbi utilise son alphabet unique pour communiquer et manipuler les symboles mystiques."
        },
        {
            "nom": "Insolourdo",
            "description": "Insolourdo est un Pokémon de type Normal. Il a une forme ronde et joviale qui inspire la bonne humeur. Insolourdo utilise des attaques de type Normal pour jouer et interagir avec ses amis Pokémon."
        },
        {
            "nom": "Steelix",
            "description": "Steelix est un Pokémon de type Acier/Sol. Évolué à partir de Onix exposé à une Pierre Métal, il a un corps massif et une peau d'acier qui le protège des attaques. Steelix utilise des attaques de type Acier et Sol pour creuser et se défendre."
        },
        {
            "nom": "Pomdepik",
            "description": "Pomdepik est un Pokémon de type Plante. Il a des épines acérées et une capacité à se camoufler dans les buissons. Pomdepik utilise des attaques de type Plante pour se défendre et attraper ses proies."
        },
        {
            "nom": "Forteress",
            "description": "Forteress est un Pokémon de type Insecte/Acier. Évolué à partir de Pomdepik, il a une coque en métal et des piques qui explosent à l'impact. Forteress utilise des attaques de type Insecte et Acier pour se défendre et exploser ses ennemis."
        },
        {
            "nom": "Qulbutoké",
            "description": "Qulbutoké est un Pokémon de type Psy. Il utilise des pouvoirs psychiques pour manipuler des objets et jouer des tours. Qulbutoké utilise des attaques de type Psy pour défendre son territoire et créer des illusions."
        },
        {
            "nom": "Cizayox",
            "description": "Cizayox est un Pokémon de type Insecte/Acier. Évolué à partir de Léviator exposé à une Pierre Métal, il a des lames tranchantes et une agilité incroyable. Cizayox utilise des attaques de type Insecte et Acier pour découper ses ennemis et se défendre."
        },
        {
            "nom": "Scarhino",
            "description": "Scarhino est un Pokémon de type Insecte/Combat. Il a des cornes puissantes et une force incroyable. Scarhino utilise des attaques de type Insecte et Combat pour charger et combattre ses adversaires."
        },
        {
            "nom": "Snubbull",
            "description": "Snubbull est un Pokémon de type Fée. Il a une apparence intimidante malgré sa nature douce. Snubbull utilise des attaques de type Fée pour repousser les ennemis et protéger ses amis."
        },
        {
            "nom": "Granbull",
            "description": "Granbull est un Pokémon de type Fée. Évolué à partir de Snubbull, il a une force et une défense impressionnantes. Granbull utilise des attaques de type Fée pour défendre son territoire et combattre avec courage."
        },
        {
            "nom": "Cerfrousse",
            "description": "Cerfrousse est un Pokémon de type Normal. Il a des bois imposants et une stature majestueuse. Cerfrousse utilise des attaques de type Normal pour défendre son territoire et marquer son autorité."
        },
        {
            "nom": "Debugant",
            "description": "Debugant est un Pokémon de type Combat. Il a une force physique impressionnante et une endurance à toute épreuve. Debugant utilise des attaques de type Combat pour s'entraîner et se battre avec discipline."
        },
        {
            "nom": "Kapoera",
            "description": "Kapoera est un Pokémon de type Combat/Vol. Évolué à partir de Kicklee exposé à une Pierre Aube, il a une agilité et une vitesse de frappe incroyables. Kapoera utilise des attaques de type Combat et Vol pour esquiver et frapper ses ennemis."
        },
        {
            "nom": "Girafarig",
            "description": "Girafarig est un Pokémon de type Normal/Psy. Il a une tête avec deux visages distincts, l'un étant normal et l'autre psychique. Girafarig utilise des attaques de type Normal et Psy pour se défendre et anticiper les mouvements de ses adversaires."
        },
        {
            "nom": "Écrémeuh",
            "description": "Écrémeuh est un Pokémon de type Normal. Il a une apparence amicale et produit du lait riche et crémeux. Écrémeuh utilise des attaques de type Normal pour protéger ses veaux et défendre son troupeau."
        },
        {
            "nom": "Magby",
            "description": "Magby est un Pokémon de type Feu. Il a une flamme sur la tête qui indique son état de santé et son humeur. Magby utilise des attaques de type Feu pour se défendre et s'entraîner à maîtriser son feu intérieur."
        },
        {
            "nom": "Lippouti",
            "description": "Lippouti est un Pokémon de type Glace. Il a un corps bleu et rond, et une petite queue en forme de cœur. Lippouti utilise des attaques de type Glace pour se défendre et manipuler la glace."
        },
        {
            "nom": "Élekid",
            "description": "Élekid est un Pokémon de type Électrique. Il a des prises électriques sur ses bras pour absorber et stocker l'énergie électrique. Élekid utilise des attaques de type Électrique pour se défendre et charger ses adversaires."
        },
        {
            "nom": "Queulorior",
            "description": "Queulorior est un Pokémon de type Normal. Il a une queue en spirale qu'il utilise pour dessiner des motifs dans le sable. Queulorior utilise des attaques de type Normal pour se défendre et créer des dessins artistiques."
        },
        {
            "nom": "Qwilfish",
            "description": "Qwilfish est un Pokémon de type Eau/Poison. Il a des piquants empoisonnés qu'il utilise pour se défendre des prédateurs. Qwilfish utilise des attaques de type Eau et Poison pour empoisonner ses ennemis et nager rapidement."
        },
        {
            "nom": "Caratroc",
            "description": "Caratroc est un Pokémon de type Roche/Eau. Il a des coquillages sur le dos qui lui servent de protection. Caratroc utilise des attaques de type Roche et Eau pour défendre son territoire et se camoufler dans l'eau."
        },
        {
            "nom": "Corayon",
            "description": "Corayon est un Pokémon de type Roche/Eau. Évolué à partir de Coquiperl exposé à une Pierre Eau, il a une coque dure et des perles sur le corps. Corayon utilise des attaques de type Roche et Eau pour percer les rochers et nager avec grâce."
        },
        {
            "nom": "Rémoraid",
            "description": "Rémoraid est un Pokémon de type Eau. Il a une forme de poisson et une capacité à tirer des jets d'eau puissants. Rémoraid utilise des attaques de type Eau pour se défendre et nager à grande vitesse."
        },
        {
            "nom": "Octillery",
            "description": "Octillery est un Pokémon de type Eau. Évolué à partir de Rémoraid, il a des tentacules longs et puissants qu'il utilise pour attraper ses proies. Octillery utilise des attaques de type Eau pour chasser et se défendre."
        },
        {
            "nom": "Hyporoi",
            "description": "Hyporoi est un Pokémon de type Eau/Vol. Évolué à partir de Hypotrempe exposé à une Pierre Eau, il a des ailes qui lui permettent de voler au-dessus de l'eau. Hyporoi utilise des attaques de type Eau et Vol pour chasser et se défendre."
        },
        {
            "nom": "Scorplane",
            "description": "Scorplane est un Pokémon de type Ténèbres/Vol. Il a des ailes noires et des griffes acérées qu'il utilise pour attaquer ses proies. Scorplane utilise des attaques de type Ténèbres et Vol pour chasser et se défendre."
        },
        {
            "nom": "Cadoizo",
            "description": "Cadoizo est un Pokémon de type Glace/Vol. Il a un bec pointu et des plumes qui le protègent du froid extrême. Cadoizo utilise des attaques de type Glace et Vol pour voler avec agilité et se défendre contre les prédateurs."
        },
        {
            "nom": "Marcacrin",
            "description": "Marcacrin est un Pokémon de type Glace. Il a une peau épaisse qui le protège du froid intense. Marcacrin utilise des attaques de type Glace pour se défendre et survivre dans les environnements gelés."
        },
        {
            "nom": "Cochignon",
            "description": "Cochignon est un Pokémon de type Glace/Sol. Évolué à partir de Marcacrin exposé à une Pierre Glace, il a un corps robuste et une fourrure dense. Cochignon utilise des attaques de type Glace et Sol pour se déplacer sur la neige et se défendre."
        },
        {
            "nom": "Teddiursa",
            "description": "Teddiursa est un Pokémon de type Normal. Il a une fourrure douce et un visage expressif qui inspire l'affection. Teddiursa utilise des attaques de type Normal pour jouer et interagir avec ses amis Pokémon."
        },
        {
            "nom": "Ursaring",
            "description": "Ursaring est un Pokémon de type Normal. Évolué à partir de Teddiursa, il a une force impressionnante et une endurance à toute épreuve. Ursaring utilise des attaques de type Normal pour se défendre et marquer son territoire."
        },
        {
            "nom": "Phanpy",
            "description": "Phanpy est un Pokémon de type Sol. Il a une peau épaisse qui le protège des intempéries. Phanpy utilise des attaques de type Sol pour creuser et se défendre contre les prédateurs."
        },
        {
            "nom": "Donphan",
            "description": "Donphan est un Pokémon de type Sol. Évolué à partir de Phanpy, il a une armure solide et une queue puissante. Donphan utilise des attaques de type Sol pour rouler et se défendre contre les ennemis."
        },
        {
            "nom": "Démanta",
            "description": "Démanta est un Pokémon de type Eau/Vol. Il a des ailes larges et une queue en forme de ruban. Démanta utilise des attaques de type Eau et Vol pour voler au-dessus de l'eau et se défendre contre les prédateurs."
        },
        {
            "nom": "Airmure",
            "description": "Airmure est un Pokémon de type Acier/Vol. Il a des ailes et un corps recouvert de métal. Airmure utilise des attaques de type Acier et Vol pour voler avec vitesse et se défendre contre les attaques."
        },
        {
            "nom": "Malosse",
            "description": "Malosse est un Pokémon de type Ténèbres/Feu. Il a une fourrure sombre et une haleine enflammée. Malosse utilise des attaques de type Ténèbres et Feu pour chasser et intimider ses adversaires."
        },
        {
            "nom": "Démolosse",
            "description": "Démolosse est un Pokémon de type Ténèbres/Feu. Évolué à partir de Malosse exposé à une Pierre Lune, il a une apparence imposante et une aura menaçante. Démolosse utilise des attaques de type Ténèbres et Feu pour brûler ses ennemis."
        },
        {
            "nom": "Limagma",
            "description": "Limagma est un Pokémon de type Feu. Il a un corps visqueux et une température corporelle extrêmement élevée. Limagma utilise des attaques de type Feu pour fondre ses ennemis et se défendre."
        },
        {
            "nom": "Volcaropod",
            "description": "Volcaropod est un Pokémon de type Feu/Roche. Évolué à partir de Limagma exposé à une Pierre Feu, il a un corps solide et une lave en fusion sous la peau. Volcaropod utilise des attaques de type Feu et Roche pour écraser ses ennemis."
        },
        {
            "nom": "Farfuret",
            "description": "Farfuret est un Pokémon de type Ténèbres. Il a une queue avec une griffe tranchante qu'il utilise pour attaquer. Farfuret utilise des attaques de type Ténèbres pour chasser ses proies et se défendre contre les prédateurs."
        },
        {
            "nom": "Feuforêve",
            "description": "Feuforêve est un Pokémon de type Spectre. Il a une apparence fantomatique et utilise des pouvoirs surnaturels pour effrayer ses ennemis. Feuforêve utilise des attaques de type Spectre pour se défendre et manipuler l'énergie spirituelle."
        },
        {
            "nom": "Porygon2",
            "description": "Porygon2 est un Pokémon de type Normal. Évolué à partir de Porygon exposé à une Améliorator, il a une intelligence artificielle avancée et des capacités de calcul améliorées. Porygon2 utilise des attaques de type Normal pour analyser et se défendre."
        },
        {
            "nom": "Leuphorie",
            "description": "Leuphorie est un Pokémon de type Normal. Évolué à partir de Leveinard exposé à une Pierre Lune, il a une capacité innée à soigner et à apaiser les autres Pokémon. Leuphorie utilise des attaques de type Normal pour protéger ses amis et guérir les blessures."
        },
        {
            "nom": "Raikou",
            "description": "Raikou est un Pokémon de type Électrique. Il a une fourrure qui génère de l'électricité statique. Raikou utilise des attaques de type Électrique pour se défendre et charger ses ennemis avec des décharges électriques."
        },
        {
            "nom": "Entei",
            "description": "Entei est un Pokémon de type Feu. Il a une crinière de feu et une puissance physique incroyable. Entei utilise des attaques de type Feu pour brûler ses ennemis et protéger son territoire."
        },
        {
            "nom": "Suicune",
            "description": "Suicune est un Pokémon de type Eau. Il a une grâce légendaire et un contrôle sur les eaux. Suicune utilise des attaques de type Eau pour nager rapidement et purifier les sources d'eau."
        },
        {
            "nom": "Embrylex",
            "description": "Embrylex est un Pokémon de type Roche/Sol. Il a un corps solide et une carapace dure qui le protège des attaques. Embrylex utilise des attaques de type Roche et Sol pour creuser et se défendre contre les prédateurs."
        },
        {
            "nom": "Ymphect",
            "description": "Ymphect est un Pokémon de type Roche/Sol. Évolué à partir d'Embrylex, il a une coque robuste et une force brute impressionnante. Ymphect utilise des attaques de type Roche et Sol pour rouler et écraser ses ennemis."
        },
        {
            "nom": "Tyranocif",
            "description": "Tyranocif est un Pokémon de type Roche/Ténèbres. Évolué à partir de Ymphect exposé à une Pierre Nuit, il a une puissance destructrice et une peau épaisse. Tyranocif utilise des attaques de type Roche et Ténèbres pour écraser ses ennemis."
        },
        {
            "nom": "Lugia",
            "description": "Lugia est un Pokémon de type Psy/Vol. Il a une aura majestueuse et une capacité à contrôler les courants d'air. Lugia utilise des attaques de type Psy et Vol pour créer des tempêtes et se défendre contre les ennemis."
        },
        {
            "nom": "Ho-Oh",
            "description": "Ho-Oh est un Pokémon de type Feu/Vol. Il a des plumes multicolores et une capacité à ressusciter les morts. Ho-Oh utilise des attaques de type Feu et Vol pour voler dans les cieux et protéger ses territoires sacrés."
        },
        {
            "nom": "Celebi",
            "description": "Celebi est un Pokémon de type Plante/Psy. Il a une apparence mystique et des pouvoirs temporels. Celebi utilise des attaques de type Plante et Psy pour voyager dans le temps et protéger la nature."
        },
        {
            "nom": "Arcko",
            "description": "Arcko est un Pokémon de type Plante. Il a une queue préhensile et des écailles vertes qui le camouflent dans les buissons. Arcko utilise des attaques de type Plante pour grimper aux arbres et surprendre ses ennemis."
        },
        {
            "nom": "Massko",
            "description": "Massko est un Pokémon de type Plante. Évolué à partir d'Arcko, il a des griffes acérées et une agilité remarquable. Massko utilise des attaques de type Plante pour se fondre dans l'environnement et attaquer furtivement."
        },
        {
            "nom": "Jungko",
            "description": "Jungko est un Pokémon de type Plante. Évolué à partir de Massko, il a une stature imposante et des crocs tranchants. Jungko utilise des attaques de type Plante pour défendre son territoire et attaquer avec puissance."
        },
        {
            "nom": "Poussifeu",
            "description": "Poussifeu est un Pokémon de type Feu. Il a des ailes courtes et une crête enflammée sur la tête. Poussifeu utilise des attaques de type Feu pour brûler ses ennemis et se défendre contre les prédateurs."
        },
        {
            "nom": "Galifeu",
            "description": "Galifeu est un Pokémon de type Feu. Évolué à partir de Poussifeu, il a des ailes plus grandes et une queue enflammée. Galifeu utilise des attaques de type Feu pour voler avec agilité et se défendre contre les prédateurs."
        },
        {
            "nom": "Braségali",
            "description": "Braségali est un Pokémon de type Feu/Combat. Évolué à partir de Galifeu, il a des jambes puissantes et une force brute incroyable. Braségali utilise des attaques de type Feu et Combat pour combattre ses ennemis avec fureur."
        },
        {
            "nom": "Gobou",
            "description": "Gobou est un Pokémon de type Eau. Il a une peau épaisse et une queue large qui lui sert de gouvernail. Gobou utilise des attaques de type Eau pour nager rapidement et se défendre contre les prédateurs."
        },
        {
            "nom": "Flobio",
            "description": "Flobio est un Pokémon de type Eau. Évolué à partir de Gobou, il a des nageoires plus grandes et une queue plus puissante. Flobio utilise des attaques de type Eau pour créer des vagues et repousser les ennemis."
        },
        {
            "nom": "Laggron",
            "description": "Laggron est un Pokémon de type Eau/Sol. Évolué à partir de Flobio, il a une peau dure et une stature imposante. Laggron utilise des attaques de type Eau et Sol pour nager dans les mers profondes et se défendre contre les prédateurs."
        },
        {
            "nom": "Medhyèna",
            "description": "Medhyèna est un Pokémon de type Ténèbres. Il a une fourrure noire et des crocs acérés. Medhyèna utilise des attaques de type Ténèbres pour chasser la nuit et se défendre contre les intrus."
        },
        {
            "nom": "Grahyèna",
            "description": "Grahyèna est un Pokémon de type Ténèbres. Évolué à partir de Medhyèna, il a une musculature robuste et des crocs encore plus tranchants. Grahyèna utilise des attaques de type Ténèbres pour intimider ses ennemis et protéger son territoire."
        },
        {
            "nom": "Zigzaton",
            "description": "Zigzaton est un Pokémon de type Normal. Il a une allure effilée et une queue en zigzag. Zigzaton utilise des attaques de type Normal pour courir sur de longues distances et chercher de la nourriture."
        },
        {
            "nom": "Lineon",
            "description": "Lineon est un Pokémon de type Normal. Évolué à partir de Zigzaton, il a une musculature développée et une vitesse impressionnante. Lineon utilise des attaques de type Normal pour chasser et défendre son territoire."
        },
        {
            "nom": "Chenipotte",
            "description": "Chenipotte est un Pokémon de type Insecte. Il a un corps petit et des antennes sensibles. Chenipotte utilise des attaques de type Insecte pour chercher de la nourriture et éviter les prédateurs."
        },
        {
            "nom": "Armulys",
            "description": "Armulys est un Pokémon de type Insecte/Poison. Évolué à partir de Chenipotte, il a des ailes et une queue venimeuse. Armulys utilise des attaques de type Insecte et Poison pour voler avec agilité et empoisonner ses ennemis."
        },
        {
            "nom": "Charmillon",
            "description": "Charmillon est un Pokémon de type Insecte/Vol. Il a des ailes légères et colorées qui scintillent au soleil. Charmillon utilise des attaques de type Insecte et Vol pour voler gracieusement et collecter le nectar des fleurs."
        },
        {
            "nom": "Blindalys",
            "description": "Blindalys est un Pokémon de type Insecte/Vol. Évolué à partir de Charmillon, il a des ailes plus grandes et une capacité à voler avec rapidité. Blindalys utilise des attaques de type Insecte et Vol pour défendre son territoire et éviter les prédateurs."
        },
        {
            "nom": "Papinox",
            "description": "Papinox est un Pokémon de type Insecte/Vol. Évolué à partir de Blindalys, il a des antennes sensibles et un corps robuste. Papinox utilise des attaques de type Insecte et Vol pour chasser la nuit et se défendre contre les menaces nocturnes."
        },
        {
            "nom": "Charmillon",
            "description": "Charmillon est un Pokémon de type Insecte/Vol. Il a des ailes légères et colorées qui scintillent au soleil. Charmillon utilise des attaques de type Insecte et Vol pour voler gracieusement et collecter le nectar des fleurs."
        },
        {
            "nom": "Blindalys",
            "description": "Blindalys est un Pokémon de type Insecte/Vol. Évolué à partir de Charmillon, il a des ailes plus grandes et une capacité à voler avec rapidité. Blindalys utilise des attaques de type Insecte et Vol pour défendre son territoire et éviter les prédateurs."
        },
        {
            "nom": "Papinox",
            "description": "Papinox est un Pokémon de type Insecte/Vol. Évolué à partir de Blindalys, il a des antennes sensibles et un corps robuste. Papinox utilise des attaques de type Insecte et Vol pour chasser la nuit et se défendre contre les menaces nocturnes."
        },
        {
            "nom": "Nénupiot",
            "description": "Nénupiot est un Pokémon de type Eau/Plante. Il a une petite tête verte et un corps semblable à une tige. Nénupiot utilise des attaques de type Eau et Plante pour nager gracieusement et se nourrir de la végétation aquatique."
        },
            {
                "nom": "Lombre",
                "description": "Lombre est un Pokémon de type Eau/Plante. Évolué à partir de Nénupiot, il a des feuilles plus grandes et une queue aquatique. Lombre utilise des attaques de type Eau et Plante pour naviguer dans les étangs et se protéger des prédateurs."
            },
            {
                "nom": "Ludicolo",
                "description": "Ludicolo est un Pokémon de type Eau/Plante. Évolué à partir de Lombre, il a une stature plus imposante et une danse joyeuse. Ludicolo utilise des attaques de type Eau et Plante pour apaiser les esprits et danser sous la pluie."
            },
            {
                "nom": "Grainipiot",
                "description": "Grainipiot est un Pokémon de type Plante. Il a un corps vert et des graines sur la tête. Grainipiot utilise des attaques de type Plante pour germer et croître dans les jardins."
            },
            {
                "nom": "Pifeuil",
                "description": "Pifeuil est un Pokémon de type Plante. Évolué à partir de Grainipiot, il a des feuilles plus grandes et des épines protectrices. Pifeuil utilise des attaques de type Plante pour absorber la lumière du soleil et se nourrir de nutriments."
            },
            {
                "nom": "Tengalice",
                "description": "Tengalice est un Pokémon de type Plante/Poison. Évolué à partir de Pifeuil, il a des tentacules vénéneux et une capacité à piéger ses proies. Tengalice utilise des attaques de type Plante et Poison pour capturer ses ennemis et se défendre dans les marais."
            },
            {
                "nom": "Nirondelle",
                "description": "Nirondelle est un Pokémon de type Normal/Vol. Il a un bec pointu et des ailes larges. Nirondelle utilise des attaques de type Normal et Vol pour voler à des vitesses élevées et se nourrir en plein vol."
            },
            {
                "nom": "Hélédelle",
                "description": "Hélédelle est un Pokémon de type Normal/Vol. Évolué à partir de Nirondelle, il a des plumes colorées et une envergure impressionnante. Hélédelle utilise des attaques de type Normal et Vol pour défendre son territoire et voler avec élégance."
            },
            {
                "nom": "Goélise",
                "description": "Goélise est un Pokémon de type Eau/Vol. Il a des plumes blanches et un bec pointu. Goélise utilise des attaques de type Eau et Vol pour pêcher dans les mers et voler au-dessus des vagues."
            },
            {
                "nom": "Bekipan",
                "description": "Bekipan est un Pokémon de type Eau/Vol. Évolué à partir de Goélise, il a une envergure majestueuse et une capacité à plonger pour attraper du poisson. Bekipan utilise des attaques de type Eau et Vol pour naviguer sur les océans et chasser ses proies."
            },
            {
                "nom": "Tarsal",
                "description": "Tarsal est un Pokémon de type Psy. Il a de grands yeux bleus et une aura mystique. Tarsal utilise des attaques de type Psy pour lire les émotions et protéger ses amis."
            },
            {
                "nom": "Kirlia",
                "description": "Kirlia est un Pokémon de type Psy. Évolué à partir de Tarsal, elle a une grâce féminine et une puissance psychique accrue. Kirlia utilise des attaques de type Psy pour canaliser ses émotions et prévenir les conflits."
            },
            {
                "nom": "Gardevoir",
                "description": "Gardevoir est un Pokémon de type Psy. Évolué à partir de Kirlia, elle a une silhouette élégante et une sensibilité profonde. Gardevoir utilise des attaques de type Psy pour protéger ses dresseurs et combattre le mal."
            },
            {
                "nom": "Arakdo",
                "description": "Arakdo est un Pokémon de type Insecte/Eau. Il a des pattes agiles et une carapace dure. Arakdo utilise des attaques de type Insecte et Eau pour nager dans les rivières et capturer ses proies."
            },
            {
                "nom": "Maskadra",
                "description": "Maskadra est un Pokémon de type Insecte/Vol. Évolué à partir d'Arakdo, il a des ailes fines et une capacité à voler avec grâce. Maskadra utilise des attaques de type Insecte et Vol pour polliniser les fleurs et se défendre contre les prédateurs."
            },
            {
                "nom": "Balignon",
                "description": "Balignon est un Pokémon de type Plante. Il a une tête en forme de graine et des feuilles qui lui permettent de se fondre dans la végétation. Balignon utilise des attaques de type Plante pour se camoufler et se défendre contre les prédateurs."
            },
            {
                "nom": "Chapignon",
                "description": "Chapignon est un Pokémon de type Plante/Poison. Évolué à partir de Balignon, il a des spores toxiques et une allure menaçante. Chapignon utilise des attaques de type Plante et Poison pour éloigner les ennemis et se défendre dans la forêt."
            },
            {
                "nom": "Parecool",
                "description": "Parecool est un Pokémon de type Normal. Il a une queue préhensile et une capacité à s'accrocher aux branches. Parecool utilise des attaques de type Normal pour se balancer dans les arbres et se défendre contre les prédateurs."
            },
            {
                "nom": "Vigoroth",
                "description": "Vigoroth est un Pokémon de type Normal. Évolué à partir de Parecool, il a une musculature puissante et une endurance incroyable. Vigoroth utilise des attaques de type Normal pour grimper et se battre avec énergie."
            },
            {
                "nom": "Monaflèmit",
                "description": "Monaflèmit est un Pokémon de type Normal. Évolué à partir de Vigoroth, il a des griffes acérées et une agressivité accrue. Monaflèmit utilise des attaques de type Normal pour marquer son territoire et défendre ses proies."
            },
            {
                "nom": "Ningale",
                "description": "Ningale est un Pokémon de type Normal/Vol. Il a une voix mélodieuse et une capacité à imiter les sons environnants. Ningale utilise des attaques de type Normal et Vol pour chanter et se défendre contre les prédateurs."
            },
            {
                "nom": "Ninjask",
                "description": "Ninjask est un Pokémon de type Insecte/Vol. Évolué à partir de Ningale, il a une vitesse de vol exceptionnelle et une agilité remarquable. Ninjask utilise des attaques de type Insecte et Vol pour esquiver les attaques et contre-attaquer avec précision."
            },
            {
                "nom": "Munja",
                "description": "Munja est un Pokémon de type Insecte. Évolué à partir de Ninjask, il a une bande rouge et noire autour du corps. Munja utilise des attaques de type Insecte pour se protéger et contre-attaquer en utilisant son exosquelette résistant."
            },
            {
                "nom": "Chuchmur",
                "description": "Chuchmur est un Pokémon de type Normal. Il a une fourrure épaisse et des yeux expressifs. Chuchmur utilise des attaques de type Normal pour communiquer et se défendre contre les menaces."
            },
            {
                "nom": "Ramboum",
                "description": "Ramboum est un Pokémon de type Normal. Évolué à partir de Chuchmur, il a des cornes impressionnantes et une voix puissante. Ramboum utilise des attaques de type Normal pour marquer son territoire et protéger ses amis."
            },
            {
                "nom": "Brouhabam",
                "description": "Brouhabam est un Pokémon de type Combat. Évolué à partir de Makuhita, il a des poings puissants et une endurance incroyable. Brouhabam utilise des attaques de type Combat pour s'entraîner dur et affronter ses adversaires avec force."
            },
            {
                "nom": "Makuhita",
                "description": "Makuhita est un Pokémon de type Combat. Il a une peau épaisse et une musculature impressionnante. Makuhita utilise des attaques de type Combat pour s'entraîner et renforcer ses muscles."
            },
            {
                "nom": "Hariyama",
                "description": "Hariyama est un Pokémon de type Combat. Évolué à partir de Makuhita, il a une taille imposante et une force colossale. Hariyama utilise des attaques de type Combat pour maîtriser ses adversaires et défendre son territoire."
            },
            {
                "nom": "Azurill",
                "description": "Azurill est un Pokémon de type Normal/Fée. Il a une petite queue en forme de boule et une peau douce. Azurill utilise des attaques de type Normal et Fée pour jouer avec ses amis et se protéger des prédateurs."
            },
            {
                "nom": "Tarinor",
                "description": "Tarinor est un Pokémon de type Normal. Il a une armure dure et une constitution robuste. Tarinor utilise des attaques de type Normal pour charger ses adversaires et défendre son territoire."
            },
            {
                "nom": "Skitty",
                "description": "Skitty est un Pokémon de type Normal. Il a une queue touffue et des yeux expressifs. Skitty utilise des attaques de type Normal pour jouer et communiquer avec d'autres Pokémon."
            },
            {
                "nom": "Delcatty",
                "description": "Delcatty est un Pokémon de type Normal. Évolué à partir de Skitty, il a une grâce féline et une agilité accrue. Delcatty utilise des attaques de type Normal pour se déplacer silencieusement et éviter les conflits."
            },
            {
                "nom": "Ténéfix",
                "description": "Ténéfix est un Pokémon de type Ténèbres. Il a un corps noir et une aura mystérieuse. Ténéfix utilise des attaques de type Ténèbres pour manipuler les ombres et effrayer ses ennemis."
            },
            {
                "nom": "Mysdibule",
                "description": "Mysdibule est un Pokémon de type Ténèbres/Acier. Il a une mâchoire puissante et une capacité à mordre avec force. Mysdibule utilise des attaques de type Ténèbres et Acier pour protéger son territoire et défendre ses proies."
            },
            {
                "nom": "Galekid",
                "description": "Galekid est un Pokémon de type Acier. Il a un corps robuste et des aimants pour attirer le métal. Galekid utilise des attaques de type Acier pour se protéger des attaques physiques et collecter des objets métalliques."
            },
            {
                "nom": "Galegon",
                "description": "Galegon est un Pokémon de type Acier. Évolué à partir de Galekid, il a une armure plus épaisse et une capacité à résister aux chocs. Galegon utilise des attaques de type Acier pour construire des structures et se défendre dans les environnements industriels."
            },
            {
                "nom": "Galeking",
                "description": "Galeking est un Pokémon de type Acier. Évolué à partir de Galegon, il a une stature imposante et une force brute. Galeking utilise des attaques de type Acier pour commander aux autres Pokémon et protéger ses alliés."
            },
            {
                "nom": "Méditikka",
                "description": "Méditikka est un Pokémon de type Psy/Combat. Il a une méditation constante et une discipline mentale. Méditikka utilise des attaques de type Psy et Combat pour augmenter sa concentration et combattre avec stratégie."
            },
            {
                "nom": "Charmina",
                "description": "Charmina est un Pokémon de type Psy/Combat. Évolué à partir de Méditikka, il a une force mentale accrue et une capacité à manipuler l'énergie psychique. Charmina utilise des attaques de type Psy et Combat pour défendre ses amis et méditer en paix."
            },
            {
                "nom": "Dynavolt",
                "description": "Dynavolt est un Pokémon de type Électrik. Il a des crêtes électriques et une capacité à générer de l'électricité. Dynavolt utilise des attaques de type Électrik pour charger ses adversaires et alimenter les machines."
            },
            {
                "nom": "Élecsprint",
                "description": "Élecsprint est un Pokémon de type Électrik. Évolué à partir de Dynavolt, il a une vitesse de déplacement impressionnante et une puissance électrique accrue. Élecsprint utilise des attaques de type Électrik pour parcourir de longues distances et défendre son territoire."
            },
            {
                "nom": "Posipi",
                "description": "Posipi est un Pokémon de type Électrik. Il a une queue en forme de foudre et une énergie électrique constante. Posipi utilise des attaques de type Électrik pour jouer avec son partenaire et créer des étincelles."
            },
            {
                "nom": "Negapi",
                "description": "Negapi est un Pokémon de type Électrik. Il a une queue en forme de foudre et une énergie électrique constante. Negapi utilise des attaques de type Électrik pour jouer avec son partenaire et créer des étincelles."
            },
            {
                "nom": "Muciole",
                "description": "Muciole est un Pokémon de type Insecte/Vol. Il a une queue lumineuse et des ailes délicates. Muciole utilise des attaques de type Insecte et Vol pour naviguer dans l'obscurité et attirer ses proies avec sa lumière."
            },
            {
                "nom": "Lumivole",
                "description": "Lumivole est un Pokémon de type Insecte/Vol. Évolué à partir de Muciole, il a une lumière intense et une capacité à éblouir ses ennemis. Lumivole utilise des attaques de type Insecte et Vol pour guider ses alliés et repousser les prédateurs."
            },
            {
                "nom": "Rosélia",
                "description": "Rosélia est un Pokémon de type Plante/Poison. Il a des épines empoisonnées et une fragrance enivrante. Rosélia utilise des attaques de type Plante et Poison pour défendre son jardin et soigner ses amis avec ses pétales guérisseurs."
            },
            {
                "nom": "Gloupti",
                "description": "Gloupti est un Pokémon de type Poison. Il a un corps visqueux et une capacité à digérer presque tout. Gloupti utilise des attaques de type Poison pour dissoudre ses proies et défendre son territoire des intrus."
            },
            {
                "nom": "Avaltout",
                "description": "Avaltout est un Pokémon de type Poison. Évolué à partir de Gloupti, il a une taille impressionnante et une force digestive décuplée. Avaltout utilise des attaques de type Poison pour neutraliser les toxines et défendre son écosystème."
            },
            {
                "nom": "Carvanha",
                "description": "Carvanha est un Pokémon de type Eau/Ténèbres. Il a des dents acérées et une agressivité naturelle. Carvanha utilise des attaques de type Eau et Ténèbres pour chasser en groupe et terroriser les autres Pokémon aquatiques."
            },
            {
                "nom": "Sharpedo",
                "description": "Sharpedo est un Pokémon de type Eau/Ténèbres. Évolué à partir de Carvanha, il a une vitesse de nage élevée et une mâchoire redoutable. Sharpedo utilise des attaques de type Eau et Ténèbres pour traquer ses proies et défendre son territoire sous-marin."
            },
            {
                "nom": "Wailmer",
                "description": "Wailmer est un Pokémon de type Eau. Il a une taille imposante et une capacité à stocker de l'eau dans son corps. Wailmer utilise des attaques de type Eau pour communiquer avec les autres Wailmer et se défendre contre les prédateurs marins."
            },
            {
                "nom": "Wailord",
                "description": "Wailord est un Pokémon de type Eau. Évolué à partir de Wailmer, il a une taille gigantesque et une masse corporelle impressionnante. Wailord utilise des attaques de type Eau pour créer des vagues énormes et défendre son territoire océanique."
            },
            {
                "nom": "Chamallot",
                "description": "Chamallot est un Pokémon de type Feu. Il a une crinière enflammée et une agilité remarquable. Chamallot utilise des attaques de type Feu pour se protéger des prédateurs et éclairer les endroits sombres avec sa queue ardente."
            },
            {
                "nom": "Camerupt",
                "description": "Camerupt est un Pokémon de type Feu/Sol. Évolué à partir de Chamallot, il a des éruptions volcaniques et une puissance brute. Camerupt utilise des attaques de type Feu et Sol pour provoquer des tremblements de terre et défendre son territoire dans les régions volcaniques."
            },
            {
                "nom": "Chartor",
                "description": "Chartor est un Pokémon de type Feu. Il a une carapace enflammée et une endurance impressionnante. Chartor utilise des attaques de type Feu pour renforcer sa carapace et repousser les attaques ennemies."
            },
            {
                "nom": "Spoink",
                "description": "Spoink est un Pokémon de type Psy. Il a un ressort sur sa tête et une capacité à sauter sans fin. Spoink utilise des attaques de type Psy pour méditer et maintenir son équilibre mental."
            },
            {
                "nom": "Groret",
                "description": "Groret est un Pokémon de type Psy. Évolué à partir de Spoink, il a un ressort plus puissant et une concentration psychique accrue. Groret utilise des attaques de type Psy pour manipuler l'énergie mentale et renforcer son pouvoir de méditation."
            },
            {
                "nom": "Spinda",
                "description": "Spinda est un Pokémon de type Normal. Il a des taches uniques et un comportement erratique. Spinda utilise des attaques de type Normal pour désorienter ses adversaires et se déplacer avec agilité malgré sa démarche hésitante."
            },
            {
                "nom": "Kraknoix",
                "description": "Kraknoix est un Pokémon de type Sol. Il a des griffes acérées et une capacité à creuser des tunnels. Kraknoix utilise des attaques de type Sol pour renforcer ses griffes et terrasser ses adversaires avec des coups de queue."
            },
            {
                "nom": "Vibraninf",
                "description": "Vibraninf est un Pokémon de type Sol. Évolué à partir de Kraknoix, il a des mâchoires puissantes et une capacité à sentir les vibrations du sol. Vibraninf utilise des attaques de type Sol pour creuser des pièges et défendre son territoire souterrain."
            },
            {
                "nom": "Libégon",
                "description": "Libégon est un Pokémon de type Sol/Vol. Évolué à partir de Vibraninf, il a des ailes robustes et une force incroyable. Libégon utilise des attaques de type Sol et Vol pour créer des tempêtes de sable et surveiller son territoire aérien."
            },
            {
                "nom": "Cacnea",
                "description": "Cacnea est un Pokémon de type Plante. Il a des piquants acérés et une capacité à survivre dans les déserts arides. Cacnea utilise des attaques de type Plante pour stocker de l'eau dans son corps et se défendre contre les prédateurs."
            },
            {
                "nom": "Cacturne",
                "description": "Cacturne est un Pokémon de type Plante/Ténèbres. Évolué à partir de Cacnea, il a des épines toxiques et une capacité à se fondre dans l'ombre. Cacturne utilise des attaques de type Plante et Ténèbres pour piéger ses proies et se camoufler dans les environnements désertiques."
            },
            {
                "nom": "Tylton",
                "description": "Tylton est un Pokémon de type Normal/Vol. Il a des plumes douces et une capacité à voler avec légèreté. Tylton utilise des attaques de type Normal et Vol pour construire des nids dans les hauteurs et repérer les intrus."
            },
            {
                "nom": "Altaria",
                "description": "Altaria est un Pokémon de type Dragon/Vol. Évolué à partir de Tylton, il a des ailes majestueuses et une voix mélodieuse. Altaria utilise des attaques de type Dragon et Vol pour protéger ses proches et voyager à travers les cieux."
            },
            {
                "nom": "Mangriff",
                "description": "Mangriff est un Pokémon de type Ténèbres. Il a des griffes acérées et une capacité à chasser silencieusement. Mangriff utilise des attaques de type Ténèbres pour traquer ses proies et défendre son territoire."
            },
            {
                "nom": "Séviper",
                "description": "Séviper est un Pokémon de type Poison. Il a des crocs venimeux et une rivalité ancestrale avec Zangoose. Séviper utilise des attaques de type Poison pour paralyser ses proies et défendre sa réputation."
            },
            {
                "nom": "Séléroc",
                "description": "Séléroc est un Pokémon de type Roche/Psy. Il a une aura mystérieuse et une capacité à contrôler les énergies psychiques. Séléroc utilise des attaques de type Roche et Psy pour méditer et manipuler la gravité."
            },
            {
                "nom": "Solaroc",
                "description": "Solaroc est un Pokémon de type Roche/Psy. Évolué à partir de Séléroc, il a une connexion avec le soleil et une force psychique intense. Solaroc utilise des attaques de type Roche et Psy pour absorber l'énergie solaire et repousser les attaques ennemies."
            },
            {
                "nom": "Barpau",
                "description": "Barpau est un Pokémon de type Eau. Il a une apparence étrange et une capacité à évoluer sous certaines conditions. Barpau utilise des attaques de type Eau pour nager dans les rivières et se camoufler parmi les plantes aquatiques."
            },
            {
                "nom": "Milobellus",
                "description": "Milobellus est un Pokémon de type Eau. Évolué à partir de Barpau, il a une beauté gracieuse et une nage élégante. Milobellus utilise des attaques de type Eau pour apaiser les conflits et guider les autres Pokémon aquatiques."
            },
            {
                "nom": "Morphéo",
                "description": "Morphéo est un Pokémon de type Normal. Il a la capacité unique de changer de forme en fonction des conditions météorologiques. Morphéo utilise des attaques de type Normal pour s'adapter à son environnement et interagir avec d'autres Pokémon."
            },
            {
                "nom": "Kecleon",
                "description": "Kecleon est un Pokémon de type Normal. Il a la capacité spéciale de changer de couleur pour se camoufler. Kecleon utilise des attaques de type Normal pour se fondre dans le décor et surprendre ses adversaires."
            },
            {
                "nom": "Polichombr",
                "description": "Polichombr est un Pokémon de type Spectre. Il a une apparence fantomatique et une capacité à se cacher dans l'ombre. Polichombr utilise des attaques de type Spectre pour effrayer ses ennemis et manipuler les esprits."
            },
            {
                "nom": "Branette",
                "description": "Branette est un Pokémon de type Spectre. Évolué à partir de Polichombr, il a une puissance psychique et une volonté de vengeance. Branette utilise des attaques de type Spectre pour hanter ses adversaires et les tourmenter dans leurs cauchemars."
            },
            {
                "nom": "Skelenox",
                "description": "Skelenox est un Pokémon de type Spectre. Évolué à partir de Branette, il a une ossature flottante et une capacité à effrayer même les Pokémon les plus courageux. Skelenox utilise des attaques de type Spectre pour manipuler les âmes et défendre son domaine."
            },
            {
                "nom": "Teraclope",
                "description": "Teraclope est un Pokémon de type Spectre. Il a un corps colossal et une force terrifiante. Teraclope utilise des attaques de type Spectre pour créer des illusions et protéger les sanctuaires hantés."
            },
            {
                "nom": "Tropius",
                "description": "Tropius est un Pokémon de type Plante/Vol. Il a des feuilles comestibles et une envergure impressionnante. Tropius utilise des attaques de type Plante et Vol pour fournir de la nourriture aux autres Pokémon et surveiller les jungles luxuriantes."
            },
            {
                "nom": "Éoko",
                "description": "Éoko est un Pokémon de type Psy/Vol. Il a une queue en forme de ruban et une connexion psychique avec les astres. Éoko utilise des attaques de type Psy et Vol pour méditer dans les hauteurs et prédire les événements cosmiques."
            },
            {
                "nom": "Absol",
                "description": "Absol est un Pokémon de type Ténèbres. Il a la capacité de détecter les catastrophes naturelles imminentes. Absol utilise des attaques de type Ténèbres pour prévenir les dangers et protéger les Pokémon vulnérables."
            },
            {
                "nom": "Okéoké",
                "description": "Okéoké est un Pokémon de type Normal. Il a une apparence clownesque et une capacité à distraire ses adversaires. Okéoké utilise des attaques de type Normal pour divertir les autres Pokémon et apaiser les tensions."
            },
            {
                "nom": "Stalgamin",
                "description": "Stalgamin est un Pokémon de type Glace/Acier. Il a une carapace de glace et une résistance aux attaques physiques. Stalgamin utilise des attaques de type Glace et Acier pour créer des sculptures gelées et se défendre dans les régions polaires."
            },
            {
                "nom": "Oniglali",
                "description": "Oniglali est un Pokémon de type Glace/Acier. Évolué à partir de Stalgamin, il a une vitesse accrue et une maîtrise de la glace. Oniglali utilise des attaques de type Glace et Acier pour patiner sur la glace et trancher ses adversaires avec ses lames gelées."
            },
            {
                "nom": "Obalie",
                "description": "Obalie est un Pokémon de type Glace/Eau. Il a un corps rond et une peau douce comme la neige. Obalie utilise des attaques de type Glace et Eau pour flotter sur les eaux gelées et jouer avec les flocons de neige."
            },
            {
                "nom": "Phogleur",
                "description": "Phogleur est un Pokémon de type Glace/Eau. Évolué à partir d'Obalie, il a une taille imposante et une force de nage exceptionnelle. Phogleur utilise des attaques de type Glace et Eau pour briser la glace et défendre son territoire marin."
            },
            {
                "nom": "Kaimorse",
                "description": "Kaimorse est un Pokémon de type Glace/Eau. Évolué à partir de Phogleur, il a une peau épaisse et une endurance incroyable au froid. Kaimorse utilise des attaques de type Glace et Eau pour créer des vagues gelées et protéger les créatures marines."
            },
            {
                "nom": "Coquiperl",
                "description": "Coquiperl est un Pokémon de type Eau. Il a une coquille brillante et une perle précieuse. Coquiperl utilise des attaques de type Eau pour nager dans les océans et collecter des perles rares."
            },
            {
                "nom": "Serpang",
                "description": "Serpang est un Pokémon de type Eau. Évolué à partir de Coquiperl, il a une mâchoire puissante et une capacité à chasser en eaux profondes. Serpang utilise des attaques de type Eau pour traquer ses proies et défendre son territoire marin."
            },
            {
                "nom": "Rosabyss",
                "description": "Rosabyss est un Pokémon de type Eau. Évolué à partir de Serpang, il a une beauté gracieuse et une capacité à contrôler l'eau. Rosabyss utilise des attaques de type Eau pour guider les autres Pokémon marins et protéger les récifs coralliens."
            },
            {
                "nom": "Relicanth",
                "description": "Relicanth est un Pokémon de type Eau/Roche. Il a une apparence préhistorique et une longévité exceptionnelle. Relicanth utilise des attaques de type Eau et Roche pour explorer les fonds marins et survivre dans des environnements extrêmes."
            },
            {
                "nom": "Lovdisc",
                "description": "Lovdisc est un Pokémon de type Eau. Il a une forme de cœur et une capacité à nager gracieusement. Lovdisc utilise des attaques de type Eau pour jouer avec d'autres Pokémon et rechercher des partenaires."
            },
            {
                "nom": "Barloche",
                "description": "Barloche est un Pokémon de type Eau. Il a une forme de poisson et une capacité à nager avec agilité. Barloche utilise des attaques de type Eau pour explorer les rivières et échapper aux prédateurs aquatiques."
            },
            {
                "nom": "Barbicha",
                "description": "Barbicha est un Pokémon de type Eau/Sol. Évolué à partir de Barloche, il a une barbe ressemblant à un fouet et une force physique impressionnante. Barbicha utilise des attaques de type Eau et Sol pour creuser des tunnels et se défendre sous l'eau."
            },
            {
                "nom": "Écrapince",
                "description": "Écrapince est un Pokémon de type Eau. Il a une pince puissante et une agressivité naturelle. Écrapince utilise des attaques de type Eau pour capturer ses proies et défendre son territoire côtier."
            },
            {
                "nom": "Colhomard",
                "description": "Colhomard est un Pokémon de type Eau/Ténèbres. Évolué à partir d'Écrapince, il a des pinces tranchantes et une stratégie de chasse nocturne. Colhomard utilise des attaques de type Eau et Ténèbres pour subjuguer ses rivaux et défendre son banc."
            },
            {
                "nom": "Balbuto",
                "description": "Balbuto est un Pokémon de type Sol/Ténèbres. Il a une forme de sphinx et une capacité à manipuler les ombres. Balbuto utilise des attaques de type Sol et Ténèbres pour contrôler les tempêtes de sable et égarer ses adversaires."
            },
            {
                "nom": "Kaorine",
                "description": "Kaorine est un Pokémon de type Sol/Ténèbres. Évolué à partir de Balbuto, il a une connexion avec le désert et une sagesse ancestrale. Kaorine utilise des attaques de type Sol et Ténèbres pour protéger les oasis et guider les voyageurs perdus."
            },
            {
                "nom": "Lilia",
                "description": "Lilia est un Pokémon de type Plante. Il a une apparence de lys et une capacité à fleurir au printemps. Lilia utilise des attaques de type Plante pour absorber la lumière du soleil et enrichir le sol de ses pétales."
            },
            {
                "nom": "Vacilys",
                "description": "Vacilys est un Pokémon de type Plante. Évolué à partir de Lilia, il a des fleurs lumineuses et une fragrance enivrante. Vacilys utilise des attaques de type Plante pour protéger ses bourgeons et revitaliser les jardins."
            },
            {
                "nom": "Anorith",
                "description": "Anorith est un Pokémon de type Roche/Insecte. Il a une carapace fossilisée et une capacité à se camoufler parmi les rochers. Anorith utilise des attaques de type Roche et Insecte pour défendre son territoire et chasser ses proies."
            },
            {
                "nom": "Armaldo",
                "description": "Armaldo est un Pokémon de type Roche/Insecte. Évolué à partir d'Anorith, il a des griffes puissantes et une agilité surprenante. Armaldo utilise des attaques de type Roche et Insecte pour grimper sur les falaises et combattre les ennemis."
            },
        {
            "nom": "Draby",
            "description": "Draby est un Pokémon de type Dragon. Il a une queue pointue et une capacité à voler à grande vitesse. Draby utilise des attaques de type Dragon pour marquer son territoire et chasser des proies."
        },
        {
            "nom": "Drackhaus",
            "description": "Drackhaus est un Pokémon de type Dragon. Évolué à partir de Draby, il a des écailles dures et une force physique impressionnante. Drackhaus utilise des attaques de type Dragon pour protéger son territoire et affronter ses rivaux."
        },
        {
            "nom": "Drattak",
            "description": "Drattak est un Pokémon de type Dragon/Vol. Évolué à partir de Drackhaus, il a des ailes puissantes et une envergure imposante. Drattak utilise des attaques de type Dragon et Vol pour planer dans les cieux et plonger sur ses ennemis."
        },
        {
            "nom": "Terhal",
            "description": "Terhal est un Pokémon de type Acier/Roche. Il a un corps solide et une résistance aux attaques physiques. Terhal utilise des attaques de type Acier et Roche pour creuser des tunnels et défendre son territoire souterrain."
        },
        {
            "nom": "Métang",
            "description": "Métang est un Pokémon de type Acier/Psy. Évolué à partir de Terhal, il a une intelligence artificielle et une capacité à flotter grâce à son champ magnétique. Métang utilise des attaques de type Acier et Psy pour calculer les trajectoires et analyser les environnements."
        },
        {
            "nom": "Métalosse",
            "description": "Métalosse est un Pokémon de type Acier/Psy. Évolué à partir de Métang, il a une puissance psychique et une résistance aux attaques mentales. Métalosse utilise des attaques de type Acier et Psy pour créer des champs de force et défendre ses alliés."
        },
        {
            "nom": "Regirock",
            "description": "Regirock est un Pokémon de type Roche. Il a un corps solide et une origine légendaire. Regirock utilise des attaques de type Roche pour créer des formations rocheuses et protéger les reliques antiques."
        },
        {
            "nom": "Regice",
            "description": "Regice est un Pokémon de type Glace. Il a une peau glacée et une capacité à contrôler la température. Regice utilise des attaques de type Glace pour geler l'air ambiant et créer des barrières de glace infranchissables."
        },
        {
            "nom": "Registeel",
            "description": "Registeel est un Pokémon de type Acier. Il a une structure métallique et une résistance hors du commun. Registeel utilise des attaques de type Acier pour renforcer sa carapace et repousser les attaques physiques."
        },
        {
            "nom": "Latias",
            "description": "Latias est un Pokémon de type Dragon/Psy. Elle a une agilité aérienne et une empathie profonde. Latias utilise des attaques de type Dragon et Psy pour lire les émotions des autres et défendre les zones sacrées."
        },
        {
            "nom": "Latios",
            "description": "Latios est un Pokémon de type Dragon/Psy. Il a une vitesse de vol impressionnante et une capacité à détecter les mouvements à distance. Latios utilise des attaques de type Dragon et Psy pour protéger son territoire et assurer la sécurité de son habitat."
        },
        {
            "nom": "Kyogre",
            "description": "Kyogre est un Pokémon de type Eau. Il a le pouvoir de contrôler les océans et les mers. Kyogre utilise des attaques de type Eau pour provoquer des tempêtes et maintenir l'équilibre des écosystèmes marins."
        },
        {
            "nom": "Groudon",
            "description": "Groudon est un Pokémon de type Sol. Il a le pouvoir de manipuler la terre et les roches. Groudon utilise des attaques de type Sol pour créer des tremblements de terre et remodeler les paysages selon sa volonté."
        },
        {
            "nom": "Rayquaza",
            "description": "Rayquaza est un Pokémon de type Dragon/Vol. Il a le pouvoir de voler à travers les cieux et de contrôler les tempêtes atmosphériques. Rayquaza utilise des attaques de type Dragon et Vol pour maintenir l'équilibre entre Kyogre et Groudon et protéger la paix sur Terre."
        },
        {
            "nom": "Jirachi",
            "description": "Jirachi est un Pokémon de type Acier/Psy. Il a le pouvoir d'exaucer les vœux de ceux qui le réveillent. Jirachi utilise des attaques de type Acier et Psy pour protéger ses rêves et apporter la chance à ceux qui croient en lui."
        },
        {
            "nom": "Deoxys",
            "description": "Deoxys est un Pokémon de type Psy. Il a la capacité de changer de forme pour s'adapter à son environnement. Deoxys utilise des attaques de type Psy pour manipuler l'espace-temps et défendre son territoire."
        },
        {
            "nom": "Tortipouss",
            "description": "Tortipouss est un Pokémon de type Plante. Il a une carapace protectrice et une capacité à se camoufler dans les buissons. Tortipouss utilise des attaques de type Plante pour absorber la lumière du soleil et se régénérer."
        },
        {
            "nom": "Boskara",
            "description": "Boskara est un Pokémon de type Plante. Évolué à partir de Tortipouss, il a un corps robuste et des feuilles tranchantes. Boskara utilise des attaques de type Plante pour se fondre dans les forêts denses et protéger ses petits."
        },
        {
            "nom": "Torterra",
            "description": "Torterra est un Pokémon de type Plante/Sol. Évolué à partir de Boskara, il a un dos montagneux et une forêt vivante sur son dos. Torterra utilise des attaques de type Plante et Sol pour créer des tremblements de terre et abattre ses ennemis."
        },
        {
            "nom": "Ouisticram",
            "description": "Ouisticram est un Pokémon de type Feu. Il a une queue enflammée et une énergie débordante. Ouisticram utilise des attaques de type Feu pour incinérer ses adversaires et réguler sa température corporelle."
        },
        {
            "nom": "Chimpenfeu",
            "description": "Chimpenfeu est un Pokémon de type Feu/Combat. Évolué à partir d'Ouisticram, il a des poings enflammés et une agilité exceptionnelle. Chimpenfeu utilise des attaques de type Feu et Combat pour maîtriser ses mouvements et défendre son territoire."
        },
        {
            "nom": "Simiabraz",
            "description": "Simiabraz est un Pokémon de type Feu/Combat. Évolué à partir de Chimpenfeu, il a une force brute et une maîtrise des arts martiaux. Simiabraz utilise des attaques de type Feu et Combat pour pulvériser des rochers et vaincre ses adversaires."
        },
        {
            "nom": "Tiplouf",
            "description": "Tiplouf est un Pokémon de type Eau. Il a une queue en forme de fouet et une capacité à nager à grande vitesse. Tiplouf utilise des attaques de type Eau pour explorer les océans et jouer avec les autres Pokémon aquatiques."
        },
        {
            "nom": "Prinplouf",
            "description": "Prinplouf est un Pokémon de type Eau. Évolué à partir de Tiplouf, il a une crête élégante et une grâce aquatique. Prinplouf utilise des attaques de type Eau pour danser sur l'eau et impressionner ses alliés."
        },
        {
            "nom": "Pingoléon",
            "description": "Pingoléon est un Pokémon de type Eau/Acier. Évolué à partir de Prinplouf, il a une armure métallique et une puissance de frappe redoutable. Pingoléon utilise des attaques de type Eau et Acier pour créer des tornades sous-marines et défendre les Pokémon marins."
        },
        {
            "nom": "Étourmi",
            "description": "Étourmi est un Pokémon de type Électrik/Vol. Il a une queue en forme de prise électrique et une capacité à générer des éclairs. Étourmi utilise des attaques de type Électrik et Vol pour survoler les villes et s'entraîner à contrôler sa puissance électrique."
        },
        {
            "nom": "Étourvol",
            "description": "Étourvol est un Pokémon de type Électrik/Vol. Évolué à partir d'Étourmi, il a des ailes renforcées et une vitesse de vol impressionnante. Étourvol utilise des attaques de type Électrik et Vol pour protéger son territoire et déjouer les pièges électriques."
        },
        {
            "nom": "Étouraptor",
            "description": "Étouraptor est un Pokémon de type Électrik/Vol. Évolué à partir d'Étourvol, il a des serres acérées et une agilité aérienne. Étouraptor utilise des attaques de type Électrik et Vol pour chasser ses proies et défendre son nid en hauteur."
        },
        {
            "nom": "Keunotor",
            "description": "Keunotor est un Pokémon de type Normal. Il a une tête en forme de balise et une capacité à rouler à grande vitesse. Keunotor utilise des attaques de type Normal pour parcourir de longues distances et repérer les sources de nourriture."
        },
        {
            "nom": "Castorno",
            "description": "Castorno est un Pokémon de type Normal/Eau. Évolué à partir de Keunotor, il a des incisives tranchantes et une queue plate pour nager. Castorno utilise des attaques de type Normal et Eau pour construire des barrages et maintenir l'équilibre écologique des rivières."
        },
        {
            "nom": "Crikzik",
            "description": "Crikzik est un Pokémon de type Insecte. Il a une capacité à striduler et une structure corporelle légère. Crikzik utilise des attaques de type Insecte pour communiquer avec ses congénères et se camoufler dans les herbes hautes."
        },
        {
            "nom": "Mélokrik",
            "description": "Mélokrik est un Pokémon de type Insecte/Sol. Évolué à partir de Crikzik, il a des pattes robustes et une capacité à créer des vibrations sonores. Mélokrik utilise des attaques de type Insecte et Sol pour creuser des galeries souterraines et protéger ses œufs."
        },
        {
            "nom": "Lixy",
            "description": "Lixy est un Pokémon de type Électrik. Il a une fourrure isolante et une queue étincelante. Lixy utilise des attaques de type Électrik pour se défendre des prédateurs et éclairer les chemins obscurs."
        },
        {
            "nom": "Luxio",
            "description": "Luxio est un Pokémon de type Électrik. Évolué à partir de Lixy, il a une crinière étincelante et une force physique impressionnante. Luxio utilise des attaques de type Électrik pour détecter les champs magnétiques et défendre son territoire."
        },
        {
            "nom": "Luxray",
            "description": "Luxray est un Pokémon de type Électrik. Évolué à partir de Luxio, il a des griffes acérées et une vision perçante. Luxray utilise des attaques de type Électrik pour traquer ses proies et maintenir l'ordre dans son environnement."
        },
        {
            "nom": "Rozbouton",
            "description": "Rozbouton est un Pokémon de type Plante. Il a une fleur en bourgeon et une capacité à absorber la lumière du soleil. Rozbouton utilise des attaques de type Plante pour éclore et libérer son parfum enivrant."
        },
        {
            "nom": "Roserade",
            "description": "Roserade est un Pokémon de type Plante/Poison. Évolué à partir de Rozbouton, il a des roses vénéneuses et une grâce éthérée. Roserade utilise des attaques de type Plante et Poison pour manipuler les toxines et contrôler ses adversaires."
        },
        {
            "nom": "Kranidos",
            "description": "Kranidos est un Pokémon de type Roche. Il a une tête massive et une force brute. Kranidos utilise des attaques de type Roche pour fracasser des rochers et marquer son territoire."
        },
        {
            "nom": "Charkos",
            "description": "Charkos est un Pokémon de type Roche. Évolué à partir de Kranidos, il a des cornes puissantes et une agilité surprenante. Charkos utilise des attaques de type Roche pour grimper sur les falaises et affronter ses ennemis."
        },
        {
            "nom": "Dinoclier",
            "description": "Dinoclier est un Pokémon de type Roche/Acier. Il a une carapace dure comme l'acier et une résistance hors pair. Dinoclier utilise des attaques de type Roche et Acier pour défendre son territoire des prédateurs."
        },
        {
            "nom": "Bastiodon",
            "description": "Bastiodon est un Pokémon de type Roche/Acier. Évolué à partir de Dinoclier, il a une tête en forme de bouclier et une défense incomparable. Bastiodon utilise des attaques de type Roche et Acier pour protéger son troupeau et affronter ses adversaires."
        },
        {
            "nom": "Cheniti",
            "description": "Cheniti est un Pokémon de type Insecte/Plante. Il a un corps couvert de feuilles et une capacité à se camoufler dans les buissons. Cheniti utilise des attaques de type Insecte et Plante pour collecter le nectar et se protéger des prédateurs."
        },
        {
            "nom": "Cheniselle",
            "description": "Cheniselle est un Pokémon de type Insecte/Plante. Évolué à partir de Cheniti, il a des ailes colorées et une grâce aérienne. Cheniselle utilise des attaques de type Insecte et Plante pour polliniser les fleurs et répandre la vie dans les jardins."
        },
        {
            "nom": "Papilord",
            "description": "Papilord est un Pokémon de type Insecte/Vol. Évolué à partir de Cheniselle, il a des ailes majestueuses et une élégance naturelle. Papilord utilise des attaques de type Insecte et Vol pour danser dans les airs et hypnotiser ses adversaires."
        },
        {
            "nom": "Apitrini",
            "description": "Apitrini est un Pokémon de type Insecte. Il a un corps rayé jaune et noir et une capacité à collecter le pollen. Apitrini utilise des attaques de type Insecte pour défendre sa ruche et chercher du nectar."
        },
        {
            "nom": "Apireine",
            "description": "Apireine est un Pokémon de type Insecte/Vol. Évolué à partir d'Apitrini, elle a des ailes gracieuses et une reine de la ruche. Apireine utilise des attaques de type Insecte et Vol pour protéger ses ouvrières et maintenir l'ordre dans la colonie."
        },
        {
            "nom": "Pachirisu",
            "description": "Pachirisu est un Pokémon de type Électrik. Il a des joues rouges et une queue en forme de foudre. Pachirisu utilise des attaques de type Électrik pour stocker de l'énergie et éclairer les nuits sombres."
        },
        {
            "nom": "Mustébouée",
            "description": "Mustébouée est un Pokémon de type Eau. Il a une bouée autour du cou et une capacité à flotter à la surface de l'eau. Mustébouée utilise des attaques de type Eau pour nager rapidement et échapper aux prédateurs marins."
        },
        {
            "nom": "Mustéflott",
            "description": "Mustéflott est un Pokémon de type Eau. Évolué à partir de Mustébouée, il a une élégance aquatique et une vitesse de nage impressionnante. Mustéflott utilise des attaques de type Eau pour protéger les bancs de poissons et maintenir l'harmonie dans les océans."
        },
        {
            "nom": "Ceribou",
            "description": "Ceribou est un Pokémon de type Plante. Il a une petite cerise sur la tête et une capacité à absorber la lumière du soleil. Ceribou utilise des attaques de type Plante pour éclore ses fleurs et enrichir les sols forestiers."
        },
        {
            "nom": "Ceriflor",
            "description": "Ceriflor est un Pokémon de type Plante. Évolué à partir de Ceribou, elle a des pétales colorés et une fragrance enivrante. Ceriflor utilise des attaques de type Plante pour attirer les insectes pollinisateurs et nourrir la faune locale."
        },
        {
            "nom": "Sancoki",
            "description": "Sancoki est un Pokémon de type Eau. Il a une coquille en forme d'étoile de mer et une capacité à se régénérer. Sancoki utilise des attaques de type Eau pour filtrer les nutriments de l'eau et survivre dans les environnements maritimes difficiles."
        },
        {
            "nom": "Tritosor",
            "description": "Tritosor est un Pokémon de type Eau. Évolué à partir de Sancoki, il a des tentacules puissants et une force sous-marine incroyable. Tritosor utilise des attaques de type Eau pour attraper ses proies et naviguer dans les courants océaniques."
        },
        {
            "nom": "Capidextre",
            "description": "Capidextre est un Pokémon de type Normal. Il a une queue flexible et une capacité à grimper aux arbres. Capidextre utilise des attaques de type Normal pour se balancer d'arbre en arbre et explorer les cimes forestières."
        },
        {
            "nom": "Baudrive",
            "description": "Baudrive est un Pokémon de type Spectre/Vol. Il a une forme de ballon fantomatique et une capacité à flotter silencieusement dans l'air. Baudrive utilise des attaques de type Spectre et Vol pour effrayer ses ennemis et se déplacer sans être détecté."
        },
        {
            "nom": "Grodrive",
            "description": "Grodrive est un Pokémon de type Spectre/Vol. Évolué à partir de Baudrive, il a une taille imposante et une aura sinistre. Grodrive utilise des attaques de type Spectre et Vol pour effrayer les intrus et défendre son territoire nocturne."
        },
        {
            "nom": "Laporeille",
            "description": "Laporeille est un Pokémon de type Normal. Il a des oreilles longues et une capacité à détecter les sons faibles. Laporeille utilise des attaques de type Normal pour communiquer avec ses congénères et rester vigilant face aux prédateurs."
        },
        {
            "nom": "Lockpin",
            "description": "Lockpin est un Pokémon de type Normal. Évolué à partir de Laporeille, il a des oreilles encore plus longues et une vigilance accrue. Lockpin utilise des attaques de type Normal pour écouter les conversations à distance et avertir ses alliés en cas de danger."
        },
        {
            "nom": "Magirêve",
            "description": "Magirêve est un Pokémon de type Spectre. Il a une forme spectrale et une capacité à manipuler les rêves. Magirêve utilise des attaques de type Spectre pour hanter les nuits de ses ennemis et plonger les rêveurs dans des cauchemars."
        },
        {
            "nom": "Corboss",
            "description": "Corboss est un Pokémon de type Ténèbres/Vol. Il a des ailes puissantes et une intelligence redoutable. Corboss utilise des attaques de type Ténèbres et Vol pour attaquer ses proies par surprise et défendre son territoire aérien."
        },
        {
            "nom": "Chaglam",
            "description": "Chaglam est un Pokémon de type Normal. Il a une fourrure douce et une capacité à se faufiler discrètement. Chaglam utilise des attaques de type Normal pour se fondre dans le paysage urbain et éviter les confrontations directes."
        },
        {
            "nom": "Chaffreux",
            "description": "Chaffreux est un Pokémon de type Normal. Évolué à partir de Chaglam, il a une silhouette plus imposante et une force physique accrue. Chaffreux utilise des attaques de type Normal pour protéger ses congénères et affronter les prédateurs."
        },
        {
            "nom": "Korillon",
            "description": "Korillon est un Pokémon de type Eau/Fée. Il a une forme de clochette et une voix mélodieuse. Korillon utilise des attaques de type Eau et Fée pour chanter des berceuses apaisantes et guérir les blessures de ses alliés."
        },
        {
            "nom": "Moufouette",
            "description": "Moufouette est un Pokémon de type Poison. Il a une queue en forme de boule puante et une capacité à libérer des gaz toxiques. Moufouette utilise des attaques de type Poison pour se défendre des prédateurs et marquer son territoire avec son odeur."
        },
        {
            "nom": "Moufflair",
            "description": "Moufflair est un Pokémon de type Poison/Ténèbres. Il a une apparence robuste et une odeur insidieuse qui lui permet de désorienter ses ennemis. Moufflair utilise des attaques de type Poison et Ténèbres pour défendre son territoire et neutraliser les menaces."
        },
        {
            "nom": "Archéomire",
            "description": "Archéomire est un Pokémon de type Acier. Il possède un corps solide et une grande résistance aux attaques physiques. Archéomire utilise son pouvoir pour manipuler les métaux et renforcer ses défenses."
        },
        {
            "nom": "Archéodong",
            "description": "Archéodong est un Pokémon de type Acier/Psy. Il est connu pour son intelligence supérieure et sa capacité à contrôler l'énergie psychique. Archéodong utilise des attaques de type Acier et Psy pour anticiper les actions de ses adversaires et défendre son territoire."
        },
        {
            "nom": "Manzaï",
            "description": "Manzaï est un Pokémon de type Plante. Il a une tête en forme de fruit et une capacité à lancer des baies sur ses ennemis. Manzaï utilise des attaques de type Plante pour cultiver des jardins luxuriants et nourrir la faune environnante."
        },
        {
            "nom": "Mime Jr.",
            "description": "Mime Jr. est un Pokémon de type Psy/Fée. Il imite les gestes des gens et des Pokémon autour de lui pour apprendre à se comporter. Mime Jr. utilise des attaques de type Psy pour perturber ses ennemis et des attaques de type Fée pour protéger ses alliés."
        },
        {
            "nom": "Ptiravi",
            "description": "Ptiravi est un Pokémon de type Normal. Il a une queue en forme de cœur et la capacité d'inspirer la joie chez ceux qui le rencontrent. Ptiravi utilise des attaques de type Normal pour apporter du réconfort et de l'espoir à ses amis."
        },
        {
            "nom": "Pijako",
            "description": "Pijako est un Pokémon de type Normal/Vol. Il a une silhouette élégante et la capacité de voler gracieusement dans le ciel. Pijako utilise des attaques de type Normal et Vol pour surveiller son territoire et chasser ses proies avec précision."
        },
        {
            "nom": "Spiritomb",
            "description": "Spiritomb est un Pokémon de type Spectre/Ténèbres. Il est formé à partir de 108 âmes tourmentées scellées dans une pierre. Spiritomb utilise des attaques de type Spectre et Ténèbres pour manipuler les esprits et repousser toute menace."
        },
        {
            "nom": "Griknot",
            "description": "Griknot est un Pokémon de type Dragon/Terre. Il a une peau rugueuse et une puissance physique impressionnante. Griknot utilise des attaques de type Dragon et Terre pour creuser des tunnels et défendre son territoire avec ferveur."
        },
        {
            "nom": "Carmache",
            "description": "Carmache est un Pokémon de type Dragon/Terre. Évolué à partir de Griknot, il a une carapace solide et des griffes acérées. Carmache utilise des attaques de type Dragon et Terre pour écraser ses ennemis et percer la défense de ses adversaires."
        },
        {
            "nom": "Carchacrok",
            "description": "Carchacrok est un Pokémon de type Dragon/Terre. Évolué à partir de Carmache, il a une mâchoire puissante et une agilité surprenante malgré sa taille. Carchacrok utilise des attaques de type Dragon et Terre pour dominer ses rivaux et marquer son territoire avec autorité."
        },
        {
            "nom": "Goinfrex",
            "description": "Goinfrex est un Pokémon de type Normal. Il a un appétit insatiable et la capacité de manger tout ce qui se trouve sur son chemin. Goinfrex utilise des attaques de type Normal pour chercher de la nourriture et renforcer ses muscles imposants."
        },
        {
            "nom": "Riolu",
            "description": "Riolu est un Pokémon de type Combat. Il a une aura mystique et la capacité de détecter les émotions des autres. Riolu utilise des attaques de type Combat pour s'entraîner sans relâche et protéger ses amis avec détermination."
        },
        {
            "nom": "Lucario",
            "description": "Lucario est un Pokémon de type Combat/Acier. Évolué à partir de Riolu, il possède une force intérieure et une maîtrise des arts martiaux. Lucario utilise des attaques de type Combat et Acier pour lire les auras et prévoir les mouvements de ses adversaires."
        },
        {
            "nom": "Hippopotas",
            "description": "Hippopotas est un Pokémon de type Sol. Il a une peau épaisse et la capacité de creuser des fosses dans le sable. Hippopotas utilise des attaques de type Sol pour protéger son territoire et créer des pièges pour capturer ses proies."
        },
        {
            "nom": "Hippodocus",
            "description": "Hippodocus est un Pokémon de type Sol. Évolué à partir de Hippopotas, il a une taille imposante et une force physique redoutable. Hippodocus utilise des attaques de type Sol pour créer des tremblements de terre et défendre son territoire avec détermination."
        },
        {
            "nom": "Rapion",
            "description": "Rapion est un Pokémon de type Poison/Insecte. Il a des pinces puissantes et un dard venimeux. Rapion utilise des attaques de type Poison et Insecte pour paralyser ses proies et se défendre contre les prédateurs."
        },
        {
            "nom": "Drascore",
            "description": "Drascore est un Pokémon de type Poison/Insecte. Évolué à partir de Rapion, il a des griffes acérées et une agilité féroce. Drascore utilise des attaques de type Poison et Insecte pour infliger des coups critiques et repousser les adversaires."
        },
        {
            "nom": "Cradopaud",
            "description": "Cradopaud est un Pokémon de type Poison/Combat. Il a une peau toxique et une capacité à se battre avec agilité. Cradopaud utilise des attaques de type Poison et Combat pour empoisonner ses adversaires et se protéger des attaques physiques."
        },
        {
            "nom": "Coatox",
            "description": "Coatox est un Pokémon de type Poison/Combat. Évolué à partir de Cradopaud, il a une intelligence supérieure et une capacité à manipuler les toxines. Coatox utilise des attaques de type Poison et Combat pour vaincre ses ennemis avec une précision mortelle."
        },
        {
            "nom": "Vortente",
            "description": "Vortente est un Pokémon de type Plante/Spectre. Il a des tentacules sinistres et la capacité de contrôler les esprits. Vortente utilise des attaques de type Plante et Spectre pour enserrer ses proies et absorber leur énergie vitale."
        },
        {
            "nom": "Écayon",
            "description": "Écayon est un Pokémon de type Sol/Roche. Il a une carapace solide et la capacité de se fondre dans le sable. Écayon utilise des attaques de type Sol et Roche pour créer des pièges et défendre son territoire avec détermination."
        },
        {
            "nom": "Luminéon",
            "description": "Luminéon est un Pokémon de type Eau. Il a une apparence élégante et la capacité de nager à grande vitesse. Luminéon utilise des attaques de type Eau pour éblouir ses ennemis et naviguer gracieusement dans les océans."
        },
        {
            "nom": "Babimanta",
            "description": "Babimanta est un Pokémon de type Eau/Vol. Il a une envergure impressionnante et la capacité de planer au-dessus des mers. Babimanta utilise des attaques de type Eau et Vol pour attraper des poissons en vol et éviter les prédateurs marins."
        },
        {
            "nom": "Blizzi",
            "description": "Blizzi est un Pokémon de type Glace. Il a un corps recouvert de glace et la capacité de manipuler les températures froides. Blizzi utilise des attaques de type Glace pour créer des bourrasques de neige et geler ses adversaires."
        },
        {
            "nom": "Blizzaroi",
            "description": "Blizzaroi est un Pokémon de type Glace. Évolué à partir de Blizzi, il a une taille imposante et la capacité de générer des blizzards dévastateurs. Blizzaroi utilise des attaques de type Glace pour transformer son environnement en un paysage gelé et hostile."
        },
        {
            "nom": "Dimoret",
            "description": "Dimoret est un Pokémon de type Ténèbres/Normal. Il a une allure élégante et la capacité de camoufler ses intentions. Dimoret utilise des attaques de type Ténèbres et Normal pour désorienter ses ennemis et frapper avec précision."
        },
        {
            "nom": "Magnézone",
            "description": "Magnézone est un Pokémon de type Électrik/Acier. Évolué à partir de Magnéton, il a un corps magnétique et la capacité de contrôler les champs électromagnétiques. Magnézone utilise des attaques de type Électrik et Acier pour manipuler l'énergie magnétique et défendre son territoire avec puissance."
        },
        {
            "nom": "Coudlangue",
            "description": "Coudlangue est un Pokémon de type Normal. Il a une langue extensible et la capacité de gober des objets plus grands que lui. Coudlangue utilise des attaques de type Normal pour attraper ses proies et s'accrocher aux surfaces avec sa langue collante."
        },
        {
            "nom": "Rhinastoc",
            "description": "Rhinastoc est un Pokémon de type Sol/Roche. Il a une armure épaisse et des cornes acérées. Rhinastoc utilise des attaques de type Sol et Roche pour charger ses adversaires et défendre son territoire contre toute menace."
        },
        {
            "nom": "Bouldeneu",
            "description": "Bouldeneu est un Pokémon de type Plante. Il a un corps massif et la capacité de cultiver des plantes autour de lui. Bouldeneu utilise des attaques de type Plante pour nourrir la faune locale et maintenir un écosystème équilibré."
        },
        {
            "nom": "Élekable",
            "description": "Élekable est un Pokémon de type Électrik. Il a des bras musclés chargés d'électricité et une force physique impressionnante. Élekable utilise des attaques de type Électrik pour créer des décharges puissantes et maintenir une charge électrique constante."
        },
        {
            "nom": "Maganon",
            "description": "Maganon est un Pokémon de type Feu. Il a un corps enflammé et la capacité de créer des températures extrêmement élevées. Maganon utilise des attaques de type Feu pour incinérer ses ennemis et manipuler les flammes à sa guise."
        },
        {
            "nom": "Togekiss",
            "description": "Togekiss est un Pokémon de type Fée/Vol. Évolué à partir de Togetic, il a des ailes majestueuses et la capacité d'apporter la chance à ceux qui croisent son chemin. Togekiss utilise des attaques de type Fée et Vol pour protéger les faibles et guider les voyageurs perdus."
        },
        {
            "nom": "Yanmega",
            "description": "Yanmega est un Pokémon de type Insecte/Vol. Il a des ailes puissantes et des yeux perçants. Yanmega utilise des attaques de type Insecte et Vol pour chasser ses proies avec précision et défendre son territoire contre les prédateurs aériens."
        },
        {
            "nom": "Phyllali",
            "description": "Phyllali est un Pokémon de type Plante. Évolué à partir d'Évoli avec une Pierre Plante, il a une élégance naturelle et la capacité de manipuler les plantes. Phyllali utilise des attaques de type Plante pour purifier l'air et guérir les blessures de la nature."
        },
        {
            "nom": "Givrali",
            "description": "Givrali est un Pokémon de type Glace. Évolué à partir d'Évoli avec une Pierre Glace, il a une fourrure épaisse et la capacité de contrôler la glace. Givrali utilise des attaques de type Glace pour créer des sculptures de glace et protéger ses alliés des températures extrêmes."
        },
        {
            "nom": "Scorvol",
            "description": "Scorvol est un Pokémon de type Insecte/Vol. Évolué à partir de Charmillon, il a des ailes colorées et une vitesse de vol impressionnante. Scorvol utilise des attaques de type Insecte et Vol pour défendre son territoire avec agilité et précision."
        },
        {
            "nom": "Mammochon",
            "description": "Mammochon est un Pokémon de type Glace/Sol. Évolué à partir de Marcacrin avec une Pierre Glace, il a une fourrure épaisse et la capacité de résister aux températures extrêmes. Mammochon utilise des attaques de type Glace et Sol pour creuser dans la glace et charger ses adversaires avec force."
        },
        {
            "nom": "Porygon-Z",
            "description": "Porygon-Z est un Pokémon de type Normal. Évolué à partir de Porygon2 avec un Virus Étrange, il a une intelligence artificielle améliorée et une capacité à calculer des probabilités complexes. Porygon-Z utilise des attaques de type Normal pour analyser son environnement et s'adapter aux situations changeantes."
        },
        {
            "nom": "Gallame",
            "description": "Gallame est un Pokémon de type Psy/Combat. Évolué à partir de Kirlia mâle avec une Pierre Aube, il a une lame psychique et une maîtrise des arts martiaux. Gallame utilise des attaques de type Psy et Combat pour protéger les faibles et défendre l'honneur de ses alliés."
        },
        {
            "nom": "Tarinorme",
            "description": "Tarinorme est un Pokémon de type Acier/Fée. Évolué à partir de Togepi avec une grande amitié, il a une armure brillante et la capacité de se téléporter. Tarinorme utilise des attaques de type Acier et Fée pour protéger ses amis et répandre la paix autour de lui."
        },
        {
            "nom": "Noctunoir",
            "description": "Noctunoir est un Pokémon de type Spectre. Évolué à partir de Noctunoir avec une grande amitié, il a une apparence fantomatique et la capacité de se fondre dans l'ombre. Noctunoir utilise des attaques de type Spectre pour effrayer ses ennemis et manipuler les ombres à volonté."
        },
        {
            "nom": "Momartik",
            "description": "Momartik est un Pokémon de type Glace/Spectre. Évolué à partir de Blizzi avec un Manteau Neige, il a une aura glaciale et la capacité de geler ses adversaires. Momartik utilise des attaques de type Glace et Spectre pour immobiliser ses ennemis et hanter les lieux hantés."
        },
        {
            "nom": "Motisma",
            "description": "Motisma est un Pokémon de type Électrik/Fantôme. Il a la capacité unique de posséder des appareils électroniques. Motisma utilise des attaques de type Électrik et Fantôme pour jouer des tours à ses ennemis et manipuler les machines à sa guise."
        },
        {
            "nom": "Créhelf",
            "description": "Créhelf est un Pokémon de type Psy. Il a une intelligence supérieure et la capacité de contrôler les ondes cérébrales. Créhelf utilise des attaques de type Psy pour guérir les esprits troublés et protéger ses alliés des attaques mentales."
        },
        {
            "nom": "Créfollet",
            "description": "Créfollet est un Pokémon de type Psy. Il a une agilité étonnante et la capacité de se déplacer à des vitesses incroyables. Créfollet utilise des attaques de type Psy pour prédire les mouvements de ses adversaires et esquiver les attaques avec grâce."
        },
        {
            "nom": "Créfadet",
            "description": "Créfadet est un Pokémon de type Psy. Il a une sagesse ancienne et la capacité de communiquer avec les esprits. Créfadet utilise des attaques de type Psy pour apaiser les conflits et ramener l'harmonie là où il y a la discorde."
        },
        {
            "nom": "Dialga",
            "description": "Dialga est un Pokémon de type Dragon/Acier. Il est considéré comme le maître du temps et a le pouvoir de contrôler les dimensions. Dialga utilise des attaques de type Dragon et Acier pour maintenir l'équilibre temporel et protéger l'univers contre les altérations."
        },
        {
            "nom": "Palkia",
            "description": "Palkia est un Pokémon de type Dragon/Eau. Il est considéré comme le maître de l'espace et a le pouvoir de contrôler les dimensions. Palkia utilise des attaques de type Dragon et Eau pour manipuler l'espace et défendre l'univers contre les altérations dimensionnelles."
        },
        {
            "nom": "Heatran",
            "description": "Heatran est un Pokémon de type Feu/Acier. Il vit dans des cavernes volcaniques et a une peau en métal. Heatran utilise des attaques de type Feu et Acier pour générer des flammes brûlantes et résister aux attaques physiques."
        },
        {
            "nom": "Regigigas",
            "description": "Regigigas est un Pokémon de type Normal. Il est considéré comme le maître des trois Regis et a une force physique surhumaine. Regigigas utilise des attaques de type Normal pour manipuler la terre et contrôler les forces naturelles."
        },
        {
            "nom": "Giratina",
            "description": "Giratina est un Pokémon de type Spectre/Dragon. Il est considéré comme le gardien du monde inversé, une dimension parallèle à la nôtre. Giratina utilise des attaques de type Spectre et Dragon pour invoquer des énergies sombres et maintenir l'équilibre entre les mondes."
        },
        {
            "nom": "Cresselia",
            "description": "Cresselia est un Pokémon de type Psy. Elle est connue pour répandre des rêves paisibles et guérir les cauchemars. Cresselia utilise des attaques de type Psy pour apaiser les esprits troublés et protéger ceux qui sont vulnérables."
        },
        {
            "nom": "Phione",
            "description": "Phione est un Pokémon de type Eau. Il est connu comme le Pokémon de l'amour et de la bonté. Phione utilise des attaques de type Eau pour guider les marins perdus et calmer les tempêtes en mer."
        },
        {
            "nom": "Manaphy",
            "description": "Manaphy est un Pokémon de type Eau. Il a le pouvoir de contrôler l'eau et de communiquer avec d'autres Pokémon marins. Manaphy utilise des attaques de type Eau pour naviguer gracieusement dans les océans et apaiser les vagues agitées."
        },
        {
            "nom": "Darkrai",
            "description": "Darkrai est un Pokémon de type Ténèbres. Il est connu pour ses pouvoirs de manipulation des cauchemars. Darkrai utilise des attaques de type Ténèbres pour plonger ses ennemis dans un sommeil profond et provoquer des hallucinations effrayantes."
        },
        {
            "nom": "Shaymin",
            "description": "Shaymin est un Pokémon de type Plante. Il a la capacité de fleurir et de guérir la terre stérile. Shaymin utilise des attaques de type Plante pour purifier l'air et faire pousser des fleurs là où il y a la désolation."
        },
        {
            "nom": "Arceus",
            "description": "Arceus est un Pokémon de type Normal. Il est considéré comme le créateur de l'univers Pokémon. Arceus utilise des attaques de type Normal pour maintenir l'équilibre du monde et surveiller l'harmonie entre tous les Pokémon."
        },
        {
            "nom": "Victini",
            "description": "Victini est un Pokémon de type Psy/Feu. Il est connu comme le Pokémon de la victoire et apporte de la chance à ceux qui le possèdent. Victini utilise des attaques de type Psy et Feu pour protéger ses alliés et infliger des dégâts puissants à ses ennemis."
        },
        {
            "nom": "Vipélierre",
            "description": "Vipélierre est un Pokémon de type Plante. Il a une vitesse impressionnante et la capacité de se camoufler dans la végétation. Vipélierre utilise des attaques de type Plante pour capturer ses proies et se défendre contre les prédateurs."
        },
        {
            "nom": "Lianaja",
            "description": "Lianaja est un Pokémon de type Plante. Évolué à partir de Vipélierre, il a des lianes robustes et la capacité de contrôler la croissance des plantes. Lianaja utilise des attaques de type Plante pour se fondre dans son environnement et piéger ses adversaires."
        },
        {
            "nom": "Majaspic",
            "description": "Majaspic est un Pokémon de type Plante. Évolué à partir de Lianaja, il a une sagesse ancienne et la capacité de guider les autres Pokémon de la forêt. Majaspic utilise des attaques de type Plante pour maintenir l'équilibre écologique et protéger la faune et la flore."
        },
        {
            "nom": "Gruikui",
            "description": "Gruikui est un Pokémon de type Feu. Il a une énergie débordante et la capacité de produire des flammes à partir de son corps. Gruikui utilise des attaques de type Feu pour se réchauffer par temps froid et marquer son territoire avec des marques de brûlure."
        },
        {
            "nom": "Grotichon",
            "description": "Grotichon est un Pokémon de type Feu. Évolué à partir de Gruikui, il a des flammes plus intenses et une endurance améliorée. Grotichon utilise des attaques de type Feu pour incinérer ses ennemis et résister aux températures extrêmes."
        },
        {
            "nom": "Roitiflam",
            "description": "Roitiflam est un Pokémon de type Feu/Combat. Évolué à partir de Grotichon avec une grande force, il a une crinière enflammée et la capacité de canaliser l'énergie du feu dans ses attaques. Roitiflam utilise des attaques de type Feu et Combat pour défendre son territoire avec puissance et agilité."
        },
        {
            "nom": "Moustillon",
            "description": "Moustillon est un Pokémon de type Eau. Il a une grande agilité dans l'eau et la capacité de nager contre les courants les plus forts. Moustillon utilise des attaques de type Eau pour chasser les poissons et jouer avec les vagues."
        },
        {
            "nom": "Mateloutre",
            "description": "Mateloutre est un Pokémon de type Eau. Évolué à partir de Moustillon, il a des moustaches sensorielles et une endurance accrue dans l'eau. Mateloutre utilise des attaques de type Eau pour naviguer dans les rivières tumultueuses et attraper ses proies avec précision."
        },
        {
            "nom": "Clamiral",
            "description": "Clamiral est un Pokémon de type Eau. Évolué à partir de Mateloutre avec une grande sagesse, il a une coquille robuste et la capacité de générer des vagues déferlantes. Clamiral utilise des attaques de type Eau pour protéger les habitats marins et guider les navires en mer."
        },
        {
            "nom": "Ratentif",
            "description": "Ratentif est un Pokémon de type Normal. Il a une vue perçante et la capacité de détecter les mouvements à distance. Ratentif utilise des attaques de type Normal pour patrouiller la nuit et signaler les intrus à son groupe."
        },
        {
            "nom": "Miradar",
            "description": "Miradar est un Pokémon de type Normal. Évolué à partir de Ratentif, il a des antennes sensibles et la capacité de surveiller une large zone. Miradar utilise des attaques de type Normal pour détecter les menaces cachées et alerter son groupe de tout danger."
        },
        {
            "nom": "Ponchiot",
            "description": "Ponchiot est un Pokémon de type Normal. Il a une grande loyauté envers son dresseur et la capacité de se battre avec détermination. Ponchiot utilise des attaques de type Normal pour protéger son territoire et apprendre de nouvelles techniques de combat."
        },
        {
            "nom": "Ponchien",
            "description": "Ponchien est un Pokémon de type Normal. Évolué à partir de Ponchiot avec une grande force, il a une volonté de fer et la capacité de défendre ses amis. Ponchien utilise des attaques de type Normal pour garder le contrôle et maintenir la discipline dans son groupe."
        },
        {
            "nom": "Mastouffe",
            "description": "Mastouffe est un Pokémon de type Normal/Combat. Évolué à partir de Ponchien avec une grande bravoure, il a une fourrure résistante et la capacité de renforcer ses muscles. Mastouffe utilise des attaques de type Normal et Combat pour protéger ses alliés avec force et courage."
        },
        {
            "nom": "Chacripan",
            "description": "Chacripan est un Pokémon de type Ténèbres. Il a une agilité remarquable et la capacité de se faufiler dans l'ombre. Chacripan utilise des attaques de type Ténèbres pour chasser silencieusement et surprendre ses proies sans faire de bruit."
        },
        {
            "nom": "Léopardus",
            "description": "Léopardus est un Pokémon de type Ténèbres. Évolué à partir de Chacripan avec une grande discrétion, il a des griffes acérées et la capacité de grimper aux arbres avec agilité. Léopardus utilise des attaques de type Ténèbres pour traquer ses ennemis et se fondre dans l'obscurité."
        },
        {
            "nom": "Feuillajou",
            "description": "Feuillajou est un Pokémon de type Plante. Il a une intelligence naturelle et la capacité de manipuler les feuilles. Feuillajou utilise des attaques de type Plante pour construire des abris et préparer des pièges pour ses prédateurs."
        },
        {
            "nom": "Feuiloutan",
            "description": "Feuiloutan est un Pokémon de type Plante. Évolué à partir de Feuillajou avec une grande détermination, il a des feuilles tranchantes et la capacité de contrôler les plantes environnantes. Feuiloutan utilise des attaques de type Plante pour protéger la forêt et guider les voyageurs égarés."
        },
        {
            "nom": "Flotajou",
            "description": "Flotajou est un Pokémon de type Eau. Il a une queue en forme d'hélice et la capacité de nager rapidement dans l'eau. Flotajou utilise des attaques de type Eau pour naviguer dans les rivières tumultueuses et rattraper ses proies avec précision."
        },
        {
            "nom": "Flotoutan",
            "description": "Flotoutan est un Pokémon de type Eau. Évolué à partir de Flotajou avec une grande agilité, il a des nageoires puissantes et la capacité de plonger en profondeur. Flotoutan utilise des attaques de type Eau pour explorer les océans et se frayer un chemin à travers les courants marins."
        },
        {
            "nom": "Munna",
            "description": "Munna est un Pokémon de type Psy. Il a la capacité de lire les rêves des autres Pokémon et de prédire l'avenir. Munna utilise des attaques de type Psy pour apaiser les esprits troublés et guider les rêveurs vers des visions plus claires."
        },
        {
            "nom": "Mushana",
            "description": "Mushana est un Pokémon de type Psy. Évolué à partir de Munna avec une grande sagesse, il a la capacité de manipuler les rêves et d'entrer dans l'esprit des autres. Mushana utilise des attaques de type Psy pour protéger ses alliés et explorer les rêves profonds."
        },
        {
            "nom": "Poichigeon",
            "description": "Poichigeon est un Pokémon de type Normal/Vol. Il a une vue perçante et la capacité de repérer les prédateurs de loin. Poichigeon utilise des attaques de type Normal et Vol pour voler haut dans le ciel et communiquer avec d'autres Pokémon."
        },
        {
            "nom": "Colombeau",
            "description": "Colombeau est un Pokémon de type Normal/Vol. Évolué à partir de Poichigeon avec une grande élégance, il a des plumes brillantes et la capacité de voler à des vitesses incroyables. Colombeau utilise des attaques de type Normal et Vol pour défendre son territoire avec grâce et agilité."
        },
        {
            "nom": "Déflaisan",
            "description": "Déflaisan est un Pokémon de type Normal/Vol. Évolué à partir de Colombeau avec une grande envergure, il a des ailes puissantes et la capacité de planer sur de longues distances. Déflaisan utilise des attaques de type Normal et Vol pour protéger ses petits et chasser avec précision."
        },
        {
            "nom": "Zébibron",
            "description": "Zébibron est un Pokémon de type Électrik. Il a une énergie électrique et la capacité de générer des éclairs puissants. Zébibron utilise des attaques de type Électrik pour charger son corps et paralyser ses ennemis avec des décharges électriques."
        },
        {
            "nom": "Zéblitz",
            "description": "Zéblitz est un Pokémon de type Électrik. Évolué à partir de Zébibron avec une grande force, il a des cornes acérées et la capacité de générer des champs électriques. Zéblitz utilise des attaques de type Électrik pour défendre son territoire et renforcer ses alliés avec des impulsions électriques."
        },
        {
            "nom": "Nodulithe",
            "description": "Nodulithe est un Pokémon de type Roche. Il a une carapace dure et la capacité de créer des cristaux de roche. Nodulithe utilise des attaques de type Roche pour creuser des tunnels et se protéger des prédateurs."
        },
        {
            "nom": "Géolithe",
            "description": "Géolithe est un Pokémon de type Roche. Évolué à partir de Nodulithe avec une grande résistance, il a des cristaux brillants et la capacité de briser des rochers avec sa force. Géolithe utilise des attaques de type Roche pour sculpter des sculptures et renforcer ses défenses."
        },
        {
            "nom": "Gigalithe",
            "description": "Gigalithe est un Pokémon de type Roche. Évolué à partir de Géolithe avec une grande puissance, il a une constitution solide et la capacité de créer des tremblements de terre. Gigalithe utilise des attaques de type Roche pour défendre son territoire et créer des montagnes avec ses pouvoirs."
        },
        {
            "nom": "Chovsourir",
            "description": "Chovsourir est un Pokémon de type Poison/Vol. Il a des ailes battantes et la capacité de se faufiler dans l'obscurité. Chovsourir utilise des attaques de type Poison et Vol pour chasser silencieusement la nuit et piéger ses proies avec son venin."
        },
        {
            "nom": "Rhinolove",
            "description": "Rhinolove est un Pokémon de type Poison/Vol. Évolué à partir de Chovsourir avec une grande discrétion, il a un venin mortel et la capacité de planer dans les airs sans être détecté. Rhinolove utilise des attaques de type Poison et Vol pour traquer ses ennemis et se nourrir de leurs énergies."
        },
        {
            "nom": "Rototaupe",
            "description": "Rototaupe est un Pokémon de type Sol. Il a des griffes acérées et la capacité de creuser des tunnels souterrains. Rototaupe utilise des attaques de type Sol pour construire des terriers et se protéger des prédateurs."
        },
        {
            "nom": "Minotaupe",
            "description": "Minotaupe est un Pokémon de type Sol. Évolué à partir de Rototaupe avec une grande agilité, il a une force impressionnante et la capacité de creuser à travers les roches solides. Minotaupe utilise des attaques de type Sol pour sculpter des cavernes et défendre son territoire."
        },
        {
            "nom": "Nanméouïe",
            "description": "Nanméouïe est un Pokémon de type Normal. Il a des yeux perçants et la capacité de suivre les mouvements rapides. Nanméouïe utilise des attaques de type Normal pour patrouiller dans l'obscurité et défendre son territoire contre les intrus."
        },
        {
            "nom": "Charpenti",
            "description": "Charpenti est un Pokémon de type Normal. Évolué à partir de Nanméouïe avec une grande force, il a des bras musclés et la capacité de soulever des objets lourds. Charpenti utilise des attaques de type Normal pour construire des structures et réparer les dégâts."
        },
        {
            "nom": "Ouvrifier",
            "description": "Ouvrifier est un Pokémon de type Normal/Combat. Évolué à partir de Charpenti avec une grande endurance, il a une ceinture de fer et la capacité de travailler sans relâche. Ouvrifier utilise des attaques de type Normal et Combat pour forger des outils et protéger ses camarades."
        },
        {
            "nom": "Bétochef",
            "description": "Bétochef est un Pokémon de type Roche. Il a une grande force et la capacité de soulever des rochers. Bétochef utilise des attaques de type Roche pour construire des abris et se défendre contre les prédateurs."
        },
        {
            "nom": "Tritonde",
            "description": "Tritonde est un Pokémon de type Eau. Il a une queue en forme de fouet et la capacité de nager dans les océans profonds. Tritonde utilise des attaques de type Eau pour chasser les poissons et éloigner les prédateurs."
        },
        {
            "nom": "Batracné",
            "description": "Batracné est un Pokémon de type Eau. Évolué à partir de Tritonde avec une grande agilité, il a des nageoires tranchantes et la capacité de générer des courants sous-marins. Batracné utilise des attaques de type Eau pour naviguer dans les mers tumultueuses et attraper ses proies avec précision."
        },
        {
            "nom": "Crapustule",
            "description": "Crapustule est un Pokémon de type Eau/Sol. Évolué à partir de Batracné avec une grande robustesse, il a une peau épaisse et la capacité de se camoufler dans la boue. Crapustule utilise des attaques de type Eau et Sol pour défendre son territoire et piéger ses ennemis dans des pièges boueux."
        },
        {
            "nom": "Judokrak",
            "description": "Judokrak est un Pokémon de type Combat. Il a une grande agilité et la capacité de maîtriser les techniques de combat. Judokrak utilise des attaques de type Combat pour esquiver les attaques ennemies et infliger des dégâts avec précision."
        },
        {
            "nom": "Karaclée",
            "description": "Karaclée est un Pokémon de type Combat. Évolué à partir de Judokrak avec une grande force, il a des poings puissants et la capacité de briser des roches avec ses poings. Karaclée utilise des attaques de type Combat pour défendre son territoire et protéger ses alliés avec ses mouvements rapides."
        },
        {
            "nom": "Larveyette",
            "description": "Larveyette est un Pokémon de type Insecte. Il a une carapace résistante et la capacité de grimper aux arbres avec agilité. Larveyette utilise des attaques de type Insecte pour collecter le nectar des fleurs et défendre son territoire contre les prédateurs."
        },
        {
            "nom": "Couverdure",
            "description": "Couverdure est un Pokémon de type Insecte/Plante. Évolué à partir de Larveyette avec une grande grâce, il a des ailes délicates et la capacité de disperser des spores de pollen. Couverdure utilise des attaques de type Insecte et Plante pour polliniser les fleurs et défendre son habitat naturel."
        },
        {
            "nom": "Manternel",
            "description": "Manternel est un Pokémon de type Insecte/Plante. Évolué à partir de Couverdure avec une grande beauté, il a des pétales colorés et la capacité de guérir les blessures avec ses baies. Manternel utilise des attaques de type Insecte et Plante pour protéger les jardins et favoriser la croissance des plantes."
        },
        {
            "nom": "Venipatte",
            "description": "Venipatte est un Pokémon de type Insecte/Poison. Il a des pattes agiles et la capacité de grimper aux murs. Venipatte utilise des attaques de type Insecte et Poison pour chasser silencieusement et paralyser ses proies avec son venin."
        },
        {
            "nom": "Scobolide",
            "description": "Scobolide est un Pokémon de type Insecte/Poison. Évolué à partir de Venipatte avec une grande discrétion, il a des épines toxiques et la capacité de se camoufler dans l'ombre. Scobolide utilise des attaques de type Insecte et Poison pour traquer ses ennemis et défendre son territoire contre les intrus."
        },
        {
            "nom": "Brutapode",
            "description": "Brutapode est un Pokémon de type Insecte/Poison. Évolué à partir de Scobolide avec une grande résistance, il a un venin mortel et la capacité de se faufiler dans l'obscurité. Brutapode utilise des attaques de type Insecte et Poison pour paralyser ses ennemis et infliger des dégâts avec précision."
        },
        {
            "nom": "Doudouvet",
            "description": "Doudouvet est un Pokémon de type Plante/Vol. Il a une légèreté impressionnante et la capacité de flotter sur le vent. Doudouvet utilise des attaques de type Plante et Vol pour polliniser les fleurs et se nourrir du nectar."
        },
        {
            "nom": "Farfaduvet",
            "description": "Farfaduvet est un Pokémon de type Plante/Vol. Évolué à partir de Doudouvet avec une grande beauté, il a des ailes colorées et la capacité de disperser des spores de pollen. Farfaduvet utilise des attaques de type Plante et Vol pour fertiliser les terres et favoriser la croissance des plantes."
        },
        {
            "nom": "Chlorobule",
            "description": "Chlorobule est un Pokémon de type Plante. Il a une tige flexible et la capacité de produire des baies nutritives. Chlorobule utilise des attaques de type Plante pour absorber la lumière du soleil et renforcer ses pouvoirs naturels."
        },
        {
            "nom": "Fragilady",
            "description": "Fragilady est un Pokémon de type Plante/Fée. Évolué à partir de Chlorobule avec une grande grâce, il a des pétales délicats et la capacité de guérir les blessures avec ses baies. Fragilady utilise des attaques de type Plante et Fée pour protéger les forêts et apaiser les cœurs troublés."
        },
        {
            "nom": "Bargantua",
            "description": "Bargantua est un Pokémon de type Eau/Ténèbres. Il a une grande taille et la capacité de créer des tourbillons sous-marins. Bargantua utilise des attaques de type Eau et Ténèbres pour chasser les proies dans les profondeurs marines et se camoufler dans l'obscurité."
        },
        {
            "nom": "Mascaïman",
            "description": "Mascaïman est un Pokémon de type Eau/Ténèbres. Évolué à partir de Bargantua avec une grande agilité, il a des crocs acérés et la capacité de nager silencieusement. Mascaïman utilise des attaques de type Eau et Ténèbres pour traquer ses proies et les attaquer par surprise."
        },
        {
            "nom": "Escroco",
            "description": "Escroco est un Pokémon de type Eau/Ténèbres. Évolué à partir de Mascaïman avec une grande ruse, il a des écailles solides et la capacité de se camoufler dans les marécages. Escroco utilise des attaques de type Eau et Ténèbres pour piéger ses ennemis et les attraper dans ses mâchoires puissantes."
        },
        {
            "nom": "Crocorible",
            "description": "Crocorible est un Pokémon de type Eau/Ténèbres. Évolué à partir d'Escroco avec une grande force, il a une morsure féroce et la capacité de terrifier ses adversaires. Crocorible utilise des attaques de type Eau et Ténèbres pour défendre son territoire et chasser avec agressivité."
        },
        {
            "nom": "Darumarond",
            "description": "Darumarond est un Pokémon de type Feu. Il a une fourrure épaisse et la capacité de résister aux climats froids. Darumarond utilise des attaques de type Feu pour créer des boules de feu et se réchauffer dans des grottes volcaniques."
        },
        {
            "nom": "Darumacho",
            "description": "Darumacho est un Pokémon de type Feu. Évolué à partir de Darumarond avec une grande endurance, il a un corps musclé et la capacité de résister à des températures extrêmes. Darumacho utilise des attaques de type Feu pour défendre son territoire et brûler ses ennemis avec des flammes intenses."
        },
        {
            "nom": "Maracachi",
            "description": "Maracachi est un Pokémon de type Plante. Il a des maracas et la capacité de produire des mélodies apaisantes. Maracachi utilise des attaques de type Plante pour contrôler le rythme et influencer les émotions des autres Pokémon."
        },
        {
            "nom": "Crabicoque",
            "description": "Crabicoque est un Pokémon de type Plante. Évolué à partir de Maracachi avec une grande agilité, il a des pinces puissantes et la capacité de casser des coquillages. Crabicoque utilise des attaques de type Plante pour se camoufler sur le sable et attraper ses proies avec ses pinces."
        },
        {
            "nom": "Crabaraque",
            "description": "Crabaraque est un Pokémon de type Plante. Évolué à partir de Crabicoque avec une grande défense, il a une coque dure et la capacité de résister aux attaques. Crabaraque utilise des attaques de type Plante pour défendre son territoire et repousser les prédateurs avec ses pinces acérées."
        },
        {
            "nom": "Baggiguane",
            "description": "Baggiguane est un Pokémon de type Normal. Il a des crocs pointus et la capacité de suivre les pistes avec précision. Baggiguane utilise des attaques de type Normal pour chasser et défendre son territoire contre les intrus."
        },
        {
            "nom": "Baggaïd",
            "description": "Baggaïd est un Pokémon de type Normal. Évolué à partir de Baggiguane avec une grande ruse, il a une fourrure dense et la capacité de se fondre dans l'environnement. Baggaïd utilise des attaques de type Normal pour traquer ses proies et les piéger avec ses crocs acérés."
        },
        {
            "nom": "Cryptéro",
            "description": "Cryptéro est un Pokémon de type Vol. Il a des ailes larges et la capacité de voler à des altitudes élevées. Cryptéro utilise des attaques de type Vol pour survoler les paysages et repérer les proies depuis le ciel."
        },
        {
            "nom": "Tutafeh",
            "description": "Tutafeh est un Pokémon de type Spectre. Il a une apparence ancienne et la capacité de se fondre dans les ombres. Tutafeh utilise des attaques de type Spectre pour effrayer les intrus et protéger les lieux sacrés."
        },
        {
            "nom": "Tutankafer",
            "description": "Tutankafer est un Pokémon de type Spectre. Évolué à partir de Tutafeh avec une grande majesté, il a une armure ancienne et la capacité de maudire ses ennemis. Tutankafer utilise des attaques de type Spectre pour défendre les trésors anciens et effrayer les profanateurs."
        },
        {
            "nom": "Carapagos",
            "description": "Carapagos est un Pokémon de type Roche/Eau. Il a une carapace dure et la capacité de nager rapidement. Carapagos utilise des attaques de type Roche et Eau pour se protéger des prédateurs et naviguer dans les océans profonds."
        },
        {
            "nom": "Mégapagos",
            "description": "Mégapagos est un Pokémon de type Roche/Eau. Évolué à partir de Carapagos avec une grande robustesse, il a des défenses renforcées et la capacité de résister aux attaques les plus puissantes. Mégapagos utilise des attaques de type Roche et Eau pour défendre son territoire et explorer les fonds marins."
        },
        {
            "nom": "Arkéapti",
            "description": "Arkéapti est un Pokémon de type Roche/Vol. Il a des ailes fragiles et la capacité de planer dans les courants d'air. Arkéapti utilise des attaques de type Roche et Vol pour se protéger des prédateurs et explorer les falaises escarpées."
        },
        {
            "nom": "Aéroptéryx",
            "description": "Aéroptéryx est un Pokémon de type Roche/Vol. Évolué à partir d'Arkéapti avec une grande puissance, il a des serres acérées et la capacité de plonger en piqué. Aéroptéryx utilise des attaques de type Roche et Vol pour attaquer ses proies avec précision et dominer les cieux."
        },
        {
            "nom": "Miamiasme",
            "description": "Miamiasme est un Pokémon de type Poison. Il a un corps gazeux et la capacité de créer des nuages toxiques. Miamiasme utilise des attaques de type Poison pour empoisonner ses ennemis et se fondre dans les environnements pollués."
        },
        {
            "nom": "Miasmax",
            "description": "Miasmax est un Pokémon de type Poison. Évolué à partir de Miamiasme avec une grande toxicité, il a des tentacules vénéneux et la capacité de paralyser ses proies. Miasmax utilise des attaques de type Poison pour défendre son territoire et contaminer les airs avec ses émanations toxiques."
        },
        {
            "nom": "Zorua",
            "description": "Zorua est un Pokémon de type Ténèbres. Il a une grande agilité et la capacité de se transformer en d'autres Pokémon. Zorua utilise des attaques de type Ténèbres pour tromper ses ennemis et se fondre dans l'ombre."
        }.,
        {
            "nom": "Zoroark",
            "description": "Zoroark est un Pokémon de type Ténèbres. Évolué à partir de Zorua avec une grande ruse, il a la capacité de créer des illusions réalistes. Zoroark utilise des attaques de type Ténèbres pour désorienter ses ennemis et les attaquer avec force."
        },
        {
            "nom": "Chinchidou",
            "description": "Chinchidou est un Pokémon de type Normal. Il a une fourrure douce et la capacité de grimper aux arbres. Chinchidou utilise des attaques de type Normal pour se défendre et jouer avec ses compagnons."
        },
        {
            "nom": "Pashmilla",
            "description": "Pashmilla est un Pokémon de type Normal. Évolué à partir de Chinchidou avec une fourrure soyeuse, il a une élégance naturelle et la capacité de repérer les dangers. Pashmilla utilise des attaques de type Normal pour se préserver des prédateurs et se détendre dans les hauteurs."
        },
        {
            "nom": "Scrutella",
            "description": "Scrutella est un Pokémon de type Psy. Il a une petite taille et la capacité de ressentir les émotions des autres. Scrutella utilise des attaques de type Psy pour lire les pensées et protéger ses alliés."
        },
        {
            "nom": "Mesmérella",
            "description": "Mesmérella est un Pokémon de type Psy. Évolué à partir de Scrutella avec une grande sensibilité, il a des pouvoirs télépathiques et la capacité de manipuler les émotions. Mesmérella utilise des attaques de type Psy pour calmer les esprits agités et guider ses amis."
        },
        {
            "nom": "Sidérella",
            "description": "Sidérella est un Pokémon de type Psy. Évolué à partir de Mesmérella avec une grande sagesse, il a une aura mystique et la capacité de prédire l'avenir. Sidérella utilise des attaques de type Psy pour protéger les secrets et éclairer les chemins obscurs."
        },
        {
            "nom": "Nucléos",
            "description": "Nucléos est un Pokémon de type Psy. Il a une intelligence hors du commun et la capacité de résoudre des énigmes complexes. Nucléos utilise des attaques de type Psy pour analyser son environnement et prévoir les mouvements de ses adversaires."
        },
        {
            "nom": "Méios",
            "description": "Méios est un Pokémon de type Psy. Évolué à partir de Nucléos avec une grande concentration, il a une énergie spirituelle et la capacité de se connecter avec l'univers. Méios utilise des attaques de type Psy pour canaliser son pouvoir et transcender les limites de la réalité."
        },
        {
            "nom": "Symbios",
            "description": "Symbios est un Pokémon de type Psy. Évolué à partir de Méios avec une grande harmonie, il a une aura bienveillante et la capacité de guérir les blessures mentales. Symbios utilise des attaques de type Psy pour apaiser les conflits et restaurer l'équilibre dans le monde."
        },
        {
            "nom": "Couaneton",
            "description": "Couaneton est un Pokémon de type Eau/Vol. Il a un plumage soyeux et la capacité de nager gracieusement. Couaneton utilise des attaques de type Eau et Vol pour pêcher dans les lacs et voler dans les cieux avec élégance."
        },
        {
            "nom": "Lakmécygne",
            "description": "Lakmécygne est un Pokémon de type Eau/Vol. Évolué à partir de Couaneton avec une grande majesté, il a des plumes brillantes et la capacité de chanter des mélodies envoûtantes. Lakmécygne utilise des attaques de type Eau et Vol pour protéger son territoire aquatique et inspirer les autres Pokémon avec sa beauté."
        },
        {
            "nom": "Sorbébé",
            "description": "Sorbébé est un Pokémon de type Glace. Il a une petite taille et la capacité de créer des flocons de neige. Sorbébé utilise des attaques de type Glace pour former des cristaux de glace et se protéger du froid."
        },
        {
            "nom": "Sorboul",
            "description": "Sorboul est un Pokémon de type Glace. Évolué à partir de Sorbébé avec une grande résistance, il a une fourrure épaisse et la capacité de se fondre dans les tempêtes de neige. Sorboul utilise des attaques de type Glace pour manipuler la glace et créer des tempêtes glacées."
        },
        {
            "nom": "Sorbouboul",
            "description": "Sorbouboul est un Pokémon de type Glace. Évolué à partir de Sorboul avec une grande puissance, il a des crocs acérés et la capacité de terrifier ses ennemis. Sorbouboul utilise des attaques de type Glace pour défendre son territoire et congeler ses adversaires avec des rafales de vent glacial."
        },
        {
            "nom": "Vivaldaim",
            "description": "Vivaldaim est un Pokémon de type Normal. Il a des bois élégants et la capacité de changer de forme selon les saisons. Vivaldaim utilise des attaques de type Normal pour se camoufler dans les forêts et vivre en harmonie avec la nature."
        },
        {
            "nom": "Haydaim",
            "description": "Haydaim est un Pokémon de type Normal. Évolué à partir de Vivaldaim avec une grande grâce, il a des bois majestueux et la capacité de commander les éléments naturels. Haydaim utilise des attaques de type Normal pour protéger les forêts et guider les autres Pokémon à travers les saisons."
        },
        {
            "nom": "Emolga",
            "description": "Emolga est un Pokémon de type Électrik/Vol. Il a des membranes entre ses membres qui lui permettent de planer. Emolga utilise des attaques de type Électrik et Vol pour se déplacer rapidement et paralyser ses adversaires."
        },
        {
            "nom": "Carabing",
            "description": "Carabing est un Pokémon de type Insecte/Acier. Il a un corps robuste et la capacité de tirer des rayons lasers. Carabing utilise des attaques de type Insecte et Acier pour défendre son territoire et découper les obstacles."
        },
        {
            "nom": "Lançargot",
            "description": "Lançargot est un Pokémon de type Insecte/Acier. Évolué à partir de Carabing avec une grande puissance, il a des canons à rayons et la capacité de perforer le métal. Lançargot utilise des attaques de type Insecte et Acier pour attaquer ses ennemis avec précision et défendre son territoire."
        },
        {
            "nom": "Trompignon",
            "description": "Trompignon est un Pokémon de type Plante. Il a un chapeau en forme de champignon et la capacité de libérer des spores toxiques. Trompignon utilise des attaques de type Plante pour parasiter les autres Pokémon et absorber leur énergie."
        },
        {
            "nom": "Gaulet",
            "description": "Gaulet est un Pokémon de type Plante/Combat. Évolué à partir de Trompignon avec une grande agilité, il a des poings redoutables et la capacité de se battre avec force. Gaulet utilise des attaques de type Plante et Combat pour protéger les forêts et entraîner sa force."
        },
        {
            "nom": "Viskuse",
            "description": "Viskuse est un Pokémon de type Poison. Il a un corps visqueux et la capacité de sécréter des toxines. Viskuse utilise des attaques de type Poison pour piéger ses ennemis et les affaiblir avec son venin corrosif."
        },
        {
            "nom": "Moyade",
            "description": "Moyade est un Pokémon de type Poison. Évolué à partir de Viskuse avec une grande toxicité, il a des tentacules vénéneux et la capacité de paralyser ses proies. Moyade utilise des attaques de type Poison pour défendre son territoire et neutraliser les menaces avec son venin mortel."
        },
        {
            "nom": "Mamanbo",
            "description": "Mamanbo est un Pokémon de type Eau. Il a une peau lisse et la capacité de nager gracieusement. Mamanbo utilise des attaques de type Eau pour danser dans les vagues et apaiser les esprits avec ses mouvements gracieux."
        },
        {
            "nom": "Statitik",
            "description": "Statitik est un Pokémon de type Insecte/Électrik. Il a une petite taille et la capacité de générer des charges électriques. Statitik utilise des attaques de type Insecte et Électrik pour électrocuter ses ennemis et se défendre avec ses crochets."
        },
        {
            "nom": "Mygavolt",
            "description": "Mygavolt est un Pokémon de type Insecte/Électrik. Évolué à partir de Statitik avec une grande puissance, il a des ailes énergétiques et la capacité de générer des champs magnétiques. Mygavolt utilise des attaques de type Insecte et Électrik pour piéger ses ennemis et les attaquer avec des décharges électriques."
        },
        {
            "nom": "Grindur",
            "description": "Grindur est un Pokémon de type Acier. Il a un corps cylindrique et la capacité de s'accrocher aux parois métalliques. Grindur utilise des attaques de type Acier pour se camoufler dans les usines abandonnées et se défendre contre les intrus."
        },
        {
            "nom": "Noacier",
            "description": "Noacier est un Pokémon de type Acier. Évolué à partir de Grindur avec une grande défense, il a une armure impénétrable et la capacité de repousser les attaques. Noacier utilise des attaques de type Acier pour protéger son territoire et frapper ses ennemis avec une force implacable."
        },
        {
            "nom": "Tic",
            "description": "Tic est un Pokémon de type Insecte. Il a une petite taille et la capacité de creuser des tunnels. Tic utilise des attaques de type Insecte pour creuser des galeries et chercher de la nourriture sous terre."
        },
        {
            "nom": "Clic",
            "description": "Clic est un Pokémon de type Insecte. Évolué à partir de Tic avec une grande vitesse, il a des pinces tranchantes et la capacité de couper à travers le bois. Clic utilise des attaques de type Insecte pour défendre son territoire et découper les obstacles avec précision."
        },
        {
            "nom": "Cliticlic",
            "description": "Cliticlic est un Pokémon de type Insecte. Évolué à partir de Clic avec une grande force, il a des mandibules puissantes et la capacité de broyer des rochers. Cliticlic utilise des attaques de type Insecte pour démolir les structures et se défendre contre les prédateurs."
        },
        {
            "nom": "Anchwatt",
            "description": "Anchwatt est un Pokémon de type Électrik. Il a une petite taille et la capacité de stocker de l'énergie. Anchwatt utilise des attaques de type Électrik pour charger ses adversaires et défendre son territoire avec des décharges électriques."
        },
        {
            "nom": "Lampéroie",
            "description": "Lampéroie est un Pokémon de type Électrik. Évolué à partir d'Anchwatt avec une grande endurance, il a des crochets électriques et la capacité de générer des champs magnétiques. Lampéroie utilise des attaques de type Électrik pour électrifier ses ennemis et se défendre contre les intrus."
        },
        {
            "nom": "Ohmassacre",
            "description": "Ohmassacre est un Pokémon de type Poison/Ténèbres. Il a une silhouette menaçante et la capacité de se faufiler dans l'ombre. Ohmassacre utilise des attaques de type Poison et Ténèbres pour empoisonner ses ennemis et les attaquer par surprise."
        },
        {
            "nom": "Lewsor",
            "description": "Lewsor est un Pokémon de type Spectre. Il a une allure mystérieuse et la capacité de manipuler les esprits. Lewsor utilise des attaques de type Spectre pour effrayer les intrus et protéger les lieux hantés."
        },
        {
            "nom": "Neitram",
            "description": "Neitram est un Pokémon de type Spectre. Évolué à partir de Lewsor avec une grande puissance, il a une aura effrayante et la capacité de condamner ses ennemis. Neitram utilise des attaques de type Spectre pour piéger les âmes errantes et punir les profanateurs."
        },
        {
            "nom": "Funécire",
            "description": "Funécire est un Pokémon de type Spectre/Feu. Il a une flamme éternelle et la capacité de consumer l'énergie vitale. Funécire utilise des attaques de type Spectre et Feu pour hanter les lieux abandonnés et effrayer les intrus."
        },
        {
            "nom": "Mélancolux",
            "description": "Mélancolux est un Pokémon de type Spectre/Feu. Évolué à partir de Funécire avec une grande intensité, il a une aura brûlante et la capacité de transformer en cendres. Mélancolux utilise des attaques de type Spectre et Feu pour se venger des injustices et protéger les esprits perdus."
        },
        {
            "nom": "Lugulabre",
            "description": "Lugulabre est un Pokémon de type Spectre/Feu. Évolué à partir de Mélancolux avec une grande malice, il a des flammes violettes et la capacité de provoquer des hallucinations terrifiantes. Lugulabre utilise des attaques de type Spectre et Feu pour hanter les esprits et consumer ses ennemis avec des flammes impitoyables."
        },
        {
            "nom": "Coupenotte",
            "description": "Coupenotte est un Pokémon de type Dragon. Il a une petite taille et la capacité de mordre à travers le métal. Coupenotte utilise des attaques de type Dragon pour affûter ses crocs et défendre son territoire avec détermination."
        },
        {
            "nom": "Incisache",
            "description": "Incisache est un Pokémon de type Dragon/Acier. Évolué à partir de Coupenotte avec une grande force, il a des griffes tranchantes et la capacité de percer l'acier. Incisache utilise des attaques de type Dragon et Acier pour déchiqueter ses ennemis et protéger son territoire avec une défense impénétrable."
        },
        {
            "nom": "Tranchodon",
            "description": "Tranchodon est un Pokémon de type Dragon/Acier. Évolué à partir d'Incisache avec une grande férocité, il a des crocs acérés et la capacité de briser les rochers. Tranchodon utilise des attaques de type Dragon et Acier pour défendre son territoire et attaquer ses ennemis avec une force implacable."
        },
        {
            "nom": "Polarhume",
            "description": "Polarhume est un Pokémon de type Glace. Il a une fourrure épaisse et la capacité de résister aux températures extrêmes. Polarhume utilise des attaques de type Glace pour chasser dans les toundras et protéger sa famille avec ses crocs gelés."
        },
        {
            "nom": "Polagriffe",
            "description": "Polagriffe est un Pokémon de type Glace. Évolué à partir de Polarhume avec une grande résistance, il a des griffes acérées et la capacité de courir sur la glace. Polagriffe utilise des attaques de type Glace pour traquer ses proies et défendre son territoire avec une force glaciale."
        },
        {
            "nom": "Hexagel",
            "description": "Hexagel est un Pokémon de type Glace. Évolué à partir de Polagriffe avec une grande puissance, il a un corps solide et la capacité de manipuler la glace. Hexagel utilise des attaques de type Glace pour créer des tempêtes de neige et congeler ses ennemis avec une précision mortelle."
        },
        {
            "nom": "Escargaume",
            "description": "Escargaume est un Pokémon de type Eau. Il a une coquille dure et la capacité de ramper sur le sol. Escargaume utilise des attaques de type Eau pour se protéger des prédateurs et explorer les fonds marins à la recherche de nourriture."
        },
        {
            "nom": "Limaspeed",
            "description": "Limaspeed est un Pokémon de type Eau. Évolué à partir d'Escargaume avec une grande vitesse, il a un corps fuselé et la capacité de nager à grande vitesse. Limaspeed utilise des attaques de type Eau pour capturer ses proies et échapper aux prédateurs avec agilité."
        },
        {
            "nom": "Limonde",
            "description": "Limonde est un Pokémon de type Eau/Électrik. Évolué à partir de Limaspeed avec une grande agilité, il a des écailles lumineuses et la capacité de générer des décharges électriques. Limonde utilise des attaques de type Eau et Électrik pour chasser ses proies et paralyser ses ennemis avec des attaques électriques."
        },
        {
            "nom": "Kungfouine",
            "description": "Kungfouine est un Pokémon de type Ténèbres/Combat. Il a une attitude combative et la capacité de se battre avec grâce. Kungfouine utilise des attaques de type Ténèbres et Combat pour défendre son territoire et vaincre ses ennemis avec des mouvements rapides."
        },
        {
            "nom": "Shaofouine",
            "description": "Shaofouine est un Pokémon de type Ténèbres/Combat. Évolué à partir de Kungfouine avec une grande maîtrise, il a des poings rapides et la capacité de concentrer son énergie. Shaofouine utilise des attaques de type Ténèbres et Combat pour méditer sur ses adversaires et atteindre la victoire avec force."
        },
        {
            "nom": "Drakkarmin",
            "description": "Drakkarmin est un Pokémon de type Dragon/Vol. Il a des ailes puissantes et la capacité de voler à grande vitesse. Drakkarmin utilise des attaques de type Dragon et Vol pour attaquer ses ennemis du ciel et défendre son territoire avec une force draconique."
        },
        {
            "nom": "Gringolem",
            "description": "Gringolem est un Pokémon de type Roche/Combat. Il a un corps robuste et la capacité de créer des champs de force. Gringolem utilise des attaques de type Roche et Combat pour défendre son territoire et repousser les intrus avec une force inébranlable."
        },
        {
            "nom": "Golemastoc",
            "description": "Golemastoc est un Pokémon de type Roche/Combat. Évolué à partir de Gringolem avec une grande puissance, il a des poings de pierre et la capacité de broyer les rochers. Golemastoc utilise des attaques de type Roche et Combat pour détruire ses ennemis et protéger son territoire avec une défense impénétrable."
        },
        {
            "nom": "Scalpion",
            "description": "Scalpion est un Pokémon de type Insecte/Combat. Il a des pinces acérées et la capacité de creuser des tunnels. Scalpion utilise des attaques de type Insecte et Combat pour chasser ses proies et défendre son territoire avec une agilité impressionnante."
        },
        {
            "nom": "Scalproie",
            "description": "Scalproie est un Pokémon de type Insecte/Combat. Évolué à partir de Scalpion avec une grande vitesse, il a des lames tranchantes et la capacité de se battre avec précision. Scalproie utilise des attaques de type Insecte et Combat pour découper ses ennemis et protéger son territoire avec une agressivité redoutable."
        },
        {
            "nom": "Frison",
            "description": "Frison est un Pokémon de type Normal. Il a une fourrure épaisse et la capacité de résister au froid extrême. Frison utilise des attaques de type Normal pour protéger son troupeau et affronter les prédateurs avec une défense solide."
        },
        {
            "nom": "Furaiglon",
            "description": "Furaiglon est un Pokémon de type Normal/Vol. Il a une grande envergure et la capacité de planer dans les airs. Furaiglon utilise des attaques de type Normal et Vol pour chasser ses proies et défendre son territoire avec agilité."
        },
        {
            "nom": "Gueriaigle",
            "description": "Gueriaigle est un Pokémon de type Normal/Vol. Évolué à partir de Furaiglon avec une grande majesté, il a des serres acérées et la capacité de plonger avec précision. Gueriaigle utilise des attaques de type Normal et Vol pour capturer ses proies et protéger son territoire avec une vigilance aiguisée."
        },
        {
            "nom": "Vostourno",
            "description": "Vostourno est un Pokémon de type Ténèbres/Vol. Il a une envergure impressionnante et la capacité de repérer les carcasses. Vostourno utilise des attaques de type Ténèbres et Vol pour voler dans les cieux et attaquer ses ennemis avec ruse."
        },
        {
            "nom": "Vaututrice",
            "description": "Vaututrice est un Pokémon de type Ténèbres/Vol. Évolué à partir de Vostourno avec une grande envergure, il a des serres puissantes et la capacité de voler silencieusement. Vaututrice utilise des attaques de type Ténèbres et Vol pour chasser ses proies avec précision et protéger son territoire avec détermination."
        },
        {
            "nom": "Aflamanoir",
            "description": "Aflamanoir est un Pokémon de type Feu. Il a une fourrure enflammée et la capacité de créer des boules de feu. Aflamanoir utilise des attaques de type Feu pour se protéger du froid et chasser ses proies avec des flammes brûlantes."
        },
        {
            "nom": "Fermite",
            "description": "Fermite est un Pokémon de type Insecte/Acier. Il a un corps solide et la capacité de résister aux attaques physiques. Fermite utilise des attaques de type Insecte et Acier pour construire des structures et protéger son nid avec une défense impénétrable."
        },
        {
            "nom": "Solochi",
            "description": "Solochi est un Pokémon de type Dragon. Il a une petite taille et la capacité de mordre à travers le métal. Solochi utilise des attaques de type Dragon pour aiguiser ses crocs et défendre son territoire avec détermination."
        },
        {
            "nom": "Diamat",
            "description": "Diamat est un Pokémon de type Dragon/Acier. Évolué à partir de Solochi avec une grande puissance, il a des écailles dures et la capacité de voler. Diamat utilise des attaques de type Dragon et Acier pour attaquer ses ennemis avec des griffes tranchantes et protéger son territoire avec une défense impénétrable."
        },
        {
            "nom": "Trioxhydre",
            "description": "Trioxhydre est un Pokémon de type Dragon/Acier. Évolué à partir de Diamat avec une grande fureur, il a trois têtes redoutables et la capacité de cracher du feu. Trioxhydre utilise des attaques de type Dragon et Acier pour dévaster ses ennemis et défendre son territoire avec une force draconique."
        },
        {
            "nom": "Pyronille",
            "description": "Pyronille est un Pokémon de type Feu/Insecte. Il a une carapace enflammée et la capacité de brûler ses ennemis. Pyronille utilise des attaques de type Feu et Insecte pour protéger son nid et attaquer ses ennemis avec des flammes incandescentes."
        },
        {
            "nom": "Pyrax",
            "description": "Pyrax est un Pokémon de type Feu/Insecte. Évolué à partir de Pyronille avec une grande chaleur, il a des ailes brillantes et la capacité de créer des explosions de feu. Pyrax utilise des attaques de type Feu et Insecte pour défendre son nid et incinérer ses ennemis avec une intensité redoutable."
        },
        {
            "nom": "Cobaltium",
            "description": "Cobaltium est un Pokémon de type Acier/Combat. Il a une armure brillante et la capacité de manier une épée. Cobaltium utilise des attaques de type Acier et Combat pour défendre l'honneur et protéger les innocents avec une force inébranlable."
        },
        {
            "nom": "Terrakium",
            "description": "Terrakium est un Pokémon de type Roche/Combat. Il a une stature imposante et la capacité de créer des tremblements de terre. Terrakium utilise des attaques de type Roche et Combat pour protéger l'équilibre naturel et défendre son territoire avec une force implacable."
        },
        {
            "nom": "Viridium",
            "description": "Viridium est un Pokémon de type Plante/Combat. Il a une lame tranchante et la capacité de contrôler la végétation. Viridium utilise des attaques de type Plante et Combat pour protéger les forêts et défendre son territoire avec une grâce végétale."
        },
        {
            "nom": "Boréas",
            "description": "Boréas est un Pokémon de type Vol. Il a des ailes majestueuses et la capacité de créer des tempêtes. Boréas utilise des attaques de type Vol pour voler dans les cieux et apaiser les tempêtes avec son souffle glacial."
        },
        {
            "nom": "Fulguris",
            "description": "Fulguris est un Pokémon de type Électrik/Vol. Il a une vitesse éclair et la capacité de générer des éclairs. Fulguris utilise des attaques de type Électrik et Vol pour déchirer le ciel et frapper ses ennemis avec des décharges électriques."
        },
        {
            "nom": "Reshiram",
            "description": "Reshiram est un Pokémon de type Dragon/Feu. Il a une aura ardente et la capacité de brûler les cieux. Reshiram utilise des attaques de type Dragon et Feu pour incinérer ses ennemis et protéger l'équilibre du monde avec une puissance draconique."
        },
        {
            "nom": "Zekrom",
            "description": "Zekrom est un Pokémon de type Dragon/Électrik. Il a une force électrique et la capacité de contrôler la foudre. Zekrom utilise des attaques de type Dragon et Électrik pour détruire les forces du mal et protéger l'harmonie avec une énergie électrique."
        },
        {
            "nom": "Démétéros",
            "description": "Démétéros est un Pokémon de type Sol/Vol. Il a une forme sauvage et la capacité de provoquer des tempêtes de sable. Démétéros utilise des attaques de type Sol et Vol pour protéger la nature et défendre son territoire avec une force tellurique."
        },
        {
            "nom": "Kyurem",
            "description": "Kyurem est un Pokémon de type Dragon/Glace. Il a une apparence glaciale et la capacité de contrôler le froid. Kyurem utilise des attaques de type Dragon et Glace pour geler ses ennemis et défendre son territoire avec une froideur implacable."
        },
        {
            "nom": "Keldeo",
            "description": "Keldeo est un Pokémon de type Eau/Combat. Il a une corne brillante et la capacité de manipuler l'eau. Keldeo utilise des attaques de type Eau et Combat pour protéger les innocents et défendre l'honneur avec une force aquatique."
        },
        {
            "nom": "Meloetta",
            "description": "Meloetta est un Pokémon de type Normal/Psy. Il a une voix enchanteresse et la capacité de créer des mélodies magiques. Meloetta utilise des attaques de type Normal et Psy pour apaiser les cœurs et défendre la paix avec une harmonie divine."
        },
        {
            "nom": "Genesect",
            "description": "Genesect est un Pokémon de type Insecte/Acier. Il a un corps mécanique et la capacité de tirer des lasers. Genesect utilise des attaques de type Insecte et Acier pour analyser ses ennemis et les attaquer avec une précision technologique."
        },
        {
            "nom": "Marisson",
            "description": "Marisson est un Pokémon de type Plante. Il a un corps petit et la capacité de faire pousser des plantes. Marisson utilise des attaques de type Plante pour défendre son territoire et aider ses amis avec ses pouvoirs de guérison."
        },
        {
            "nom": "Boguérisse",
            "description": "Boguérisse est un Pokémon de type Plante. Évolué à partir de Marisson avec une grande agilité, il a des feuilles tranchantes et la capacité de se camoufler dans la végétation. Boguérisse utilise des attaques de type Plante pour traquer ses proies et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Blindépique",
            "description": "Blindépique est un Pokémon de type Plante/Combat. Évolué à partir de Boguérisse avec une grande défense, il a des épines acérées et la capacité de lancer des attaques puissantes. Blindépique utilise des attaques de type Plante et Combat pour défendre son territoire avec une force implacable."
        },
        {
            "nom": "Feunnec",
            "description": "Feunnec est un Pokémon de type Feu. Il a une fourrure enflammée et la capacité de contrôler le feu. Feunnec utilise des attaques de type Feu pour se protéger du froid et chasser ses proies avec des flammes brûlantes."
        },
        {
            "nom": "Roussil",
            "description": "Roussil est un Pokémon de type Feu. Évolué à partir de Feunnec avec une grande chaleur, il a une queue enflammée et la capacité de créer des explosions de feu. Roussil utilise des attaques de type Feu pour incinérer ses ennemis et protéger son territoire avec une intensité redoutable."
        },
        {
            "nom": "Goupelin",
            "description": "Goupelin est un Pokémon de type Feu/Psy. Évolué à partir de Roussil avec une grande sagesse, il a des pouvoirs psychiques et la capacité de manipuler les flammes. Goupelin utilise des attaques de type Feu et Psy pour méditer sur ses ennemis et atteindre la victoire avec une force mystique."
        },
        {
            "nom": "Grenousse",
            "description": "Grenousse est un Pokémon de type Eau. Il a une peau lisse et la capacité de nager rapidement. Grenousse utilise des attaques de type Eau pour chasser dans les rivières et se défendre contre les prédateurs avec agilité."
        },
        {
            "nom": "Croâporal",
            "description": "Croâporal est un Pokémon de type Eau. Évolué à partir de Grenousse avec une grande agilité, il a des jambes puissantes et la capacité de sauter loin. Croâporal utilise des attaques de type Eau pour capturer ses proies et défendre son territoire avec une vitesse impressionnante."
        },
        {
            "nom": "Amphinobi",
            "description": "Amphinobi est un Pokémon de type Eau/Ténèbres. Évolué à partir de Croâporal avec une grande discrétion, il a des attaques rapides et la capacité de se fondre dans l'ombre. Amphinobi utilise des attaques de type Eau et Ténèbres pour attaquer ses ennemis avec ruse et protéger son territoire avec une agilité furtive."
        },
        {
            "nom": "Sapereau",
            "description": "Sapereau est un Pokémon de type Normal. Il a une petite taille et la capacité de creuser des tunnels. Sapereau utilise des attaques de type Normal pour se cacher dans les terriers et éviter les prédateurs avec une furtivité remarquable."
        },
        {
            "nom": "Excavarenne",
            "description": "Excavarenne est un Pokémon de type Normal/Sol. Évolué à partir de Sapereau avec une grande force, il a des griffes acérées et la capacité de creuser des galeries souterraines. Excavarenne utilise des attaques de type Normal et Sol pour construire des tunnels complexes et se protéger des dangers du sol."
        },
        {
            "nom": "Passerouge",
            "description": "Passerouge est un Pokémon de type Normal/Vol. Il a des ailes légères et la capacité de chanter avec grâce. Passerouge utilise des attaques de type Normal et Vol pour voler dans les cieux et attaquer ses ennemis avec des cris mélodieux."
        },
        {
            "nom": "Braisillon",
            "description": "Braisillon est un Pokémon de type Normal/Vol. Évolué à partir de Passerouge avec une grande élégance, il a des plumes brillantes et la capacité de réchauffer l'atmosphère. Braisillon utilise des attaques de type Normal et Vol pour éclaircir les nuages et défendre son territoire avec une grâce aérienne."
        },
        {
            "nom": "Flambusard",
            "description": "Flambusard est un Pokémon de type Feu/Vol. Évolué à partir de Braisillon avec une grande majesté, il a des ailes enflammées et la capacité de créer des tornades de feu. Flambusard utilise des attaques de type Feu et Vol pour brûler ses ennemis et défendre son territoire avec une force incandescente."
        },
        {
            "nom": "Lépidonille",
            "description": "Lépidonille est un Pokémon de type Insecte/Vol. Il a des ailes colorées et la capacité de voler avec grâce. Lépidonille utilise des attaques de type Insecte et Vol pour polliniser les fleurs et échapper aux prédateurs avec une agilité aérienne."
        },
        {
            "nom": "Pérégrain",
            "description": "Pérégrain est un Pokémon de type Insecte/Vol. Évolué à partir de Lépidonille avec une grande vitesse, il a des ailes tranchantes et la capacité de voler rapidement. Pérégrain utilise des attaques de type Insecte et Vol pour traquer ses proies et défendre son territoire avec une agressivité aérienne."
        },
        {
            "nom": "Prismillon",
            "description": "Prismillon est un Pokémon de type Insecte/Vol. Évolué à partir de Pérégrain avec une grande beauté, il a des ailes colorées et la capacité de créer des motifs éblouissants. Prismillon utilise des attaques de type Insecte et Vol pour éblouir ses ennemis et défendre son territoire avec une grâce aérienne."
        },
        {
            "nom": "Hélionceau",
            "description": "Hélionceau est un Pokémon de type Feu/Normal. Il a une crinière ardente et la capacité de rugir avec force. Hélionceau utilise des attaques de type Feu et Normal pour chasser ses proies et protéger sa meute avec une puissance impressionnante."
        },
        {
            "nom": "Némélios",
            "description": "Némélios est un Pokémon de type Feu/Normal. Évolué à partir d'Hélionceau avec une grande majesté, il a une crinière brillante et la capacité de créer des flammes brillantes. Némélios utilise des attaques de type Feu et Normal pour défendre son territoire et attaquer ses ennemis avec une chaleur éclatante."
        },
        {
            "nom": "Flabébé",
            "description": "Flabébé est un Pokémon de type Fée. Il a une petite taille et la capacité de manipuler des fleurs. Flabébé utilise des attaques de type Fée pour collecter le nectar et protéger les jardins avec une douceur florale."
        },
        {
            "nom": "Floette",
            "description": "Floette est un Pokémon de type Fée. Évolué à partir de Flabébé avec une grande grâce, il a des pétales colorés et la capacité de créer des parfums envoûtants. Floette utilise des attaques de type Fée pour soigner les blessures et protéger la flore avec une énergie bienfaisante."
        },
        {
            "nom": "Florges",
            "description": "Florges est un Pokémon de type Fée. Évolué à partir de Floette avec une grande beauté, il a une robe élégante et la capacité de contrôler la nature. Florges utilise des attaques de type Fée pour défendre les fleurs et protéger son territoire avec une grâce florale."
        },
        {
            "nom": "Cabriolaine",
            "description": "Cabriolaine est un Pokémon de type Fée. Il a une fourrure douce et la capacité de sauter avec légèreté. Cabriolaine utilise des attaques de type Fée pour jouer avec ses amis et éviter les prédateurs avec une agilité bondissante."
        },
        {
            "nom": "Chevroum",
            "description": "Chevroum est un Pokémon de type Fée. Évolué à partir de Cabriolaine avec une grande élégance, il a des cornes majestueuses et la capacité de créer des illusions. Chevroum utilise des attaques de type Fée pour protéger ses amis et confondre ses ennemis avec une grâce mystique."
        },
        {
            "nom": "Pandespiègle",
            "description": "Pandespiègle est un Pokémon de type Normal. Il a une allure espiègle et la capacité de jouer des tours. Pandespiègle utilise des attaques de type Normal pour divertir ses amis et éviter les conflits avec une malice amusante."
        },
        {
            "nom": "Pandarbare",
            "description": "Pandarbare est un Pokémon de type Normal. Évolué à partir de Pandespiègle avec une grande force, il a des griffes acérées et la capacité de frapper avec puissance. Pandarbare utilise des attaques de type Normal pour défendre son territoire et attaquer ses ennemis avec une vigueur impressionnante."
        },
        {
            "nom": "Couafarel",
            "description": "Couafarel est un Pokémon de type Normal/Eau. Il a une fourrure douce et la capacité de nager avec grâce. Couafarel utilise des attaques de type Normal et Eau pour chasser dans les rivières et défendre son territoire avec une agilité aquatique."
        },
        {
            "nom": "Psystigri",
            "description": "Psystigri est un Pokémon de type Psy. Il a une fourrure psychique et la capacité de prédire l'avenir. Psystigri utilise des attaques de type Psy pour lire les pensées et protéger ses amis avec une intuition remarquable."
        },
        {
            "nom": "Mistigrix",
            "description": "Mistigrix est un Pokémon de type Psy. Évolué à partir de Psystigri avec une grande élégance, il a des pouvoirs psychiques et la capacité de manipuler les esprits. Mistigrix utilise des attaques de type Psy pour contrôler ses ennemis et défendre son territoire avec une force mentale."
        },
        {
            "nom": "Monorpale",
            "description": "Monorpale est un Pokémon de type Spectre/Acier. Il a une lame tranchante et la capacité de se mouvoir sans bruit. Monorpale utilise des attaques de type Spectre et Acier pour pourfendre ses ennemis avec précision et protéger son honneur avec une force inébranlable."
        },
        {
            "nom": "Dimoclès",
            "description": "Dimoclès est un Pokémon de type Spectre/Acier. Évolué à partir de Monorpale avec une grande agilité, il a deux lames acérées et la capacité de créer des illusions. Dimoclès utilise des attaques de type Spectre et Acier pour désorienter ses ennemis et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Exagide",
            "description": "Exagide est un Pokémon de type Spectre/Acier. Évolué à partir de Dimoclès avec une grande force, il a une armure solide et la capacité de parer les attaques. Exagide utilise des attaques de type Spectre et Acier pour contrer ses ennemis avec une défense impénétrable et une riposte redoutable."
        },
        {
            "nom": "Fluvetin",
            "description": "Fluvetin est un Pokémon de type Insecte/Plante. Il a une apparence florale et la capacité de manipuler la nature. Fluvetin utilise des attaques de type Insecte et Plante pour défendre les fleurs et protéger son habitat avec une énergie végétale."
        },
        {
            "nom": "Cocotine",
            "description": "Cocotine est un Pokémon de type Insecte/Plante. Évolué à partir de Fluvetin avec une grande beauté, il a des pétales colorés et la capacité de créer des parfums envoûtants. Cocotine utilise des attaques de type Insecte et Plante pour soigner les blessures et protéger la flore avec une énergie bienfaisante."
        },
        {
            "nom": "Sucroquin",
            "description": "Sucroquin est un Pokémon de type Fée. Il a un corps sucré et la capacité de créer des bonbons. Sucroquin utilise des attaques de type Fée pour répandre la joie et défendre son territoire avec une douceur délicieuse."
        },
        {
            "nom": "Cupcanaille",
            "description": "Cupcanaille est un Pokémon de type Fée. Évolué à partir de Sucroquin avec une grande gourmandise, il a des dents pointues et la capacité de créer des sucreries. Cupcanaille utilise des attaques de type Fée pour ravir les enfants et protéger ses bonbons avec une détermination sucrée."
        },
        {
            "nom": "Sepiatop",
            "description": "Sepiatop est un Pokémon de type Ténèbres/Psy. Il a une encre sombre et la capacité de créer des illusions. Sepiatop utilise des attaques de type Ténèbres et Psy pour manipuler l'esprit de ses ennemis et défendre son territoire avec une ruse impénétrable."
        },
        {
            "nom": "Sepiatroce",
            "description": "Sepiatroce est un Pokémon de type Ténèbres/Psy. Évolué à partir de Sepiatop avec une grande malice, il a des tentacules redoutables et la capacité de créer des illusions déconcertantes. Sepiatroce utilise des attaques de type Ténèbres et Psy pour semer la confusion et défendre son territoire avec une tactique sournoise."
        },
        {
            "nom": "Opermine",
            "description": "Opermine est un Pokémon de type Roche. Il a une carapace dure et la capacité de rouler à grande vitesse. Opermine utilise des attaques de type Roche pour se défendre contre les prédateurs et protéger son territoire avec une résistance minérale."
        },
        {
            "nom": "Golgopathe",
            "description": "Golgopathe est un Pokémon de type Roche. Évolué à partir d'Opermine avec une grande robustesse, il a des piques tranchantes et la capacité de lancer des rochers. Golgopathe utilise des attaques de type Roche pour détruire les obstacles et défendre son territoire avec une puissance brute."
        },
        {
            "nom": "Venalgue",
            "description": "Venalgue est un Pokémon de type Poison/Eau. Il a une peau visqueuse et la capacité de sécréter des toxines. Venalgue utilise des attaques de type Poison et Eau pour contaminer ses ennemis et défendre son territoire avec une venimosité corrosive."
        },
        {
            "nom": "Kravarech",
            "description": "Kravarech est un Pokémon de type Poison/Eau. Évolué à partir de Venalgue avec une grande ruse, il a des crocs acérés et la capacité de mordre avec venin. Kravarech utilise des attaques de type Poison et Eau pour empoisonner ses ennemis et défendre son territoire avec une stratégie vicieuse."
        },
        {
            "nom": "Flingouste",
            "description": "Flingouste est un Pokémon de type Eau. Il a une pince puissante et la capacité de nager rapidement. Flingouste utilise des attaques de type Eau pour chasser dans les mers et se défendre contre les prédateurs avec une agilité aquatique."
        },
        {
            "nom": "Gamblast",
            "description": "Gamblast est un Pokémon de type Eau. Évolué à partir de Flingouste avec une grande force, il a des jets d'eau puissants et la capacité de créer des tourbillons. Gamblast utilise des attaques de type Eau pour éclabousser ses ennemis et défendre son territoire avec une puissance océanique."
        },
        {
            "nom": "Galvaran",
            "description": "Galvaran est un Pokémon de type Dragon/Normal. Il a des écailles résistantes et la capacité de se mouvoir silencieusement. Galvaran utilise des attaques de type Dragon et Normal pour attaquer ses ennemis avec force et défendre son territoire avec une robustesse impressionnante."
        },
        {
            "nom": "Iguolta",
            "description": "Iguolta est un Pokémon de type Dragon/Normal. Évolué à partir de Galvaran avec une grande agilité, il a des griffes acérées et la capacité de bondir avec vitesse. Iguolta utilise des attaques de type Dragon et Normal pour chasser ses proies et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Ptyranidur",
            "description": "Ptyranidur est un Pokémon de type Roche/Dragon. Il a une carapace dure et la capacité de créer des tremblements de terre. Ptyranidur utilise des attaques de type Roche et Dragon pour terrasser ses ennemis et défendre son territoire avec une résistance inébranlable."
        },
        {
            "nom": "Rexillius",
            "description": "Rexillius est un Pokémon de type Roche/Dragon. Évolué à partir de Ptyranidur avec une grande robustesse, il a des griffes tranchantes et la capacité de déchirer la terre. Rexillius utilise des attaques de type Roche et Dragon pour écraser ses ennemis et défendre son territoire avec une force titanesque."
        },
        {
            "nom": "Amagara",
            "description": "Amagara est un Pokémon de type Roche/Glace. Il a un corps fossilisé et la capacité de contrôler la glace. Amagara utilise des attaques de type Roche et Glace pour se défendre contre les prédateurs et protéger son territoire avec une résistance antique."
        },
        {
            "nom": "Dragmara",
            "description": "Dragmara est un Pokémon de type Roche/Glace. Évolué à partir d'Amagara avec une grande prestance, il a des cristaux tranchants et la capacité de créer des stalactites de glace. Dragmara utilise des attaques de type Roche et Glace pour geler ses ennemis et défendre son territoire avec une froideur glaciale."
        },
        {
            "nom": "Nymphali",
            "description": "Nymphali est un Pokémon de type Fée/Vol. Évolué à partir d'Évoli avec une grande grâce, il a des ailes délicates et la capacité de créer des arcs-en-ciel. Nymphali utilise des attaques de type Fée et Vol pour répandre la joie et défendre son territoire avec une élégance aérienne."
        },
        {
            "nom": "Brutalibré",
            "description": "Brutalibré est un Pokémon de type Combat/Vol. Il a des poings puissants et la capacité de voler avec agilité. Brutalibré utilise des attaques de type Combat et Vol pour combattre ses ennemis avec force et défendre son territoire avec une bravoure martiale."
        },
        {
            "nom": "Dedenne",
            "description": "Dedenne est un Pokémon de type Électrik/Fée. Il a une queue électrique et la capacité de stocker de l'énergie. Dedenne utilise des attaques de type Électrik et Fée pour défendre les jardins et protéger ses amis avec une électricité bienveillante."
        },
        {
            "nom": "Strassie",
            "description": "Strassie est un Pokémon de type Fée. Il a un corps lumineux et la capacité de générer des étincelles. Strassie utilise des attaques de type Fée pour éclairer les cavernes et protéger les cristaux avec une lueur mystique."
        },
        {
            "nom": "Mucuscule",
            "description": "Mucuscule est un Pokémon de type Poison. Il a une peau visqueuse et la capacité de sécréter des toxines. Mucuscule utilise des attaques de type Poison pour empoisonner ses ennemis et défendre son territoire avec une venimosité corrosive."
        },
        {
            "nom": "Colimucus",
            "description": "Colimucus est un Pokémon de type Poison. Évolué à partir de Mucuscule avec une grande agilité, il a des tentacules visqueux et la capacité de se camoufler dans la boue. Colimucus utilise des attaques de type Poison pour désorienter ses ennemis et défendre son territoire avec une ruse sournoise."
        },
        {
            "nom": "Muplodocus",
            "description": "Muplodocus est un Pokémon de type Poison/Dragon. Il a une peau résistante et la capacité de cracher du venin. Muplodocus utilise des attaques de type Poison et Dragon pour empoisonner ses ennemis et défendre son territoire avec une force toxique."
        },
        {
            "nom": "Trousselin",
            "description": "Trousselin est un Pokémon de type Spectre/Fée. Il a une allure espiègle et la capacité de jouer des tours. Trousselin utilise des attaques de type Spectre et Fée pour embrouiller ses ennemis et défendre son territoire avec une malice amusante."
        },
        {
            "nom": "Brocélôme",
            "description": "Brocélôme est un Pokémon de type Plante. Il a une tête en forme de feuille et la capacité de manipuler les plantes. Brocélôme utilise des attaques de type Plante pour cultiver des jardins et protéger la flore avec une énergie végétale."
        },
        {
            "nom": "Desséliande",
            "description": "Desséliande est un Pokémon de type Plante. Évolué à partir de Brocélôme avec une grande sagesse, il a des racines profondes et la capacité de canaliser l'énergie. Desséliande utilise des attaques de type Plante pour nourrir les arbres et protéger la forêt avec une force naturelle."
        },
        {
            "nom": "Pitrouille",
            "description": "Pitrouille est un Pokémon de type Spectre/Plante. Il a une tête sculptée et la capacité de créer des illusions. Pitrouille utilise des attaques de type Spectre et Plante pour semer la confusion et défendre son territoire avec une ruse fantomatique."
        },
        {
            "nom": "Banshitrouye",
            "description": "Banshitrouye est un Pokémon de type Spectre/Plante. Évolué à partir de Pitrouille avec une grande malice, il a des yeux brillants et la capacité de hanter les jardins. Banshitrouye utilise des attaques de type Spectre et Plante pour effrayer ses ennemis et défendre son territoire avec une présence sinistre."
        },
        {
            "nom": "Grelaçon",
            "description": "Grelaçon est un Pokémon de type Glace. Il a une apparence glaciale et la capacité de créer des cristaux de glace. Grelaçon utilise des attaques de type Glace pour geler ses ennemis et défendre son territoire avec une froideur implacable."
        },
        {
            "nom": "Séracrawl",
            "description": "Séracrawl est un Pokémon de type Glace. Évolué à partir de Grelaçon avec une grande prestance, il a des pics de glace tranchants et la capacité de grimper sur les parois glacées. Séracrawl utilise des attaques de type Glace pour escalader les sommets enneigés et protéger son territoire avec une résistance gelée."
        },
        {
            "nom": "Sonistrelle",
            "description": "Sonistrelle est un Pokémon de type Poison/Vol. Il a une allure sinistre et la capacité de voler silencieusement. Sonistrelle utilise des attaques de type Poison et Vol pour empoisonner ses ennemis et défendre son territoire avec une ruse aérienne."
        },
        {
            "nom": "Bruyverne",
            "description": "Bruyverne est un Pokémon de type Poison/Vol. Évolué à partir de Sonistrelle avec une grande agilité, il a des serres acérées et la capacité de planer dans les airs. Bruyverne utilise des attaques de type Poison et Vol pour attaquer ses proies et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Xerneas",
            "description": "Xerneas est un Pokémon de type Fée. C'est un Pokémon légendaire connu pour sa beauté et sa puissance. Xerneas utilise des attaques de type Fée pour apporter la vie et protéger l'équilibre de la nature avec une grâce divine."
        },
        {
            "nom": "Yveltal",
            "description": "Yveltal est un Pokémon de type Ténèbres/Vol. C'est un Pokémon légendaire connu pour absorber l'énergie vitale. Yveltal utilise des attaques de type Ténèbres et Vol pour semer la destruction et défendre son territoire avec une force sombre et implacable."
        },
        {
            "nom": "Zygarde",
            "description": "Zygarde est un Pokémon de type Dragon/Terre. C'est un Pokémon légendaire connu pour réguler l'équilibre écologique. Zygarde utilise des attaques de type Dragon et Terre pour protéger l'environnement et défendre son territoire avec une force tranquille mais puissante."
        },
        {
            "nom": "Diancie",
            "description": "Diancie est un Pokémon de type Roche/Fée. C'est un Pokémon légendaire connu pour sa beauté et ses pouvoirs de création de diamants. Diancie utilise des attaques de type Roche et Fée pour défendre ses joyaux et protéger ses amis avec une grâce cristalline."
        },
        {
            "nom": "Hoopa",
            "description": "Hoopa est un Pokémon de type Psy/Spectre. C'est un Pokémon légendaire capable de manipuler l'espace. Hoopa utilise des attaques de type Psy et Spectre pour créer des portails dimensionnels et défendre son territoire avec une stratégie mystique."
        },
        {
            "nom": "Volcanion",
            "description": "Volcanion est un Pokémon de type Feu/Eau. C'est un Pokémon légendaire capable de produire de la vapeur et de l'eau bouillante. Volcanion utilise des attaques de type Feu et Eau pour protéger son territoire et défendre les habitats aquatiques avec une puissance thermique."
        },
        {
            "nom": "Brindibou",
            "description": "Brindibou est un Pokémon de type Plante/Vol. Il est connu pour son plumage soyeux et sa capacité à lancer des attaques avec ses plumes tranchantes. Brindibou utilise des attaques de type Plante et Vol pour se défendre et attaquer ses ennemis avec agilité."
        },
        {
            "nom": "Efflèche",
            "description": "Efflèche est un Pokémon de type Plante/Vol. Évolué à partir de Brindibou, il possède une vision perçante et la capacité de voler silencieusement. Efflèche utilise des attaques de type Plante et Vol pour chasser ses proies et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Archéduc",
            "description": "Archéduc est un Pokémon de type Plante/Vol. Évolué à partir d'Efflèche avec une grande prestance, il a des serres acérées et la capacité de lancer des attaques avec précision. Archéduc utilise des attaques de type Plante et Vol pour combattre ses ennemis avec force et défendre son territoire avec une majesté aérienne."
        },
        {
            "nom": "Flamiaou",
            "description": "Flamiaou est un Pokémon de type Feu. Il a une fourrure souple et la capacité de cracher des boules de feu. Flamiaou utilise des attaques de type Feu pour brûler ses ennemis et défendre son territoire avec une puissance incandescente."
        },
        {
            "nom": "Matoufeu",
            "description": "Matoufeu est un Pokémon de type Feu. Évolué à partir de Flamiaou avec une grande agilité, il a des griffes tranchantes et la capacité de créer des boules de feu explosives. Matoufeu utilise des attaques de type Feu pour dévaster ses ennemis et défendre son territoire avec une férocité ardente."
        },
        {
            "nom": "Félinferno",
            "description": "Félinferno est un Pokémon de type Feu/Combat. Évolué à partir de Matoufeu avec une grande force, il a des pieds enflammés et la capacité de donner des coups de poing brûlants. Félinferno utilise des attaques de type Feu et Combat pour attaquer ses ennemis avec une puissance explosive et défendre son territoire avec une agressivité ardente."
        },
        {
            "nom": "Otaquin",
            "description": "Otaquin est un Pokémon de type Eau. Il a une peau lisse et la capacité de nager rapidement. Otaquin utilise des attaques de type Eau pour défendre son territoire aquatique et protéger ses amis avec une grâce aquatique."
        },
        {
            "nom": "Otarlette",
            "description": "Otarlette est un Pokémon de type Eau. Évolué à partir d'Otaquin avec une grande agilité, elle a des nageoires puissantes et la capacité de créer des vagues d'eau. Otarlette utilise des attaques de type Eau pour éclabousser ses ennemis et défendre son territoire avec une force océanique."
        },
        {
            "nom": "Oratoria",
            "description": "Oratoria est un Pokémon de type Eau. Évolué à partir d'Otarlette avec une grande prestance, elle a une voix enchanteresse et la capacité de calmer les eaux agitées. Oratoria utilise des attaques de type Eau pour chanter des mélodies apaisantes et défendre son territoire avec une élégance aquatique."
        },
        {
            "nom": "Picassaut",
            "description": "Picassaut est un Pokémon de type Normal/Vol. Il a un bec pointu et la capacité de voler rapidement. Picassaut utilise des attaques de type Normal et Vol pour picorer ses ennemis et défendre son territoire avec une vitesse aérienne."
        },
        {
            "nom": "Bazoucan",
            "description": "Bazoucan est un Pokémon de type Normal/Vol. Évolué à partir de Picassaut avec une grande agilité, il a un bec robuste et la capacité de lancer des plumes tranchantes. Bazoucan utilise des attaques de type Normal et Vol pour attaquer ses ennemis avec force et défendre son territoire avec une majesté aérienne."
        },
        {
            "nom": "Manglouton",
            "description": "Manglouton est un Pokémon de type Normal. Il a un corps trapu et la capacité de manger sans s'arrêter. Manglouton utilise des attaques de type Normal pour repousser ses ennemis et défendre son territoire avec une voracité insatiable."
        },
        {
            "nom": "Argouste",
            "description": "Argouste est un Pokémon de type Normal. Évolué à partir de Manglouton avec une grande force, il a des dents pointues et la capacité de creuser des tunnels. Argouste utilise des attaques de type Normal pour creuser sous terre et défendre son territoire avec une vigilance souterraine."
        },
        {
            "nom": "Larvibule",
            "description": "Larvibule est un Pokémon de type Insecte. Il a un corps segmenté et la capacité de créer des toiles collantes. Larvibule utilise des attaques de type Insecte pour piéger ses proies et défendre son territoire avec une toile soyeuse."
        },
        {
            "nom": "Chrysapile",
            "description": "Chrysapile est un Pokémon de type Insecte/Plante. Évolué à partir de Larvibule avec une grande ruse, il a des épines vénéneuses et la capacité de libérer des toxines. Chrysapile utilise des attaques de type Insecte et Plante pour empoisonner ses ennemis et défendre son territoire avec une stratégie naturelle."
        },
        {
            "nom": "Lucanon",
            "description": "Lucanon est un Pokémon de type Insecte/Électrik. Évolué à partir de Chrysapile avec une grande élégance, il a des ailes lumineuses et la capacité de générer de l'électricité. Lucanon utilise des attaques de type Insecte et Électrik pour éclairer les nuits et défendre son territoire avec une énergie électrifiante."
        },
        {
            "nom": "Crabagarre",
            "description": "Crabagarre est un Pokémon de type Combat. Il a des pinces robustes et la capacité de lancer des coups de poing rapides. Crabagarre utilise des attaques de type Combat pour se battre avec courage et défendre son territoire avec une détermination féroce."
        },
        {
            "nom": "Crabominable",
            "description": "Crabominable est un Pokémon de type Combat/Glace. Évolué à partir de Crabagarre avec une grande force, il a des pinces gelées et la capacité de créer des avalanches. Crabominable utilise des attaques de type Combat et Glace pour terrasser ses ennemis et défendre son territoire avec une puissance glaciale."
        },
        {
            "nom": "Plumeline",
            "description": "Plumeline est un Pokémon de type Normal/Vol. Il a un plumage coloré et la capacité de danser gracieusement. Plumeline utilise des attaques de type Normal et Vol pour déjouer ses ennemis avec des pas de danse et défendre son territoire avec une élégance aérienne."
        },
        {
            "nom": "Bombydou",
            "description": "Bombydou est un Pokémon de type Insecte. Il a un corps rond et la capacité de récolter le nectar des fleurs. Bombydou utilise des attaques de type Insecte pour polliniser les plantes et défendre son territoire avec une douceur printanière."
        },
        {
            "nom": "Rubombelle",
            "description": "Rubombelle est un Pokémon de type Insecte/Fée. Évolué à partir de Bombydou avec une grande grâce, elle a des ailes délicates et la capacité de répandre du pollen apaisant. Rubombelle utilise des attaques de type Insecte et Fée pour soigner ses alliés et défendre son territoire avec une douceur printanière."
        },
        {
            "nom": "Rocabot",
            "description": "Rocabot est un Pokémon de type Roche. Il a une allure robuste et la capacité de creuser des tunnels. Rocabot utilise des attaques de type Roche pour explorer les grottes et défendre son territoire avec une résistance minérale."
        },
        {
            "nom": "Lougaroc (Forme Diurne)",
            "description": "Lougaroc Forme Diurne est un Pokémon de type Roche. Évolué à partir de Rocabot sous l'effet de l'influence solaire, il a des griffes acérées et la capacité de lancer des attaques rapides. Lougaroc Forme Diurne utilise des attaques de type Roche pour chasser ses proies et défendre son territoire avec une agilité diurne."
        },
        {
            "nom": "Lougaroc (Forme Nocturne)",
            "description": "Lougaroc Forme Nocturne est un Pokémon de type Roche. Évolué à partir de Rocabot sous l'effet de l'influence lunaire, il a des sens aiguisés et la capacité de lancer des attaques furtives. Lougaroc Forme Nocturne utilise des attaques de type Roche pour traquer ses ennemis et défendre son territoire avec une vigilance nocturne."
        },
        {
            "nom": "Froussardine",
            "description": "Froussardine est un Pokémon de type Eau. Il a une apparence timide et la capacité de nager rapidement. Froussardine utilise des attaques de type Eau pour se cacher dans les bancs de poissons et défendre son territoire avec une furtivité aquatique."
        },
        {
            "nom": "Vorastérie",
            "description": "Vorastérie est un Pokémon de type Eau. Évolué à partir de Froussardine avec une grande prestance, elle a des épines venimeuses et la capacité de créer des illusions. Vorastérie utilise des attaques de type Eau pour empoisonner ses ennemis et défendre son territoire avec une ruse aquatique."
        },
        {
            "nom": "Prédastérie",
            "description": "Prédastérie est un Pokémon de type Eau/Ténèbres. Évolué à partir de Vorastérie avec une grande férocité, elle a des mâchoires acérées et la capacité de traquer ses proies. Prédastérie utilise des attaques de type Eau et Ténèbres pour terrifier ses ennemis et défendre son territoire avec une brutalité océanique."
        },
        {
            "nom": "Tiboudet",
            "description": "Tiboudet est un Pokémon de type Normal. Il a une allure douce et la capacité de transporter des charges lourdes. Tiboudet utilise des attaques de type Normal pour soutenir ses alliés et défendre son territoire avec une résistance robuste."
        },
        {
            "nom": "Bourrinos",
            "description": "Bourrinos est un Pokémon de type Normal. Évolué à partir de Tiboudet avec une grande force, il a une crinière imposante et la capacité de charger ses ennemis. Bourrinos utilise des attaques de type Normal pour foncer sur ses adversaires et défendre son territoire avec une puissance terrestre."
        },
        {
            "nom": "Mimantis",
            "description": "Mimantis est un Pokémon de type Plante/Insecte. Il a une forme de feuille et la capacité de se fondre dans la végétation. Mimantis utilise des attaques de type Plante et Insecte pour camoufler ses mouvements et défendre son territoire avec une agilité naturelle."
        },
        {
            "nom": "Floramantis",
            "description": "Floramantis est un Pokémon de type Plante/Insecte. Évolué à partir de Mimantis avec une grande grâce, elle a des pétales colorés et la capacité de drainer l'énergie solaire. Floramantis utilise des attaques de type Plante et Insecte pour absorber la lumière du soleil et défendre son territoire avec une énergie florale."
        },
        {
            "nom": "Spododo",
            "description": "Spododo est un Pokémon de type Plante. Il a une forme tubulaire et la capacité de s'attacher fermement aux surfaces. Spododo utilise des attaques de type Plante pour grimper et défendre son territoire avec une ténacité végétale."
        },
        {
            "nom": "Lampignon",
            "description": "Lampignon est un Pokémon de type Plante/Fée. Évolué à partir de Spododo avec une grande grâce, il a un chapeau lumineux et la capacité de projeter des spores apaisantes. Lampignon utilise des attaques de type Plante et Fée pour illuminer les nuits sombres et défendre son territoire avec une douceur végétale."
        },
        {
            "nom": "Tritox",
            "description": "Tritox est un Pokémon de type Poison. Il a une peau toxique et la capacité de projeter des gaz nocifs. Tritox utilise des attaques de type Poison pour empoisonner ses ennemis et défendre son territoire avec une résistance vénéneuse."
        },
        {
            "nom": "Malamandre",
            "description": "Malamandre est un Pokémon de type Poison/Feu. Évolué à partir de Tritox avec une grande intensité, il a des flammes toxiques et la capacité de dégager une chaleur brûlante. Malamandre utilise des attaques de type Poison et Feu pour consumer ses ennemis et défendre son territoire avec une férocité toxique."
        },
        {
            "nom": "Nounourson",
            "description": "Nounourson est un Pokémon de type Normal. Il a une allure câline et la capacité de distribuer des câlins réconfortants. Nounourson utilise des attaques de type Normal pour protéger ses amis et défendre son territoire avec une douceur maternelle."
        },
        {
            "nom": "Chelours",
            "description": "Chelours est un Pokémon de type Normal/Combat. Évolué à partir de Nounourson avec une grande puissance, il a des poings robustes et la capacité de lancer des attaques imparables. Chelours utilise des attaques de type Normal et Combat pour combattre avec force et défendre son territoire avec une détermination inébranlable."
        },
        {
            "nom": "Araqua",
            "description": "Araqua est un Pokémon de type Eau/Insecte. Il a un corps aquatique et la capacité de créer des bulles d'eau. Araqua utilise des attaques de type Eau et Insecte pour naviguer dans les eaux calmes et défendre son territoire avec une agilité aquatique."
        },
        {
            "nom": "Tarenbulle",
            "description": "Tarenbulle est un Pokémon de type Eau/Insecte. Évolué à partir d'Araqua avec une grande prestance, il a des pinces puissantes et la capacité de manipuler l'eau à volonté. Tarenbulle utilise des attaques de type Eau et Insecte pour éclabousser ses ennemis et défendre son territoire avec une force aquatique."
        },
        {
            "nom": "Croquine",
            "description": "Croquine est un Pokémon de type Plante/Fée. Il a une apparence charmante et la capacité de distribuer des fruits délicieux. Croquine utilise des attaques de type Plante et Fée pour nourrir ses alliés et défendre son territoire avec une douceur naturelle."
        },
        {
            "nom": "Candine",
            "description": "Candine est un Pokémon de type Plante/Fée. Évolué à partir de Croquine avec une grande grâce, elle a des couleurs vives et la capacité de produire des senteurs apaisantes. Candine utilise des attaques de type Plante et Fée pour répandre des parfums sucrés et défendre son territoire avec une délicatesse florale."
        },
        {
            "nom": "Sucreine",
            "description": "Sucreine est un Pokémon de type Plante/Fée. Évolué à partir de Candine avec une grande majesté, elle a une robe élégante et la capacité de contrôler le sucre. Sucreine utilise des attaques de type Plante et Fée pour sucrer ses ennemis et défendre son territoire avec une grâce sucrée."
        },
        {
            "nom": "Guérilande",
            "description": "Guérilande est un Pokémon de type Plante/Fée. Évolué à partir de Sucreine avec une grande splendeur, elle a des pétales brillants et la capacité de guérir les blessures. Guérilande utilise des attaques de type Plante et Fée pour soigner ses alliés et défendre son territoire avec une guérison florale."
        },
        {
            "nom": "Gouroutan",
            "description": "Gouroutan est un Pokémon de type Plante/Combat. Il a une allure imposante et la capacité de lancer des attaques rapides. Gouroutan utilise des attaques de type Plante et Combat pour combattre avec agilité et défendre son territoire avec une force brute."
        },
        {
            "nom": "Quartermac",
            "description": "Quartermac est un Pokémon de type Plante/Combat. Évolué à partir de Gouroutan avec une grande robustesse, il a des poings solides et la capacité de protéger ses alliés. Quartermac utilise des attaques de type Plante et Combat pour frapper avec puissance et défendre son territoire avec une protection féroce."
        },
        {
            "nom": "Sovkipou",
            "description": "Sovkipou est un Pokémon de type Eau. Il a une allure calme et la capacité de flotter gracieusement. Sovkipou utilise des attaques de type Eau pour naviguer sur les vagues et défendre son territoire avec une fluidité aquatique."
        },
        {
            "nom": "Sarmuraï",
            "description": "Sarmuraï est un Pokémon de type Eau/Combat. Évolué à partir de Sovkipou avec une grande agilité, il a une lame tranchante et la capacité de maîtriser l'eau. Sarmuraï utilise des attaques de type Eau et Combat pour manier son épée et défendre son territoire avec une précision mortelle."
        },
        {
            "nom": "Bacabouh",
            "description": "Bacabouh est un Pokémon de type Spectre. Il a une forme fantomatique et la capacité de créer des illusions. Bacabouh utilise des attaques de type Spectre pour effrayer ses ennemis et défendre son territoire avec une présence surnaturelle."
        },
        {
            "nom": "Trépassable",
            "description": "Trépassable est un Pokémon de type Spectre. Évolué à partir de Bacabouh avec une grande intensité, il a une cape sombre et la capacité de se fondre dans l'ombre. Trépassable utilise des attaques de type Spectre pour hanter ses adversaires et défendre son territoire avec une puissance mystique."
        },
        {
            "nom": "Concombaffe",
            "description": "Concombaffe est un Pokémon de type Spectre. Évolué à partir de Trépassable avec une grande majesté, il a des motifs étranges et la capacité de manipuler les rêves. Concombaffe utilise des attaques de type Spectre pour jouer avec l'esprit et défendre son territoire avec une influence onirique."
        },
        {
            "nom": "Silvallié",
            "description": "Silvallié est un Pokémon de type Normal/Fée. Il a une fourrure soyeuse et la capacité de ressentir les émotions des autres. Silvallié utilise des attaques de type Normal et Fée pour apaiser les conflits et défendre son territoire avec une empathie naturelle."
        },
        {
            "nom": "Météno (Forme Météore)",
            "description": "Météno est un Pokémon de type Roche/Vol. À l'état de forme météore, il a une carapace solide et la capacité de résister aux impacts. Météno utilise des attaques de type Roche et Vol pour survoler le ciel et défendre son territoire avec une résistance céleste."
        },
        {
            "nom": "Dodoala",
            "description": "Dodoala est un Pokémon de type Normal/Vol. Il a une forme ronde et la capacité de dormir en volant. Dodoala utilise des attaques de type Normal et Vol pour flotter paisiblement et défendre son territoire avec une tranquillité aérienne."
        },
        {
            "nom": "Boumata",
            "description": "Boumata est un Pokémon de type Dragon. Il a des écailles robustes et la capacité de cracher du feu. Boumata utilise des attaques de type Dragon pour dominer le ciel et défendre son territoire avec une férocité draconique."
        },
        {
            "nom": "Togedemaru",
            "description": "Togedemaru est un Pokémon de type Électrik/Acier. Il a une allure ronde et la capacité de générer de l'électricité statique. Togedemaru utilise des attaques de type Électrik et Acier pour électrifier ses ennemis et défendre son territoire avec une défense métallique."
        },
        {
            "nom": "Mimiqui",
            "description": "Mimiqui est un Pokémon de type Spectre/Fée. Il a une forme de déguisement et la capacité de se camoufler. Mimiqui utilise des attaques de type Spectre et Fée pour jouer des tours à ses adversaires et défendre son territoire avec une malice mystique."
        },
        {
            "nom": "Denticrisse",
            "description": "Denticrisse est un Pokémon de type Spectre/Fée. Évolué à partir de Mimiqui avec une grande majesté, il a une robe élégante et la capacité de lancer des malédictions. Denticrisse utilise des attaques de type Spectre et Fée pour ensorceler ses ennemis et défendre son territoire avec une grâce sinistre."
        },
        {
            "nom": "Draïeul",
            "description": "Draïeul est un Pokémon de type Dragon. Il a une allure majestueuse et la capacité de contrôler les courants d'air. Draïeul utilise des attaques de type Dragon pour dominer le ciel et défendre son territoire avec une force aérienne."
        },
        {
            "nom": "Sinistrail",
            "description": "Sinistrail est un Pokémon de type Spectre/Vol. Il a une apparence fantomatique et la capacité de créer des illusions. Sinistrail utilise des attaques de type Spectre et Vol pour effrayer ses ennemis et défendre son territoire avec une magie sombre."
        },
        {
            "nom": "Bébécaille",
            "description": "Bébécaille est un Pokémon de type Dragon. Il a une carapace robuste et la capacité de résister aux attaques. Bébécaille utilise des attaques de type Dragon pour se protéger et défendre son territoire avec une endurance draconique."
        },
        {
            "nom": "Écaïd",
            "description": "Écaïd est un Pokémon de type Ténèbres/Vol. Il a une allure menaçante et la capacité de voler silencieusement. Écaïd utilise des attaques de type Ténèbres et Vol pour surprendre ses ennemis et défendre son territoire avec une ombre effrayante."
        },
        {
            "nom": "Ékaïser",
            "description": "Ékaïser est un Pokémon de type Plante. Il a une allure majestueuse et la capacité de contrôler les racines. Ékaïser utilise des attaques de type Plante pour manipuler la nature et défendre son territoire avec une force végétale."
        },
        {
            "nom": "Tokorico",
            "description": "Tokorico est un Pokémon de type Électrik/Fée. Il a une apparence divine et la capacité de manipuler l'électricité. Tokorico utilise des attaques de type Électrik et Fée pour protéger son territoire sacré avec une énergie céleste."
        },
        {
            "nom": "Tokopiyon",
            "description": "Tokopiyon est un Pokémon de type Électrik/Fée. Évolué à partir de Tokorico avec une grande majesté, il a des ailes lumineuses et la capacité de générer des énergies bienfaisantes. Tokopiyon utilise des attaques de type Électrik et Fée pour illuminer ses ennemis et défendre son territoire avec une aura sacrée."
        },
        {
            "nom": "Tokotoro",
            "description": "Tokotoro est un Pokémon de type Électrik/Fée. Évolué à partir de Tokopiyon avec une grande splendeur, il a une apparence imposante et la capacité de protéger la nature. Tokotoro utilise des attaques de type Électrik et Fée pour canaliser l'énergie céleste et défendre son territoire avec une puissance divine."
        },
        {
            "nom": "Tokopisco",
            "description": "Tokopisco est un Pokémon de type Électrik/Fée. Évolué à partir de Tokotoro avec une grande majesté, il a une apparence resplendissante et la capacité de contrôler les tempêtes. Tokopisco utilise des attaques de type Électrik et Fée pour apaiser les orages et défendre son territoire avec une harmonie céleste."
        },
        {
            "nom": "Cosmog",
            "description": "Cosmog est un Pokémon de type Psy. Il a une allure mystérieuse et la capacité de manipuler l'énergie cosmique. Cosmog utilise des attaques de type Psy pour explorer les dimensions et défendre son territoire avec une aura stellaire."
        },
        {
            "nom": "Cosmovum",
            "description": "Cosmovum est un Pokémon de type Psy. Évolué à partir de Cosmog avec une grande splendeur, il a une apparence éthérée et la capacité de créer des trous noirs. Cosmovum utilise des attaques de type Psy pour plier l'espace-temps et défendre son territoire avec une puissance cosmique."
        },
        {
            "nom": "Solgaleo",
            "description": "Solgaleo est un Pokémon de type Psy/Acier. Évolué à partir de Cosmovum avec une majesté solaire, il a une crinière dorée et la capacité de contrôler le soleil. Solgaleo utilise des attaques de type Psy et Acier pour illuminer l'univers et défendre son territoire avec une énergie solaire."
        },
        {
            "nom": "Lunala",
            "description": "Lunala est un Pokémon de type Psy/Spectre. Évolué à partir de Cosmovum avec une grâce lunaire, il a des ailes astrales et la capacité de manipuler les ombres. Lunala utilise des attaques de type Psy et Spectre pour voyager à travers les dimensions et défendre son territoire avec une puissance éthérée."
        },
        {
            "nom": "Zéroïd",
            "description": "Zéroïd est un Pokémon de type Psy/Inconnu. Il a une forme abstraite et la capacité de défier les lois de la physique. Zéroïd utilise des attaques de type Psy et Inconnu pour altérer la réalité et défendre son territoire avec une force mystique."
        },
        {
            "nom": "Mouscoto",
            "description": "Mouscoto est un Pokémon de type Normal. Il a une apparence robuste et la capacité de résister aux attaques. Mouscoto utilise des attaques de type Normal pour protéger son territoire avec une endurance impressionnante."
        },
        {
            "nom": "Cancrelove",
            "description": "Cancrelove est un Pokémon de type Insecte/Eau. Il a une carapace solide et la capacité de générer des boucliers d'eau. Cancrelove utilise des attaques de type Insecte et Eau pour défendre son territoire avec une défense impénétrable."
        },
        {
            "nom": "Câblifère",
            "description": "Câblifère est un Pokémon de type Insecte/Electrik. Évolué à partir de Larvibule avec des antennes énergétiques, il a une armure électrique et la capacité de manipuler l'électricité. Câblifère utilise des attaques de type Insecte et Electrik pour électrifier ses ennemis et défendre son territoire avec une énergie voltigeante."
        },
        {
            "nom": "Bamboiselle",
            "description": "Bamboiselle est un Pokémon de type Plante/Fée. Il a une apparence délicate et la capacité de se fondre dans son environnement. Bamboiselle utilise des attaques de type Plante et Fée pour dissimuler sa présence et défendre son territoire avec une grâce naturelle."
        },
        {
            "nom": "Katagami",
            "description": "Katagami est un Pokémon de type Plante. Évolué à partir de Bamboiselle avec une élégance florale, il a des lames tranchantes et la capacité de couper l'air. Katagami utilise des attaques de type Plante pour trancher ses ennemis et défendre son territoire avec une agilité botanique."
        },
        {
            "nom": "Engloutyran",
            "description": "Engloutyran est un Pokémon de type Eau. Il a une allure intimidante et la capacité de créer des vagues dévastatrices. Engloutyran utilise des attaques de type Eau pour submerger ses ennemis et défendre son territoire avec une force aquatique."
        },
        {
            "nom": "Necrozma",
            "description": "Necrozma est un Pokémon de type Psy. Il a une forme cristalline et la capacité de contrôler la lumière. Necrozma utilise des attaques de type Psy pour absorber l'énergie lumineuse et défendre son territoire avec une puissance spectrale."
        },
        {
            "nom": "Necrozma (Crinière du Couchant)",
            "description": "Necrozma (Crinière du Couchant) est un Pokémon de type Psy/Inconnu. Évolué à partir de Necrozma avec une harmonie solaire, il a une crinière éblouissante et la capacité de projeter des rayons lumineux. Necrozma (Crinière du Couchant) utilise des attaques de type Psy et Inconnu pour illuminer les ténèbres et défendre son territoire avec une énergie solaire."
        },
        {
            "nom": "Necrozma (Ailes de l'Aurore)",
            "description": "Necrozma (Ailes de l'Aurore) est un Pokémon de type Psy/Acier. Évolué à partir de Necrozma avec une majesté auroresque, il a des ailes brillantes et la capacité de manipuler les étoiles. Necrozma (Ailes de l'Aurore) utilise des attaques de type Psy et Acier pour briller dans le ciel et défendre son territoire avec une énergie stellaire."
        },
        {
            "nom": "Ultra-Necrozma",
            "description": "Ultra-Necrozma est un Pokémon de type Psy/Dragon. Évolué à partir de Necrozma avec une puissance infinie, il a une aura lumineuse et la capacité de contrôler les énergies cosmiques. Ultra-Necrozma utilise des attaques de type Psy et Dragon pour rayonner de lumière pure et défendre son territoire avec une force cosmique."
        },
        {
            "nom": "Magearna",
            "description": "Magearna est un Pokémon de type Acier/Fée. Il possède un cœur mécanique et la capacité de contrôler l'énergie. Magearna utilise des attaques de type Acier et Fée pour protéger son territoire avec une défense inébranlable et une grâce mécanique."
        },
        {
            "nom": "Marshadow",
            "description": "Marshadow est un Pokémon de type Combat/Fantôme. Il a une silhouette mystérieuse et la capacité de se fondre dans les ombres. Marshadow utilise des attaques de type Combat et Fantôme pour frapper ses ennemis avec une force spectrale et défendre son territoire avec une énergie combative."
        },
        {
            "nom": "Vémini",
            "description": "Vémini est un Pokémon de type Poison/Ténèbres. Il a une apparence reptilienne et la capacité de se camoufler dans l'ombre. Vémini utilise des attaques de type Poison et Ténèbres pour empoisonner ses ennemis et défendre son territoire avec une furtivité venimeuse."
        },
        {
            "nom": "Mandrillon",
            "description": "Mandrillon est un Pokémon de type Psy/Spectre. Il a une allure éthérée et la capacité de traverser les dimensions. Mandrillon utilise des attaques de type Psy et Spectre pour manipuler l'espace-temps et défendre son territoire avec une puissance mystique."
        },
        {
            "nom": "Ama-Ama",
            "description": "Ama-Ama est un Pokémon de type Eau. Il a une apparence marine et la capacité de contrôler les vagues. Ama-Ama utilise des attaques de type Eau pour défendre son territoire avec une force aquatique et une harmonie océanique."
        },
        {
            "nom": "Pierroteknik",
            "description": "Pierroteknik est un Pokémon de type Électrik/Fée. Il a une allure élégante et la capacité de manipuler l'électricité. Pierroteknik utilise des attaques de type Électrik et Fée pour protéger son territoire avec une énergie électrisante et une grâce céleste."
        },
        {
            "nom": "Zeraora",
            "description": "Zeraora est un Pokémon de type Électrik. Il a une allure féline et la capacité de se déplacer à grande vitesse. Zeraora utilise des attaques de type Électrik pour charger ses ennemis avec une puissance électrique et défendre son territoire avec une agilité fulgurante."
        },
        {
            "nom": "Meltan",
            "description": "Meltan est un Pokémon de type Acier. Il a une forme fluide et la capacité de fondre avec d'autres métaux. Meltan utilise des attaques de type Acier pour se défendre en fusionnant et en protégeant son territoire avec une adaptabilité métallique."
        },
        {
            "nom": "Melmetal",
            "description": "Melmetal est un Pokémon de type Acier. Évolué à partir de Meltan avec une grande stature, il a une force incroyable et la capacité de manipuler le métal. Melmetal utilise des attaques de type Acier pour plier et façonner son environnement, défendant son territoire avec une puissance inébranlable."
        }
    ]
    console.log(pedandex);
        return (
            <button>Valider</button>
        )
}
export default StartPedandex
