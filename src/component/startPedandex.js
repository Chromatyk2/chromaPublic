import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function StartPedandex(props) {
    const [allDailyGames, setAllDailyGames] = useState(null)
    const pedandex = [
        {
            "nom": "Bulbizarre",
            "description": "Bulbizarre passe son temps \u00e0 faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine."
        },
        {
            "nom": "Herbizarre",
            "description": "Un bourgeon a pouss\u00e9 sur le dos de ce Pok\u00e9mon. Pour en supporter le poids, Herbizarre a d\u00fb se muscler les pattes. Lorsqu'il commence \u00e0 se pr\u00e9lasser au soleil, \u00e7a signifie que son bourgeon va \u00e9clore, donnant naissance \u00e0 une fleur."
        },
        {
            "nom": "Florizarre",
            "description": "Une belle fleur se trouve sur le dos de Florizarre. Elle prend une couleur vive lorsqu'elle est bien nourrie et bien ensoleill\u00e9e. Le parfum de cette fleur peut apaiser les gens."
        },
        {
            "nom": "Salam\u00e8che",
            "description": "La flamme qui br\u00fble au bout de sa queue indique l'humeur de ce Pok\u00e9mon. Elle vacille lorsque Salam\u00e8che est content. En revanche, lorsqu'il s'\u00e9nerve, la flamme prend de l'importance et br\u00fble plus ardemment."
        },
        {
            "nom": "Reptincel",
            "description": "Reptincel lac\u00e8re ses ennemis sans piti\u00e9 gr\u00e2ce \u00e0 ses griffes ac\u00e9r\u00e9es. S'il rencontre un ennemi puissant, il devient agressif et la flamme au bout de sa queue s'embrase et prend une couleur bleu clair."
        },
        {
            "nom": "Dracaufeu",
            "description": "Dracaufeu parcourt les cieux pour trouver des adversaires \u00e0 sa mesure. Il crache de puissantes flammes capables de faire fondre n'importe quoi. Mais il ne dirige jamais son souffle destructeur vers un ennemi plus faible."
        },
        {
            "nom": "Carapuce",
            "description": "La carapace de Carapuce ne sert pas qu'\u00e0 le prot\u00e9ger. La forme ronde de sa carapace et ses rainures lui permettent d'am\u00e9liorer son hydrodynamisme. Ce Pok\u00e9mon nage extr\u00eamement vite."
        },
        {
            "nom": "Carabaffe",
            "description": "Carabaffe a une large queue recouverte d'une \u00e9paisse fourrure. Elle devient de plus en plus fonc\u00e9e avec l'\u00e2ge. Les \u00e9raflures sur la carapace de ce Pok\u00e9mon t\u00e9moignent de son exp\u00e9rience au combat."
        },
        {
            "nom": "Tortank",
            "description": "Tortank dispose de canons \u00e0 eau \u00e9mergeant de sa carapace. Ils sont tr\u00e8s pr\u00e9cis et peuvent envoyer des balles d'eau capables de faire mouche sur une cible situ\u00e9e \u00e0 plus de 50 m."
        },
        {
            "nom": "Chenipan",
            "description": "Chenipan a un app\u00e9tit d'ogre. Il peut engloutir des feuilles plus grosses que lui. Les antennes de ce Pok\u00e9mon d\u00e9gagent une odeur particuli\u00e8rement ent\u00eatante."
        },
        {
            "nom": "Chrysacier",
            "description": "La carapace prot\u00e9geant ce Pok\u00e9mon est dure comme du m\u00e9tal. Chrysacier ne bouge pas beaucoup. Il reste immobile pour pr\u00e9parer les organes \u00e0 l'int\u00e9rieur de sa carapace en vue d'une \u00e9volution future."
        },
        {
            "nom": "Papilusion",
            "description": "Papilusion est tr\u00e8s dou\u00e9 pour rep\u00e9rer le d\u00e9licieux nectar qu'il butine dans les fleurs. Il peut d\u00e9tecter, extraire et transporter le nectar de fleurs situ\u00e9es \u00e0 plus de 10 km de son nid."
        },
        {
            "nom": "Aspicot",
            "description": "L'odorat d'Aspicot est extr\u00eamement d\u00e9velopp\u00e9. Il lui suffit de renifler ses feuilles pr\u00e9f\u00e9r\u00e9es avec son gros appendice nasal pour les reconna\u00eetre entre mille."
        },
        {
            "nom": "Coconfort",
            "description": "Coconfort est la plupart du temps immobile et reste accroch\u00e9 \u00e0 un arbre. Cependant, int\u00e9rieurement, il est tr\u00e8s actif, car il se pr\u00e9pare pour sa prochaine \u00e9volution. En touchant sa carapace, on peut sentir sa chaleur."
        },
        {
            "nom": "Dardargnan",
            "description": "Dardargnan est extr\u00eamement possessif. Il vaut mieux ne pas toucher \u00e0 son nid si on veut \u00e9viter d'avoir des ennuis. Lorsqu'ils sont en col\u00e8re, ces Pok\u00e9mon attaquent en masse."
        },
        {
            "nom": "Roucool",
            "description": "Roucool a un excellent sens de l'orientation. Il est capable de retrouver son nid sans jamais se tromper, m\u00eame s'il est tr\u00e8s loin de chez lui et dans un environnement qu'il ne conna\u00eet pas."
        },
        {
            "nom": "Roucoups",
            "description": "Roucoups utilise une vaste surface pour son territoire. Ce Pok\u00e9mon surveille r\u00e9guli\u00e8rement son espace a\u00e9rien. Si quelqu'un p\u00e9n\u00e8tre sur son territoire, il corrige l'ennemi sans piti\u00e9 d'un coup de ses terribles serres."
        },
        {
            "nom": "Roucarnage",
            "description": "Ce Pok\u00e9mon est dot\u00e9 d'un plumage magnifique et luisant. Bien des Dresseurs sont captiv\u00e9s par la beaut\u00e9 fatale de sa huppe et d\u00e9cident de choisir Roucarnage comme leur Pok\u00e9mon favori."
        },
        {
            "nom": "Rattata",
            "description": "Rattata est extr\u00eamement prudent. M\u00eame lorsqu'il est endormi, il fait pivoter ses oreilles pour \u00e9couter autour de lui. En ce qui concerne son habitat, il n'est vraiment pas difficile. Il peut faire son nid n'importe o\u00f9."
        },
        {
            "nom": "Rattatac",
            "description": "Les crocs robustes de Rattatac poussent constamment. Pour \u00e9viter qu'ils raclent le sol, il se fait les dents sur des cailloux ou des troncs d'arbre. Il lui arrive m\u00eame de ronger les murs des maisons."
        },
        {
            "nom": "Piafabec",
            "description": "Piafabec crie tellement fort qu'il peut \u00eatre entendu \u00e0 1km de distance. Ces Pok\u00e9mon se pr\u00e9viennent d'un danger en entonnant une m\u00e9lop\u00e9e tr\u00e8s aigu\u00eb, qu'ils se renvoient les uns les autres, comme un \u00e9cho."
        },
        {
            "nom": "Rapasdepic",
            "description": "On reconna\u00eet un Rapasdepic \u00e0 son long cou et \u00e0 son bec allong\u00e9. Ces attributs lui permettent d'attraper facilement ses proies dans la terre ou dans l'eau. Il bouge son bec long et fin avec une grande agilit\u00e9."
        },
        {
            "nom": "Abo",
            "description": "Abo s'enroule en spirale pour dormir. Sa t\u00eate reste relev\u00e9e de telle sorte que cette position lui permette de r\u00e9agir rapidement si une menace survenait."
        },
        {
            "nom": "Arbok",
            "description": "Ce Pok\u00e9mon dot\u00e9 d'une force extraordinaire peut \u00e9trangler ses proies avec son corps. Il peut m\u00eame \u00e9craser des tonneaux m\u00e9talliques. Une fois sous l'\u00e9treinte d'Arbok, il est impossible de lui \u00e9chapper."
        },
        {
            "nom": "Pikachu",
            "description": "Chaque fois que Pikachu d\u00e9couvre quelque chose de nouveau, il envoie un arc \u00e9lectrique. Lorsqu'on tombe sur une Baie carbonis\u00e9e, \u00e7a signifie sans doute qu'un de ces Pok\u00e9mon a envoy\u00e9 une charge trop forte."
        },
        {
            "nom": "Raichu",
            "description": "Si ses joues contiennent trop d'\u00e9lectricit\u00e9, Raichu plante sa queue dans le sol pour se d\u00e9charger. On trouve des parcelles de terre br\u00fbl\u00e9e \u00e0 proximit\u00e9 du nid de ce Pok\u00e9mon."
        },
        {
            "nom": "Sabelette",
            "description": "Le corps de Sabelette lui permet d'\u00e9conomiser l'eau qu'il absorbe, afin de survivre longtemps dans le d\u00e9sert. Ce Pok\u00e9mon s'enroule sur lui-m\u00eame pour se prot\u00e9ger de ses ennemis."
        },
        {
            "nom": "Sablaireau",
            "description": "Le corps de Sablaireau est recouvert de pointes tr\u00e8s dures, qui sont des extensions de sa peau. Une fois par an, ce Pok\u00e9mon mue et les vieilles pointes tombent, remplac\u00e9es par de nouvelles."
        },
        {
            "nom": "Nidoran\u2640",
            "description": "Ne doit pas \u00eatre confondu avec Nidoran\u2642."
        },
        {
            "nom": "Nidorina",
            "description": "Lorsqu'un Nidorina est avec ses amis ou sa famille, il replie ses pointes pour ne pas blesser ses proches. Ce Pok\u00e9mon devient vite nerveux lorsqu'il est s\u00e9par\u00e9 de son groupe."
        },
        {
            "nom": "Nidoqueen",
            "description": "Le corps de Nidoqueen est prot\u00e9g\u00e9 par des \u00e9cailles extr\u00eamement dures. Il aime envoyer ses ennemis voler en leur fon\u00e7ant dessus. Ce Pok\u00e9mon utilise toute sa puissance lorsqu'il prot\u00e8ge ses petits."
        },
        {
            "nom": "Nidoran\u2642",
            "description": "Ne doit pas \u00eatre confondu avec Nidoran\u2640."
        },
        {
            "nom": "Nidorino",
            "description": "Nidorino dispose d'une corne plus dure que du diamant. S'il sent une pr\u00e9sence hostile, toutes les pointes de son dos se h\u00e9rissent d'un coup, puis il d\u00e9fie son ennemi."
        },
        {
            "nom": "Nidoking",
            "description": "L'\u00e9paisse queue de Nidoking est d'une puissance incroyable. En un seul coup, il peut renverser une tour m\u00e9tallique. Lorsque ce Pok\u00e9mon se d\u00e9cha\u00eene, plus rien ne peut l'arr\u00eater."
        },
        {
            "nom": "M\u00e9lof\u00e9e",
            "description": "Les nuits de pleine lune, des groupes de ces Pok\u00e9mon sortent jouer. Lorsque l'aube commence \u00e0 poindre, les M\u00e9lof\u00e9e fatigu\u00e9s rentrent dans leur retraite montagneuse et vont dormir, blottis les uns contre les autres."
        },
        {
            "nom": "M\u00e9lodelfe",
            "description": "Les M\u00e9lodelfe se d\u00e9placent en sautant doucement, comme s'ils volaient. Leur d\u00e9marche l\u00e9g\u00e8re leur permet m\u00eame de marcher sur l'eau. On raconte qu'ils se prom\u00e8nent sur les lacs, les soirs o\u00f9 la lune est claire."
        },
        {
            "nom": "Goupix",
            "description": "\u00c0 sa naissance, Goupix a une queue blanche. Cette queue se divise en six si le Pok\u00e9mon re\u00e7oit de l'amiti\u00e9 de la part de son Dresseur. Les six queues sont courb\u00e9es et magnifiques."
        },
        {
            "nom": "Feunard",
            "description": "Feunard peut envoyer un inqui\u00e9tant rayon avec ses yeux rouge vif pour prendre le contr\u00f4le de l'esprit de son ennemi. On raconte que ce Pok\u00e9mon peut vivre 1 000 ans."
        },
        {
            "nom": "Rondoudou",
            "description": "Rondoudou utilise ses cordes vocales pour ajuster librement la longueur d'onde de sa voix. Cela permet \u00e0 ce Pok\u00e9mon de chanter en utilisant une longueur d'onde qui endort ses ennemis."
        },
        {
            "nom": "Grodoudou",
            "description": "Grodoudou a des yeux immenses et \u00e9carquill\u00e9s. La surface de ses yeux est couverte d'une fine couche de larmes. Si de la poussi\u00e8re est projet\u00e9e dans les yeux de ce Pok\u00e9mon, elle est rapidement \u00e9vacu\u00e9e."
        },
        {
            "nom": "Nosferapti",
            "description": "Nosferapti reste calme et immobile dans un coin sombre pendant la journ\u00e9e. En effet, une exposition trop longue \u00e0 la lumi\u00e8re du soleil lui br\u00fble l\u00e9g\u00e8rement la peau."
        },
        {
            "nom": "Nosferalto",
            "description": "Nosferalto adore boire le sang des cr\u00e9atures vivantes. Il est particuli\u00e8rement actif pendant les nuits noires. Ce Pok\u00e9mon se balade dans les cieux \u00e9toil\u00e9s, \u00e0 la recherche de sang frais."
        },
        {
            "nom": "Mystherbe",
            "description": "Pendant la journ\u00e9e, Mystherbe s'enterre dans le sol pour absorber avec son corps tout entier les nutriments pr\u00e9sents dans la terre. Plus le sol est fertile, plus ses feuilles sont brillantes."
        },
        {
            "nom": "Ortide",
            "description": "La plupart du temps, Ortide d\u00e9gage un parfum immonde du pistil de sa fleur. Lorsqu'il se sent en danger, la puanteur est encore pire. Lorsque ce Pok\u00e9mon se sent bien en s\u00e9curit\u00e9, il ne d\u00e9gage aucune odeur naus\u00e9abonde."
        },
        {
            "nom": "Rafflesia",
            "description": "Le pollen toxique de Rafflesia d\u00e9clenche d'affreuses r\u00e9actions allergiques. C'est pourquoi il est conseill\u00e9 de ne jamais s'approcher des jolies fleurs trouv\u00e9es dans la jungle, m\u00eame lorsqu'elles sont magnifiques."
        },
        {
            "nom": "Paras",
            "description": "Paras accueille des champignons parasites appel\u00e9s tochukaso qui poussent sur son dos. Ils grandissent gr\u00e2ce aux nutriments trouv\u00e9s sur le dos de ce Pok\u00e9mon Insecte."
        },
        {
            "nom": "Parasect",
            "description": "On sait que les Parasect vivent en groupe dans les grands arbres et se nourrissent des nutriments contenus dans le tronc et les racines. Lorsqu'un arbre infest\u00e9 meurt, ils se pr\u00e9cipitent vers le prochain."
        },
        {
            "nom": "Mimitoss",
            "description": "On raconte que Mimitoss a \u00e9volu\u00e9 avec une fourrure de poils fins et drus qui prot\u00e8ge son corps tout entier. Il est dot\u00e9 de grands yeux capables de rep\u00e9rer ses proies, m\u00eame minuscules."
        },
        {
            "nom": "A\u00e9romite",
            "description": "A\u00e9romite est un Pok\u00e9mon nocturne, il ne sort donc que la nuit. Ses proies pr\u00e9f\u00e9r\u00e9es sont les petits insectes qui se rassemblent autour des r\u00e9verb\u00e8res, attir\u00e9s par la lumi\u00e8re."
        },
        {
            "nom": "Taupiqueur",
            "description": "Les Taupiqueur sont \u00e9lev\u00e9s dans la plupart des fermes. En effet, lorsque ce Pok\u00e9mon creuse quelque part, le sol est comme labour\u00e9, pr\u00eat \u00e0 recevoir les semences. On peut alors y planter de d\u00e9licieux l\u00e9gumes."
        },
        {
            "nom": "Triopikeur",
            "description": "Les Triopikeur sont en fait des tripl\u00e9s qui ont \u00e9merg\u00e9 du m\u00eame corps. C'est pourquoi chaque tripl\u00e9 pense exactement comme les deux autres. Ils creusent inlassablement, dans une coop\u00e9ration parfaite."
        },
        {
            "nom": "Miaouss",
            "description": "Miaouss peut rentrer ses griffes dans ses pattes pour r\u00f4der gracieusement sans laisser de traces. \u00c9trangement, ce Pok\u00e9mon raffole des pi\u00e8ces d'or qui brillent \u00e0 la lumi\u00e8re."
        },
        {
            "nom": "Persian",
            "description": "Persian a six grosses vibrisses qui lui donnent un air costaud et lui permettent de sentir les mouvements de l'air pour savoir ce qui se trouve \u00e0 proximit\u00e9. Il devient docile lorsqu'on l'attrape par les moustaches."
        },
        {
            "nom": "Psykokwak",
            "description": "Psykokwak utilise un myst\u00e9rieux pouvoir. Ce Pok\u00e9mon peut g\u00e9n\u00e9rer des ondes c\u00e9r\u00e9brales normalement observ\u00e9es chez les dormeurs. Cette d\u00e9couverte a lanc\u00e9 une pol\u00e9mique dans le milieu universitaire."
        },
        {
            "nom": "Akwakwak",
            "description": "Les pattes avant et arri\u00e8re palm\u00e9es et le corps a\u00e9rodynamique d'Akwakwak lui donnent une vitesse effrayante. Ce Pok\u00e9mon est bien plus rapide que les plus grands champions de natation."
        },
        {
            "nom": "F\u00e9rosinge",
            "description": "Lorsque F\u00e9rosinge commence \u00e0 trembler et que sa respiration devient haletante, cela signifie qu'il est en col\u00e8re. En outre, la moutarde lui monte au nez tellement vite qu'il est presque impossible d'\u00e9chapper \u00e0 sa col\u00e8re."
        },
        {
            "nom": "Colossinge",
            "description": "Lorsque Colossinge devient furieux, sa circulation sanguine s'acc\u00e9l\u00e8re. Du coup, ses muscles sont encore plus puissants. En revanche, il devient bien moins intelligent."
        },
        {
            "nom": "Caninos",
            "description": "Caninos a un odorat tr\u00e8s d\u00e9velopp\u00e9. Ce Pok\u00e9mon n'oublie jamais un parfum, quel qu'il soit. Il utilise son puissant sens olfactif pour deviner les \u00e9motions des autres cr\u00e9atures vivantes."
        },
        {
            "nom": "Arcanin",
            "description": "Arcanin est c\u00e9l\u00e8bre pour son extraordinaire vitesse. On le dit capable de parcourir plus de 10 000 km en 24 h. Le feu qui fait rage \u00e0 l'int\u00e9rieur du corps de ce Pok\u00e9mon est la source de son pouvoir."
        },
        {
            "nom": "Ptitard",
            "description": "Ptitard a une peau tr\u00e8s fine. On peut m\u00eame voir les entrailles en spirale de ce Pok\u00e9mon \u00e0 travers sa peau. Malgr\u00e9 sa finesse, cette peau est aussi tr\u00e8s \u00e9lastique. M\u00eame les crocs les plus ac\u00e9r\u00e9s rebondissent dessus."
        },
        {
            "nom": "T\u00eatarte",
            "description": "La peau de T\u00eatarte est toujours maintenue humide par un liquide huileux. Gr\u00e2ce \u00e0 cette protection graisseuse, il peut facilement se glisser hors de l'\u00e9treinte de n'importe quel ennemi."
        },
        {
            "nom": "Tartard",
            "description": "Les muscles solides et surd\u00e9velopp\u00e9s de Tartard ne se fatiguent jamais, quels que soient les efforts qu'il produit. Ce Pok\u00e9mon est tellement endurant qu'il peut traverser un oc\u00e9an \u00e0 la nage avec une \u00e9tonnante facilit\u00e9."
        },
        {
            "nom": "Abra",
            "description": "Abra dort dix-huit heures par jour. Pourtant, il peut sentir la pr\u00e9sence de ses ennemis, m\u00eame endormi. Dans ce genre de situation, ce Pok\u00e9mon se t\u00e9l\u00e9porte en lieu s\u00fbr."
        },
        {
            "nom": "Kadabra",
            "description": "Kadabra \u00e9met une onde alpha si particuli\u00e8re qu'elle vous donne mal \u00e0 la t\u00eate. Seuls les gens avec un psychisme puissant peuvent esp\u00e9rer devenir Dresseur de ce Pok\u00e9mon."
        },
        {
            "nom": "Alakazam",
            "description": "Le cerveau d'Alakazam grossit sans arr\u00eat, si bien que sa t\u00eate devient trop lourde pour son cou. Ce Pok\u00e9mon maintient sa t\u00eate relev\u00e9e gr\u00e2ce \u00e0 son pouvoir t\u00e9l\u00e9kin\u00e9tique."
        },
        {
            "nom": "Machoc",
            "description": "Les muscles de Machoc sont sp\u00e9ciaux. Quels que soient les efforts qu'il produit, il n'a jamais de courbature. Ce Pok\u00e9mon est assez puissant pour lancer une centaine d'hommes adultes."
        },
        {
            "nom": "Machopeur",
            "description": "Les muscles toniques de Machopeur sont durs comme de l'acier. Ce Pok\u00e9mon est si fort qu'il peut facilement soulever un sumo avec un seul doigt."
        },
        {
            "nom": "Mackogneur",
            "description": "Mackogneur est capable de d\u00e9placer n'importe quelle masse. Cependant ses bras s'emm\u00ealent d\u00e8s qu'il essaie de r\u00e9aliser un travail d\u00e9licat ou minutieux. Ce Pok\u00e9mon a tendance \u00e0 cogner d'abord et \u00e0 r\u00e9fl\u00e9chir ensuite."
        },
        {
            "nom": "Ch\u00e9tiflor",
            "description": "Le corps long et flexible de Ch\u00e9tiflor lui permet de se tordre et d'osciller pour \u00e9viter tout type d'attaque, m\u00eames les plus puissantes. Ce Pok\u00e9mon crache un fluide corrosif qui peut m\u00eame dissoudre le fer."
        },
        {
            "nom": "Boustiflor",
            "description": "Boustiflor est dot\u00e9 d'un gros crochet. La nuit, ce Pok\u00e9mon s'accroche \u00e0 une branche pour s'endormir. Quand il a le sommeil agit\u00e9, il se r\u00e9veille par terre."
        },
        {
            "nom": "Empiflor",
            "description": "Empiflor est dot\u00e9 d'une longue liane qui part de sa t\u00eate. Cette liane se balance et remue comme un animal pour attirer ses proies. Lorsque l'une d'elles s'approche un peu trop pr\u00e8s, ce Pok\u00e9mon l'avale enti\u00e8rement."
        },
        {
            "nom": "Tentacool",
            "description": "Le corps de Tentacool est principalement aqueux. Si on le retire de l'eau, il se d\u00e9shydrate compl\u00e8tement. Si cela arrive, il suffit de le replonger dans un liquide pour qu'il reprenne sa forme normale."
        },
        {
            "nom": "Tentacruel",
            "description": "Tentacruel a deux gros globes sur la t\u00eate. Les globes s'illuminent lorsqu'il va envoyer un violent rayon d'ultrasons. Lorsque ce Pok\u00e9mon se d\u00e9cha\u00eene, il cr\u00e9e d'\u00e9normes vagues autour de lui."
        },
        {
            "nom": "Racaillou",
            "description": "Lorsqu'un Racaillou prend de l'\u00e2ge, ses bords s'\u00e9br\u00e8chent et s'usent, ce qui lui donne une apparence plus ronde. Cependant, le c\u0153ur de ce Pok\u00e9mon reste dur, rocailleux et rugueux."
        },
        {
            "nom": "Gravalanch",
            "description": "Gravalanch grandit en se nourrissant de cailloux. Apparemment, il a une pr\u00e9f\u00e9rence pour les cailloux recouverts de mousse. En moyenne, il mange une tonne de rochers par jour."
        },
        {
            "nom": "Grolem",
            "description": "Grolem vit \u00e0 la montagne. Lorsqu'il y a un tremblement de terre, ces Pok\u00e9mon roulent en groupe vers les contreforts montagneux."
        },
        {
            "nom": "Ponyta",
            "description": "\u00c0 sa naissance, Ponyta est tr\u00e8s faible. Il peut \u00e0 peine tenir debout. Ce Pok\u00e9mon se muscle en tr\u00e9buchant et en tombant, lorsqu'il essaie de suivre ses parents."
        },
        {
            "nom": "Galopa",
            "description": "On voit souvent Galopa trotter dans les champs et les plaines. Cependant, lorsque ce Pok\u00e9mon s'en donne la peine, il peut galoper \u00e0 plus de 240 km/h et sa crini\u00e8re flamboyante s'embrase."
        },
        {
            "nom": "Ramoloss",
            "description": "Ramoloss trempe sa queue dans l'eau au bord des rivi\u00e8res pour attraper ses proies. Cependant, ce Pok\u00e9mon oublie souvent ce qu'il fait l\u00e0 et passe des jours entiers \u00e0 tra\u00eener au bord de l'eau."
        },
        {
            "nom": "Flagadoss",
            "description": "Flagadoss a un Kokiyas solidement attach\u00e9 \u00e0 sa queue. Du coup, il ne peut plus l'utiliser pour p\u00eacher. Flagadoss s'est donc oblig\u00e9, \u00e0 contrec\u0153ur, de nager pour attraper ses proies."
        },
        {
            "nom": "Magn\u00e9ti",
            "description": "Magn\u00e9ti s'attache aux lignes \u00e0 haute tension pour se charger en \u00e9lectricit\u00e9. Si une maison a une panne de courant, il est conseill\u00e9 de v\u00e9rifier les fusibles car on trouve parfois ces Pok\u00e9mon amass\u00e9s sur la bo\u00eete \u00e0 fusibles."
        },
        {
            "nom": "Magn\u00e9ton",
            "description": "Magn\u00e9ton \u00e9met un puissant champ magn\u00e9tique qui neutralise les appareils \u00e9lectroniques. Lorsque ces Pok\u00e9mon d\u00e9barquent en masse, les villes sonnent l'alarme et pr\u00e9viennent les habitants."
        },
        {
            "nom": "Canarticho",
            "description": "On voit souvent des Canarticho avec une tige, r\u00e9cup\u00e9r\u00e9e sur une plante quelconque. Apparemment, ils peuvent distinguer les bonnes des mauvaises. On a vu ces Pok\u00e9mon se battre pour des histoires de tiges."
        },
        {
            "nom": "Doduo",
            "description": "Les deux t\u00eates de Doduo ne dorment jamais en m\u00eame temps. Elles se reposent \u00e0 tour de r\u00f4le pour que l'une puisse monter la garde pendant que l'autre dort."
        },
        {
            "nom": "Dodrio",
            "description": "Il faut se m\u00e9fier lorsque les trois t\u00eates de Dodrio regardent dans des directions diff\u00e9rentes. Cela signifie qu'il est sur ses gardes. Si c'est le cas, il vaut mieux ne pas s'approcher de ce Pok\u00e9mon, il pourrait d\u00e9cider d'attaquer."
        },
        {
            "nom": "Otaria",
            "description": "Otaria chasse ses proie dans l'eau gel\u00e9e, sous la couche de glace. Lorsqu'il cherche \u00e0 respirer, il perce un trou en frappant la glace avec la partie saillante de sa t\u00eate."
        },
        {
            "nom": "Lamantine",
            "description": "Lamantine adore piquer un roupillon \u00e0 m\u00eame la glace. Il y a tr\u00e8s longtemps, un marin ayant aper\u00e7u ce Pok\u00e9mon dormant sur un glacier a cru voir une sir\u00e8ne."
        },
        {
            "nom": "Tadmorv",
            "description": "Le corps boueux et g\u00e9latineux de Tadmorv peut s'enfoncer dans n'importe quelle ouverture, m\u00eame la plus petite. Ce Pok\u00e9mon se prom\u00e8ne dans les tuyaux des \u00e9gouts pour boire de l'eau croupie."
        },
        {
            "nom": "Grotadmorv",
            "description": "Un fluide naus\u00e9abond suinte du corps de Grotadmorv, agressant les narines de ses ennemis. Une seule goutte de ce fluide suffit \u00e0 faire croupir un bassin d'eau propre."
        },
        {
            "nom": "Kokiyas",
            "description": "La nuit, ce Pok\u00e9mon utilise sa grande langue pour creuser un trou dans le sable des fonds marins afin d'y dormir. Une fois endormi, Kokiyas referme sa coquille, mais laisse sa langue d\u00e9passer."
        },
        {
            "nom": "Crustabri",
            "description": "Crustabri est capable de se d\u00e9placer dans les fonds marins en avalant de l'eau et en la rejetant vers l'arri\u00e8re. Ce Pok\u00e9mon envoie des pointes en utilisant la m\u00eame m\u00e9thode."
        },
        {
            "nom": "Fantominus",
            "description": "Fantominus est principalement constitu\u00e9 de mati\u00e8re gazeuse. Lorsqu'il est expos\u00e9 au vent, son corps gazeux se disperse et diminue. Des groupes de ce Pok\u00e9mon se rassemblent sous les auvents des maisons pour se prot\u00e9ger."
        },
        {
            "nom": "Spectrum",
            "description": "Spectrum est un Pok\u00e9mon dangereux. Si l'un d'entre eux fait signe d'approcher, il ne faut jamais l'\u00e9couter. Ce Pok\u00e9mon risque de sortir sa langue pour essayer de voler votre vie."
        },
        {
            "nom": "Ectoplasma",
            "description": "Parfois, pendant les nuits noires, une ombre projet\u00e9e par une r\u00e9verb\u00e8re peut tout \u00e0 coup vous d\u00e9passer. Il s'agit d'un Ectoplasma qui court, en se faisant passer pour l'ombre de quelqu'un d'autre."
        },
        {
            "nom": "Onix",
            "description": "Onix a dans le cerveau un aimant qui lui sert de boussole. Il permet \u00e0 ce Pok\u00e9mon de ne pas se perdre pendant qu'il creuse. En prenant de l'\u00e2ge, son corps s'arrondit et se polit."
        },
        {
            "nom": "Soporifik",
            "description": "Lorsque les enfants ont le nez qui les d\u00e9mange en dormant, c'est sans doute parce que ce Pok\u00e9mon se tient au-dessus de leur oreiller, afin d'essayer de manger leurs r\u00eaves par leurs narines."
        },
        {
            "nom": "Hypnomade",
            "description": "Hypnomade tient un pendule dans sa main. Le mouvement de balancier et les reflets brillants du pendule hypnotisent profond\u00e9ment son ennemi. Lorsque ce Pok\u00e9mon cherche ses proies, il nettoie son pendule."
        },
        {
            "nom": "Krabby",
            "description": "Krabby vit sur les plages, enterr\u00e9 dans le sable. Sur les plages o\u00f9 on trouve un peu de nourriture, on peut voir ces Pok\u00e9mon se disputer pour d\u00e9fendre leur territoire."
        },
        {
            "nom": "Krabboss",
            "description": "Krabboss est dot\u00e9 d'une pince gigantesque, surdimensionn\u00e9e. Il l'agite en l'air pour communiquer avec ses semblables. En revanche, sa pince est tellement lourde que ce Pok\u00e9mon se fatigue tr\u00e8s vite."
        },
        {
            "nom": "Voltorbe",
            "description": "La premi\u00e8re fois qu'on a vu Voltorbe, c'\u00e9tait dans une usine qui fabrique des Pok\u00e9 Balls. Personne n'a jamais pu expliquer le lien entre cet \u00e9v\u00e8nement et la ressemblance frappante de ce Pok\u00e9mon avec une Pok\u00e9 Ball."
        },
        {
            "nom": "\u00c9lectrode",
            "description": "\u00c9lectrode mange l'\u00e9lectricit\u00e9 qui se trouve dans l'atmosph\u00e8re. Les jours d'orage, on peut voir ce Pok\u00e9mon exploser sans arr\u00eat parce qu'il a aval\u00e9 trop d'\u00e9lectricit\u00e9."
        },
        {
            "nom": "N\u0153un\u0153uf",
            "description": "Ce Pok\u00e9mon est constitu\u00e9 de six \u0153ufs formant une grappe serr\u00e9e. Ces six \u0153ufs s'attirent mutuellement et pivotent. Quand des fissures apparaissent sur les coquilles, \u00e7a signifie que Noeunoeuf est sur le point d'\u00e9voluer."
        },
        {
            "nom": "Noadkoko",
            "description": "Noadkoko vient des tropiques. \u00c0 force de vivre sous un soleil ardent, ses t\u00eates ont rapidement grandi. On raconte que lorsque ses t\u00eates tombent, elles se rassemblent et forment un Noeunoeuf."
        },
        {
            "nom": "Osselait",
            "description": "La maman d'Osselait lui manque terriblement et il ne la reverra jamais. La lune le fait pleurer, car elle lui rappelle sa m\u00e8re. Les taches sur le cr\u00e2ne que porte ce Pok\u00e9mon sont les marques de ses larmes."
        },
        {
            "nom": "Ossatueur",
            "description": "Ossatueur est la forme \u00e9volu\u00e9e d'Osselait. il a surmont\u00e9 le chagrin caus\u00e9 par la perte de sa maman et s'est endurci. Le temp\u00e9rament d\u00e9cid\u00e9 et entier de ce Pok\u00e9mon le rend tr\u00e8s difficile \u00e0 amadouer."
        },
        {
            "nom": "Kicklee",
            "description": "Les jambes de Kicklee peuvent se contracter et s'\u00e9tirer \u00e0 volont\u00e9. Gr\u00e2ce \u00e0 ces jambes \u00e0 ressort, il terrasse ses ennemis en les rouant de coups de pied. Apr\u00e8s les combats, il masse ses jambes pour \u00e9viter de sentir la fatigue."
        },
        {
            "nom": "Tygnon",
            "description": "On raconte que Tygnon dispose de l'\u00e9tat d'esprit d'un boxeur qui s'entra\u00eene pour le championnat du monde. Ce Pok\u00e9mon est dot\u00e9 d'une t\u00e9nacit\u00e9 \u00e0 toute \u00e9preuve et n'abandonne jamais face \u00e0 l'adversit\u00e9."
        },
        {
            "nom": "Excelangue",
            "description": "Chaque fois qu'Excelangue d\u00e9couvre quelque chose de nouveau, il le l\u00e8che. Sa m\u00e9moire est bas\u00e9e sur le go\u00fbt et la texture des objets. Il n'aime pas les choses acides."
        },
        {
            "nom": "Smogo",
            "description": "Lorsque Smogo s'agite, \u00e7a augmente la toxicit\u00e9 de ses gaz internes. Il les projette ensuite par les nombreux orifices de son corps. Ce Pok\u00e9mon peut aussi gonfler son corps et le faire exploser."
        },
        {
            "nom": "Smogogo",
            "description": "Smogogo adore les gaz qui se d\u00e9gagent des aliments pourris dans les poubelles. Ce Pok\u00e9mon cherche g\u00e9n\u00e9ralement les maisons sales et mal tenues pour y habiter. La nuit, quand tout le monde est endormi, il fouille les d\u00e9tritus."
        },
        {
            "nom": "Rhinocorne",
            "description": "Rhinocorne charge droit devant lui, d\u00e9truisant tout sur son passage. Il ne s'arr\u00eate jamais, m\u00eame lorsqu'il charge un bloc d'acier. Malgr\u00e9 tout, il sent la douleur le lendemain."
        },
        {
            "nom": "Rhinof\u00e9ros",
            "description": "La corne de Rhinof\u00e9ros peut m\u00eame casser du diamant brut. Et avec un simple coup de queue, il peut d\u00e9truire un b\u00e2timent. La peau de ce Pok\u00e9mon est incroyablement dure. Un boulet de canon ne lui ferait m\u00eame pas une \u00e9gratignure."
        },
        {
            "nom": "Leveinard",
            "description": "Leveinard pond tous les jours des \u0153ufs pleins de vitamines. Ces \u0153ufs sont tellement bons que les gens les mangent m\u00eame quand ils n'ont pas faim."
        },
        {
            "nom": "Saquedeneu",
            "description": "Les lianes de Saquedeneu se brisent facilement lorsqu'on les attrape. Cela ne lui fait pas mal et lui permet simplement de s'\u00e9chapper rapidement. Les lianes cass\u00e9es repoussent le lendemain."
        },
        {
            "nom": "Kangourex",
            "description": "Lorsqu'on rencontre un petit Kangourex qui joue tout seul, il ne faut jamais le d\u00e9ranger ou essayer de l'attraper. Les parents du b\u00e9b\u00e9 Pok\u00e9mon sont s\u00fbrement dans le coin et ils risquent d'entrer dans une col\u00e8re noire."
        },
        {
            "nom": "Hypotrempe",
            "description": "Hypotrempe mange des petits insectes et de la mousse trouv\u00e9e sur les cailloux. Lorsque les courants oc\u00e9aniques sont trop forts, ce Pok\u00e9mon peut s'ancrer en accrochant sa queue aux rochers ou aux coraux."
        },,
        {
            "nom": "Hypoc\u00e9an",
            "description": "Hypoc\u00e9an s'accroche aux r\u00e9cifs de corail avant de s'endormir. Les p\u00eacheurs de coraux se font parfois piquer par les aiguillons de ce Pok\u00e9mon lorsqu'ils ne font pas attention."
        },
        {
            "nom": "Poissir\u00e8ne",
            "description": "Poissir\u00e8ne est un Pok\u00e9mon magnifique dot\u00e9 de nageoires qui ondulent \u00e9l\u00e9gamment dans les profondeurs. Il ne faut pourtant pas baisser sa garde face \u00e0 ce Pok\u00e9mon, car il peut charger avec sa puissante corne."
        },
        {
            "nom": "Poissoroy",
            "description": "En automne, on peut voir les Poissoroy m\u00e2les effectuer des danses nuptiales dans les rivi\u00e8res pour plaire aux femelles. C'est pendant cette saison que le corps de ce Pok\u00e9mon prend ses plus belles couleurs."
        },
        {
            "nom": "Stari",
            "description": "Au centre de Stari se trouve un organe rouge et brillant appel\u00e9 le c\u0153ur. \u00c0 la fin de l'\u00e9t\u00e9, sur les plages, les c\u0153urs de ces Pok\u00e9mon brillent comme les \u00e9toiles dans le ciel."
        },
        {
            "nom": "Staross",
            "description": "Le centre de Staross, son c\u0153ur, resplendit de sept diff\u00e9rentes couleurs. Du fait de sa brillance naturelle, on appelle ce Pok\u00e9mon le \u00abjoyau des mers\u00bb."
        },
        {
            "nom": "M. Mime",
            "description": "M. Mime est un pantomime hors pair. Ses gestes et ses mouvements parviennent \u00e0 faire croire que quelque chose d'invisible existe r\u00e9ellement. Lorsqu'on y croit, ces choses deviennent palpables."
        },
        {
            "nom": "Ins\u00e9cateur",
            "description": "Ins\u00e9cateur est incroyablement rapide. Sa vitesse fulgurante am\u00e9liore l'efficacit\u00e9 des deux lames situ\u00e9es sur ses avant-bras. Elles sont si coupantes qu'elles peuvent trancher un \u00e9norme tronc d'arbre en un coup."
        },
        {
            "nom": "Lippoutou",
            "description": "Lippoutou marche en rythme, ondule de tout son corps et se d\u00e9hanche comme s'il dansait. Ses mouvements sont si communicatifs que les gens qui le voient sont soudain pris d'une terrible envie de bouger les hanches, sans r\u00e9fl\u00e9chir."
        },
        {
            "nom": "\u00c9lektek",
            "description": "Lorsqu'une temp\u00eate approche, des groupes entiers de ce Pok\u00e9mon se battent pour grimper sur les hauteurs, o\u00f9 la foudre a le plus de chance de tomber. Certaines villes se servent d'\u00c9lektek en guise de paratonnerres."
        },
        {
            "nom": "Magmar",
            "description": "Lorsqu'il se bat, Magmar fait jaillir des flammes de son corps pour intimider son adversaire. Les explosions enflamm\u00e9es de ce Pok\u00e9mon d\u00e9clenchent des vagues de chaleur qui embrasent la v\u00e9g\u00e9tation environnante."
        },
        {
            "nom": "Scarabrute",
            "description": "Scarabrute est incroyablement fort. Il peut attraper un ennemi qui p\u00e8se deux fois son poids dans ses mandibules et le soulever sans le moindre probl\u00e8me. Lorsqu'il fait froid, les mouvements de ce Pok\u00e9mon sont un peu ralentis."
        },
        {
            "nom": "Tauros",
            "description": "Ce Pok\u00e9mon n'est pas satisfait s'il ne d\u00e9truit pas tout sur son passage. Lorsque Tauros ne trouve pas d'adversaire, il se rue sur de gros arbres et les d\u00e9racine pour passer ses nerfs."
        },
        {
            "nom": "Magicarpe",
            "description": "Magicarpe est un Pok\u00e9mon ridicule qui ne sait faire que des ronds dans l'eau ou se laisser porter par les courants. Son comportement a donn\u00e9 envie aux savants d'\u00e9tudier son cas."
        },
        {
            "nom": "L\u00e9viator",
            "description": "Quand Magicarpe \u00e9volue et devient L\u00e9viator, la structure de ses cellules c\u00e9r\u00e9brales est modifi\u00e9e. On pense que l'extr\u00eame violence de ce Pok\u00e9mon d\u00e9coule de cette modification."
        },
        {
            "nom": "Lokhlass",
            "description": "Les Lokhlass sont en voie d'extinction. Le soir, on entend ce Pok\u00e9mon chantonner une complainte m\u00e9lancolique, esp\u00e9rant retrouver ses rares cong\u00e9n\u00e8res."
        },
        {
            "nom": "M\u00e9tamorph",
            "description": "M\u00e9tamorph peut modifier sa structure mol\u00e9culaire pour prendre d'autres formes. Lorsqu'il essaie de se transformer de m\u00e9moire, il lui arrive de se tromper sur certains d\u00e9tails."
        },
        {
            "nom": "\u00c9voli",
            "description": "\u00c9voli a une structure g\u00e9n\u00e9tique instable qui se transforme en fonction de l'environnement dans lequel il vit. Ce Pok\u00e9mon peut \u00e9voluer gr\u00e2ce aux radiations de diverses pierres."
        },
        {
            "nom": "Aquali",
            "description": "Aquali a subi une mutation spontan\u00e9e. Des nageoires et des branchies sont apparues sur son corps, ce qui lui permet de vivre dans les fonds marins. Ce Pok\u00e9mon peut contr\u00f4ler l'eau \u00e0 volont\u00e9."
        },
        {
            "nom": "Voltali",
            "description": "Les cellules de Voltali g\u00e9n\u00e8rent un courant de faible intensit\u00e9. Ce pouvoir est amplifi\u00e9 par l'\u00e9lectricit\u00e9 statique de ses poils, ce qui lui permet d'envoyer des \u00e9clairs. Sa fourrure h\u00e9riss\u00e9e est faite d'aiguilles charg\u00e9es d'\u00e9lectricit\u00e9."
        },
        {
            "nom": "Pyroli",
            "description": "La fourrure soyeuse de Pyroli a une fonction anatomique. Elle rejette la chaleur dans l'air pour que son corps ne surchauffe pas. La temp\u00e9rature du corps de ce Pok\u00e9mon peut atteindre 900 \u00b0C."
        },
        {
            "nom": "Porygon",
            "description": "Porygon est capable de se d\u00e9compiler et de retourner \u00e0 l'\u00e9tat de programme informatique pour entrer dans le cyberespace. Ce Pok\u00e9mon est prot\u00e9g\u00e9 contre le piratage, il est donc impossible de le copier."
        },
        {
            "nom": "Amonita",
            "description": "Amonita est l'un des Pok\u00e9mon disparus depuis longtemps et qui furent ressuscit\u00e9s \u00e0 partir de fossiles. Lorsqu'il est attaqu\u00e9 par un ennemi, il se r\u00e9tracte dans sa coquille."
        },
        {
            "nom": "Amonistar",
            "description": "Amonistar utilise ses tentacules pour capturer ses proies. On pense que l'esp\u00e8ce s'est \u00e9teinte parce que sa coquille \u00e9tait devenue trop grande et trop lourde, ce qui rendait ses mouvements lents et pesants."
        },
        {
            "nom": "Kabuto",
            "description": "Kabuto est un Pok\u00e9mon ressuscit\u00e9 \u00e0 partir d'un fossile. Cependant, on a d\u00e9couvert des sp\u00e9cimens vivants. Ce Pok\u00e9mon n'a pas chang\u00e9 depuis 300 millions d'ann\u00e9es."
        },
        {
            "nom": "Kabutops",
            "description": "Jadis, Kabutops plongeait dans les profondeurs pour trouver ses proies. Apparemment, ce Pok\u00e9mon vivant sur terre est l'\u00e9volution d'une cr\u00e9ature marine, comme le prouvent les changements dans ses branchies."
        },
        {
            "nom": "Pt\u00e9ra",
            "description": "Pt\u00e9ra est un Pok\u00e9mon de l'\u00e8re des dinosaures. Il fut ressuscit\u00e9 \u00e0 partir de cellules extraites d'un morceau d'ambre. On pense qu'il \u00e9tait le roi des cieux \u00e0 l'\u00e9poque pr\u00e9historique."
        },
        {
            "nom": "Ronflex",
            "description": "Les journ\u00e9es de Ronflex se r\u00e9sument aux repas et aux siestes. C'est un Pok\u00e9mon tellement gentil que les enfants n'h\u00e9sitent pas \u00e0 jouer sur son \u00e9norme ventre."
        },
        {
            "nom": "Artikodin",
            "description": "Artikodin est un Pok\u00e9mon Oiseau l\u00e9gendaire qui peut contr\u00f4ler la glace. Le battement de ses ailes g\u00e8le l'air tout autour de lui. C'est pourquoi on dit que lorsque ce Pok\u00e9mon vole, il va neiger."
        },
        {
            "nom": "\u00e9lecthor",
            "description": "\u00c9lecthor est un Pok\u00e9mon Oiseau l\u00e9gendaire capable de contr\u00f4ler l'\u00e9lectricit\u00e9. Il vit g\u00e9n\u00e9ralement dans les nuages orageux. Ce Pok\u00e9mon gagne en puissance lorsqu'il est frapp\u00e9 par la foudre."
        },
        {
            "nom": "sulfura",
            "description": "Sulfura est un Pok\u00e9mon Oiseau l\u00e9gendaire capable de contr\u00f4ler le feu. On raconte que lorsque ce Pok\u00e9mon est bless\u00e9, il se baigne dans le magma en \u00e9bullition d'un volcan pour se soigner."
        },
        {
            "nom": "minidraco",
            "description": "Minidraco mue constamment, renouvelant sans arr\u00eat sa peau. En effet, l'\u00e9nergie vitale de son corps augmente r\u00e9guli\u00e8rement et sa mue lui permet d'\u00e9viter d'atteindre des niveaux incontr\u00f4lables."
        },
        {
            "nom": "draco",
            "description": "Draco stocke une quantit\u00e9 d'\u00e9nergie consid\u00e9rable dans son corps. On raconte qu'il peut modifier les conditions climatiques autour de lui en d\u00e9chargeant l'\u00e9nergie contenue dans les cristaux de son cou et de sa queue."
        },
        {
            "nom": "dracolosse",
            "description": "Dracolosse est capable de faire le tour de la plan\u00e8te en seize heures \u00e0 peine. C'est un Pok\u00e9mon au grand c\u0153ur qui ram\u00e8ne \u00e0 bon port les navires perdus dans les temp\u00eates."
        },
        {
            "nom": "mewtwo",
            "description": "Mewtwo est un Pok\u00e9mon cr\u00e9\u00e9 par manipulation g\u00e9n\u00e9tique. Cependant, bien que les connaissances scientifiques des humains aient r\u00e9ussi \u00e0 cr\u00e9er son corps, elles n'ont pas pu doter Mewtwo d'un c\u0153ur sensible."
        },
        {
            "nom": "mew",
            "description": "On dit que Mew poss\u00e8de le code g\u00e9n\u00e9tique de tous les autres Pok\u00e9mon. Il peut se rendre invisible \u00e0 sa guise, ce qui lui permet de ne pas se faire remarquer quand il s'approche des gens."
        },{
            "nom": "Germignon",
            "description": "Lorsqu'il se bat, Germignon secoue sa feuille pour tenir son ennemi \u00e0 distance. Un doux parfum s'en d\u00e9gage \u00e9galement, apaisant les Pok\u00e9mon qui se battent et cr\u00e9ant une atmosph\u00e8re agr\u00e9able et amicale."
        },
        {
            "nom": "Macronium",
            "description": "Le cou de Macronium est entour\u00e9 de nombreuses feuilles. Dans chacune d'elles se trouve une pousse d'arbre. Le parfum de cette pousse donne la p\u00eache aux personnes qui le sentent."
        },
        {
            "nom": "M\u00e9ganium",
            "description": "Le parfum de la fleur de M\u00e9ganium apaise et calme les esprits. Pendant les combats, ce Pok\u00e9mon \u00e9met son parfum relaxant pour att\u00e9nuer l'agressivit\u00e9 de l'ennemi."
        },
        {
            "nom": "H\u00e9ricendre",
            "description": "H\u00e9ricendre se prot\u00e8ge en faisant jaillir des flammes de son dos. Ces flammes peuvent \u00eatre violentes si le Pok\u00e9mon est en col\u00e8re. Cependant, s'il est fatigu\u00e9, seules quelques flamm\u00e8ches vacillent laborieusement."
        },
        {
            "nom": "Feurisson",
            "description": "Feurisson garde ses ennemis \u00e0 distance gr\u00e2ce \u00e0 l'intensit\u00e9 de ses flammes et \u00e0 des rafales d'air br\u00fblant. Ce Pok\u00e9mon utilise son incroyable agilit\u00e9 pour \u00e9viter les attaques, tout en enflammant ses ennemis."
        },
        {
            "nom": "Typhlosion",
            "description": "Typhlosion se cache derri\u00e8re un chatoyant nuage de chaleur qu'il cr\u00e9e en attisant ses flammes intenses. Ce Pok\u00e9mon peut g\u00e9n\u00e9rer des rafales explosives qui r\u00e9duisent tout en cendres."
        },
        {
            "nom": "Kaiminus",
            "description": "Malgr\u00e9 son tout petit corps, la m\u00e2choire de Kaiminus est tr\u00e8s puissante. Parfois, ce Pok\u00e9mon mordille les gens pour jouer, sans se rendre compte que sa morsure peut gravement blesser quelqu'un."
        },
        {
            "nom": "Crocrodil",
            "description": "Une fois que Crocrodil a referm\u00e9 sa m\u00e2choire sur son ennemi, il est impossible de le faire l\u00e2cher prise. Ses crocs sont recourb\u00e9s comme des hame\u00e7ons et ne peuvent pas \u00eatre retir\u00e9s une fois enfonc\u00e9s."
        },
        {
            "nom": "Aligatueur",
            "description": "Aligatueur impressionne ses ennemis en ouvrant son \u00e9norme gueule. Pendant les combats, il pi\u00e9tine le sol de ses puissantes pattes arri\u00e8re avant de charger ses adversaires \u00e0 pleine vitesse."
        },
        {
            "nom": "Fouinette",
            "description": "Lorsqu'un Fouinette dort, un autre monte la garde. La sentinelle r\u00e9veille les autres au moindre signe de danger. Si un de ces Pok\u00e9mon est s\u00e9par\u00e9 de sa meute, il arr\u00eate de dormir, car il a peur."
        },
        {
            "nom": "Fouinar",
            "description": "Fouinar est tr\u00e8s mince. Lorsqu'il est attaqu\u00e9, il peut s'enfuir en se faufilant habilement dans les recoins \u00e9troits. Malgr\u00e9 ses pattes courtes, ce Pok\u00e9mon est tr\u00e8s agile et rapide."
        },
        {
            "nom": "Hoothoot",
            "description": "Hoothoot est dot\u00e9 d'un organe interne qui ressent et suit la rotation de la terre. Gr\u00e2ce \u00e0 cet organe peu ordinaire, ce Pok\u00e9mon commence \u00e0 hululer tous les jours exactement \u00e0 la m\u00eame heure."
        },
        {
            "nom": "Noarfang",
            "description": "Dans l'obscurit\u00e9, Noarfang ne rate jamais une proie. Il le doit \u00e0 sa vision surd\u00e9velopp\u00e9e qui lui permet de tout voir, m\u00eame avec une lueur tr\u00e8s faible, ainsi qu'\u00e0 ses ailes tr\u00e8s souples et silencieuses."
        },
        {
            "nom": "Coxy",
            "description": "Coxy s\u00e9cr\u00e8te un fluide aromatis\u00e9 sortant des articulations de ses pattes. Ce fluide lui permet de communiquer avec ses cong\u00e9n\u00e8res. Ce Pok\u00e9mon exprime ses sentiments en modifiant l'odeur de ce fluide."
        },
        {
            "nom": "Coxyclaque",
            "description": "On dit que dans les pays o\u00f9 le ciel est d\u00e9gag\u00e9 et o\u00f9 les \u00e9toiles illuminent les cieux, vivent d'innombrables quantit\u00e9s de Coxyclaque. La raison en est simple\u00a0: l'\u00e9nergie de ce Pok\u00e9mon provient de la lumi\u00e8re des \u00e9toiles."
        },
        {
            "nom": "Mimigal",
            "description": "La toile tiss\u00e9e par Mimigal peut \u00eatre compar\u00e9e \u00e0 un second syst\u00e8me nerveux. On raconte que ce Pok\u00e9mon peut d\u00e9terminer quel type de proie touche sa toile gr\u00e2ce aux infimes vibrations des fils."
        },
        {
            "nom": "Migalos",
            "description": "\u00c0 l'extr\u00e9mit\u00e9 des pattes de Migalos, on trouve de petits crochets qui lui permettent de cavaler sur les surfaces verticales et au plafond. Ce Pok\u00e9mon peut pi\u00e9ger ses ennemis dans sa solide toile de soie."
        },
        {
            "nom": "Nostenfer",
            "description": "Lorsque Nostenfer vole depuis longtemps, il utilise ses ailes ant\u00e9rieures ou post\u00e9rieures en alternance. Il peut ais\u00e9ment changer de paire d'ailes lorsqu'il est fatigu\u00e9."
        },
        {
            "nom": "Loupio",
            "description": "Loupio rel\u00e2che des charges \u00e9lectriques positives et n\u00e9gatives de ses deux antennes pour mettre sa proie K.O. Ce Pok\u00e9mon illumine ses ampoules \u00e9lectriques pour communiquer avec ses cong\u00e9n\u00e8res."
        },
        {
            "nom": "Lanturn",
            "description": "On surnomme Lanturn \u00ab\u00a0l'\u00e9toile des profondeurs\u00a0\u00bb \u00e0 cause de son antenne lumineuse. Ce Pok\u00e9mon produit de la lumi\u00e8re en provoquant une r\u00e9action chimique entre des bact\u00e9ries et les fluides corporels de son antenne."
        },
        {
            "nom": "Pichu",
            "description": "Pichu se charge plus facilement en \u00e9lectricit\u00e9 les jours d'orage ou lorsque l'air est tr\u00e8s sec. On peut entendre le cr\u00e9pitement de l'\u00e9lectricit\u00e9 statique g\u00e9n\u00e9r\u00e9e par ce Pok\u00e9mon."
        },
        {
            "nom": "M\u00e9lo",
            "description": "Les nuits o\u00f9 il y a des \u00e9toiles filantes, on peut voir des M\u00e9lo danser en cercle. Ils dansent toute la nuit et ne s'arr\u00eatent qu'\u00e0 l'aube. Ces Pok\u00e9mon se d\u00e9salt\u00e8rent alors avec la ros\u00e9e du matin."
        },
        {
            "nom": "Toudoudou",
            "description": "Les cordes vocales de Toudoudou ne sont pas assez d\u00e9velopp\u00e9es. S'il devait chanter trop longtemps, il se ferait mal \u00e0 la gorge. Ce Pok\u00e9mon se gargarise souvent avec de l'eau fra\u00eeche puis\u00e9e dans un ruisseau clair."
        },
        {
            "nom": "Togepi",
            "description": "L'\u00e9nergie de Togepi provient des \u00e9motions positives et du plaisir exprim\u00e9 par les gens et les Pok\u00e9mon. Ce Pok\u00e9mon accumule les sentiments de bonheur dans sa coquille, puis les partage avec les autres."
        },
        {
            "nom": "Togetic",
            "description": "On raconte que Togetic est un Pok\u00e9mon qui porte chance. Si ce Pok\u00e9mon remarque quelqu'un dot\u00e9 d'un c\u0153ur pur, il appara\u00eet et partage son bonheur avec la personne en question."
        },
        {
            "nom": "Natu",
            "description": "Natu ne peut pas voler, car ses ailes n'ont pas encore fini de grandir. Si ses yeux croisent le regard de quelqu'un d'autre, il reste immobile et concentr\u00e9. Mais si la personne en question d\u00e9tourne son regard, il s'enfuit en lieu s\u00fbr."
        },
        {
            "nom": "Xatu",
            "description": "Xatu se tient debout et immobile toute la journ\u00e9e. Certains pensent que ce Pok\u00e9mon a adopt\u00e9 cette position \u00e0 cause de la terreur qu'il a ressentie en pr\u00e9voyant l'avenir."
        },
        {
            "nom": "Wattouat",
            "description": "L'\u00e9paisse fourrure cotonneuse de Wattouat se charge d'\u00e9lectricit\u00e9 statique lorsqu'on la frotte. Plus elle est charg\u00e9e, plus l'ampoule au bout de sa queue est lumineuse."
        },
        {
            "nom": "Lainergie",
            "description": "La qualit\u00e9 de la laine de Lainergie se modifie pour g\u00e9n\u00e9rer un maximum d'\u00e9lectricit\u00e9 statique avec un minimum de laine. Les sections glabres de sa peau sont r\u00e9sistantes \u00e0 l'\u00e9lectricit\u00e9."
        },
        {
            "nom": "Pharamp",
            "description": "Pharamp est si lumineux qu'on peut le voir de l'espace. Jadis, les gens utilisaient la lumi\u00e8re de ce Pok\u00e9mon pour communiquer et s'envoyer des signaux \u00e0 grande distance."
        },
        {
            "nom": "Joliflor",
            "description": "Lorsque Joliflor reste expos\u00e9 \u00e0 la lumi\u00e8re du soleil, les feuilles autour de son corps se mettent \u00e0 tournoyer. La danse de ce Pok\u00e9mon est tr\u00e8s c\u00e9l\u00e8bre dans les r\u00e9gions du sud."
        },
        {
            "nom": "Marill",
            "description": "La queue remplie d'huile de Marill lui sert de gilet de sauvetage. Parfois, on peut voir sa queue flotter \u00e0 la surface. On peut en d\u00e9duire que ce Pok\u00e9mon a plong\u00e9 sous l'eau pour se nourrir de plantes aquatiques."
        },
        {
            "nom": "Azumarill",
            "description": "Les longues oreilles d'Azumarill sont des capteurs indispensables. Lorsqu'il se concentre pour \u00e9couter, ce Pok\u00e9mon peut identifier les proies aux alentours, m\u00eame dans les cours d'eau \u00e0 fort courant ou les rapides."
        },
        {
            "nom": "Simularbre",
            "description": "Simularbre se camoufle en arbre pour \u00e9viter d'\u00eatre attaqu\u00e9 par ses ennemis. Mais \u00e9tant donn\u00e9 que ses pattes restent vertes toute l'ann\u00e9e, ce Pok\u00e9mon est facile \u00e0 rep\u00e9rer pendant l'hiver."
        },
        {
            "nom": "Tarpaud",
            "description": "Le cheveu boucl\u00e9 sur la t\u00eate de Tarpaud est la preuve de son statut de roi. On raconte que plus son cheveu est long et boucl\u00e9, plus ce Pok\u00e9mon est respect\u00e9 par ses semblables."
        },
        {
            "nom": "Granivol",
            "description": "Ce Pok\u00e9mon flotte \u00e0 la d\u00e9rive, port\u00e9 par le vent. S'il sent qu'un vent tr\u00e8s fort approche, Granivol attache ses feuilles aux autres Granivol pour ne pas \u00eatre emport\u00e9 par la bourrasque."
        },
        {
            "nom": "Floravol",
            "description": "La fleur de Floravol \u00e9clot lorsque la temp\u00e9rature atteint 18 degr\u00e9s. L'ouverture de la fleur change en fonction de la temp\u00e9rature. Certaines personnes se servent de ce Pok\u00e9mon comme d'un thermom\u00e8tre."
        },
        {
            "nom": "Cotovol",
            "description": "Cotovol traverse la mer, port\u00e9 par les vents, pour d\u00e9couvrir de nouveaux territoires. Ce Pok\u00e9mon se rapproche du sol quand le vent est trop froid."
        },
        {
            "nom": "Capumain",
            "description": "L'extr\u00e9mit\u00e9 de la queue de Capumain ressemble \u00e0 une main et peut \u00eatre utilis\u00e9e de fa\u00e7on ing\u00e9nieuse. Malheureusement, ce Pok\u00e9mon utilise tellement sa queue que ses v\u00e9ritables mains sont devenues tr\u00e8s maladroites."
        },
        {
            "nom": "Tournegrin",
            "description": "Tournegrin essaie de bouger le moins possible. C'est parce qu'il veut conserver tous les nutriments qu'il stocke dans son corps pour son \u00e9volution. Il ne mange pas, ne subsistant que gr\u00e2ce \u00e0 la ros\u00e9e matinale."
        },
        {
            "nom": "H\u00e9liatronc",
            "description": "H\u00e9liatronc convertit l'\u00e9nergie solaire en nutriments. Il remue activement pendant la journ\u00e9e, quand il fait chaud. Il redevient immobile d\u00e8s que le soleil se couche."
        },
        {
            "nom": "Yanma",
            "description": "Yanma a un champ de vision de 360 degr\u00e9s sans avoir besoin de bouger les yeux. Il vole incroyablement bien et peut faire des figures acrobatiques. Ce Pok\u00e9mon descend en piqu\u00e9 sur ses proies."
        },
        {
            "nom": "Axoloto",
            "description": "Axoloto vit g\u00e9n\u00e9ralement dans l'eau. Mais de temps en temps, il vient sur terre pour chercher \u00e0 manger. \u00c0 terre, il recouvre son corps d'un voile visqueux et toxique."
        },
        {
            "nom": "Maraiste",
            "description": "Maraiste trouve sa nourriture en laissant sa bouche ouverte dans l'eau, il attend que ses proies y p\u00e9n\u00e8trent sans faire attention. Comme ce Pok\u00e9mon est inactif, il n'a jamais tr\u00e8s faim."
        },
        {
            "nom": "Mentali",
            "description": "Mentali est extr\u00eamement loyal envers les Dresseurs qu'il respecte. On raconte que ce Pok\u00e9mon a d\u00e9velopp\u00e9 des talents divinatoires pour prot\u00e9ger son Dresseur."
        },
        {
            "nom": "Noctali",
            "description": "Noctali a \u00e9volu\u00e9 suite \u00e0 une longue exposition aux rayons lunaires. Il se cache dans les recoins sombres et attend patiemment le passage de ses ennemis. Les anneaux sur son corps s'illuminent au moment o\u00f9 il bondit."
        },
        {
            "nom": "Corn\u00e8bre",
            "description": "Jadis, Corn\u00e8bre \u00e9tait craint et d\u00e9test\u00e9, car on disait qu'il portait malheur. Ce Pok\u00e9mon est attir\u00e9 par tout ce qui brille. Parfois, il essaye de voler les bagues des filles."
        },
        {
            "nom": "Roigada",
            "description": "Tous les jours, Roigada entreprend des recherches pour r\u00e9soudre les myst\u00e8res du monde. Cependant, ce Pok\u00e9mon oublie tout ce qu'il a appris si le Kokiyas qui se trouve sur sa t\u00eate s'en va."
        },
        {
            "nom": "Feufor\u00eave",
            "description": "Feufor\u00eave effraie les gens en poussant un cri \u00e0 faire froid dans le dos, une sorte de lamentation. Ce Pok\u00e9mon utilise ses sph\u00e8res rouges pour absorber les sentiments de terreur de ses ennemis et s'en nourrir."
        },
        {
            "nom": "Zarbi",
            "description": "Ce Pok\u00e9mon a la forme d'un caract\u00e8re d'\u00e9criture antique. Personne ne sait si ces \u00e9critures antiques sont apparues avant les Zarbi ou le contraire. Des \u00e9tudes sont en cours, mais aucun r\u00e9sultat n'a \u00e9t\u00e9 annonc\u00e9."
        },
        {
            "nom": "Qulbutok\u00e9",
            "description": "Si un ou plusieurs Qulbutok\u00e9 se rencontrent, ils se mesurent les uns aux autres et font des concours d'endurance. Parfois, ils tentent de voir qui peut rester le plus longtemps sans manger. Mieux vaut \u00eatre pr\u00e9venu."
        },
        {
            "nom": "Girafarig",
            "description": "La t\u00eate \u00e0 l'arri\u00e8re de Girafarig a aussi un cerveau, mais il est plus petit. Elle attaque en r\u00e9ponse aux sons et aux odeurs. Si on approche de ce Pok\u00e9mon par derri\u00e8re, cette petite t\u00eate peut tout \u00e0 coup jaillir et mordre."
        },
        {
            "nom": "Pomdepik",
            "description": "Pomdepik s'accroche \u00e0 une branche d'arbre et attend patiemment que sa proie passe. Si ce Pok\u00e9mon est d\u00e9rang\u00e9 pendant qu'il mange par quelqu'un qui secoue son arbre, il tombe au sol et explose sans pr\u00e9venir."
        },
        {
            "nom": "Foretress",
            "description": "Foretress se cache dans sa carapace en acier tremp\u00e9. La carapace s'ouvre quand il attrape sa proie, mais cela se passe tellement vite qu'il est impossible de voir \u00e0 l'int\u00e9rieur."
        },
        {
            "nom": "Insolourdo",
            "description": "Insolourdo a une perceuse au bout de la queue. Il l'utilise pour creuser des souterrains, \u00e0 reculons. On dit que ce Pok\u00e9mon enfouit son nid aux formes complexes sous terre."
        },
        {
            "nom": "Scorplane",
            "description": "Scorplane plane dans les airs sans un bruit, comme s'il glissait. Ce Pok\u00e9mon s'accroche au visage de son ennemi gr\u00e2ce aux serres de ses pattes arri\u00e8re et aux pinces de ses pattes avant, et pique avec son dard empoisonn\u00e9."
        },
        {
            "nom": "Steelix",
            "description": "Steelix vit sous terre, encore plus profond\u00e9ment qu'Onix. On dit que ce Pok\u00e9mon creuse vers le centre de la plan\u00e8te. On a d\u00e9j\u00e0 vu ce Pok\u00e9mon descendre \u00e0 plus d'un kilom\u00e8tre de profondeur."
        },
        {
            "nom": "Snubbull",
            "description": "Snubbull terrorise les Pok\u00e9mon plus petits que lui en montrant les dents et en faisant une grimace. Cependant, ce Pok\u00e9mon est toujours un peu triste de voir ses ennemis prendre la fuite."
        },
        {
            "nom": "Granbull",
            "description": "Granbull a une m\u00e2choire inf\u00e9rieure particuli\u00e8rement d\u00e9velopp\u00e9e. Ses \u00e9normes crocs sont tellement lourds qu'ils l'obligent \u00e0 pencher la t\u00eate. Il ne mord jamais sans raison, sauf quand il a peur."
        },
        {
            "nom": "Qwilfish",
            "description": "Qwilfish se gonfle en aspirant de l'eau. Ce Pok\u00e9mon utilise la pression de l'eau aval\u00e9e pour envoyer d'un coup les pointes toxiques de son corps. Nager lui demande un gros effort."
        },
        {
            "nom": "Cizayox",
            "description": "Le corps de Cizayox est dur comme de l'acier. Les attaques ordinaires ne le d\u00e9stabilisent pas. Ce Pok\u00e9mon bat des ailes pour r\u00e9guler sa temp\u00e9rature interne."
        },
        {
            "nom": "Caratroc",
            "description": "Caratroc se cache tranquillement sous les rochers, abritant son corps dans sa carapace solide, pendant qu'il mange les Baies qu'il a mises de c\u00f4t\u00e9. Les Baies se m\u00e9langent \u00e0 ses fluides corporels pour produire du jus."
        },
        {
            "nom": "Scarhino",
            "description": "Scarhino charge ses ennemis en ligne droite, se glisse dessous, les attrape et les projette violemment d'un coup de sa puissante corne. Ce Pok\u00e9mon est tellement fort qu'il pourrait d\u00e9raciner un arbre."
        },
        {
            "nom": "Farfuret",
            "description": "Farfuret grimpe aux arbres en enfon\u00e7ant ses griffes crochues dans l'\u00e9corce. Ce Pok\u00e9mon cherche les nids qui ne sont pas surveill\u00e9s et vole les \u0152ufs pour les manger pendant que les parents sont partis."
        },
        {
            "nom": "Teddiursa",
            "description": "Ce Pok\u00e9mon aime se l\u00e9cher les paumes quand elles sont encore pleines de miel. Teddiursa concocte son propre miel en m\u00e9langeant les fruits et le pollen r\u00e9colt\u00e9 par Dardargnan."
        },
        {
            "nom": "Ursaring",
            "description": "On dit que les Ursaring trouvent leur nourriture dans les cours d'eau et les grands arbres des for\u00eats o\u00f9 ils habitent. Ce Pok\u00e9mon erre dans la for\u00eat toute la journ\u00e9e pour chercher de la nourriture."
        },
        {
            "nom": "Limagma",
            "description": "Du magma en fusion coule dans les veines de Limagma. Si ce Pok\u00e9mon est refroidi, le magma se solidifie. Son corps devient alors cassant et des morceaux s'en d\u00e9tachent, diminuant ainsi sa taille."
        },
        {
            "nom": "Volcaropod",
            "description": "La carapace de Volcaropod est en fait constitu\u00e9e de sa peau, qui s'est durcie apr\u00e8s un refroidissement. Elle est tr\u00e8s cassante et fragile. Il suffit de la toucher pour qu'elle casse. Il reprend sa forme en plongeant dans le magma."
        },
        {
            "nom": "Marcacrin",
            "description": "Marcacrin cherche sa nourriture en frottant son groin par terre. Son plat pr\u00e9f\u00e9r\u00e9 est un champignon qui pousse sous l'herbe fan\u00e9e. Ce Pok\u00e9mon d\u00e9couvre parfois des sources d'eau chaude."
        },
        {
            "nom": "Cochignon",
            "description": "Cochignon est recouvert de longs poils \u00e9pais qui lui permettent de supporter le froid hivernal. Ce Pok\u00e9mon utilise ses d\u00e9fenses pour d\u00e9terrer la nourriture cach\u00e9e sous la glace."
        },
        {
            "nom": "Corayon",
            "description": "Les branches de Corayon brillent de sept couleurs quand elles sont expos\u00e9es \u00e0 la lumi\u00e8re du soleil. Si une des branches casse, ce Pok\u00e9mon peut la faire repousser en une nuit."
        },
        {
            "nom": "R\u00e9moraid",
            "description": "R\u00e9moraid aspire de l'eau, puis la recrache \u00e0 forte pression gr\u00e2ce \u00e0 ses muscles abdominaux pour attaquer les proies volantes. Quand son \u00e9volution approche, ce Pok\u00e9mon descend le courant des rivi\u00e8res."
        },
        {
            "nom": "Octillery",
            "description": "Octillery attrape son ennemi avec ses tentacules. Ce Pok\u00e9mon essaie de l'immobiliser avant de lui ass\u00e9ner le coup final. Si l'ennemi s'av\u00e8re trop fort, Octillery lui crache de l'encre \u00e0 la figure et s'\u00e9chappe."
        },
        {
            "nom": "Cadoizo",
            "description": "Cadoizo transporte sa nourriture dans sa queue. Il y a longtemps, un c\u00e9l\u00e8bre explorateur r\u00e9ussit \u00e0 atteindre le sommet de la plus haute montagne gr\u00e2ce \u00e0 un de ces Pok\u00e9mon, qui partagea sa nourriture avec lui."
        },
        {
            "nom": "D\u00e9manta",
            "description": "Les jours de beau temps, on peut voir des bancs de D\u00e9manta sauter au-dessus des vagues. Le R\u00e9moraid qui l'accompagne ne d\u00e9range pas ce Pok\u00e9mon."
        },
        {
            "nom": "Airmure",
            "description": "Airmure est enti\u00e8rement recouvert d'une armure tr\u00e8s dure. Ce Pok\u00e9mon peut voler \u00e0 plus de 300 km/h. Il peut mettre ses ennemis en pi\u00e8ces gr\u00e2ce \u00e0 ses ailes tranchantes comme des sabres."
        },
        {
            "nom": "Malosse",
            "description": "Les Malosse chassent en meute organis\u00e9e. Ils communiquent entre eux gr\u00e2ce \u00e0 une s\u00e9rie de petits cris pour encercler leur proie. L'\u00e9tonnant travail d'\u00e9quipe de ces Pok\u00e9mon est sans comparaison."
        },
        {
            "nom": "D\u00e9molosse",
            "description": "Dans une meute de D\u00e9molosse, le leader est dot\u00e9 de cornes inclin\u00e9es vers l'arri\u00e8re. Ces Pok\u00e9mon choisissent leur chef en organisant des combats entre eux."
        },
        {
            "nom": "Hyporoi",
            "description": "Hyporoi vit au fin fond des profondeurs oc\u00e9aniques g\u00e9n\u00e9ralement inhabit\u00e9es. On a longtemps cru que le b\u00e2illement de ce Pok\u00e9mon cr\u00e9ait les tourbillons dans les oc\u00e9ans."
        },
        {
            "nom": "Phanpy",
            "description": "Pour faire son nid, Phanpy creuse un trou au bord d'une rivi\u00e8re. Il d\u00e9limite la zone autour de son nid avec sa trompe pour pr\u00e9venir les autres que ce territoire est le sien."
        },
        {
            "nom": "Donphan",
            "description": "L'attaque favorite de Donphan consiste \u00e0 se mettre en boule et \u00e0 charger son ennemi en roulant \u00e0 pleine vitesse. Une fois qu'il commence \u00e0 rouler, ce Pok\u00e9mon a du mal \u00e0 s'arr\u00eater."
        },
        {
            "nom": "Porygon2",
            "description": "Porygon2 fut cr\u00e9\u00e9 par des humains gr\u00e2ce aux progr\u00e8s de la science. Ce Pok\u00e9mon a \u00e9t\u00e9 dot\u00e9 d'une intelligence artificielle qui lui permet d'apprendre de nouveaux mouvements et des \u00e9motions par lui-m\u00eame."
        },
        {
            "nom": "Cerfrousse",
            "description": "Les superbes bois de Cerfrousse \u00e9taient vendus tr\u00e8s cher comme \u0153uvres d'art. Ce Pok\u00e9mon fut chass\u00e9 et l'esp\u00e8ce proche de l'extinction \u00e0 cause des gens qui recherchaient leurs pr\u00e9cieux bois."
        },
        {
            "nom": "Queulorior",
            "description": "Queulorior d\u00e9limite son territoire en lib\u00e9rant un fluide corporel qui sort de sa queue. On a d\u00e9couvert plus de 5 000 traces diff\u00e9rentes de fluide laiss\u00e9es par ce Pok\u00e9mon."
        },
        {
            "nom": "Debugant",
            "description": "Debugant devient nerveux s'il ne s'entra\u00eene pas tous les jours. Lorsqu'un Dresseur \u00e9l\u00e8ve ce Pok\u00e9mon, il doit \u00e9tablir et appliquer un programme d'entra\u00eenement tr\u00e8s complet."
        },
        {
            "nom": "Kapoera",
            "description": "Kapoera tournoie \u00e0 toute vitesse sur sa t\u00eate, tout en donnant des coups de pied. Cette technique combine des attaques offensives et d\u00e9fensives. Ce Pok\u00e9mon se d\u00e9place plus vite sur la t\u00eate qu'en marchant."
        },
        {
            "nom": "Lippouti",
            "description": "Lippouti court dans tous les sens et tombe assez souvent. Quand il en a l'occasion, il regarde son reflet dans l'eau pour v\u00e9rifier si son visage n'a pas \u00e9t\u00e9 sali par ses chutes."
        },
        {
            "nom": "\u00c9lekid",
            "description": "\u00c9lekid stocke de l'\u00e9lectricit\u00e9 dans son corps. S'il touche du m\u00e9tal et d\u00e9charge sans le faire expr\u00e8s son \u00e9lectricit\u00e9, ce Pok\u00e9mon fait des cercles avec ses bras pour se recharger."
        },
        {
            "nom": "Magby",
            "description": "L'\u00e9tat de sant\u00e9 de Magby peut \u00eatre devin\u00e9 selon le type de flamme qu'il crache. Si ce Pok\u00e9mon crache des flammes jaunes, c'est qu'il est en bonne sant\u00e9. Lorsqu'il est fatigu\u00e9, de la fum\u00e9e noire s'ajoute aux flammes."
        },
        {
            "nom": "\u00c9cr\u00e9meuh",
            "description": "\u00c9cr\u00e9meuh produit plus de 20 l de lait par jour. Son lait sucr\u00e9 fait le bonheur des petits et des grands. Les gens qui ne boivent pas de lait en font du yaourt."
        },
        {
            "nom": "Leuphorie",
            "description": "Leuphorie ressent la tristesse gr\u00e2ce \u00e0 son pelage duveteux. Lorsqu'il la remarque, ce Pok\u00e9mon se pr\u00e9cipite vers la personne triste pour partager avec elle un \u0152uf Chance, capable de faire na\u00eetre un sourire sur tout visage."
        },
        {
            "nom": "Raikou",
            "description": "Raikou incarne la vitesse de l'\u00e9clair. Les rugissements de ce Pok\u00e9mon lib\u00e8rent des ondes de choc provenant du ciel et frappant le sol avec la puissance de la foudre."
        },
        {
            "nom": "Entei",
            "description": "Entei incarne la col\u00e8re du magma. On pense que ce Pok\u00e9mon est n\u00e9 suite \u00e0 l'\u00e9ruption d'un volcan. Il peut envoyer d'\u00e9normes jets de flammes qui calcinent tout ce qu'ils touchent."
        },
        {
            "nom": "Suicune",
            "description": "Suicune incarne la tranquillit\u00e9 d'une source d'eau pure. Il parcourt les plaines avec gr\u00e2ce. Ce Pok\u00e9mon a le pouvoir de purifier l'eau."
        },
        {
            "nom": "Embrylex",
            "description": "Embrylex est n\u00e9 sous terre. Pour remonter \u00e0 la surface, ce Pok\u00e9mon doit manger la terre au-dessus de lui. Jusqu'\u00e0 ce qu'il y parvienne, Embrylex ne peut pas voir le visage de ses parents."
        },
        {
            "nom": "Ymphect",
            "description": "Ymphect cr\u00e9e un gaz dans son corps qu'il comprime puissamment pour se propulser, comme un avion \u00e0 r\u00e9action. Son corps est tr\u00e8s solide. Il ne l'endommage pas, m\u00eame lorsqu'il frappe de l'acier tremp\u00e9."
        },
        {
            "nom": "Tyranocif",
            "description": "Tyranocif est si incroyablement puissant qu'il peut abattre une montagne pour y faire son nid. Ce Pok\u00e9mon se prom\u00e8ne dans les montagnes pour y trouver de nouveaux adversaires."
        },
        {
            "nom": "Lugia",
            "description": "Les ailes de Lugia renferment une puissance d\u00e9vastatrice. Un simple battement de ses ailes peut d\u00e9truire de petites maisons. Du coup, ce Pok\u00e9mon a choisi de vivre loin de tout, dans les profondeurs oc\u00e9aniques."
        },
        {
            "nom": "Ho-Oh",
            "description": "Les plumes de Ho-Oh brillent de sept couleurs selon l'orientation de son corps par rapport \u00e0 la lumi\u00e8re. On raconte que ces plumes portent bonheur. On dit aussi que ce Pok\u00e9mon vit au pied d'un arc-en-ciel."
        },
        {
            "nom": "Celebi",
            "description": "Ce Pok\u00e9mon est venu du futur en voyageant dans le temps. On raconte que quand Celebi appara\u00eet, cela signifie que le futur sera bon et agr\u00e9able."
        },
        {
            "nom": "Arcko",
            "description": "Arcko est dot\u00e9 de petits crochets sous les pattes, ce qu'il lui permet de grimper aux murs. Ce Pok\u00e9mon attaque en frappant ses ennemis avec son \u00e9paisse queue."
        },
        {
            "nom": "Massko",
            "description": "Les feuilles qui poussent sur le corps de Massko sont bien pratiques lorsqu'il veut se camoufler dans la for\u00eat. Ce Pok\u00e9mon est pass\u00e9 ma\u00eetre dans l'art de grimper aux arbres."
        },
        {
            "nom": "Jungko",
            "description": "Les feuilles qui poussent sur le corps de Jungko sont extr\u00eamement tranchantes. Ce Pok\u00e9mon est tr\u00e8s agile. Il bondit de branche en branche avant de sauter sur son ennemi."
        },
        {
            "nom": "Poussifeu",
            "description": "Poussifeu ne l\u00e2che pas son Dresseur d'une semelle, marchant maladroitement derri\u00e8re lui. Ce Pok\u00e9mon crache des flammes pouvant atteindre 1000\u00b0C et des boules de feu qui carbonisent l'ennemi."
        },
        {
            "nom": "Galifeu",
            "description": "Galifeu muscle ses cuisses et ses mollets en courant dans les champs ou dans les montagnes. Les jambes de ce Pok\u00e9mon sont tr\u00e8s puissantes et rapides, capables de donner 10 coups de pied en 1 seconde."
        },
        {
            "nom": "Bras\u00e9gali",
            "description": "Au combat, Bras\u00e9gali envoie ses flammes ardentes de ses poignets. Il fait preuve d'un courage exceptionnel. Plus l'ennemi est puissant, plus les poignets de ce Pok\u00e9mon sont ardents."
        },
        {
            "nom": "Gobou",
            "description": "La nageoire sur la t\u00eate de Gobou lui sert de radar hypersensible. Il l'utilise pour sentir les mouvements de l'eau et de l'air. Ainsi, ce Pok\u00e9mon peut savoir ce qui se passe autour de lui sans avoir \u00e0 se servir de ses yeux."
        },
        {
            "nom": "Flobio",
            "description": "Le corps de Flobio est envelopp\u00e9 par un film fin et collant qui lui permet de vivre hors de l'eau. Ce Pok\u00e9mon joue dans la vase sur les plages lorsque la mar\u00e9e est basse."
        },
        {
            "nom": "Laggron",
            "description": "Laggron est tr\u00e8s fort. Tellement fort qu'il peut ais\u00e9ment tirer un rocher pesant plus d'une tonne. Ce Pok\u00e9mon est \u00e9galement dot\u00e9 d'une vue si efficace qu'il peut m\u00eame voir \u00e0 travers l'eau trouble."
        },
        {
            "nom": "Medhy\u00e8na",
            "description": "Sans se poser de questions, Medhy\u00e8na essaye de mordre tout ce qui bouge. Ce Pok\u00e9mon pourchasse sa proie jusqu'\u00e0 ce qu'elle s'\u00e9puise. Cependant, il se peut qu'il prenne peur et s'enfuie si la proie riposte."
        },
        {
            "nom": "Grahy\u00e8na",
            "description": "On peut facilement deviner quand Gray\u00e8na se pr\u00e9pare \u00e0 attaquer. Il grogne et se met \u00e0 plat ventre. Ce Pok\u00e9mon mord sauvagement ses ennemis avec ses crocs ac\u00e9r\u00e9s."
        },
        {
            "nom": "Zigzaton",
            "description": "Zigzaton se prom\u00e8ne nerveusement un peu partout. En effet, ce Pok\u00e9mon est tr\u00e8s curieux. Tout ce qu'il voit l'int\u00e9resse."
        },
        {
            "nom": "Lin\u00e9on",
            "description": "Lin\u00e9on court tr\u00e8s vite et toujours en ligne droite. Si un obstacle survient, il l'\u00e9vite en prenant un angle droit. Ce Pok\u00e9mon a beaucoup de mal \u00e0 suivre les routes l\u00e9g\u00e8rement courb\u00e9es."
        },
        {
            "nom": "Chenipotte",
            "description": "\u00c0 l'aide de ses pointes arri\u00e8re, Chenipotte d\u00e9chire l'\u00e9corce des arbres et mange la s\u00e8ve qui coule dessus. Les pattes de ce Pok\u00e9mon sont dot\u00e9es de coussinets \u00e0 ventouses pour adh\u00e9rer aux parois en verre sans en glisser."
        },
        {
            "nom": "Armulys",
            "description": "Armulys s'accroche \u00e0 une branche d'arbre avec de la soie pour \u00e9viter de tomber. Ce Pok\u00e9mon y reste tranquillement en attendant son \u00e9volution. Il regarde l'ext\u00e9rieur \u00e0 travers un petit trou dans son cocon de soie."
        },
        {
            "nom": "Charmillon",
            "description": "La nourriture pr\u00e9f\u00e9r\u00e9e de Charmillon est le pollen sucr\u00e9 des fleurs. Si on veut voir ce Pok\u00e9mon, il suffit de laisser une fleur en pot sur un rebord de fen\u00eatre. Charmillon viendra s\u00fbrement voir s'il y a du pollen."
        },
        {
            "nom": "Blindalys",
            "description": "Blindalys fabrique son cocon protecteur en s'enveloppant dans la soie qui sort de sa bouche. Une fois la soie autour de son corps, elle se met \u00e0 durcir. Ce Pok\u00e9mon pr\u00e9pare son \u00e9volution \u00e0 l'int\u00e9rieur du cocon."
        },
        {
            "nom": "Papinox",
            "description": "Papinox est instinctivement attir\u00e9 par la lumi\u00e8re. Des nu\u00e9es de ce Pok\u00e9mon sont attir\u00e9es par les r\u00e9verb\u00e8res des villes, o\u00f9 il s\u00e8me la pagaille en grignotant les feuilles des arbres en bordure de route."
        },
        {
            "nom": "N\u00e9nupiot",
            "description": "N\u00e9nupiot vit dans les \u00e9tangs et les lacs, sur lesquels il flotte \u00e0 la surface. Si sa feuille tombe, il est affaibli. De temps en temps, ce Pok\u00e9mon sort sur la terre ferme \u00e0 la recherche d'eau propre."
        },
        {
            "nom": "Lombre",
            "description": "Lombre est nocturne, il commence ses activit\u00e9s malicieuses et sournoises au cr\u00e9puscule. Lorsque ce Pok\u00e9mon rep\u00e8re des p\u00eacheurs, il s'approche de leur ligne, tire dessus et se moque de leur regard perplexe."
        },
        {
            "nom": "Ludicolo",
            "description": "Ludicolo ne peut pas s'emp\u00eacher de danser quand il entend une musique joyeuse et festive. On raconte que ce Pok\u00e9mon appara\u00eet lorsqu'il entend les enfants chanter pendant leurs randonn\u00e9es."
        },
        {
            "nom": "Grainipiot",
            "description": "Grainipiot s'accroche par la t\u00eate aux branches d'arbres. Il en profite alors pour absorber l'humidit\u00e9 de l'arbre. Plus ce Pok\u00e9mon boit d'eau, plus son corps devient brillant."
        },
        {
            "nom": "Pifeuil",
            "description": "Les Pifeuil vivent dans des for\u00eats tr\u00e8s dens\u00e9ment bois\u00e9es. Il leur arrive de sortir de la for\u00eat pour faire peur aux gens. Ce Pok\u00e9mon d\u00e9teste qu'on lui pince son grand nez."
        },
        {
            "nom": "Tengalice",
            "description": "Tengalice est un Pok\u00e9mon myst\u00e9rieux que l'on dit de vivre au-dessus des arbres imposants datant de plus de mille ans. Il cr\u00e9e des temp\u00eates terribles avec les feuilles \u00e9ventail qu'il d\u00e9tient."
        },
        {
            "nom": "Nirondelle",
            "description": "Nirondelle d\u00e9fend courageusement son territoire contre ses ennemis, m\u00eame les plus puissants. Ce vaillant Pok\u00e9mon est toujours pr\u00eat \u00e0 relever un d\u00e9fi, mais s'il a faim, il se met \u00e0 pleurer \u00e0 chaudes larmes."
        },
        {
            "nom": "H\u00e9l\u00e9delle",
            "description": "H\u00e9l\u00e9delle vole dans les cieux en dessinant de grands arcs. Ce Pok\u00e9mon plonge en piqu\u00e9 d\u00e8s qu'il rep\u00e8re sa proie. Il attrape fermement la malheureuse cible dans ses serres, emp\u00eachant toute fuite."
        },
        {
            "nom": "Go\u00e9lise",
            "description": "Go\u00e9lise a l'habitude de transporter ses proies et ses objets de valeur dans son bec avant de les cacher. Ce Pok\u00e9mon se laisse porter par le vent et vole comme s'il surfait dans les cieux."
        },
        {
            "nom": "Bekipan",
            "description": "Bekipan est un transporteur volant chargeant des petits Pok\u00e9mon et des \u0152ufs dans son \u00e9norme bec. Ce Pok\u00e9mon construit son nid sur les falaises, face \u00e0 la mer."
        },
        {
            "nom": "Tarsal",
            "description": "Tarsal ressent les \u00e9motions des gens gr\u00e2ce \u00e0 ses cornes. Ce Pok\u00e9mon se montre rarement, mais il arrive qu'il s'approche d'une personne s'il la sent dans un \u00e9tat d'esprit positif."
        },
        {
            "nom": "Kirlia",
            "description": "On dit qu'un Kirlia expos\u00e9 aux \u00e9motions positives de son Dresseur devient tr\u00e8s beau. Le cerveau surd\u00e9velopp\u00e9 de ce Pok\u00e9mon lui permet de contr\u00f4ler les forces t\u00e9l\u00e9kin\u00e9tiques."
        },
        {
            "nom": "Gardevoir",
            "description": "Gardevoir a le pouvoir de pr\u00e9dire l'avenir. On raconte que lorsqu'il sent que son Dresseur est en danger, il lib\u00e8re une puissante d\u00e9charge d'\u00e9nergie t\u00e9l\u00e9kin\u00e9tique."
        },
        {
            "nom": "Arakdo",
            "description": "Du bout de ses pattes, Arakdo s\u00e9cr\u00e8te une huile lui permettant de marcher sur l'eau, comme s'il glissait. Ce Pok\u00e9mon se nourrit des organismes microscopiques pr\u00e9sents dans les lacs et les \u00e9tangs."
        },
        {
            "nom": "Maskadra",
            "description": "Maskadra intimide ses ennemis gr\u00e2ce aux motifs en forme de regard sur ses antennes. En battant des ailes, ce Pok\u00e9mon peut voler librement dans toutes les directions, m\u00eame lat\u00e9ralement ou \u00e0 reculons."
        },
        {
            "nom": "Balignon",
            "description": "Les Balignon vivent dans les sols humides et les recoins sombres des grandes for\u00eats. On les trouve souvent immobiles sous les feuilles mortes. Ce Pok\u00e9mon se nourrit d'un compost fait de feuilles mortes pourries."
        },
        {
            "nom": "Chapignon",
            "description": "Chapignon se rapproche de son ennemi en se servant de son jeu de jambes, puis donne des coups de poings avec ses bras \u00e9lastiques. La technique de combat de ce Pok\u00e9mon est digne des meilleurs boxeurs."
        },
        {
            "nom": "Parecool",
            "description": "Parecool se pr\u00e9lasse plus de vingt heures par jour. Il bouge tellement peu qu'il n'a presque pas besoin de manger. Le repas quotidien de ce Pok\u00e9mon n'est constitu\u00e9 que de trois feuilles."
        },
        {
            "nom": "Vigoroth",
            "description": "Vigoroth est toujours impatient de se d\u00e9fouler. Il ne supporte pas l'id\u00e9e de rester sans rien faire, m\u00eame une minute. Le niveau de stress de ce Pok\u00e9mon augmente \u00e9norm\u00e9ment s'il ne peut pas bouger."
        },
        {
            "nom": "Monafl\u00e8mit",
            "description": "Monafl\u00e8mit passe toute sa journ\u00e9e allong\u00e9 \u00e0 paresser. Il mange toute l'herbe qu'il trouve \u00e0 port\u00e9e de main. Ensuite, il change d'endroit, \u00e0 contrec\u0153ur."
        },
        {
            "nom": "Ningale",
            "description": "Ningale vit depuis des ann\u00e9es sous terre, dans l'obscurit\u00e9 la plus totale. Ce Pok\u00e9mon absorbe les nutriments des racines des arbres. Il reste immobile, attendant patiemment son \u00e9volution."
        },
        {
            "nom": "Ninjask",
            "description": "Ninjask se d\u00e9place tellement vite qu'il est impossible de le voir. En revanche, on entend clairement son cri. On a pendant tr\u00e8s longtemps cru que ce Pok\u00e9mon \u00e9tait invisible."
        },
        {
            "nom": "Munja",
            "description": "Le corps robuste de Munja ne bouge pas d'un pouce. En fait, son corps semble \u00eatre une coquille vide. Certains croient que ce Pok\u00e9mon peut voler l'\u00e2me de quiconque regarderait \u00e0 l'int\u00e9rieur de son corps creux."
        },
        {
            "nom": "Chuchmur",
            "description": "G\u00e9n\u00e9ralement, la voix de Chuchmur est tr\u00e8s douce, \u00e0 peine audible, m\u00eame si on tend l'oreille. Pourtant, lorsque ce Pok\u00e9mon sent l'approche du danger, il se met \u00e0 crier si fort qu'il peut d\u00e9chirer des tympans."
        },
        {
            "nom": "Ramboum",
            "description": "Le hurlement de Ramboum est si fort qu'il peut faire s'effondrer une petite maison en bois. Il se sert de sa voix pour punir ses ennemis. Les oreilles de ce Pok\u00e9mon servent de haut-parleurs."
        },
        {
            "nom": "Brouhabam",
            "description": "Brouhabam peut d\u00e9clencher des tremblements de terre gr\u00e2ce aux vibrations de son hurlement. Lorsque ce Pok\u00e9mon inspire fortement, cela signifie qu'il se pr\u00e9pare \u00e0 pousser un gigantesque rugissement."
        },
        {
            "nom": "Makuhita",
            "description": "Makuhita est tenace. M\u00eame s'il est presque battu il continue \u00e0 se relever et \u00e0 attaquer son ennemi. Chaque fois qu'il se rel\u00e8ve, ce Pok\u00e9mon stocke plus d'\u00e9nergie en vue de sa future \u00e9volution."
        },
        {
            "nom": "Hariyama",
            "description": "Hariyama s'entra\u00eene \u00e0 donner ses coups directs avec sa paume le plus souvent possible. Un seul de ces puissants coups de paume peut plier un poteau t\u00e9l\u00e9phonique en deux."
        },
        {
            "nom": "Azurill",
            "description": "Azurill fait tournoyer sa queue comme un lasso et l'envoie si fort que le reste de son corps est \u00e9galement projet\u00e9. Le record de lancer de ce Pok\u00e9mon est actuellement de 10 m."
        },
        {
            "nom": "Tarinor",
            "description": "Le nez magn\u00e9tique de Tarinor pointe toujours vers le nord. Si deux de ces Pok\u00e9mon se rencontrent, ils ne peuvent pas se faire face car leurs nez magn\u00e9tiques se repoussent."
        },
        {
            "nom": "Skitty",
            "description": "Skitty a pris l'habitude de pourchasser les objets mobiles qui le fascinent. On sait que ce Pok\u00e9mon court souvent apr\u00e8s sa queue, jusqu'\u00e0 ce qu'il ait la t\u00eate qui tourne."
        },
        {
            "nom": "Delcatty",
            "description": "Delcatty pr\u00e9f\u00e8re vivre une existence sans contraintes, au cours de laquelle chacun pourrait faire ce qu'il veut. Comme ce Pok\u00e9mon mange et dort quand il le d\u00e9cide, son rythme de vie est totalement al\u00e9atoire."
        },
        {
            "nom": "T\u00e9n\u00e9fix",
            "description": "Les T\u00e9n\u00e9fix m\u00e8nent une vie tranquille dans les cavernes. Pourtant, ils sont craints, car on raconte que ces Pok\u00e9mon volent l'esprit des gens quand leurs yeux brillent dans l'obscurit\u00e9."
        },
        {
            "nom": "Mysdibule",
            "description": "Les \u00e9normes m\u00e2choires de Mysdibule sont en r\u00e9alit\u00e9 des cornes en m\u00e9tal transform\u00e9es. Son visage doux et gentil est un leurre pour tromper l'ennemi. Quand l'ennemi s'y attend le moins, il le croque d'un coup de m\u00e2choire."
        },
        {
            "nom": "Galekid",
            "description": "Ce Pok\u00e9mon a un corps en acier. Pour constituer son corps, Galekid se nourrit de minerai de fer extrait des montagnes. De temps en temps, il cause de nombreux d\u00e9g\u00e2ts en mangeant des ponts ou des rails."
        },
        {
            "nom": "Galegon",
            "description": "Galegon adoucit son corps d'acier en buvant une eau min\u00e9rale jusqu'\u00e0 ce qu'il soit tout boursoufl\u00e9. Ce Pok\u00e9mon fait son nid pr\u00e8s des sources d'eau min\u00e9rale riches en nutriments."
        },
        {
            "nom": "Galeking",
            "description": "Galeking marque son territoire autour d'une montagne enti\u00e8re. Il combat sans merci quiconque p\u00e9n\u00e8tre dans son environnement. Ce Pok\u00e9mon patrouille sans arr\u00eat sur son territoire."
        },
        {
            "nom": "M\u00e9ditikka",
            "description": "M\u00e9ditikka poursuit un difficile entra\u00eenement mental dans les montagnes. Cependant, \u00e0 chaque fois qu'il m\u00e9dite, ce Pok\u00e9mon perd sa concentration. Du coup, son entra\u00eenement ne s'arr\u00eate jamais."
        },
        {
            "nom": "Charmina",
            "description": "On dit que gr\u00e2ce \u00e0 la m\u00e9ditation, Charmina stocke de l'\u00e9nergie dans son corps et affine son sixi\u00e8me sens. Ce Pok\u00e9mon se cache des autres en se fondant dans les champs et les montagnes."
        },
        {
            "nom": "Dynavolt",
            "description": "Dynavolt stocke de l'\u00e9lectricit\u00e9 dans les poils de son corps allong\u00e9. Ce Pok\u00e9mon stimule les muscles de ses jambes avec des charges \u00e9lectriques, ce qui le rend capable d'acc\u00e9l\u00e9rations fulgurantes."
        },
        {
            "nom": "\u00c9lecsprint",
            "description": "La crini\u00e8re d'\u00c9lecsprint lib\u00e8re constamment de l'\u00e9lectricit\u00e9. Les \u00e9tincelles d\u00e9clenchent parfois des feux de for\u00eat. Au d\u00e9but de ses combats, ce Pok\u00e9mon cr\u00e9e des nuages orageux."
        },
        {
            "nom": "Posipi",
            "description": "Posipi sert de supporter \u00e0 ses partenaires. Chaque fois qu'un membre de son \u00e9quipe fait une belle action dans un combat, ce Pok\u00e9mon court-circuite son corps et lib\u00e8re des \u00e9tincelles pour montrer sa joie."
        },
        {
            "nom": "N\u00e9gapi",
            "description": "N\u00e9gapi n'h\u00e9site pas \u00e0 se mettre en danger pour soutenir ses partenaires. Il court-circuite son corps pour faire jaillir des gerbes d'\u00e9tincelles et de donner du c\u0153ur \u00e0 l'ouvrage \u00e0 ses \u00e9quipiers."
        },
        {
            "nom": "Muciole",
            "description": "\u00c0 la tomb\u00e9e de la nuit, la queue de Muciole \u00e9met de la lumi\u00e8re. Il communique avec les autres en ajustant l'intensit\u00e9 et le clignotement de sa lumi\u00e8re. Ce Pok\u00e9mon est attir\u00e9 par le doux parfum de Lumivole."
        },
        {
            "nom": "Lumivole",
            "description": "Lumivole peut attirer un essaim de Muciole gr\u00e2ce \u00e0 son doux parfum. Une fois les Muciole rassembl\u00e9s, ce Pok\u00e9mon dirige cette nu\u00e9e lumineuse et lui fait dessiner des figures g\u00e9om\u00e9triques dans la nuit \u00e9toil\u00e9e."
        },
        {
            "nom": "Ros\u00e9lia",
            "description": "Ros\u00e9lia utilise ses \u00e9pines pointues comme projectiles si on tente de cueillir les fleurs sur ses bras. Le parfum de ce Pok\u00e9mon apporte s\u00e9r\u00e9nit\u00e9 et pl\u00e9nitude \u00e0 ceux qui le sentent."
        },
        {
            "nom": "Gloupti",
            "description": "Virtuellement, le corps de Gloupti n'est qu'un estomac. Il est capable d'avaler des objets aussi gros que lui. L'estomac de ce Pok\u00e9mon contient un fluide sp\u00e9cial qui lui permet de dig\u00e9rer n'importe quoi."
        },
        {
            "nom": "Avaltout",
            "description": "Lorsqu'Avaltout rep\u00e8re une proie, il lib\u00e8re une substance terriblement toxique de ses pores et en enduit son ennemi pour l'affaiblir. Ce Pok\u00e9mon peut ensuite l'avaler d'un coup dans sa gigantesque bouche."
        },
        {
            "nom": "Carvanha",
            "description": "Les m\u00e2choires surd\u00e9velopp\u00e9es de Carvanha et ses crocs ac\u00e9r\u00e9s sont si puissants qu'ils peuvent d\u00e9chirer la coque des bateaux. De nombreux navires ont \u00e9t\u00e9 attaqu\u00e9s et coul\u00e9s par ce Pok\u00e9mon."
        },
        {
            "nom": "Sharpedo",
            "description": "Surnomm\u00e9 le \u00abtyran des mers\u00bb, Sharpedo est craint de par le monde. Ses crocs mena\u00e7ants repoussent lorsqu'ils se brisent. Un seul de ces Pok\u00e9mon peut d\u00e9truire un p\u00e9trolier gros porteur."
        },
        {
            "nom": "Wailmer",
            "description": "Les narines de Wailmer sont situ\u00e9es au-dessus de ses yeux. Ce joyeux Pok\u00e9mon adore effrayer les gens en expulsant de l'eau de mer par les narines."
        },
        {
            "nom": "Wailord",
            "description": "Wailord est le plus grand Pok\u00e9mon d\u00e9couvert \u00e0 ce jour. Ce Pok\u00e9mon g\u00e9ant nage lascivement dans les grandes \u00e9tendues maritimes, avalant d'\u00e9normes quantit\u00e9s de nourriture en une seule de ses monstrueuses bouch\u00e9es."
        },
        {
            "nom": "Chamallot",
            "description": "Chamallot est terriblement lent d'esprit. Il ne remarque m\u00eame pas quand il est touch\u00e9. Il ne supporte pas d'avoir faim, m\u00eame une seconde. Le corps de ce Pok\u00e9mon est comparable \u00e0 un chaudron de magma."
        },
        {
            "nom": "Cam\u00e9rupt",
            "description": "Le corps de Cam\u00e9rupt renferme un volcan. Du magma \u00e0 10 000 degr\u00e9s coule dans ses veines. De temps \u00e0 temps, les bosses sur le dos de ce Pok\u00e9mon entrent en \u00e9ruption et crachent le magma surchauff\u00e9"
        },
        {
            "nom": "Chartor",
            "description": "Chartor fore les montagnes \u00e0 la recherche de charbon. Lorsqu'il en trouve, il le met dans les emplacements creux de sa carapace pour le br\u00fbler. Quand il est attaqu\u00e9, ce Pok\u00e9mon crache une \u00e9paisse fum\u00e9e noire pour s'enfuir."
        },
        {
            "nom": "Spoink",
            "description": "Spoink rebondit sur sa queue. Le choc du rebond fait battre son c\u0153ur. Du coup, ce Pok\u00e9mon ne peut pas s'arr\u00eater de rebondir, sinon, son c\u0153ur s'arr\u00eate."
        },
        {
            "nom": "Groret",
            "description": "Groret utilise les perles noires situ\u00e9es sur son corps pour amplifier la puissance de ses ondes psychiques et prendre le contr\u00f4le de son ennemi. Quand il utilise son pouvoir sp\u00e9cial, ce Pok\u00e9mon a du mal \u00e0 respirer."
        },
        {
            "nom": "Spinda",
            "description": "On raconte que chaque Spinda dispose d'un agencement de t\u00e2ches tout \u00e0 fait unique. La d\u00e9marche chancelante et titubante de ce Pok\u00e9mon donne l'impression qu'il danse."
        },
        {
            "nom": "Kraknoix",
            "description": "Le nid de Kraknoix consiste en un trou en pente creus\u00e9 dans le sable, comme une cuvette. Ce Pok\u00e9mon attend patiemment que sa proie tombe dedans. Ses gigantesque m\u00e2choires sont assez puissantes pour croquer des rochers."
        },
        {
            "nom": "Vibraninf",
            "description": "Pour mettre ses proies K.O., Vibraninf envoie des ultrasons en faisant vibrer ses deux ailes. Les ondes sonores de ce Pok\u00e9mon sont si puissantes qu'elles peuvent d\u00e9clencher des maux de t\u00eate chez les gens."
        },
        {
            "nom": "Lib\u00e9gon",
            "description": "Lib\u00e9gon est surnomm\u00e9 \u00ab\u00a0l'esprit \u00e9l\u00e9mentaire du d\u00e9sert\u00a0\u00bb. Le battement de ses ailes soul\u00e8ve des nuages de sable. C'est pourquoi ce Pok\u00e9mon est toujours entour\u00e9 d'une temp\u00eate de sable quand il vole."
        },
        {
            "nom": "Cacnea",
            "description": "Cacnea vit dans les milieux arides, tels les d\u00e9serts. Sa fleur lib\u00e8re un parfum ent\u00eatant pour attirer sa proie. Lorsqu'elle s'approche, ce Pok\u00e9mon envoie des \u00e9pines pour la neutraliser."
        },
        {
            "nom": "Cacturne",
            "description": "Pendant la journ\u00e9e, Cacturne reste immobile pour \u00e9viter de se d\u00e9shydrater sous le soleil du d\u00e9sert. Ce Pok\u00e9mon ne commence son activit\u00e9 qu'une fois la nuit tomb\u00e9e, sous une temp\u00e9rature plus fra\u00eeche."
        },
        {
            "nom": "Tylton",
            "description": "Tylton est dot\u00e9 d'ailes l\u00e9g\u00e8res et duveteuses comme des nuages cotonneux. Ce Pok\u00e9mon n'est pas tr\u00e8s sauvage. Il lui arrive d'atterir sur la t\u00eate des gens et d'y rester, comme un chapeau ouat\u00e9."
        },
        {
            "nom": "Altaria",
            "description": "Altaria danse et tournoie dans les cieux, au milieu des nuages gonfl\u00e9s et cotonneux. Ce Pok\u00e9mon chante des m\u00e9lodies de sa voix cristalline pour offrir aux auditeurs une exp\u00e9rience merveilleuse et inoubliable."
        },
        {
            "nom": "Mangriff",
            "description": "Chaques cellules du corps de Mangriff porte les stigmates de sa rivalit\u00e9 avec S\u00e9viper. Ce Pok\u00e9mon est capable d'esquiver les attaques avec une agilit\u00e9 incroyable."
        },
        {
            "nom": "S\u00e9viper",
            "description": "S\u00e9viper se querelle avec Mangriff depuis plusieurs g\u00e9n\u00e9rations. Ses cicatrices sont les preuves de ses nombreux combats. Ce Pok\u00e9mon attaque \u00e0 l'aide de sa queue, aiguis\u00e9e comme une \u00e9p\u00e9e."
        },
        {
            "nom": "S\u00e9l\u00e9roc",
            "description": "S\u00e9l\u00e9roc fut d\u00e9couvert \u00e0 c\u00f4t\u00e9 d'un crat\u00e8re de m\u00e9t\u00e9orite. Du coup, certaines personnes pensent que ce Pok\u00e9mon pourrait venir de l'espace. Cependant, rien ne peut prouver cette th\u00e9orie pour le moment."
        },
        {
            "nom": "Solaroc",
            "description": "Solaroc est une nouvelle esp\u00e8ce de Pok\u00e9mon. On raconte qu'il serait tomb\u00e9 de l'espace. Il flotte dans les airs et se d\u00e9place silencieusement. Au combat, ce Pok\u00e9mon lib\u00e8re une lumi\u00e8re intense."
        },
        {
            "nom": "Barloche",
            "description": "Les vibrisses sensibles de Barloche agissent comme un syst\u00e8me radar sophistiqu\u00e9. Ce Pok\u00e9mon se cache dans la boue, laissant d\u00e9passer ses vibrisses, et attend que sa proie passe \u00e0 proximit\u00e9."
        },
        {
            "nom": "Barbicha",
            "description": "Quand il s'agit de territoire, Barbicha est tr\u00e8s possessif. Un seul de ces Pok\u00e9mon r\u00e9clame parfois un \u00e9tang entier. Si un ennemi s'approche, il fonce sur lui et d\u00e9clenche un violent tremblement de terre."
        },
        {
            "nom": "\u00c9crapince",
            "description": "Les \u00c9crapince \u00e9taient au d\u00e9part des Pok\u00e9mon \u00e9trangers import\u00e9s comme animaux domestiques. Ils ont fini par retrouver leur \u00e9tats sauvage. Ce Pok\u00e9mon est particuli\u00e8rement robuste et sa population augmente sans arr\u00eat."
        },
        {
            "nom": "Colhomard",
            "description": "Colhomard a un temp\u00e9rament tr\u00e8s violent, ce qui le pousse \u00e0 d\u00e9fier tout ce qui passe pr\u00e8s de lui. Certaines formes de vie refusent d'habiter dans les \u00e9tangs occup\u00e9s par ce Pok\u00e9mon et d\u00e9sertent ces eaux."
        },
        {
            "nom": "Balbuto",
            "description": "Balbuto se d\u00e9place en pivotant sur son unique pied. Des peintures rupestres montrant ce Pok\u00e9mon vivant avec les hommes furent d\u00e9couvertes dans des ruines tr\u00e8s anciennes."
        },
        {
            "nom": "Kaorine",
            "description": "On raconte que les Kaorine sont des poup\u00e9es de boue cr\u00e9\u00e9es par les premiers hommes et qu'elles furent amen\u00e9es \u00e0 la vie apr\u00e8s une exposition \u00e0 un myst\u00e9rieux rayon. Ce Pok\u00e9mon se d\u00e9place en l\u00e9vitant."
        },
        {
            "nom": "Lilia",
            "description": "L'esp\u00e8ce des Lilia s'est \u00e9teinte il y a environ 100 millions d'ann\u00e9es. Cet ancien Pok\u00e9mon s'accroche \u00e0 un rocher, sous l'eau, et attrape ses proies \u00e0 l'aide de ses tentacules en forme de p\u00e9tales de fleur."
        },
        {
            "nom": "Vacilys",
            "description": "Vacilys erre dans les profondeurs de l'oc\u00e9an pour chercher de la nourriture. Ce Pok\u00e9mon peut allonger son cou \u00e0 volont\u00e9 et capturer ses proies \u00e0 l'aide de ses huit tentacules."
        },
        {
            "nom": "Anorith",
            "description": "Anorith fut ressuscit\u00e9 \u00e0 partir d'un fossile pr\u00e9historique. Ce Pok\u00e9mon primitif vivait \u00e0 l'\u00e9poque dans les eaux tropicales. Il attrape fermement sa proie avec ses deux grandes pinces."
        },
        {
            "nom": "Armaldo",
            "description": "Le puissant blindage d'Armaldo peut repousser toute attaque. Les \u00e9normes pinces de ce Pok\u00e9mon peuvent s'allonger ou se r\u00e9tracter. Elles peuvent transpercer une plaque d'acier."
        },
        {
            "nom": "Barpau",
            "description": "Les nageoires de Barpau sont ab\u00eem\u00e9es et d\u00e9chir\u00e9es d\u00e8s sa naissance. Ce Pok\u00e9mon est g\u00e9n\u00e9ralement ignor\u00e9 \u00e0 cause de son apparence mis\u00e9reuse. Il peut vivre dans la mer ou en eau douce."
        },
        {
            "nom": "Milobellus",
            "description": "Certains pr\u00e9tendent que Milobellus est le plus beau de tous les Pok\u00e9mon. Il a le pouvoir d'apaiser certaines \u00e9motions comme la col\u00e8re ou l'hostilit\u00e9, afin d'\u00e9viter les querelles inutiles."
        },
        {
            "nom": "Morph\u00e9o",
            "description": "L'apparence de Morph\u00e9o change en fonction du temps. Ce Pok\u00e9mon a appris \u00e0 utiliser l'immense pouvoir de la nature pour prot\u00e9ger son corps minuscule."
        },
        {
            "nom": "Kecleon",
            "description": "Kecleon est capable de modifier les couleurs de son corps pour se fondre dans son environnement. Il y a cependant une exception\u00a0: ce Pok\u00e9mon ne peut pas modifier la figure g\u00e9om\u00e9trique en zigzag sur son ventre."
        },
        {
            "nom": "Polichombr",
            "description": "Les Polichombr sont attir\u00e9s par les sentiments de jalousie et les esprits revanchards. Si quelqu'un veut se venger, ces Pok\u00e9mon apparaissent en nu\u00e9e et s'alignent devant la porte des gens concern\u00e9s."
        },
        {
            "nom": "Branette",
            "description": "En plantant des aiguilles dans son propre corps, Branette g\u00e9n\u00e8re de l'\u00e9nergie permettant de lancer de puissantes mal\u00e9dictions. Au d\u00e9part, ce Pok\u00e9mon n'\u00e9tait qu'une malheureuse peluche jet\u00e9e \u00e0 la poubelle."
        },
        {
            "nom": "Skel\u00e9nox",
            "description": "Skel\u00e9nox peut traverser n'importe quel mur, m\u00eame le plus \u00e9pais. Une fois que ce Pok\u00e9mon a choisi une cible, il la pourchasse sans rel\u00e2che jusqu'\u00e0 l'aube."
        },
        {
            "nom": "T\u00e9raclope",
            "description": "Le corps de T\u00e9raclope est totalement creux. Il n'y a rien du tout \u00e0 l'int\u00e9rieur. On raconte que son corps est comme un trou noir. Ce Pok\u00e9mon peut absorber n'importe quoi, mais rien n'en ressort jamais."
        },
        {
            "nom": "Tropius",
            "description": "Les enfants adorent les fruits autour du cou de Tropius. Apparemment, son penchant pour les fruits l'a conduit \u00e0 en faire pousser sur son propre corps. Il les aime tant qu'il en mange sans arr\u00eat."
        },
        {
            "nom": "\u00c9oko",
            "description": "\u00c9oko fait r\u00e9sonner son cri dans son corps creux. Lorsque ce Pok\u00e9mon est en col\u00e8re, les \u00e9chos de son cri g\u00e9n\u00e8rent des ultrasons capables d'envoyer voler des ennemis."
        },
        {
            "nom": "Absol",
            "description": "Chaque fois qu'Absol appara\u00eet devant les gens, une catastrophe comme un tremblement de terre ou un raz-de-mar\u00e9e survient peu de temps apr\u00e8s. Il est devenu tristement c\u00e9l\u00e8bre sous l'appellation de Pok\u00e9mon d\u00e9sastreux."
        },
        {
            "nom": "Ok\u00e9ok\u00e9",
            "description": "Ok\u00e9ok\u00e9 a toujours un grand sourire qui illumine son visage. On peut savoir s'il est en col\u00e8re en regardant sa queue. Lorsqu'il est furieux, sa queue remue en frappant le sol."
        },
        {
            "nom": "Stalgamin",
            "description": "Les Stalgamin vivent dans les r\u00e9gions enneig\u00e9es. Pendant les saisons sans neige, comme le printemps et l'\u00e9t\u00e9, ces Pok\u00e9mon se retirent pour vivre dans les cavernes, au milieu des stalactites et des stalagmites."
        },
        {
            "nom": "Oniglali",
            "description": "Le corps de Oniglali est fait de rochers qu'il endurcit gr\u00e2ce \u00e0 une couche de glace. Ce Pok\u00e9mon a le pouvoir de geler l'humidit\u00e9 ambiante et de lui donner n'importe quelle forme."
        },
        {
            "nom": "Obalie",
            "description": "Obalie est bien plus rapide quand il roule que quand il marche. Lorsque des groupes de ce Pok\u00e9mon mangent, ils applaudissent tous en m\u00eame temps pour montrer qu'ils sont contents. Leurs repas sont tr\u00e8s bruyants."
        },
        {
            "nom": "Phogleur",
            "description": "Phogleur a pris l'habitude de jongler avec tout ce qu'il d\u00e9couvre pour la premi\u00e8re fois. Ce Pok\u00e9mon se divertit parfois en faisant tourner un Obalie sur le bout de son museau."
        },
        {
            "nom": "Kaimorse",
            "description": "Les deux \u00e9normes d\u00e9fenses de Kaimorse peuvent d\u00e9truire en un seul coup des blocs de glace de plus de 10 t. L'\u00e9paisse couche de graisse de ce Pok\u00e9mon l'isole lorsque la temp\u00e9rature est en dessous de z\u00e9ro."
        },
        {
            "nom": "Coquiperl",
            "description": "La puissante coquille de Coquiperl ne sert pas qu'\u00e0 le prot\u00e9ger. Elle lui permet \u00e9galement de pincer et d'attraper sa proie. Une coquille de Coquiperl adulte porte souvent de nombreuses \u00e9gratignures et \u00e9raflures."
        },
        {
            "nom": "Serpang",
            "description": "L'existence de Serpang fut longtemps ignor\u00e9e, car il vit dans les profondeurs abyssales des oc\u00e9ans. Les yeux de ce Pok\u00e9mon sont excellents et peuvent m\u00eame voir \u00e0 travers les eaux troubles des grandes profondeurs."
        },
        {
            "nom": "Rosabyss",
            "description": "Rosabyss vit dans les profondeurs des mers du sud. Son corps est con\u00e7u pour supporter l'\u00e9norme pression des profondeurs abyssales. Du coup, le corps de ce Pok\u00e9mon n'est pas endommag\u00e9 par les attaques ordinaires."
        },
        {
            "nom": "Relicanth",
            "description": "Les Relicanth sont une esp\u00e8ce de Pok\u00e9mon qui a exist\u00e9 pendant 100 millions d'ann\u00e9es sans jamais changer de forme. Ce Pok\u00e9mon antique se nourrit d'organismes microscopiques avec sa bouche edent\u00e9e."
        },
        {
            "nom": "Lovdisc",
            "description": "Lovdisc vit dans les mers peu profondes des tropiques. Ce Pok\u00e9mon en forme de c\u0153ur a gagn\u00e9 son nom en nageant derri\u00e8re les couples d'amoureux qu'il rep\u00e9rait dans les eaux claires de l'oc\u00e9an."
        },
        {
            "nom": "Draby",
            "description": "Draby r\u00eave de pouvoir un jour s'\u00e9lancer dans les cieux. Bien que vou\u00e9 \u00e0 l'\u00e9chec, ce Pok\u00e9mon se jette des falaises pour essayer de voler. \u00c0 force, sa t\u00eate est devenue aussi dure que de l'acier."
        },
        {
            "nom": "Drackhaus",
            "description": "\u00c0 l'int\u00e9rieur de la carapace blind\u00e9e de Drackhaus, ses cellules sont en pleine transformation pour cr\u00e9er un nouveau corps. La carapace de ce Pok\u00e9mon est tr\u00e8s lourde, ce qui rend ses mouvements tr\u00e8s lents."
        },
        {
            "nom": "Drattak",
            "description": "Drattak a ce physique gr\u00e2ce \u00e0 son d\u00e9sir de pouvoir s'envoler. On dit que cette puissante envie a d\u00e9clench\u00e9 une soudaine mutation mol\u00e9culaire de ce Pok\u00e9mon, faisant surgir de splendides ailes."
        },
        {
            "nom": "Terhal",
            "description": "Au lieu du sang, une force magn\u00e9tique tr\u00e8s puissante coule dans les veines de Terhal. Ce Pok\u00e9mon communique avec les autres en envoyant des pulsations magn\u00e9tiques."
        },
        {
            "nom": "M\u00e9tang",
            "description": "Lorsque deux Terhal fusionnent, un M\u00e9tang appara\u00eet. Les cerveaux des Terhal sont reli\u00e9s par un syst\u00e8me nerveux magn\u00e9tique, ce qui permet \u00e0 ce Pok\u00e9mon de g\u00e9n\u00e9rer un puissant pouvoir t\u00e9l\u00e9kin\u00e9sique."
        },
        {
            "nom": "M\u00e9talosse",
            "description": "M\u00e9talosse dispose de quatre cerveaux. Combin\u00e9s, ces cerveaux peuvent effectuer des calculs tr\u00e8s complexes plus vite qu'un ordinateur. Ce Pok\u00e9mon peut flotter dans l'air en repliant ses jambes."
        },
        {
            "nom": "Regirock",
            "description": "Regirock fut isol\u00e9 par les gens il y a tr\u00e8s longtemps. Lorsque le corps de ce Pok\u00e9mon est endommag\u00e9 au combat, on raconte qu'il cherche des rochers pour se r\u00e9parer."
        },
        {
            "nom": "Regice",
            "description": "Le corps de Regice fut cr\u00e9\u00e9 pendant l'\u00e8re glaciaire. Son corps est tellement gel\u00e9 qu'il ne peut pas fondre, m\u00eame en le br\u00fblant. Ce Pok\u00e9mon peut contr\u00f4ler l'air glac\u00e9 jusqu'\u00e0 une temp\u00e9rature de -200 \u00b0C."
        },
        {
            "nom": "Registeel",
            "description": "Le corps de Registeel est plus dur que n'importe quel m\u00e9tal existant. Il est apparemment creux. Personne ne sait ce que ce Pok\u00e9mon mange."
        },
        {
            "nom": "Latias",
            "description": "Latias est extr\u00eamement sensible aux \u00e9motions des gens. S'il ressent une hostilit\u00e9, ce Pok\u00e9mon \u00e9bouriffe ses plumes et pousse un cri strident pour intimider son ennemi."
        },
        {
            "nom": "Latios",
            "description": "Latios a le pouvoir de faire voir \u00e0 une personne une image provenant de son subconscient. Ce Pok\u00e9mon est intelligent et comprend le langage humain."
        },
        {
            "nom": "Kyogre",
            "description": "Gr\u00e2ce \u00e0 l'\u00e9nergie de la nature, il peut accomplir sa Primo-R\u00e9surgence pour retrouver son apparence originelle. Ce pouvoir lui permet d'appeler de terribles d\u00e9luges pour \u00e9tendre les mers."
        },
        {
            "nom": "Groudon",
            "description": "Un Pok\u00e9mon consid\u00e9r\u00e9 comme l'avatar des continents. Selon les l\u00e9gendes, il a disput\u00e9 de nombreux combats avec Kyogre pour contr\u00f4ler l'\u00e9nergie de la nature."
        },
        {
            "nom": "Rayquaza",
            "description": "On raconte qu'il aurait plus de 10 000 ans. Selon les l\u00e9gendes, c'est gr\u00e2ce \u00e0 lui que Kyogre et Groudon ont cess\u00e9 de se battre."
        },
        {
            "nom": "Jirachi",
            "description": "Une l\u00e9gende raconte qu'\u00e0 son r\u00e9veil, Jirachi r\u00e9alise n'importe quel souhait inscrit sur les papiers coll\u00e9s sur sa t\u00eate. Si ce Pok\u00e9mon se sent en danger, il se d\u00e9fend sans m\u00eame se r\u00e9veiller."
        },
        {
            "nom": "Deoxys",
            "description": "L'ADN d'un virus extraterrestre entama une mutation non attendue suite \u00e0 une exposition \u00e0 un rayon laser, ce qui cr\u00e9a Deoxys. L'organe cristallin se trouvant sur la poitrine de ce Pok\u00e9mon semble \u00eatre son cerveau."
        },
        {
            "nom": "Tortipouss",
            "description": "Son corps produit de l'oxyg\u00e8ne par photosynth\u00e8se. La feuille sur sa t\u00eate fl\u00e9trit quand il a soif."
        },
        {
            "nom": "Boskara",
            "description": "Il sait d'instinct o\u00f9 trouver une source d'eau pure. Il y transporte d'autres Pok\u00e9mon sur son dos."
        },
        {
            "nom": "Torterra",
            "description": "Il arrive que de petits Pok\u00e9mon se rassemblent sur son dos immobile pour y faire leur nid."
        },
        {
            "nom": "Ouisticram",
            "description": "La flamme de son post\u00e9rieur br\u00fble gr\u00e2ce \u00e0 un gaz de son estomac. Elle faiblit quand il ne va pas bien."
        },
        {
            "nom": "Chimpenfeu",
            "description": "Il attaque en prenant appui sur les murs et les plafonds. Sa queue ardente n'est pas son seul atout."
        },
        {
            "nom": "Simiabraz",
            "description": "Il fait voltiger ses ennemis gr\u00e2ce \u00e0 sa vitesse et son style de combat sp\u00e9cial qui utilise ses quatre membres."
        },
        {
            "nom": "Tiplouf",
            "description": "Il est fier et d\u00e9teste accepter la nourriture qu'on lui offre. Son pelage \u00e9pais le prot\u00e8ge du froid."
        },
        {
            "nom": "Prinplouf",
            "description": "C'est un Pok\u00e9mon solitaire. Un seul coup de ses puissantes ailes peut briser un arbre en deux."
        },
        {
            "nom": "Pingol\u00e9on",
            "description": "Les trois cornes de son bec sont le symbole de sa force. Celles du chef sont plus grosses que les autres."
        },
        {
            "nom": "\u00c9tourmi",
            "description": "Ce Pok\u00e9mon tr\u00e8s bruyant parcourt champs et for\u00eats en nu\u00e9es pour chasser les Pok\u00e9mon insecte."
        },
        {
            "nom": "\u00c9tourvol",
            "description": "Il peuple les champs et les for\u00eats. Lorsque deux vol\u00e9es se croisent, elles luttent pour le territoire."
        },
        {
            "nom": "\u00c9touraptor",
            "description": "Lorsque \u00c9tourvol \u00e9volue en \u00c9touraptor, il quitte son groupe pour vivre seul. Ses ailes sont tr\u00e8s d\u00e9velopp\u00e9es."
        },
        {
            "nom": "Keunotor",
            "description": "Il ronge constamment des troncs et des pierres pour se faire les incisives. Il niche le long de l'eau."
        },
        {
            "nom": "Castorno",
            "description": "Il construit des barrages de boue et d'\u00e9corce le long des fleuves. C'est un ouvrier de renom."
        },
        {
            "nom": "Crikzik",
            "description": "Quand ses antennes s'entrechoquent, elles laissent \u00e9chapper un bruit de xylophone."
        },
        {
            "nom": "M\u00e9lokrik",
            "description": "Il exprime ses \u00e9motions par des m\u00e9lodies. Les scientifiques \u00e9tudient actuellement leur structure."
        },
        {
            "nom": "Lixy",
            "description": "Sa fourrure \u00e9tincelle en cas de danger. Il profite du fait que l'ennemi est aveugl\u00e9 pour s'enfuir."
        },
        {
            "nom": "Luxio",
            "description": "Le courant qui circule \u00e0 la pointe de ses griffes est capable de faire perdre connaissance \u00e0 ses proies."
        },
        {
            "nom": "Luxray",
            "description": "Sa capacit\u00e9 \u00e0 voir \u00e0 travers tout est tr\u00e8s utile pour d\u00e9tecter les moindres dangers."
        },
        {
            "nom": "Rozbouton",
            "description": "En hiver, son bourgeon se referme pour r\u00e9sister au froid. Il s'ouvre au printemps et lib\u00e8re du pollen."
        },
        {
            "nom": "Roserade",
            "description": "Gracieux comme un danseur, il abat ses fouets orn\u00e9s d'\u00e9pines empoisonn\u00e9es."
        },
        {
            "nom": "Kranidos",
            "description": "Un Pok\u00e9mon pr\u00e9historique dot\u00e9 d'un cr\u00e2ne tr\u00e8s solide, mais d'un cerveau tr\u00e8s peu performant."
        },
        {
            "nom": "Charkos",
            "description": "Il y a bien longtemps, les hommes fabriquaient des casques plus solides que l'acier \u00e0 partir de cr\u00e2nes de Charkos fossilis\u00e9s."
        },
        {
            "nom": "Dinoclier",
            "description": "On retrouve des fossiles de Dinoclier dans les couches s\u00e9dimentaires pr\u00e9historiques, mais seule sa t\u00eate a r\u00e9sist\u00e9 \u00e0 l'\u00e9preuve du temps."
        },
        {
            "nom": "Bastiodon",
            "description": "Un Pok\u00e9mon \u00e9teint depuis environ 100 millions d'ann\u00e9es. Sa t\u00eate incroyablement solide \u00e9tait plus dure que l'acier."
        },
        {
            "nom": "Cheniselle",
            "description": "Quand Cheniti a \u00e9volu\u00e9, sa cape a fusionn\u00e9 avec son corps. Cheniselle ne s'en s\u00e9pare jamais."
        },
        {
            "nom": "Papilord",
            "description": "Ce Pok\u00e9mon s'active \u00e0 la nuit tomb\u00e9e pour voler le miel des Apitrini pendant leur sommeil."
        },
        {
            "nom": "Apitrini",
            "description": "Il r\u00e9colte le nectar et l'am\u00e8ne \u00e0 la colonie. La nuit, les Pok\u00e9mon de cette esp\u00e8ce s'assemblent pour b\u00e2tir une ruche et s'endormir."
        },
        {
            "nom": "Apireine",
            "description": "Son abdomen est un rayon o\u00f9 vivent ses larves, \u00e9lev\u00e9es avec le nectar r\u00e9colt\u00e9 par Apitrini."
        },
        {
            "nom": "Pachirisu",
            "description": "Il arrive que deux Pachirisu se frottent les joues pour partager l'\u00e9lectricit\u00e9 qu'ils ont accumul\u00e9e."
        },
        {
            "nom": "Must\u00e9bou\u00e9e",
            "description": "Il utilise la bou\u00e9e autour de son cou pour passer la t\u00eate hors de l'eau et observer les alentours."
        },
        {
            "nom": "Must\u00e9flott",
            "description": "Il a d\u00e9velopp\u00e9 une bou\u00e9e pour poursuivre ses proies aquatiques. Elle fait office de canot gonflable."
        },
        {
            "nom": "Ceribou",
            "description": "Il aspire les nutriments de sa petite boule pour pouvoir \u00e9voluer."
        },
        {
            "nom": "Ceriflor",
            "description": "Sous un grand soleil, il ouvre ses p\u00e9tales pour en absorber les rayons."
        },
        {
            "nom": "Sancoki",
            "description": "Les scientifiques qui ont observ\u00e9 son fort pouvoir de r\u00e9g\u00e9n\u00e9ration analysent actuellement les composants de ses cellules."
        },
        {
            "nom": "Tritosor",
            "description": "Il fait partie de la m\u00eame famille que Kokiyas et Crustabri. Il sort parfois de la mer pour trouver \u00e0 manger."
        },
        {
            "nom": "Capidextre",
            "description": "Il utilise toujours ses deux queues pour faire la moindre t\u00e2che. Il s'en sert aussi pour enlacer les gens qu'il affectionne tout particuli\u00e8rement."
        },
        {
            "nom": "Baudrive",
            "description": "N\u00e9 d'une agglom\u00e9ration d'\u00e2mes errantes, il entra\u00eene les enfants par la main pour s'en faire des amis."
        },
        {
            "nom": "Grodrive",
            "description": "Si l'on en croit la rumeur, il serait possible de se rendre dans l'au-del\u00e0 en se laissant porter par le vent nocturne, accroch\u00e9 \u00e0 un Grodrive."
        },
        {
            "nom": "Laporeille",
            "description": "S'il a toujours une oreille repli\u00e9e, c'est pour \u00eatre \u00e0 m\u00eame de contre-attaquer d\u00e8s qu'un ennemi tente de s'en prendre \u00e0 lui."
        },
        {
            "nom": "Lockpin",
            "description": "Il mue deux fois par an. Les \u00e9charpes et les chapeaux fabriqu\u00e9s \u00e0 partir de ses poils tiennent bien chaud."
        },
        {
            "nom": "Magir\u00eave",
            "description": "Redout\u00e9 pour ses sortil\u00e8ges et ses mal\u00e9dictions, ce Pok\u00e9mon peut n\u00e9anmoins faire preuve de bienveillance, si l'envie lui en prend."
        },
        {
            "nom": "Corboss",
            "description": "Il ne pardonne jamais la trahison ou la d\u00e9faite d'un subordonn\u00e9. Le bien-\u00eatre de l'ensemble de la vol\u00e9e en d\u00e9pend."
        },
        {
            "nom": "Chaglam",
            "description": "Lorsqu'il est heureux, sa queue d\u00e9crit des arabesques comme un ruban de gymnastique rythmique."
        },
        {
            "nom": "Chaffreux",
            "description": "Il ceinture sa taille de sa queue bifide pour para\u00eetre plus imposant."
        },
        {
            "nom": "Korillon",
            "description": "Quand il sautille, l'orbe qu'il a dans sa bouche s'agite et tinte comme une cloche."
        },
        {
            "nom": "Moufouette",
            "description": "Il se prot\u00e8ge en expulsant un fluide nocif par son derri\u00e8re. La puanteur dure 24 heures."
        },
        {
            "nom": "Moufflair",
            "description": "Sa queue projette un fluide puant. Plus on le laisse s'\u00e9couler et plus son odeur est insoutenable."
        },
        {
            "nom": "Arch\u00e9omire",
            "description": "Il rappelle des objets trouv\u00e9s dans des s\u00e9pultures anciennes. Nul ne sait s'ils sont li\u00e9s."
        },
        {
            "nom": "Arch\u00e9odong",
            "description": "On croyait autrefois que lui adresser des pri\u00e8res faisait pleuvoir et assurait les r\u00e9coltes."
        },
        {
            "nom": "Manza\u00ef",
            "description": "Absorber trop d'humidit\u00e9 peut mettre sa vie en danger, c'est pourquoi il \u00ab\u00a0sue\u00a0\u00bb tout exc\u00e8s de liquide par les yeux."
        },
        {
            "nom": "Mime Jr.",
            "description": "Il mime tout ce qu'il voit, et s'entra\u00eene beaucoup pour reproduire les pas de danse \u00e9l\u00e9gants des M. Glaquette."
        },
        {
            "nom": "Ptiravi",
            "description": "D\u00e8s qu'il rep\u00e8re un objet rond et blanc, il le range dans sa poche ventrale. Il en ramasse parfois tellement qu'il ne peut plus bouger."
        },
        {
            "nom": "Pijako",
            "description": "On peut lui enseigner quelques mots. S'il s'agit d'un groupe, ils retiendront les m\u00eames phrases."
        },
        {
            "nom": "Spiritomb",
            "description": "Il fut emprisonn\u00e9 dans la fissure d'une cl\u00e9 de vo\u00fbte \u00e9trange en guise de punition il y a 500 ans."
        },
        {
            "nom": "Griknot",
            "description": "Il vient d'un endroit o\u00f9 il fait bien plus chaud que dans la r\u00e9gion d'Alola. La facture de chauffage est donc \u00e9lev\u00e9e quand on vit avec lui."
        },
        {
            "nom": "Carmache",
            "description": "Il mue r\u00e9guli\u00e8rement au cours de sa croissance. Les \u00e9cailles ainsi tomb\u00e9es peuvent \u00eatre pil\u00e9es pour pr\u00e9parer des rem\u00e8des traditionnels."
        },
        {
            "nom": "Carchacrok",
            "description": "Il vole \u00e0 la vitesse du son en qu\u00eate de nourriture. Drattak et lui se disputent souvent leurs proies dans des combats a\u00e9riens impressionnants."
        },
        {
            "nom": "Goinfrex",
            "description": "D\u00e8s qu'il voit quelque chose de comestible, il le ramasse et l'avale tout de go. Son estomac lui permet de dig\u00e9rer m\u00eame la nourriture avari\u00e9e."
        },
        {
            "nom": "Riolu",
            "description": "Il se sert d'auras pour communiquer avec les siens. Ses ennemis ne peuvent pas espionner ses conversations, car il n'\u00e9met aucun son."
        },
        {
            "nom": "Lucario",
            "description": "Il peut canaliser son \u00e9nergie mentale pour d\u00e9cha\u00eener des auras myst\u00e9rieuses capables de r\u00e9duire d'\u00e9normes rochers en miettes."
        },
        {
            "nom": "Hippopotas",
            "description": "Il se recouvre de sable pour se prot\u00e9ger des microbes. Il n'aime pas l'eau."
        },
        {
            "nom": "Hippodocus",
            "description": "Il emmagasine du sable qu'il expulse en tornades par les pores de sa peau pour attaquer."
        },
        {
            "nom": "Rapion",
            "description": "Il attend, en embuscade dans le sable, et empoisonne ses proies avec les pinces de sa queue."
        },
        {
            "nom": "Drascore",
            "description": "Il peut r\u00e9duire une voiture en pi\u00e8ces avec ses pinces. Le bout de ses pinces contient du poison."
        },
        {
            "nom": "Cradopaud",
            "description": "Ses glandes se gonflent de venin tout en \u00e9mettant un son effrayant, le laissant ainsi empoisonner ses proies p\u00e9trifi\u00e9es."
        },
        {
            "nom": "Coatox",
            "description": "Les griffes de ses poings s\u00e9cr\u00e8tent une toxine si atroce qu'une simple \u00e9gratignure peut s'av\u00e9rer fatale."
        },
        {
            "nom": "Vortente",
            "description": "Il s'accroche aux arbres des marais et attire ses proies avec sa salive \u00e0 l'odeur enivrante."
        },
        {
            "nom": "\u00c9cayon",
            "description": "Il attire ses proies avec ses nageoires caudales lumineuses. Il passe la journ\u00e9e \u00e0 la surface et se retire dans les abysses la nuit venue."
        },
        {
            "nom": "Lumin\u00e9on",
            "description": "Il se d\u00e9place en rampant dans les profondeurs de l'oc\u00e9an. Ses nageoires brillent telles des \u00e9toiles dans le ciel nocturne."
        },
        {
            "nom": "Babimanta",
            "description": "Il s'approche souvent des bateaux pour sympathiser avec les humains. Le motif qui orne son dos varie selon son habitat."
        },
        {
            "nom": "Blizzi",
            "description": "Au printemps, il fait pousser des Baies pareilles \u00e0 des cr\u00e8mes glac\u00e9es autour de son ventre."
        },
        {
            "nom": "Blizzaroi",
            "description": "Il hante les sommets aux neiges \u00e9ternelles, et se cache en d\u00e9clenchant des blizzards."
        },
        {
            "nom": "Dimoret",
            "description": "Il est devenu assez sournois pour ne plus avoir \u00e0 se battre pour ses proies. Quiconque entre en contact avec ses griffes souffrira de gelures."
        },
        {
            "nom": "Magn\u00e9zone",
            "description": "De nombreuses personnes pensent encore qu'il s'agit d'un Pok\u00e9mon venu de l'espace. Il \u00e9met un champ magn\u00e9tique extr\u00eamement puissant."
        },
        {
            "nom": "Coudlangue",
            "description": "Il est bien plus adroit avec sa langue qu'avec ses autres membres, au point qu'elle peut m\u00eame lui servir \u00e0 ramasser un grain de riz minuscule."
        },
        {
            "nom": "Rhinastoc",
            "description": "Il bande ses muscles pour projeter des pierres ou des Racaillou depuis le creux de ses paumes."
        },
        {
            "nom": "Bouldeneu",
            "description": "Lorsque vient la belle saison, ses lianes sont si luxuriantes qu'elles cachent ses yeux."
        },
        {
            "nom": "\u00c9lekable",
            "description": "Il suffit d'un seul \u00c9lekable pour alimenter tous les b\u00e2timents d'une m\u00e9tropole pendant un an."
        },
        {
            "nom": "Maganon",
            "description": "Il peut terrasser ses ennemis d'une seule boule de feu. Il \u00e9vite toutefois de s'en servir pour chasser, car sa proie finirait carbonis\u00e9e."
        },
        {
            "nom": "Togekiss",
            "description": "Il appr\u00e9cie particuli\u00e8rement les gens qui respectent les autres et \u00e9vitent les conflits inutiles."
        },
        {
            "nom": "Yanmega",
            "description": "Il peut voler avec aise tout en portant un adulte dans ses 6 pattes. Les ailes de sa queue lui servent de balancier."
        },
        {
            "nom": "Phyllali",
            "description": "Il n'aime pas le conflit, mais s'il doit prot\u00e9ger ses amis, il peut raidir sa queue en forme de feuille et la rendre aussi tranchante qu'une lame."
        },
        {
            "nom": "Givrali",
            "description": "Il g\u00e8le les particules d'eau qui l'entourent pour former de petits cristaux de glace, qu'il utilise ensuite pour lapider ses proies."
        },
        {
            "nom": "Scorvol",
            "description": "Il vole sans un bruit, et capture ses proies avec sa queue pour leur infliger une morsure critique."
        },
        {
            "nom": "Mammochon",
            "description": "Ses d\u00e9fenses spectaculaires sont glac\u00e9es. Il a failli dispara\u00eetre dans la canicule suivant l'\u00e8re glaciaire."
        },
        {
            "nom": "Porygon-Z",
            "description": "Le logiciel qu'on lui a implant\u00e9 \u00e9tait de toute \u00e9vidence d\u00e9faillant. Il s'agit sans doute d'une exp\u00e9rience rat\u00e9e, vu son \u00e9trange comportement."
        },
        {
            "nom": "Gallame",
            "description": "Il frappe avec les grandes lames \u00e0 ses coudes. Son talent d'escrimeur n'a d'\u00e9gal que sa courtoisie."
        },
        {
            "nom": "Tarinorme",
            "description": "Il est capable de piloter ses Mini-nez \u00e0 distance, mais il arrive que l'un d'entre eux s'aventure trop loin et se perde pour ne jamais revenir."
        },
        {
            "nom": "Noctunoir",
            "description": "L'antenne sur sa t\u00eate capte les ondes radio du monde des esprits lui ordonnant d'y porter des gens."
        },
        {
            "nom": "Momartik",
            "description": "On dit qu'il appara\u00eet dans les zones habit\u00e9es les soirs de temp\u00eate de neige. Si vous entendez toquer \u00e0 la porte, n'allez pas ouvrir\u00a0!"
        },
        {
            "nom": "Motisma",
            "description": "Un Pok\u00e9mon longtemps \u00e9tudi\u00e9 comme source d'\u00e9nergie pour un moteur tr\u00e8s sp\u00e9cial."
        },
        {
            "nom": "Cr\u00e9helf",
            "description": "On dit que sa venue a fourni aux humains le bon sens n\u00e9cessaire pour am\u00e9liorer leur existence."
        },
        {
            "nom": "Cr\u00e9follet",
            "description": "Il dort au fond d'un lac. On dit que son esprit abandonne son corps pour voler \u00e0 sa surface."
        },
        {
            "nom": "Cr\u00e9fadet",
            "description": "On raconte que Cr\u00e9helf, Cr\u00e9follet et Cr\u00e9fadet proviennent du m\u00eame \u0152uf."
        },
        {
            "nom": "Dialga",
            "description": "Il peut contr\u00f4ler le temps. Les mythes de Sinnoh en parlent comme d'une divinit\u00e9 ancienne."
        },
        {
            "nom": "Palkia",
            "description": "Il peut modeler l'espace. Les mythes de Sinnoh en parlent comme d'une divinit\u00e9 ancienne."
        },
        {
            "nom": "Heatran",
            "description": "Le sang de ce Pok\u00e9mon des crat\u00e8res bouillonne dans son corps comme du magma."
        },
        {
            "nom": "Regigigas",
            "description": "Regigigas est un grand Pokémon qui ressemble à un golem. Il est principalement blanc, avec cinq larges bandes jaunes sur les épaules et les poignets, et une au milieu de la tête, qui descend sur son buste, et qui est en réalité son visage, avec sept « yeux » circulaires et noirs qui lui permettent de montrer sa colère en devenant rouges lorsqu'on le provoque. Il a six gemmes, trois de chaque côté du visage, qui semblent représenter le trio des golems, composé de Regirock — représenté par les gemmes rouges, Regice — représenté par les gemmes bleues et Registeel — représenté par les gemmes argentées. Il a de longs bras avec trois doigts humanoïdes, et de courtes jambes qui se finissent en buissons de mousse à la place de ses pieds. Son corps est recouvert de bandes noires, et de la mousse pousse sur son dos et ses pieds."
        },
        {
            "nom": "Giratina",
            "description": "Sa grande violence lui a valu d'\u00eatre banni. Il observe les hommes en silence depuis le Monde Distorsion."
        },
        {
            "nom": "Cresselia",
            "description": "Dormir avec une de ses plumes \u00e0 la main permet de faire de beaux r\u00eaves. On le surnomme \u00ab\u00a0avatar du croissant de lune\u00a0\u00bb."
        },
        {
            "nom": "Phione",
            "description": "Ce Pok\u00e9mon vit dans les mers chaudes et gonfle l'organe de flottaison sur sa t\u00eate pour nager au creux des vagues, en qu\u00eate de nourriture."
        },
        {
            "nom": "Manaphy",
            "description": "Manaphy poss\u00e8de le pouvoir miraculeux de cr\u00e9er un lien avec n'importe quel Pok\u00e9mon. On peut parfois le voir surgir du fond de la mer, attir\u00e9 par un chant m\u00e9lodieux."
        },
        {
            "nom": "Darkrai",
            "description": "Ce Pok\u00e9mon a le pouvoir de plonger les gens dans un profond sommeil pour les forcer \u00e0 r\u00eaver. Il est actif les nuits de nouvelle lune."
        },
        {
            "nom": "Shaymin",
            "description": "Shaymin poss\u00e8de le pouvoir miraculeux de transformer les terrains st\u00e9riles en terres fertiles. Une fois roul\u00e9 en boule, il se fond si bien dans le d\u00e9cor qu'on pourrait passer \u00e0 c\u00f4t\u00e9 de lui sans m\u00eame le remarquer\u00a0!"
        },
        {
            "nom": "Arceus",
            "description": "La mythologie le d\u00e9crit comme le Pok\u00e9mon qui a fa\u00e7onn\u00e9 l'univers avec ses mille bras."
        },
        {
            "nom": "Victini",
            "description": "L'\u00e9nergie sans limites qu'il produit donne une force incroyable \u00e0 ceux qui entrent en contact avec elle."
        },
        {
            "nom": "Vip\u00e9lierre",
            "description": "Il laisse sa queue prendre le soleil pour sa photosynth\u00e8se. Quand il est malade, sa queue pend tristement."
        },
        {
            "nom": "Lianaja",
            "description": "Il court comme s'il glissait sur le sol. Il d\u00e9route l'ennemi par ses mouvements et l'assomme d'un coup de liane."
        },
        {
            "nom": "Majaspic",
            "description": "Il ne donnera tout son potentiel que contre un ennemi puissant indiff\u00e9rent \u00e0 son regard \u00e9crasant de noblesse."
        },
        {
            "nom": "Gruikui",
            "description": "Il adore se goinfrer de Baies grill\u00e9es, mais il lui arrive de les r\u00e9duire en cendres dans son excitation."
        },
        {
            "nom": "Grotichon",
            "description": "Quand le feu dans son corps s'embrase, sa vitesse et son agilit\u00e9 augmentent. En cas d'urgence, il crache de la fum\u00e9e."
        },
        {
            "nom": "Roitiflam",
            "description": "Il a une barbe enflamm\u00e9e. Il ma\u00eetrise des techniques de combat au corps \u00e0 corps rapides et puissantes."
        },
        {
            "nom": "Moustillon",
            "description": "Il combat avec le coupillage de son ventre. Il peut parer un assaut et imm\u00e9diatement contre-attaquer."
        },
        {
            "nom": "Mateloutre",
            "description": "Chaque Mateloutre a sa propre technique d'escrime au coupillage, acquise gr\u00e2ce \u00e0 un entra\u00eenement drastique."
        },
        {
            "nom": "Clamiral",
            "description": "Il dissimule de grandes lames qu'il d\u00e9gaine en un \u00e9clair des fourreaux de ses pattes ant\u00e9rieures."
        },
        {
            "nom": "Ratentif",
            "description": "Tr\u00e8s prudent, il surveille attentivement son territoire, mais oublie souvent de regarder derri\u00e8re lui."
        },
        {
            "nom": "Miradar",
            "description": "Il attaque en crachant les graines des Baies qu'il accumule dans ses bajoues. S'il voit un ennemi, il dresse la queue."
        },
        {
            "nom": "Ponchiot",
            "description": "Sa docilit\u00e9 en fait un Pok\u00e9mon facile \u00e0 \u00e9lever. Il est notamment populaire aupr\u00e8s des Dresseurs d\u00e9butants."
        },
        {
            "nom": "Ponchien",
            "description": "Cela fait si longtemps que ce Pok\u00e9mon vit en harmonie avec les humains qu'il appara\u00eet m\u00eame sur des peintures rupestres antiques."
        },
        {
            "nom": "Mastouffe",
            "description": "Il poss\u00e8de un pelage long et \u00e9pais. Jadis, dans les r\u00e9gions froides, chaque foyer en \u00e9levait un."
        },
        {
            "nom": "Chacripan",
            "description": "Il vole les gens pour le plaisir, mais il est tellement mignon que ses victimes finissent toujours par lui pardonner."
        },
        {
            "nom": "L\u00e9opardus",
            "description": "Sa ligne \u00e9l\u00e9gante cache une musculature f\u00e9line qui lui permet de surprendre lors de ses attaques nocturnes."
        },
        {
            "nom": "Feuillajou",
            "description": "Le Pok\u00e9mon Singe Herbe. Feuillajou offre les feuilles de sa t\u00eate aux Pok\u00e9mon qui manquent d'\u00e9nergie. Ces feuilles soulagent le stress."
        },
        {
            "nom": "Feuiloutan",
            "description": "Il a une crête pointue qui ressemble à un buisson sur la tête. Il a de grandes oreilles, des yeux ovales et un petit nez noir. Ses sourcils sont blancs et broussailleux, comme la fourrure qui pousse sur ses épaules. Son visage, son buste, ses mains à cinq doigts et ses pieds à trois orteils sont de couleur crème. Sa longue queue se termine par deux feuilles."
        },
        {
            "nom": "Flamajou",
            "description": "Il vit dans les crat\u00e8res des volcans. L'int\u00e9rieur de la m\u00e8che qu'il a sur la t\u00eate peut atteindre 300\u00b0C."
        },
        {
            "nom": "Flamoutan",
            "description": "Le Pok\u00e9mon Braise est la forme \u00e9volu\u00e9e de Flamajou. Flamoutan aime manger des sucreries qui servent de carburant au feu br\u00fblant \u00e0 l'int\u00e9rieur de son corps."
        },
        {
            "nom": "Flotajou",
            "description": "Le Pok\u00e9mon Jet d'Eau. Flotajou vivait autrefois dans les for\u00eats mais son corps s'est d\u00e9velopp\u00e9 et il vit facilement au bord de l'eau. Il peut stocker de l'eau dans la r\u00e9serve situ\u00e9e sur sa t\u00eate."
        },
        {
            "nom": "Flotoutan",
            "description": "Le Pok\u00e9mon Drainage est la forme \u00e9volu\u00e9e de Flotajou. Flotoutan peut abattre un mur de b\u00e9ton avec l'eau sous pression qui jaillit de sa queue."
        },
        {
            "nom": "Munna",
            "description": "Il appara\u00eet en pleine nuit, \u00e0 c\u00f4t\u00e9 de l'oreiller. Quand il se nourrit de r\u00eaves, les motifs de son corps luisent l\u00e9g\u00e8rement."
        },
        {
            "nom": "Mushana",
            "description": "La fum\u00e9e qui sort de son front change de couleur selon le contenu des r\u00eaves qu'il a mang\u00e9s."
        },
        {
            "nom": "Poichigeon",
            "description": "Ces Pok\u00e9mon vivent en ville. Ils sont peu farouches et se regroupent souvent dans les parcs ou sur les places."
        },
        {
            "nom": "Colombeau",
            "description": "Quel que soit le lieu o\u00f9 il se trouve, il arrive toujours \u00e0 retrouver son Dresseur comme son propre nid."
        },
        {
            "nom": "D\u00e9flaisan",
            "description": "Ils sont tr\u00e8s farouches et ne s'attachent qu'\u00e0 leur Dresseur. Les m\u00e2les ont une parure sur la t\u00eate."
        },
        {
            "nom": "Z\u00e9bibron",
            "description": "Sa crini\u00e8re luit quand il l\u00e2che des d\u00e9charges. Il module son rythme et son nombre pour communiquer avec ses pairs."
        },
        {
            "nom": "Z\u00e9blitz",
            "description": "Il r\u00e9agit \u00e0 la vitesse de l'\u00e9clair. Lorsqu'il est en plein galop, on peut entendre le grondement du tonnerre."
        },
        {
            "nom": "Nodulithe",
            "description": "Son corps est aussi dur que le fer, mais si on le laisse longtemps dans l'eau, il para\u00eet qu'il ramollit l\u00e9g\u00e8rement."
        },
        {
            "nom": "G\u00e9olithe",
            "description": "Mieux vaut rester sur ses gardes quand ses cristaux orange se mettent \u00e0 briller, car cela indique qu'il va d\u00e9cha\u00eener son \u00e9nergie pour frapper."
        },
        {
            "nom": "Gigalithe",
            "description": "Sa robustesse lui vaut parfois de travailler sur les chantiers et dans les carri\u00e8res en compagnies des Hommes et des Pachyradjah."
        },
        {
            "nom": "Chovsourir",
            "description": "La pr\u00e9sence de marques en forme de c\u0153ur sur les parois des grottes indique la pr\u00e9sence de Chovsourir \u00e0 l'int\u00e9rieur."
        },
        {
            "nom": "Rhinolove",
            "description": "\u00c9mettre des ondes sonores ultra-puissantes le fatigue tellement qu'il n'a plus de forces pour voler."
        },
        {
            "nom": "Rototaupe",
            "description": "Il tourbillonne sur lui-m\u00eame pour se d\u00e9placer sous terre. Il peut atteindre les 50 km/h en ligne droite."
        },
        {
            "nom": "Minotaupe",
            "description": "Ses vrilles en acier peuvent transpercer des poutres en fer. Il est tr\u00e8s employ\u00e9 dans la construction de tunnels."
        },
        {
            "nom": "Nanm\u00e9ou\u00efe",
            "description": "Son ou\u00efe est si fine qu'il est capable d'entendre un caillou tomber \u00e0 2 km."
        },
        {
            "nom": "Charpenti",
            "description": "Il aime donner un coup de main sur les chantiers. Lorsque le travail cesse \u00e0 cause de la pluie, il brandit sa poutre de col\u00e8re."
        },
        {
            "nom": "Ouvrifier",
            "description": "Il participe \u00e0 des concours de gonflette avec ses cong\u00e9n\u00e8res et les Machopeur. Le perdant ne se montre plus en public pendant quelque temps."
        },
        {
            "nom": "B\u00e9tochef",
            "description": "On pense que la recette du ciment a \u00e9t\u00e9 enseign\u00e9e aux humains par un B\u00e9tochef il y a 2 000 ans."
        },
        {
            "nom": "Tritonde",
            "description": "Lorsqu'un Tritonde pousse des cris aigus sous l'eau, des ondes ravissantes se propagent \u00e0 la surface."
        },
        {
            "nom": "Batracn\u00e9",
            "description": "Quand il fait vibrer la bosse sur sa t\u00eate, il provoque des ondulations dans l'eau, mais aussi des tremblements de terre."
        },
        {
            "nom": "Crapustule",
            "description": "Son coup de poing est plus fort quand il fait vibrer la pustule dessus. Il peut briser un gros rocher d'un coup."
        },
        {
            "nom": "Judokrak",
            "description": "Ses techniques de projection sont sans \u00e9gal. Quand il se bat, sa sueur coule sur sa ceinture et lui donne une teinte plus fonc\u00e9e."
        },
        {
            "nom": "Karacl\u00e9e",
            "description": "Il cherche \u00e0 tout prix \u00e0 devenir plus fort. Il est conseill\u00e9 de ne pas le d\u00e9ranger quand il s'entra\u00eene en montagne."
        },
        {
            "nom": "Larveyette",
            "description": "Il fabrique des v\u00eatements en rongeant les feuilles des arbres et en prenant pour mod\u00e8le l'habit v\u00e9g\u00e9tal dont Manternel l'a v\u00eatu."
        },
        {
            "nom": "Couverdure",
            "description": "Il m\u00e8ne une vie paisible pr\u00e8s des racines des arbres et pr\u00e9f\u00e8re se nourrir de feuilles mortes et ramollies plut\u00f4t que de feuilles fra\u00eeches."
        },
        {
            "nom": "Manternel",
            "description": "Il r\u00e9chauffe les \u0152ufs avec la chaleur de l'humus. Il fabrique des langes pour les Larveyette avec des feuilles."
        },
        {
            "nom": "Venipatte",
            "description": "Bien qu'appartenant \u00e0 des esp\u00e8ces similaires, les Venipatte et les Grillepattes se livrent \u00e0 des conflits violents lorsqu'ils se croisent."
        },
        {
            "nom": "Scobolide",
            "description": "Prot\u00e9g\u00e9 par sa solide carapace, il fonce sur ses ennemis en roulant comme un pneu."
        },
        {
            "nom": "Brutapode",
            "description": "Il paralyse l'ennemi avec les griffes de son cou avant de mettre fin au combat gr\u00e2ce \u00e0 son poison virulent."
        },
        {
            "nom": "Doudouvet",
            "description": "Lorsqu'on l'attaque, il s\u00e8me du coton pour faire diversion. Celui-ci repousse tout de suite."
        },
        {
            "nom": "Farfaduvet",
            "description": "Ce Pok\u00e9mon sans domicile fixe se laisse porter par les tornades et s\u00e8me la zizanie partout o\u00f9 il passe."
        },
        {
            "nom": "Chlorobule",
            "description": "Il appara\u00eet non loin des eaux propres. On utilise parfois les infusions pr\u00e9par\u00e9es avec les feuilles de sa t\u00eate pour \u00e9loigner les insectes."
        },
        {
            "nom": "Fragilady",
            "description": "On raconte que m\u00eame les meilleurs horticulteurs ont \u00e9norm\u00e9ment de mal \u00e0 faire \u00e9clore sa fleur."
        },
        {
            "nom": "Bargantua",
            "description": "C'est un Pok\u00e9mon d'une grande f\u00e9rocit\u00e9. Les Bargantua bleus et les Bargantua rouges se livrent une guerre territoriale sans merci."
        },
        {
            "nom": "Masca\u00efman",
            "description": "Il se prot\u00e8ge du froid qui s\u00e9vit la nuit dans le d\u00e9sert en s'enfouissant profond\u00e9ment dans le sable, o\u00f9 il dort jusqu'au lever du soleil."
        },
        {
            "nom": "Escroco",
            "description": "Il chasse de nuit sans difficult\u00e9 gr\u00e2ce \u00e0 ses yeux particuliers qui lui permettent de voir dans l'obscurit\u00e9."
        },
        {
            "nom": "Crocorible",
            "description": "Il peut broyer d'\u00e9paisses plaques de fer d'un simple coup de m\u00e2choire. On l'appelle le \u00ab\u00a0tyran des sables\u00a0\u00bb."
        },
        {
            "nom": "Darumarond",
            "description": "La flamme qui br\u00fble dans son corps est sa source d'\u00e9nergie. Si le feu s'affaiblit, il s'endort sur-le-champ."
        },
        {
            "nom": "Darumacho",
            "description": "V\u00e9ritable t\u00eate br\u00fbl\u00e9e, il poss\u00e8de assez de force dans ses gros bras pour r\u00e9duire en poussi\u00e8re un camion-benne \u00e0 coups de poing."
        },
        {
            "nom": "Maracachi",
            "description": "Il produit un bruit de maracas. Quand il danse \u00e0 un rythme enjou\u00e9, il surprend les Pok\u00e9mon oiseaux, qui s'enfuient alors \u00e0 tire-d'aile."
        },
        {
            "nom": "Crabicoque",
            "description": "Quand il trouve un caillou qui lui pla\u00eet, il y creuse un trou et s'en sert comme d'une maison. C'est l'ennemi jur\u00e9 des Nodulithe et des Charbi."
        },
        {
            "nom": "Crabaraque",
            "description": "Il pr\u00e9f\u00e8re les endroits secs, et rentre dans son rocher quand il pleut. Il d\u00e9fend farouchement son territoire."
        },
        {
            "nom": "Baggiguane",
            "description": "C'est un Pok\u00e9mon dangereux qui distribue des coups de t\u00eate \u00e0 quiconque ose croiser son regard."
        },
        {
            "nom": "Bagga\u00efd",
            "description": "Son coup de pied nonchalant poss\u00e8de une force de destruction si grande qu'il peut briser les piliers en b\u00e9ton de B\u00e9tochef."
        },
        {
            "nom": "Crypt\u00e9ro",
            "description": "Il vole gr\u00e2ce \u00e0 ses pouvoirs psychiques. Certains disent qu'il \u00e9tait le dieu protecteur d'une ville antique, d'autres, son messager."
        },
        {
            "nom": "Tutafeh",
            "description": "Il passe ses nuits \u00e0 errer dans les ruines. On raconte que le masque qu'il porte repr\u00e9sente son visage quand il \u00e9tait humain."
        },
        {
            "nom": "Tutankafer",
            "description": "Son corps en or brille de milles feux. On raconte qu'il ne se souvient d\u00e9sormais plus de l'\u00e9poque o\u00f9 il \u00e9tait humain."
        },
        {
            "nom": "Carapagos",
            "description": "Il vivait dans la mer pendant l'\u00e8re pr\u00e9historique. Il lui arrive de s'aventurer sur la terre ferme pour chasser, bien qu'il ne puisse que ramper."
        },
        {
            "nom": "M\u00e9gapagos",
            "description": "L'incroyable puissance de sa m\u00e2choire lui permettait de broyer facilement les coquilles d'Amonistar ou d'Amonita pour les manger."
        },
        {
            "nom": "Ark\u00e9apti",
            "description": "Les recherches ont montr\u00e9 que ce Pok\u00e9mon restaur\u00e9 \u00e0 partir d'un fossile ne pouvait pas voler, mais qu'il \u00e9tait tr\u00e8s dou\u00e9 en saut."
        },
        {
            "nom": "A\u00e9ropt\u00e9ryx",
            "description": "Les plumes de ce Pok\u00e9mon antique sont si fines que seuls les experts les plus talentueux peuvent leur rendre justice en le reconstituant."
        },
        {
            "nom": "Miamiasme",
            "description": "Il raffole des endroits sales. Si on laisse tra\u00eener des ordures dans une pi\u00e8ce trop longtemps, il finit par en faire son domicile."
        },
        {
            "nom": "Miasmax",
            "description": "Il produit du poison dans son corps \u00e0 partir des ordures qu'il ingurgite. Selon ce qu'il mange, la composition des toxines diff\u00e8re."
        },
        {
            "nom": "Zorua",
            "description": "\u00c0 cause de sa timidit\u00e9, il aurait d\u00e9velopp\u00e9 la capacit\u00e9 de changer son apparence."
        },
        {
            "nom": "Zoroark",
            "description": "Dot\u00e9 d'un grand sens de la camaraderie, ce Pok\u00e9mon peut cr\u00e9er des illusions effrayantes pour prot\u00e9ger son habitat et ses cong\u00e9n\u00e8res."
        },
        {
            "nom": "Chinchidou",
            "description": "Il \u00e9poussette les salet\u00e9s avec sa queue. Il est d'une aide pr\u00e9cieuse pour faire le m\u00e9nage, mais il est tr\u00e8s tatillon sur la propret\u00e9."
        },
        {
            "nom": "Pashmilla",
            "description": "Il ne supporte pas de voir le moindre grain de poussi\u00e8re. Il utilise l'huile qu'il s\u00e9cr\u00e8te pour recouvrir son nid d'un rev\u00eatement protecteur."
        },
        {
            "nom": "Scrutella",
            "description": "Il n'est encore qu'un enfant, mais il lui arrive de se battre avec l'\u00e9nergie psychique concentr\u00e9e dans ses antennes en forme de rubans."
        },
        {
            "nom": "Mesm\u00e9rella",
            "description": "On raconte qu'il enl\u00e8ve les enfants endormis pendant les nuits \u00e9toil\u00e9es. Cela lui vaut d'\u00eatre consid\u00e9r\u00e9 comme un d\u00e9mon punisseur."
        },
        {
            "nom": "Sid\u00e9rella",
            "description": "Il pr\u00e9dit l'avenir \u00e0 partir du mouvement des \u00e9toiles. Il dispose de grands pouvoirs psychiques, mais il n'est pas de nature hostile."
        },
        {
            "nom": "Nucl\u00e9os",
            "description": "Ils communiquent entre eux par t\u00e9l\u00e9pathie. S'ils subissent un choc physique violent, le fluide qui entoure leur corps se met \u00e0 fuir."
        },
        {
            "nom": "M\u00e9ios",
            "description": "On pr\u00e9tend que lorsque ses deux cerveaux agissent \u00e0 l'unisson, la port\u00e9e de sa force mentale peut s'\u00e9tendre sur un rayon d'un kilom\u00e8tre."
        },
        {
            "nom": "Symbios",
            "description": "Ses bras, faits d'une mati\u00e8re conduisant ses pouvoirs psychiques, sont assez puissants pour broyer des rochers."
        },
        {
            "nom": "Couaneton",
            "description": "Les Couaneton naissent et grandissent au lac du Parc Naturel d'Anthos. Ils ne savent pas encore tr\u00e8s bien voler, mais ils apprennent en observant les Lakm\u00e9cygne."
        },
        {
            "nom": "Lakm\u00e9cygne",
            "description": "Un Pok\u00e9mon gracieux, mais aussi robuste. Il peut voler des milliers de kilom\u00e8tres gr\u00e2ce \u00e0 ses ailes puissantes."
        },
        {
            "nom": "Sorb\u00e9b\u00e9",
            "description": "Il ne peut pas vivre dans les contr\u00e9es chaudes. Il souffle un air glacial pour faire tomber la neige, puis s'y plonge pour dormir."
        },
        {
            "nom": "Sorboul",
            "description": "Il boit de l'eau pure pour gonfler son corps de glace. On le voit rarement les jours ensoleill\u00e9s."
        },
        {
            "nom": "Sorbouboul",
            "description": "Lorsqu'il a les nerfs en boule, il provoque un blizzard qui g\u00e8le tout le monde, alli\u00e9s comme adversaires."
        },
        {
            "nom": "Vivaldaim",
            "description": "Ce Pok\u00e9mon change d'aspect en fonction des saisons. Il accompagne g\u00e9n\u00e9ralement Haydaim, mais il finit souvent par se perdre \u00e0 cause de sa curiosit\u00e9."
        },
        {
            "nom": "Haydaim",
            "description": "Ces Pok\u00e9mon changent de forme en fonction des saisons. D'ordinaire, on ne les voit que sous une seule forme \u00e0 la fois, mais dans la For\u00eat Sibylline, il est possible de voir les quatre coexister\u00a0!"
        },
        {
            "nom": "Emolga",
            "description": "Il virevolte dans le ciel en lib\u00e9rant des gerbes d'\u00e9lectricit\u00e9. Son vol est gracieux, mais peut s'av\u00e9rer dangereux."
        },
        {
            "nom": "Carabing",
            "description": "Son corps \u00e9trangement structur\u00e9 a la facult\u00e9 de r\u00e9agir \u00e0 l'\u00e9lectricit\u00e9. Il \u00e9volue lorsqu'il croise un Escargaume."
        },
        {
            "nom": "Lan\u00e7argot",
            "description": "Il a vol\u00e9 la coquille d'Escargaume pour obtenir une armure parfaite. Il jouit d'une tr\u00e8s grande popularit\u00e9 \u00e0 Galar."
        },
        {
            "nom": "Trompignon",
            "description": "Son apparence de Pok\u00e9 Ball trompe ses ennemis, qu'il \u00e9tourdit \u00e0 l'aide de ses spores empoisonn\u00e9es."
        },
        {
            "nom": "Gaulet",
            "description": "Il danse en faisant tournoyer les coupoles en forme de Pok\u00e9 Ball de ses bras pour attirer ses proies."
        },
        {
            "nom": "Viskuse",
            "description": "Il utilise ses membres en forme de voiles pour enlacer ses proies et les entra\u00eener \u00e0 8 000 m de profondeur sous la surface de l'eau."
        },
        {
            "nom": "Moyade",
            "description": "Son corps est compos\u00e9 presque enti\u00e8rement d'une substance identique \u00e0 l'eau de mer. Les \u00e9paves de navires sont ses bastions."
        },
        {
            "nom": "Mamanbo",
            "description": "Il nage aux c\u00f4t\u00e9s des petits Pok\u00e9mon afin que ceux-ci ne se sentent jamais seuls. On peut apercevoir diff\u00e9rentes esp\u00e8ces de Pok\u00e9mon se rassembler autour de Mamanbo, attir\u00e9s par sa gentillesse."
        },
        {
            "nom": "Statitik",
            "description": "Il s'accroche au corps des autres Pok\u00e9mon pour absorber leur \u00e9lectricit\u00e9 statique. Il est incapable d'en produire tout seul."
        },
        {
            "nom": "Mygavolt",
            "description": "Il attaque en projetant les poils de son abdomen charg\u00e9s en \u00e9lectricit\u00e9. La victime reste alors paralys\u00e9e pendant trois jours et trois nuits."
        },
        {
            "nom": "Grindur",
            "description": "Il se prot\u00e8ge en projetant ses \u00e9pines, mais il lui faut beaucoup d'entra\u00eenement pour r\u00e9ussir \u00e0 tirer dans une direction pr\u00e9cise."
        },
        {
            "nom": "Noacier",
            "description": "Il fissure la roche avec ses \u00e9pines pour ensuite absorber les nutriments qui s'y trouvent gr\u00e2ce \u00e0 l'extr\u00e9mit\u00e9 de ses tentacules."
        },
        {
            "nom": "Tic",
            "description": "La compatibilit\u00e9 entre ses deux rouages est pr\u00e9d\u00e9termin\u00e9e. Ceux-ci ne se fixeront \u00e0 aucun autre."
        },
        {
            "nom": "Clic",
            "description": "Quand le combat devient s\u00e9rieux, la partie ext\u00e9rieure du grand rouage s'aligne parfaitement avec le petit pour acc\u00e9l\u00e9rer leur rotation."
        },
        {
            "nom": "Cliticlic",
            "description": "Il peut envoyer de terribles d\u00e9charges \u00e9lectriques de la pointe de ses pics. Il accumule de grandes quantit\u00e9s d'\u00e9nergie dans son noyau rouge."
        },
        {
            "nom": "Anchwatt",
            "description": "Tout seuls, ils ne d\u00e9gagent pas beaucoup d'\u00e9lectricit\u00e9, mais un banc d'Anchwatt produit la m\u00eame puissance qu'un \u00e9clair."
        },
        {
            "nom": "Lamp\u00e9roie",
            "description": "Ses taches rondes sont des organes qui \u00e9mettent de l'\u00e9lectricit\u00e9. Il s'enroule autour de ses proies et les \u00e9lectrocute."
        },
        {
            "nom": "Ohmassacre",
            "description": "Il peut sortir de l'eau \u00e0 la force de ses bras pour attaquer des proies sur la rive et les entra\u00eener avec lui dans l'eau en un instant."
        },
        {
            "nom": "Lewsor",
            "description": "S'il se tient pr\u00e8s d'une t\u00e9l\u00e9, d'\u00e9tranges panoramas apparaissent \u00e0 l'\u00e9cran. On raconte qu'il s'agirait de paysages venus des terres natales de Lewsor."
        },
        {
            "nom": "Neitram",
            "description": "\u00c0 chaque fois que Neitram se mat\u00e9rialise dans une p\u00e2ture, un Moumouflon dispara\u00eet dans des circonstances myst\u00e9rieuses."
        },
        {
            "nom": "Fun\u00e9cire",
            "description": "Son corps est ti\u00e8de, r\u00e9chauff\u00e9 par sa flamme. Il prend les personnes \u00e9gar\u00e9es par la main et les guide vers le monde des esprits."
        },
        {
            "nom": "M\u00e9lancolux",
            "description": "Comme il appara\u00eet d\u00e8s qu'une personne est sur le point de tr\u00e9passer, les gens le craignent et le prennent pour un messager de la mort."
        },
        {
            "nom": "Lugulabre",
            "description": "Les victimes des flammes de Lugulabre voient leur \u00e2mes aspir\u00e9e jusqu'\u00e0 ce que leur corps ne soit plus que coquille vide."
        },
        {
            "nom": "Coupenotte",
            "description": "Il vit dans des terriers qu'il creuse \u00e0 m\u00eame le sol et organise des concours avec ses camarades pour voir qui peut briser la Baie la plus dure."
        },
        {
            "nom": "Incisache",
            "description": "Une fois cass\u00e9s, ses crocs ne repoussent pas. Apr\u00e8s les combats, il les aiguise avec soin sur les pierres d'un ruisseau."
        },
        {
            "nom": "Tranchodon",
            "description": "Il est doux, mais ne pardonne pas \u00e0 ceux qui viennent saccager son territoire. Ses crocs peuvent d\u00e9couper de l'acier."
        },
        {
            "nom": "Polarhume",
            "description": "Quand il est en forme, sa goutte au nez devient encore plus visqueuse. Il n'h\u00e9site pas \u00e0 s'essuyer le nez sur un adversaire qui lui d\u00e9pla\u00eet."
        },
        {
            "nom": "Polagriffe",
            "description": "Les crocs qu'il fa\u00e7onne en gelant son souffle sont plus durs que l'acier. Il sillonne les eaux des mers glaciales \u00e0 la recherche de nourriture."
        },
        {
            "nom": "Hexagel",
            "description": "N\u00e9 d'un nuage neigeux, il attrape ses proies \u00e0 l'aide de sa cha\u00eene faite de cristaux de givre."
        },
        {
            "nom": "Escargaume",
            "description": "Il se recroqueville dans sa carapace en fermant la visi\u00e8re lorsque des ennemis approchent. Carabing peut n\u00e9anmoins en forcer l'entr\u00e9e."
        },
        {
            "nom": "Limaspeed",
            "description": "Il se bat avec c\u00e9l\u00e9rit\u00e9 en projetant du poison. Il est si cool qu'il est souvent le h\u00e9ros de films ou de bandes dessin\u00e9es \u00e0 succ\u00e8s."
        },
        {
            "nom": "Limonde",
            "description": "Les vasi\u00e8res sont son habitat de pr\u00e9dilection. Il a d\u00e9velopp\u00e9 un organe g\u00e9n\u00e9rant de l'\u00e9lectricit\u00e9 gr\u00e2ce aux bact\u00e9ries pr\u00e9sentes dans la boue."
        },
        {
            "nom": "Kungfouine",
            "description": "Les Kungfouine bien entra\u00een\u00e9s sont capables d'ass\u00e9ner plus de cent coups par minute du tranchant de la main."
        },
        {
            "nom": "Shaofouine",
            "description": "Lorsqu'il fait face \u00e0 un adversaire vraiment redoutable, il coupe les poils de sa main avec les dents pour am\u00e9liorer son agilit\u00e9."
        },
        {
            "nom": "Drakkarmin",
            "description": "Il vit sous terre, mais il doit imp\u00e9rativement s'exposer au soleil, car il devient incapable de bouger lorsque son corps se refroidit"
        },
        {
            "nom": "Gringolem",
            "description": "Les anciens, d\u00e9sirant avoir un serviteur, l'auraient fa\u00e7onn\u00e9 avec de l'argile. En revanche, on ignore toujours d'o\u00f9 provient son \u00e9nergie."
        },
        {
            "nom": "Golemastoc",
            "description": "Gare au sceau de sa poitrine\u00a0! S'il est bris\u00e9, Golemastoc perd le contr\u00f4le et charge avec fureur. Il peut alors raser une ville enti\u00e8re."
        },
        {
            "nom": "Scalpion",
            "description": "Il accule ses ennemis en jouant de ses lames ac\u00e9r\u00e9es, qu'il aiguise sur les pierres des berges."
        },
        {
            "nom": "Scalproie",
            "description": "Il dirige des cohortes de Scalpion. Il garde constamment ses sous-fifres \u00e0 l'\u0153il pour parer \u00e0 toute vell\u00e9it\u00e9 de mutinerie."
        },
        {
            "nom": "Frison",
            "description": "Il peut d\u00e9truire une voiture d'un coup de t\u00eate. Plus sa crini\u00e8re est volumineuse, plus son rang au sein du troupeau est \u00e9lev\u00e9."
        },
        {
            "nom": "Furaiglon",
            "description": "C'est un guerrier endurci d\u00e8s sa naissance. Il commence d'ailleurs par d\u00e9fier ses parents au combat pour leur prouver sa valeur."
        },
        {
            "nom": "Gueriaigle",
            "description": "Les balafres ne font qu'ajouter \u00e0 sa renomm\u00e9e, mais les blessures dans le dos, synonymes de fuite en combat, sont mal vues par la vol\u00e9e."
        },
        {
            "nom": "Vostourno",
            "description": "Ils prot\u00e8gent leur derri\u00e8re en portant un cr\u00e2ne comme couche. Ils se disputent les plus douillets d'entre eux."
        },
        {
            "nom": "Vaututrice",
            "description": "Malgr\u00e9 son naturel brutal, il recueille volontiers les Vostourno \u00e9gar\u00e9s et prend soin d'eux jusqu'\u00e0 ce qu'ils soient en \u00e2ge de quitter le nid."
        },
        {
            "nom": "Aflamanoir",
            "description": "Il aspire de l'air par le bout de sa queue et produit ainsi sa fameuse langue de feu. Si on lui bouche la queue, il se sent mal."
        },
        {
            "nom": "Fermite",
            "description": "Ils portent une armure de fer et se regroupent pour contrer les attaques de leurs pr\u00e9dateurs, les Aflamanoir."
        },
        {
            "nom": "Solochi",
            "description": "Comme il ne voit rien, il per\u00e7oit son environnement en mordant et en fon\u00e7ant \u00e0 tout va."
        },
        {
            "nom": "Diamat",
            "description": "Quand il a mang\u00e9 tout ce qui tra\u00eenait sur son territoire, il migre vers d'autres horizons. Ses 2 t\u00eates s'entendent mal."
        },
        {
            "nom": "Trioxhydre",
            "description": "Un Pok\u00e9mon effrayant. Ses trois t\u00eates d\u00e9vorent tout ce qui bouge jusqu'\u00e0 sati\u00e9t\u00e9."
        },
        {
            "nom": "Pyronille",
            "description": "Il y a fort longtemps, les gens croyaient que les Pyronille \u00e9taient tomb\u00e9s du soleil."
        },
        {
            "nom": "Pyrax",
            "description": "Il d\u00e9crit des cercles dans le ciel en faisant pleuvoir des \u00e9cailles enflamm\u00e9es. Il \u00e9tait jadis surnomm\u00e9 \u00ab\u00a0le courroux solaire\u00a0\u00bb."
        },
        {
            "nom": "Cobaltium",
            "description": "Un corps et un c\u0153ur en acier tremp\u00e9, jadis au service de la d\u00e9fense des Pok\u00e9mon bless\u00e9s par les humains."
        },
        {
            "nom": "Terrakium",
            "description": "Il poss\u00e8de un pouvoir incommensurable. Il se montre impitoyable envers ceux qui s'en prennent aux petits Pok\u00e9mon."
        },
        {
            "nom": "Viridium",
            "description": "Selon la l\u00e9gende, il aurait combattu aux c\u00f4t\u00e9s de Cobaltium et de Terrakium pour prot\u00e9ger les Pok\u00e9mon d'Unys."
        },
        {
            "nom": "Bor\u00e9as",
            "description": "Ce Pokémon, connu pour causer des tempêtes, provoquerait aussi le changement des saisons en agitant l'air. Je suspecte son apparence humaine de ne pas être sa véritable forme."
        },
        {
            "nom": "Fulguris",
            "description": "Ce Pokémon se révèle quand le tonnerre gronde. Il fait pleuvoir des éclairs d'une puissance démesurée depuis les orbes sur sa queue, et réduit ses ennemis à néant.On raconte qu'il se bat depuis les temps anciens contre Boréas, son ennemi juré, en maniant la foudre. Les éclairs qu'il lance traversent la terre et enrichissent les sols."
        },
        {
            "nom": "Reshiram",
            "description": "Un Pok\u00e9mon l\u00e9gendaire assez puissant pour embraser le monde entier. Il soutient les d\u00e9fenseurs de la R\u00e9alit\u00e9."
        },
        {
            "nom": "Zekrom",
            "description": "Un Pok\u00e9mon l\u00e9gendaire assez puissant pour foudroyer le monde entier. Il soutient ceux qui suivent leur Id\u00e9al."
        },
        {
            "nom": "D\u00e9m\u00e9t\u00e9ros",
            "description": "Il utilise l'\u00e9nergie qu'il tire du vent et de la foudre pour enrichir les sols en nutriments pour les cultures."
        },
        {
            "nom": "Kyurem",
            "description": "Son corps produit une \u00e9nergie \u00e0 tr\u00e8s basse temp\u00e9rature, mais le souffle glac\u00e9 qu'il exhale l'a gel\u00e9 lui-m\u00eame."
        },
        {
            "nom": "Keldeo",
            "description": "Cobaltium, Terrakium et Viridium lui ont appris \u00e0 se battre. Il poursuit son entra\u00eenement en parcourant le monde."
        },
        {
            "nom": "Meloetta",
            "description": "Sa voix si particulière lui permet de chanter des mélodies qui ensorcellent les gens et modifient leurs émotions.De nombreux succès musicaux ont été composés en s'inspirant des mélodies chantées par Meloetta."
        },
        {
            "nom": "Genesect",
            "description": "Un Pok\u00e9mon existant depuis 300 millions d'ann\u00e9es, et modifi\u00e9 par la Team Plasma. Il a maintenant un canon dans le dos."
        },
        {
            "nom": "Marisson",
            "description": "Quand il se concentre ses forces juste avant l'impact de son coup de t\u00eate, ses piquants deviennent ac\u00e9r\u00e9s et transpercent le corps de son adversaire."
        },
        {
            "nom": "Bogu\u00e9risse",
            "description": "Une carapace solide le prot\u00e8ge. Elle est si lourde qu'elle a permis \u00e0 ses membres inf\u00e9rieurs de se muscler naturellement."
        },
        {
            "nom": "Blind\u00e9pique",
            "description": "Quand ses compagnons sont en danger, il d\u00e9ploie ses bras pour former des boucliers et devient lui-m\u00eame un rempart face aux attaques."
        },
        {
            "nom": "Feunnec",
            "description": "En cas de coup de fatigue, il grignote des rameaux pour recharger ses batteries. Ses oreilles d\u00e9gagent une chaleur qui d\u00e9passe les 200\u00b0C"
        },
        {
            "nom": "Roussil",
            "description": "Il allume la branche plant\u00e9e dans sa queue en la frottant contre son pelage et s'en sert au combat."
        },
        {
            "nom": "Goupelin",
            "description": "Peut pr\u00e9dire l'avenir s'il se concentre en fixant la flamme qui danse au bout de sa canne."
        },
        {
            "nom": "Grenousse",
            "description": "Son apparente nonchalance est trompeuse. Il change soudainement d'attitude et domine ses adversaires en un clin d'\u0153il."
        },
        {
            "nom": "Cro\u00e2poral",
            "description": "Ce fin strat\u00e8ge sait se saisir du terrain \u00e0 son avantage. Quand il lance des cailloux recouverts d'\u00e9cume, il ne manque jamais sa cible."
        },
        {
            "nom": "Amphinobi",
            "description": "Sa longue langue enroul\u00e9e autour de son cou peut sentir les mouvements de l'air. Cela l'aide \u00e0 d\u00e9tecter les adversaires qu'il ne peut pas voir."
        },
        {
            "nom": "Sapereau",
            "description": "Il est tr\u00e8s dou\u00e9 pour creuser avec ses oreilles. Il peut forer un terrier atteignant dix m\u00e8tres de profondeur en une nuit."
        },
        {
            "nom": "Excavarenne",
            "description": "Aussi puissant qu'une pelleteuse, il peut venir \u00e0 bout de la roche la plus dure. On fait souvent appel \u00e0 lui pour forer des tunnels."
        },
        {
            "nom": "Passerouge",
            "description": "Son chant m\u00e9lodieux est en fait une tentative d'intimidation. Il picore sans merci tout individu qui p\u00e9n\u00e8tre dans son territoire."
        },
        {
            "nom": "Braisillon",
            "description": "Il lance des \u00e9tincelles dans le terrier de ses proies pour les effrayer. D\u00e8s qu'elles en \u00e9mergent, il les attaque \u00e0 coups de serres."
        },
        {
            "nom": "Flambusard",
            "description": "Flambusard chasse surtout les Pok\u00e9mon oiseaux. Il intimide ses adversaires en produisant des \u00e9tincelles avec son plumage."
        },
        {
            "nom": "L\u00e9pidonille",
            "description": "Il peut manger des feuilles et des racines empoisonn\u00e9es, car il transforme le poison qu'il ing\u00e8re en une poudre noire qu'il \u00e9vacue ensuite."
        },
        {
            "nom": "P\u00e9r\u00e9grain",
            "description": "Si un Furaiglon tente de l'attaquer \u00e0 coups de bec, il riposte \u00e0 l'aide de ses poils tranchants et de sa poudre noire empoisonn\u00e9e."
        },
        {
            "nom": "Prismillon",
            "description": "Ses ailes arborent diff\u00e9rents motifs en fonction de son milieu. Sur une m\u00eame \u00eele, on peut apercevoir des Prismillon dont les motifs varient selon le climat de chaque zone."
        },
        {
            "nom": "H\u00e9lionceau",
            "description": "Les N\u00e9m\u00e9lios femelles leur apprennent \u00e0 chasser. Lorsqu'ils grandissent, ils quittent la troupe et deviennent ind\u00e9pendants."
        },
        {
            "nom": "N\u00e9m\u00e9lios",
            "description": "Les femelles travaillent de concert afin d'abattre leurs proies. Gr\u00e2ce \u00e0 leurs efforts, le groupe mange \u00e0 sa faim."
        },
        {
            "nom": "Flab\u00e9b\u00e9",
            "description": "Ce Pok\u00e9mon parvient \u00e0 extraire l'\u00e9nergie cach\u00e9e des fleurs sauvages. Il aime particuli\u00e8rement les fleurs rouges."
        },
        {
            "nom": "Floette",
            "description": "Ce Pok\u00e9mon parvient \u00e0 canaliser le peu d'\u00e9nergie encore pr\u00e9sent dans les fleurs fan\u00e9es pour leur redonner du tonus. Il tient une fleur rouge."
        },
        {
            "nom": "Florges",
            "description": "Ce Pok\u00e9mon peut vivre des centaines d'ann\u00e9es et consacrer toute sa vie \u00e0 l'entretien d'un seul et m\u00eame jardin. C'est gr\u00e2ce \u00e0 Florges que le champ de fleurs du parc est d'une telle splendeur."
        },
        {
            "nom": "Cabriolaine",
            "description": "Il y a encore peu, les personnes vivant dans les zones montagneuses se d\u00e9pla\u00e7aient \u00e0 dos de Cabriolaine."
        },
        {
            "nom": "Chevroum",
            "description": "Il peut ressentir les \u00e9motions de ses adversaires en les touchant avec ses cornes. Il aide les \u00eatres humains dans leurs travaux depuis 5 000 ans."
        },
        {
            "nom": "Pandespi\u00e8gle",
            "description": "C'est en copiant son mentor, Pandarbare, qu'il apprend toutes les ficelles du m\u00e9tier, de l'art du combat \u00e0 la capture des proies."
        },
        {
            "nom": "Pandarbare",
            "description": "Ce Pok\u00e9mon agressif a recours \u00e0 la force pour faire taire ceux qui le contrarient. Il adore combattre les Ixon."
        },
        {
            "nom": "Couafarel",
            "description": "Le Pok\u00e9mon Caniche. On avait confi\u00e9 au Couafarel, la mission de prot\u00e9ger les rois qui r\u00e9gnaient autrefois sur la r\u00e9gion de Kalos."
        },
        {
            "nom": "Psystigri",
            "description": "Il couvre la source de ses pouvoirs psychiques hors du commun avec ses oreilles afin d'\u00e9viter les accidents."
        },
        {
            "nom": "Mistigrix",
            "description": "S'il se sent menac\u00e9, il l\u00e8ve les oreilles et d\u00e9cha\u00eene un pouvoir psychique capable de r\u00e9duire en miettes un camion de 10 t."
        },
        {
            "nom": "Monorpale",
            "description": "L'\u00e2me de Monorpale est celle d'un humain qui a \u00e9t\u00e9 tu\u00e9 il y a fort longtemps, par la m\u00eame lame qui forme maintenant son corps."
        },
        {
            "nom": "Dimocl\u00e8s",
            "description": "Il s'est d\u00e9doubl\u00e9 en \u00e9voluant. Il intimide ses ennemis \u00e0 grands coups de bruits m\u00e9talliques en entrechoquant ses deux lames."
        },
        {
            "nom": "Exagide",
            "description": "Ils ont fait le bonheur de g\u00e9n\u00e9rations de rois. Leurs pouvoirs psychiques leur permettent de contr\u00f4ler hommes et Pok\u00e9mon."
        },
        {
            "nom": "Fluvetin",
            "description": "Ce Pok\u00e9mon s\u00e9cr\u00e8te son doux parfum gr\u00e2ce \u00e0 un organe en forme de poche. S'il modifie son alimentation, l'odeur de son parfum change."
        },
        {
            "nom": "Cocotine",
            "description": "Un parfum capiteux \u00e9mane constamment de sa fourrure. Ce parfum est si fort qu'il peut priver son Dresseur d'odorat."
        },
        {
            "nom": "Sucroquin",
            "description": "Il mange son propre poids en sucre chaque jour. S'il n'a pas sa dose de sucreries, il devient horriblement grognon."
        },
        {
            "nom": "Cupcanaille",
            "description": "Il peut diagnostiquer l'\u00e9tat de sant\u00e9 mentale et physique de quelqu'un rien qu'\u00e0 l'odorat. Un tel don pourrait avoir des applications en m\u00e9decine."
        },
        {
            "nom": "Sepiatop",
            "description": "Il fait clignoter son corps lumineux en tournoyant. Il communique avec ses cong\u00e9n\u00e8res \u00e0 l'aide de signaux de lumi\u00e8re."
        },
        {
            "nom": "Sepiatroce",
            "description": "Il manipule \u00e0 sa guise ceux qui se sont laiss\u00e9 hypnotiser en observant son corps lumineux trop longtemps."
        },
        {
            "nom": "Opermine",
            "description": "Ils vivent par groupes de deux sur un rocher qui leur convient en bord de mer. \u00c0 mar\u00e9e haute, le duo coop\u00e8re pour capturer des proies."
        },
        {
            "nom": "Golgopathe",
            "description": "Sept Opermine s'assemblent pour former un Golgopathe. La t\u00eate commande les autres membres."
        },
        {
            "nom": "Venalgue",
            "description": "Il se m\u00eale aux algues en d\u00e9composition flottant \u00e0 la surface des oc\u00e9ans afin de surprendre et de d\u00e9vorer les Pok\u00e9mon qui viennent s'en nourrir."
        },
        {
            "nom": "Kravarech",
            "description": "Avec son poison capable de dissoudre le m\u00e9tal, il r\u00e9duit \u00e0 l'\u00e9tat d'\u00e9pave les navires-citernes qui p\u00e9n\u00e8trent sur son territoire."
        },
        {
            "nom": "Flingouste",
            "description": "S'il perd ses pinces au combat, d'autres repoussent \u00e0 la place. La chair qu'elles contiennent est un mets tr\u00e8s appr\u00e9ci\u00e9 \u00e0 Galar."
        },
        {
            "nom": "Gamblast",
            "description": "Il aspire de l'eau et la projette sous pression pour attaquer. Le jet est si puissant qu'il perce m\u00eame d'\u00e9paisses plaques d'acier."
        },
        {
            "nom": "Galvaran",
            "description": "Il absorbe les rayons du soleil en d\u00e9pliant la peau de sa t\u00eate pour produire l'\u00e9lectricit\u00e9 n\u00e9cessaire \u00e0 ses puissantes capacit\u00e9s \u00c9lectrik."
        },
        {
            "nom": "Iguolta",
            "description": "L'\u00e9lectricit\u00e9 que produit un seul Iguolta en agitant sa collerette suffit \u00e0 alimenter un immeuble entier."
        },
        {
            "nom": "Ptyranidur",
            "description": "Ce Pok\u00e9mon ancien a \u00e9t\u00e9 ranim\u00e9 \u00e0 partir d'un fossile. \u00c9go\u00efste et violent, il peut d\u00e9truire n'importe quoi avec son \u00e9norme m\u00e2choire."
        },
        {
            "nom": "Rexillius",
            "description": "Ce Pok\u00e9mon a v\u00e9cu il y a 100 millions d'ann\u00e9es. Il est tr\u00e8s violent, mais sa contenance noble lui donne des airs de royaut\u00e9."
        },
        {
            "nom": "Amagara",
            "description": "Amagara vivait jadis dans les terres glac\u00e9es. On dit que lorsqu'il pousse un cri, une aurore bor\u00e9ale nimbe le ciel nocturne."
        },
        {
            "nom": "Dragmara",
            "description": "Un Dragmara a \u00e9t\u00e9 retrouv\u00e9 dans un glacier, en parfait \u00e9tat de conservation, ce qui a fait la une des actualit\u00e9s."
        },
        {
            "nom": "Nymphali",
            "description": "Une fois le combat entam\u00e9, il n'h\u00e9site pas une seconde, m\u00eame contre un Pok\u00e9mon de type Dragon dix fois plus gros que lui."
        },
        {
            "nom": "Brutalibr\u00e9",
            "description": "Il utilise des tactiques bas\u00e9es sur son agilit\u00e9 pour fatiguer son adversaire, et termine le combat par une magnifique frappe d\u00e9cisive."
        },
        {
            "nom": "Dedenne",
            "description": "Il capte les ondes \u00e9mises par ses cong\u00e9n\u00e8res avec ses moustaches. Cela lui permet de savoir o\u00f9 trouver de la nourriture ou de l'\u00e9lectricit\u00e9."
        },
        {
            "nom": "Strassie",
            "description": "Ce Pok\u00e9mon \u00e9limine les ennemis qui l'attaquent en projetant un laser d'\u00e9nergie g\u00e9n\u00e9r\u00e9 par les pierres pr\u00e9cieuses incrust\u00e9es dans son corps."
        },
        {
            "nom": "Mucuscule",
            "description": "Son corps est principalement compos\u00e9 d'eau. S'il se d\u00e9shydrate, il devient tout rabougri. C'est le plus faible des Pok\u00e9mon Dragon."
        },
        {
            "nom": "Colimucus",
            "description": "\u00c9tant donn\u00e9 sa faiblesse, c'est uniquement gr\u00e2ce \u00e0 son fluide pouvant tout dissoudre qu'il a \u00e9chapp\u00e9 \u00e0 une extinction quasi certaine."
        },
        {
            "nom": "Muplodocus",
            "description": "Il arrive qu'il ne comprenne pas les ordres de son Dresseur et qu'il le regarde d'un air ahuri. Cette r\u00e9action adorable l'a rendu populaire."
        },
        {
            "nom": "Trousselin",
            "description": "Ce Pok\u00e9mon collectionne les cl\u00e9s. Si on lui en confie une particuli\u00e8rement importante, il la prot\u00e8gera co\u00fbte que co\u00fbte."
        },
        {
            "nom": "Broc\u00e9l\u00f4me",
            "description": "Ce Pok\u00e9mon prend vie lorsque l'\u00e2me d'un enfant disparu en for\u00eat prend possession d'une souche d'arbre."
        },
        {
            "nom": "Dess\u00e9liande",
            "description": "Les b\u00fbcherons qui viennent couper des arbres en for\u00eat ont peur d'\u00eatre d\u00e9vor\u00e9s par Dess\u00e9liande. Il est gentil avec les Pok\u00e9mon habitant les bois."
        },
        {
            "nom": "Pitrouille",
            "description": "Taille Mini\u00a0: Les Pitrouille Taille Mini aiment emporter l'\u00e2me des enfants vers l'au-del\u00e0."
        },
        {
            "nom": "Banshitrouye",
            "description": "Taille Mini\u00a0: Les Banshitrouye Taille Mini rev\u00eatent la forme d'enfants pour tromper les adultes et les emmener vers l'au-del\u00e0."
        },
        {
            "nom": "Grela\u00e7on",
            "description": "Gr\u00e2ce \u00e0 son souffle glac\u00e9 \u00e0 - 100 \u00b0 C, il peut geler l'humidit\u00e9 dans l'air et se fa\u00e7onner une carapace de glace."
        },
        {
            "nom": "S\u00e9racrawl",
            "description": "Son immense corps recouvert de glace est aussi solide que de l'acier. Quand il se d\u00e9place, il \u00e9crase tout qui se trouve sur son passage."
        },
        {
            "nom": "Sonistrelle",
            "description": "\u00c0 la tomb\u00e9e de la nuit, il quitte la grotte o\u00f9 il r\u00e9side et s'envole \u00e0 la recherche de fruits m\u00fbrs avec ses ultrasons."
        },
        {
            "nom": "Bruyverne",
            "description": "Il n'h\u00e9site pas \u00e0 an\u00e9antir ses pauvres adversaires qui se retrouvent sans d\u00e9fense dans les t\u00e9n\u00e8bres. Il est d'une nature cruelle et impulsive."
        },
        {
            "nom": "Xerneas",
            "description": "On dit que ce Pok\u00e9mon immortel peut offrir ses forces vitales. Il a \u00e9t\u00e9 ranim\u00e9 apr\u00e8s avoir pass\u00e9 1000 ans endormi sous la forme d'un arbre."
        },
        {
            "nom": "Yveltal",
            "description": "Lorsque les plumes de sa queue et de ses ailes sont d\u00e9ploy\u00e9es et virent au rouge, ce Pok\u00e9mon l\u00e9gendaire absorbe l'\u00e9nergie vitale de ce qui l'entoure."
        },
        {
            "nom": "Zygarde",
            "description": "A 10 % Ses griffes acérées déchirent ses adversaires. Il ne peut pas conserver cette forme longtemps, et se délite après un certain temps. A 50 % Ce Pokémon surveille l'équilibre de l'écosystème en permanence. Si l'on en croit la rumeur, il aurait un grand pouvoir caché... A 100 % L'orifice sur sa poitrine peut déchaîner une puissante énergie capable de tout anéantir. Il utilise sa force pour arrêter ceux qui menacent l'écosystème."
        },
        {
            "nom": "Diancie",
            "description": "\"Oh, mais vous avez attrap\u00e9 un Diancie\u00a0! Je savais que c'\u00e9tait un Pok\u00e9mon rare... mais j'ai m\u00eame entendu dire que c'\u00e9tait un Pok\u00e9mon fabuleux, le roi des fabuleux, oui\u00a0! Vous \u00eates vraiment un grand Dresseur, Joueur.\""
        },
        {
            "nom": "Hoopa",
            "description": "Il poss\u00e8de une puissance consid\u00e9rable sous son apparence v\u00e9ritable. Une l\u00e9gende raconte qu'il d\u00e9sirait si fort un tr\u00e9sor cach\u00e9 dans un ch\u00e2teau qu'il d\u00e9roba l'\u00e9difice tout entier."
        },
        {
            "nom": "Volcanion",
            "description": "Il évacue la vapeur qui s'accumule à l'intérieur de son corps par les bras situés sur son dos. Ce jet est assez puissant pour raser des montagnes."
        },
        {
            "nom": "Brindibou",
            "description": "Il attaque en tirant des plumes ac\u00e9r\u00e9es. La force de ses coups de patte est \u00e9galement redoutable."
        },
        {
            "nom": "Effl\u00e8che",
            "description": "Ce narcissique est un amoureux de la propret\u00e9. Il refuse parfois d'ob\u00e9ir si l'on ne prend pas grand soin de ses plumes."
        },
        {
            "nom": "Arch\u00e9duc",
            "description": "Les plumes de ses ailes lui servent de fl\u00e8ches. Quand il doit \u00e0 tout prix toucher sa cible, il tire sur les lianes de son cou pour se concentrer."
        },
        {
            "nom": "Flamiaou",
            "description": "D\u00e8s qu'il a un instant, il fait sa toilette. Il d\u00e9clenche ses attaques Feu en enflammant les poils qu'il a aval\u00e9s en se l\u00e9chant."
        },
        {
            "nom": "Matoufeu",
            "description": "La poche \u00e0 feu situ\u00e9e \u00e0 la base de son cou gagne en temp\u00e9rature pendant les combats et \u00e9met un bruit semblable \u00e0 un grelot."
        },
        {
            "nom": "F\u00e9linferno",
            "description": "Un Pok\u00e9mon brutal qui n'en fait qu'\u00e0 sa t\u00eate. Selon son humeur du moment, il lui arrive parfois d'ignorer sciemment les ordres de son Dresseur."
        },
        {
            "nom": "Otaquin",
            "description": "\u00c0 force de s'entra\u00eener quotidiennement, les ballons qu'il gonfle avec son nez grossissent de jour en jour."
        },
        {
            "nom": "Otarlette",
            "description": "Il est tout excit\u00e9 quand il est t\u00e9moin d'une danse qu'il ne conna\u00eet pas. Il s'entra\u00eene alors comme un forcen\u00e9 jusqu'\u00e0 la ma\u00eetriser \u00e0 la perfection."
        },
        {
            "nom": "Oratoria",
            "description": "Pour lui, le combat est une performance artistique. Il chante et danse de toute son \u00e2me pour abattre ses proies."
        },
        {
            "nom": "Picassaut",
            "description": "Si tu aper\u00e7ois un trou dans un arbre de la jungle, c'est probablement l'\u0153uvre d'un Picassaut. Ces Pok\u00e9mon creusent les troncs en les martelant de leur bec et s'en servent pour stocker leurs fruits."
        },
        {
            "nom": "Piclairon",
            "description": "Il est capable de produire une centaine de cris diff\u00e9rents qu'il utilise pour marquer son territoire lorsqu'il survole ce dernier."
        },
        {
            "nom": "Bazoucan",
            "description": "Ils communiquent entre eux en se frappant mutuellement sur le bec. La force et la cadence des coups en disent long sur leur \u00e9tat d'esprit."
        },
        {
            "nom": "Manglouton",
            "description": "Il mange de tout, mais aime particuli\u00e8rement les proies fra\u00eeches, voire encore vives. Il erre sur les routes \u00e0 leur recherche."
        },
        {
            "nom": "Argouste",
            "description": "D'un naturel tr\u00e8s patient, il ne peut toutefois s'emp\u00eacher de bondir sur son plat favori, Rattata, s'il en voit un."
        },
        {
            "nom": "Larvibule",
            "description": "Ses mandibules peuvent briser de tr\u00e8s grosses branches. M\u00eame Minisange, son ennemi naturel, s'enfuit \u00e0 tire-d'aile devant lui."
        },
        {
            "nom": "Chrysapile",
            "description": "Il est bien prot\u00e9g\u00e9 par sa robuste carapace, et se d\u00e9fend en g\u00e9n\u00e9rant un courant \u00e9lectrique au bout de ses mandibules."
        },
        {
            "nom": "Lucanon",
            "description": "L'\u00e9lectricit\u00e9 qu'il produit dans son ventre s'accumule dans ses larges mandibules. Il la lib\u00e8re sous forme d'un rayon puissant."
        },
        {
            "nom": "Crabagarre",
            "description": "En attaque comme en d\u00e9fense, la posture de Crabagarre \u00e9voque celle d'un boxeur. Il arrive parfois qu'il prenne un Noadkoko pour un palmier et qu'il lui ass\u00e8ne un coup de poing par erreur."
        },
        {
            "nom": "Crabominable",
            "description": "Il concentre le froid dans ses pinces avant de frapper. Ses coups sont suffisamment puissants pour r\u00e9duire un \u00e9pais mur de glace en morceaux."
        },
        {
            "nom": "Plumeline",
            "description": "Style Pom-Pom\u00a0: Le jaune fonc\u00e9 de son corps s'inverse avec le blanc."
        },
        {
            "nom": "Bombydou",
            "description": "Ce Pok\u00e9mon raffole du pollens et du nectar. Il volette souvent pr\u00e8s des Tournicoton pour collecter leur pollen."
        },
        {
            "nom": "Rubombelle",
            "description": "Il d\u00e9teste la pluie car elle mouille le pollen. Quand la m\u00e9t\u00e9o se d\u00e9grade, il se cache alors dans le creux d'un arbre et attend sans bouger."
        },
        {
            "nom": "Rocabot",
            "description": "Ce Pok\u00e9mon s'attache vite \u00e0 son Dresseur, mais a une f\u00e2cheuse tendance \u00e0 le mordre, ce qui peut compliquer son entra\u00eenement."
        },
        {
            "nom": "Lougaroc",
            "description": "Les rocs de sa crini\u00e8re sont aiguis\u00e9s comme des couteaux. Il poursuit patiemment sa cible pour l'affaiblir et lui porter le coup de gr\u00e2ce."
        },
        {
            "nom": "Froussardine",
            "description": "Individuellement, ils sont tr\u00e8s faibles. Ils ont donc d\u00e9velopp\u00e9 une tactique de d\u00e9placement en banc pour r\u00e9sister aux ennemis."
        },
        {
            "nom": "Vorast\u00e9rie",
            "description": "Ses piq\u00fbres causent un engourdissement qui se mue en d\u00e9mangeaisons si terribles qu'elles poussent la victime \u00e0 se gratter jusqu'au sang."
        },
        {
            "nom": "Pr\u00e9dast\u00e9rie",
            "description": "Pour endurer les temp\u00e9ratures peu cl\u00e9mentes de Galar, il forme un d\u00f4me herm\u00e9tique avec ses pattes pour conserver sa chaleur corporelle."
        },
        {
            "nom": "Tiboudet",
            "description": "Il est si fort qu'il peut ais\u00e9ment porter des charges allant jusqu'\u00e0 50 fois son poids. C'est un expert dans l'art d'utiliser la boue."
        },
        {
            "nom": "Bourrinos",
            "description": "Il reste calme et impassible en toutes circonstances. Il m\u00e9lange sa salive \u00e0 de la terre pour cr\u00e9er une boue sp\u00e9ciale dans sa bouche."
        },
        {
            "nom": "Araqua",
            "description": "Il enveloppe sa t\u00eate dans une bulle d'eau qu'il a gonfl\u00e9e avec son abdomen. Il aime en comparer la taille avec celles de ses cong\u00e9n\u00e8res."
        },
        {
            "nom": "Tarenbulle",
            "description": "Il passe la plupart de son temps dans l'eau. S'il est rassasi\u00e9, il peut conserver ses proies dans sa bulle pour les manger plus tard."
        },
        {
            "nom": "Mimantis",
            "description": "Il d\u00e9gage une odeur d\u00e9licieuse quand il prend le soleil, ce qui attire tous les Pok\u00e9mon Insecte des alentours."
        },
        {
            "nom": "Floramantis",
            "description": "Un magnifique Pok\u00e9mon qui ressemble \u00e0 une fleur. Les Floramantis bien entra\u00een\u00e9s arborent une couleur tr\u00e8s vive."
        },
        {
            "nom": "Spododo",
            "description": "Ses chapeaux sont d\u00e9licieux, et les Pok\u00e9mon de la for\u00eat s'en d\u00e9lectent. Heureusement pour lui, ses couvre-chefs repoussent en une nuit."
        },
        {
            "nom": "Lampignon",
            "description": "Il attire ses proies et les endort gr\u00e2ce au clignotement de ses spores. Il aspire ensuite leur \u00e9nergie vitale du bout de ses doigts."
        },
        {
            "nom": "Tritox",
            "description": "Il fait chauffer le liquide qu'il s\u00e9cr\u00e8te dans ses poches \u00e0 venin avec la flamme de sa queue pour cr\u00e9er un gaz toxique."
        },
        {
            "nom": "Malamandre",
            "description": "Ce Pok\u00e9mon habite au fin fond des cavernes. Il se fait servir par des Tritox envo\u00fbt\u00e9s par ses ph\u00e9romones."
        },
        {
            "nom": "Nounourson",
            "description": "Sa fourrure duveteuse est tr\u00e8s agr\u00e9able \u00e0 caresser, mais ceux qui la touchent sans pr\u00e9venir s'exposent \u00e0 une correction brutale."
        },
        {
            "nom": "Chelours",
            "description": "Il serre fort contre lui ceux qu'il consid\u00e8re comme ses compagnons, mais ses c\u00e2lins sont assez puissants pour broyer des os."
        },
        {
            "nom": "Croquine",
            "description": "La douce odeur fruit\u00e9e qui \u00e9mane de son corps stimule \u00e9norm\u00e9ment l'app\u00e9tit des Pok\u00e9mon oiseaux."
        },
        {
            "nom": "Candine",
            "description": "Il danse en tournant sur lui-m\u00eame et r\u00e9pand une douce odeur dans son sillage. Sentir celle-ci provoque un profond sentiment de bonheur."
        },
        {
            "nom": "Sucreine",
            "description": "Ce v\u00e9ritable virtuose du coup de pied peut mettre K.O. un champion de kick-boxing en une seule frappe."
        },
        {
            "nom": "Gu\u00e9rilande",
            "description": "Il ramasse des fleurs en d\u00e9ployant la liane gluante accroch\u00e9e \u00e0 sa t\u00eate et s'en agr\u00e9mente. Il se sent mal \u00e0 l'aise lorsqu'il n'en a pas."
        },
        {
            "nom": "Gouroutan",
            "description": "D'un mouvement de son \u00e9ventail tiss\u00e9 avec des feuilles et des poils, il peut manipuler les Pok\u00e9mon et les forcer \u00e0 agir selon sa volont\u00e9."
        },
        {
            "nom": "Quartermac",
            "description": "Ils ob\u00e9issent \u00e0 leur chef au doigt et \u00e0 l'oeil, et travaillent en \u00e9quipe pour d\u00e9nicher leurs Baies favorites."
        },
        {
            "nom": "Sovkipou",
            "description": "Ce v\u00e9ritable nettoyeur de la nature mange tout, m\u00eame la nourriture avari\u00e9e et les d\u00e9chets. Les environs de son nid sont toujours impeccables."
        },
        {
            "nom": "Sarmura\u00ef",
            "description": "La carapace qui recouvre son corps est aussi dure que le diamant. Il ne recule devant rien pour gagner."
        },
        {
            "nom": "Bacabouh",
            "description": "Ce Pok\u00e9mon est n\u00e9 lorsqu'une \u00e2me rancuni\u00e8re s'est incarn\u00e9e dans un p\u00e2t\u00e9 de sable. Il tient \u00e9norm\u00e9ment \u00e0 la pelle sur sa t\u00eate."
        },
        {
            "nom": "Tr\u00e9passable",
            "description": "Chacun de ses grains de sable a sa volont\u00e9 propre. Tr\u00e9passable gobe de petits Pok\u00e9mon pour absorber leur \u00e9nergie vitale."
        },
        {
            "nom": "Concombaffe",
            "description": "Il vit dans les eaux chaudes des hauts-fonds. S'il croise un ennemi, il l'attaque en lui crachant ses organes internes au visage."
        },
        {
            "nom": "Type:0",
            "description": "On raconte qu'il aurait \u00e9t\u00e9 recr\u00e9\u00e9 \u00e0 Galar suite \u00e0 un vol de documents de recherche hautement confidentiels."
        },
        {
            "nom": "Silvalli\u00e9",
            "description": "Il a r\u00e9veill\u00e9 tout son potentiel et a \u00e9volu\u00e9. Briser son lourd masque a d\u00e9cupl\u00e9 sa vitesse."
        },
        {
            "nom": "M\u00e9t\u00e9no",
            "description": "Ce Pok\u00e9mon viendrait du ciel. Il nous a offert un spectacle magnifique dans le d\u00e9sert lorsqu'on l'a vu repartir en direction du firmament."
        },
        {
            "nom": "Dodoala",
            "description": "Ce Pok\u00e9mon passe sa vie \u00e0 dormir. Il se nourrit de feuilles particuli\u00e8rement toxiques que lui seul est capable d'assimiler sans danger."
        },
        {
            "nom": "Boumata",
            "description": "Il s'abrite derri\u00e8re une carapace couverte d'explosifs. Lorsqu'un ennemi l'attaque, il riposte \u00e0 grands coups de d\u00e9flagrations."
        },
        {
            "nom": "Togedemaru",
            "description": "Les quatorze \u00e9pines de son dos se h\u00e9rissent de leur propre chef quand il est surpris ou excit\u00e9."
        },
        {
            "nom": "Mimiqui",
            "description": "Ce Pok\u00e9mon docile d\u00e9teste la solitude, mais il oppose une r\u00e9sistance acharn\u00e9e si l'on essaie de jeter un coup d'\u0153il sous son d\u00e9guisement."
        },
        {
            "nom": "Denticrisse",
            "description": "Ce Pok\u00e9mon grince fortement des dents afin de stimuler son cerveau. Il projette ensuite l'\u00e9nergie psychique ainsi cr\u00e9\u00e9e par l'appendice sur sa t\u00eate."
        },
        {
            "nom": "Dra\u00efeul",
            "description": "Il vit dans les montagnes culminant \u00e0 plus de 3 000 m d'altitude. Il se rend parfois en ville pour jouer avec les petits enfants."
        },
        {
            "nom": "Sinistrail",
            "description": "Ce Pok\u00e9mon Spectre na\u00eet lorsque les algues d\u00e9rivant au fond de l'oc\u00e9an se fixent sur des morceaux d'\u00e9paves de navire."
        },
        {
            "nom": "B\u00e9b\u00e9caille",
            "description": "Il apprend \u00e0 se battre en entrechoquant l'\u00e9caille qu'il a sur la t\u00eate avec celle de ses cong\u00e9n\u00e8res, ce qui renforce sa technique et son esprit."
        },
        {
            "nom": "\u00c9ca\u00efd",
            "description": "Ses \u00e9cailles arrach\u00e9es et son corps couvert de cicatrices sont la preuve de sa puissance. Il les montre \u00e0 son adversaire vaincu en se pavanant."
        },
        {
            "nom": "\u00c9ka\u00efser",
            "description": "Quand il hurle pour f\u00eater sa victoire sur une proie, on entend ses cong\u00e9n\u00e8res se r\u00e9jouir de toutes parts dans un grand tintement m\u00e9tallique."
        },
        {
            "nom": "Tokorico",
            "description": "Gardien de Mele-Mele, il est curieux de tout. Il a le pouvoir d'appeler les nuages orageux pour stocker la foudre dans son corps.Il déstabilise ses ennemis avec sa vitesse ébouriffante. Il pique souvent des colères noires, mais il en oublie aussitôt la raison."
        },
        {
            "nom": "Tokopiyon",
            "description": "Pokémon candide mais terriblement cruel, c'est le gardien d'Akala. Il puise son énergie dans le parfum entêtant des fleurs.Avec ses ailes délicates, il répand une poudre mystérieuse et lumineuse quand il vole. Il suffit de le toucher pour retrouver aussitôt le sourire."
        },
        {
            "nom": "Tokotoro",
            "description": "Il arrache de grands arbres et fait des moulinets avec. Il a le pouvoir de rendre la végétation luxuriante pour ensuite se nourrir de cette force.C'est l'indolent gardien d'Ula-Ula. Il se sert de la végétation pour immobiliser des ennemis, avant de les empaler avec ses cornes."
        },
        {
            "nom": "Tokopisco",
            "description": "Il confond ses ennemis grâce au brouillard et les pousse à s'en prendre à eux-mêmes. Il puise son énergie dans les courants marins.Gardien de Poni, il a le pouvoir de contrôler l'eau. On raconte qu'il peut produire une eau limpide qui nettoie toutes les impuretés."
        },
        {
            "nom": "Cosmog",
            "description": "Il vient d'un autre univers. Son corps gazeux est si l\u00e9ger que la moindre brise peut l'emporter."
        },
        {
            "nom": "Cosmovum",
            "description": "La carapace qui le recouvre est plus dure que tout ce qui est connu par l'Homme. Il grandit en absorbant la lumi\u00e8re des \u00e9toiles."
        },
        {
            "nom": "Solgaleo",
            "description": "Lorsqu'il ouvre une Ultra-Br\u00e8che, il arrive que de l'\u00e9nergie et des formes de vie d'autres mondes se retrouvent dans le n\u00f4tre."
        },
        {
            "nom": "Lunala",
            "description": "Des documents extr\u00eamement anciens le d\u00e9crivent comme \u00ab\u00a0celui qui invite la lune\u00a0\u00bb."
        },
        {
            "nom": "Zéroïd",
            "description": "L'une des mystérieuses Ultra-Chimères. On l'aurait vue parasiter des gens en pleine rue, les rendant extrêmement violents.Nul ne sait si cette Ultra-Chimère possède une conscience propre, mais on l'aurait aperçue en train d'imiter les gestes d'une jeune fille."
        },
        {
            "nom": "Mouscoto",
            "description": "ersonne ne sait si cette Ultra-Chimère venue d'un autre monde montre ses muscles pour être admirée ou pour intimider ceux qu'elle rencontre.L'une des mystérieuses Ultra-Chimères. On l'aurait aperçue réduisant un camion à benne en miette d'un seul coup de poing."
        },
        {
            "nom": "Cancrelove",
            "description": "Une forme de vie venant d'un autre monde. Son corps gracile cache une puissance insoup\u00e7onn\u00e9e."
        },
        {
            "nom": "Câblifère",
            "description": "L'une des mystérieuses Ultra-Chimères. On l'aurait vue émettre une formidable quantité d'électricité autour d'elle.Une créature échappée de l'Ultra-Brèche. Elle a attaqué une centrale électrique, aussi suppose-t-on qu'elle se nourrit d'électricité."
        },
        {
            "nom": "Bamboiselle",
            "description": "Une Ultra-Chimère qui a traversé l'Ultra-Brèche. On l'aurait aperçue parcourir le ciel à grande vitesse.On peut détecter des pics d'énergie émis par ses bras gigantesques."
        },
        {
            "nom": "Katagami",
            "description": "Une espèce d'Ultra-Chimère. Elle ne semble pas agressive, bien que son corps tout entier soit une arme tranchante. On l'aurait aperçue coupant un pylône métallique en deux d'un seul tranchant."
        },
        {
            "nom": "Engloutyran",
            "description": "Une espèce d'Ultra-Chimère. On l'aurait aperçue dévorant des montagnes et des gratte-ciel. Elle est constamment en train de manger, mais ne semble pas produire d'excréments."
        },
        {
            "nom": "Necrozma",
            "description": "La lumi\u00e8re est sa source d'\u00e9nergie. Les impuret\u00e9s que son corps a accumul\u00e9es en dormant sous terre lui ont donn\u00e9 cette couleur noire."
        },
        {
            "nom": "Magearna",
            "description": "Ce Pokémon a été créé de toutes pièces il y a 500 ans. Il comprend ce qu'on lui dit, mais il n'est pas doué de parole.Son corps mécanique n'est qu'une enveloppe. Sa véritable nature est une âme artificielle nommée Animacœur."
        },
        {
            "nom": "Marshadow",
            "description": "Il s'est gliss\u00e9 dans l'ombre d'un ma\u00eetre du kung-fu. Il s'est aussi appropri\u00e9 sa botte secr\u00e8te ultime en copiant ses mouvements."
        },
        {
            "nom": "Vémini",
            "description": "Dans son monde, cette Ultra-Chimère est fort appréciée pour son naturel conciliant, qui fait d'elle un compagnon de voyage idéal. Elle ricane lorsqu'elle asperge ses proies de venin grâce au dard qu'elle a sur la tête."
        },
        {
            "nom": "Mandrillon",
            "description": "Son corps contient des hectolitres de poison. Il fait partie de ces créatures que l'on nomme Ultra-Chimères. Elle utilise son aiguillon pour sécréter un venin toxique, luisant et gluant."
        },
        {
            "nom": "Ama-Ama",
            "description": "Il est sorti d'une Ultra-Brèche. Il est composé de plusieurs petites entités qui s'assemblent pour n'en former qu'une seule. Si un mur se met en branle et vous attaque sans prévenir, c'est lui."
        },
        {
            "nom": "Pierroteknik",
            "description": "Cette Ultra-Chimère sortie d'une Ultra-Brèche provoque des explosions pour surprendre l'ennemi et en profite pour voler son énergie. Il s'approche des gens avec son allure désarticulée et fait subitement exploser sa tête."
        },
        {
            "nom": "Zeraora",
            "description": "Il fonce sur ses ennemis \u00e0 la vitesse de l'\u00e9clair et les d\u00e9chiquette \u00e0 l'aide de ses griffes charg\u00e9es \u00e0 haute tension."
        },
        {
            "nom": "Meltan",
            "description": "Ce Pok\u00e9mon fait fondre le fer et les autres m\u00e9taux contenus dans le sol pour les int\u00e9grer \u00e0 son corps compos\u00e9 d'acier fondu."
        },
        {
            "nom": "Melmetal",
            "description": "Autrefois v\u00e9n\u00e9r\u00e9 pour son aptitude \u00e0 produire du fer, ce Pok\u00e9mon a myst\u00e9rieusement ressuscit\u00e9 apr\u00e8s 3 000 ans."
        },
        {
            "nom": "Ouistempo",
            "description": "Le rythme qu'il cr\u00e9e en tapant avec son b\u00e2ton tr\u00e8s sp\u00e9cial g\u00e9n\u00e8re des ondes sonores qui ont le pouvoir de vivifier les plantes."
        },
        {
            "nom": "Badabouin",
            "description": "Les Badabouin qui parviennent \u00e0 suivre le rythme le plus effr\u00e9n\u00e9 avec leurs deux b\u00e2tons sont les plus respect\u00e9s par leurs camarades."
        },
        {
            "nom": "Gorythmic",
            "description": "Il contr\u00f4le le pouvoir de sa souche singuli\u00e8re en tapant en rythme dessus. Il se bat en manipulant des racines."
        },
        {
            "nom": "Flambino",
            "description": "Il court pour augmenter sa temp\u00e9rature et faire circuler l'\u00e9nergie incandescente dans son corps. Il peut ainsi d\u00e9ployer toute sa puissance."
        },
        {
            "nom": "Lapyro",
            "description": "Son pelage \u00e9pais lui permet de mieux r\u00e9sister au froid et d'augmenter la temp\u00e9rature de ses capacit\u00e9s Feu."
        },
        {
            "nom": "Pyrobut",
            "description": "Il drible avec des pierres pour en faire des ballons enflamm\u00e9s, avant de tirer sur ses adversaires pour les br\u00fbler."
        },
        {
            "nom": "Larm\u00e9l\u00e9on",
            "description": "Quand il a peur, il pleure des larmes contenant une substance lacrymog\u00e8ne d'une puissance \u00e9quivalente \u00e0 celle de cent oignons."
        },
        {
            "nom": "Arrozard",
            "description": "Il cr\u00e9e des bombes \u00e0 eau gr\u00e2ce au liquide qu'il s\u00e9cr\u00e8te avec la paume de ses mains. Il s'en sert dans les combats o\u00f9 la strat\u00e9gie prime."
        },
        {
            "nom": "L\u00e9zargus",
            "description": "Il a plus d'un tour dans son sac\u00a0: il peut tirer des gerbes d'eau du bout de ses doigts et planer dans les airs gr\u00e2ce \u00e0 ses membranes dorsales."
        },
        {
            "nom": "Rongourmand",
            "description": "On le trouve partout \u00e0 Galar. S'il n'a pas de Baies en r\u00e9serve dans ses deux joues, il devient anxieux."
        },
        {
            "nom": "Rongrigou",
            "description": "Il amasse tellement de Baies dans sa queue qu'elles tombent les unes apr\u00e8s les autres, mais il est si \u00e9tourdi qu'il ne s'en rend pas compte."
        },
        {
            "nom": "Minisange",
            "description": "Ce Pok\u00e9mon brave affronte m\u00eame les adversaires les plus redoutables. Il devient plus fort \u00e0 mesure qu'il subit les contre-attaques."
        },
        {
            "nom": "Bleuseille",
            "description": "Il est capable d'utiliser des objets avec ses serres\u00a0: il peut par exemple saisir et lancer des pierres ou m\u00eame enrouler une corde autour d'un ennemi."
        },
        {
            "nom": "Corvaillus",
            "description": "Il n'a aucun rival dans le ciel de Galar. L'aspect intimidant de son corps d'acier noir et lustr\u00e9 inspire la crainte chez ses ennemis."
        },
        {
            "nom": "Larvadar",
            "description": "Comme il passe tout son temps \u00e0 recueillir des informations, son intelligence est tr\u00e8s d\u00e9velopp\u00e9e, mais sa force physique laisse \u00e0 d\u00e9sirer."
        },
        {
            "nom": "Col\u00e9od\u00f4me",
            "description": "Il ne bouge presque pas, mais il est bien vivant. On dit qu'il aurait d\u00e9couvert ses pouvoirs psychiques \u00e0 force de je\u00fbner dans sa coquille."
        },
        {
            "nom": "Astronelle",
            "description": "Il est renomm\u00e9 pour son intelligence. Son gros cerveau est un indicateur de la puissance de ses pouvoirs psychiques."
        },
        {
            "nom": "Goupilou",
            "description": "Il vit en subtilisant la nourriture des autres Pok\u00e9mon. Gr\u00e2ce \u00e0 ses coussinets moelleux, il ne fait aucun bruit quand il marche."
        },
        {
            "nom": "Roublenard",
            "description": "Il marque sa victime pour la suivre \u00e0 l'odeur. Sit\u00f4t qu'elle est distraite, il s'empresse de lui voler ses biens."
        },
        {
            "nom": "Tournicoton",
            "description": "Quand il plante son unique pied pour absorber la lumi\u00e8re du soleil, ses p\u00e9tales prennent une couleur \u00e9clatante."
        },
        {
            "nom": "Blancoton",
            "description": "Les graines de son duvet sont remplies de nutriments. Elles sont emport\u00e9es par le vent et redonnent vitalit\u00e9 aux plantes et aux Pok\u00e9mon."
        },
        {
            "nom": "Moumouton",
            "description": "Son pelage fris\u00e9 est doux et rebondi comme un coussin. Une telle toison le prot\u00e9gerait m\u00eame s'il chutait d'une falaise."
        },
        {
            "nom": "Moumouflon",
            "description": "La texture de sa laine est si \u00e9lastique que la surface des tapis fabriqu\u00e9s avec ce mat\u00e9riau est aussi rebondissante que celle d'un trampoline."
        },
        {
            "nom": "Kh\u00e9locrok",
            "description": "Il a pour habitude de mordre tout ce qui lui passe sous les yeux. On raconte qu'il fait cela parce que ses incisives qui poussent le d\u00e9mangent."
        },
        {
            "nom": "Torgamord",
            "description": "De nature tr\u00e8s violente, il mord fermement ses proies avec sa m\u00e2choire, assez puissante pour broyer une barre de fer."
        },
        {
            "nom": "Voltoutou",
            "description": "Lorsqu'il court, on peut voir de l'\u00e9lectricit\u00e9 se former \u00e0 la base de sa queue. Ce Pok\u00e9mon est tr\u00e8s populaire aupr\u00e8s des bergers de Galar."
        },
        {
            "nom": "Fulgudog",
            "description": "Il produit de l'\u00e9lectricit\u00e9 puis la transf\u00e8re dans ses pattes pour mieux courir. Ainsi, il peut foncer pendant trois jours et trois nuits."
        },
        {
            "nom": "Charbi",
            "description": "On l'a d\u00e9couvert dans une mine il y a 400 ans. Son corps est presque enti\u00e8rement compos\u00e9 d'une substance identique au charbon."
        },
        {
            "nom": "Wagomine",
            "description": "Il produit du charbon dans son corps. Jadis, les habitants de Galar ramassaient ce charbon au sol et s'en servaient pour leurs besoins quotidiens."
        },
        {
            "nom": "Monthracite",
            "description": "Il est d'une nature paisible, mais si les humains tentent de piller ses mines, il enrage et br\u00fble tout avec des flammes \u00e0 1 500 \u00b0 C."
        },
        {
            "nom": "Verpom",
            "description": "Il vit toujours dans sa pomme. S'il croise un Pok\u00e9mon oiseau, son pr\u00e9dateur naturel, il se fait passer pour un simple fruit pour se prot\u00e9ger."
        },
        {
            "nom": "Pomdrapi",
            "description": "Il a \u00e9volu\u00e9 apr\u00e8s avoir mang\u00e9 une pomme acide. Il concentre dans ses joues un liquide si corrosif qu'il peut provoquer des br\u00fblures."
        },
        {
            "nom": "Dratatin",
            "description": "Il a \u00e9volu\u00e9 apr\u00e8s avoir mang\u00e9 une pomme sucr\u00e9e. Il attire ses proies, les Pok\u00e9mon Insecte, en d\u00e9gageant un parfum mielleux."
        },
        {
            "nom": "Dunaja",
            "description": "Il amasse le sable qu'il avale en creusant dans la poche de son cou. Elle peut en contenir jusqu'\u00e0 huit kilos."
        },
        {
            "nom": "Dunaconda",
            "description": "Il peut expulser 100 kg de sable de ses narines en compressant tout son corps. Quand il est \u00e0 court de sable, il a tendance \u00e0 se d\u00e9rober."
        },
        {
            "nom": "Nigosier",
            "description": "Il est assez puissant pour terrasser un ennemi d'un seul coup, mais il est tellement nigaud qu'il oublie contre qui il se bat."
        },
        {
            "nom": "Embrochet",
            "description": "Sa m\u00e2choire fine et aiguis\u00e9e fait sa fiert\u00e9. \u00c0 peine voit-il le moindre mouvement qu'il fonce dans sa direction."
        },
        {
            "nom": "Hastacuda",
            "description": "Sa m\u00e2choire pointue comme une lance est aussi dure que l'acier, et sa chair serait, contre toute attente, succulente."
        },
        {
            "nom": "Toxizap",
            "description": "Sa peau s\u00e9cr\u00e8te les toxines accumul\u00e9es dans sa poche de poison interne. Quand on le touche, on se fait \u00e9lectrocuter."
        },
        {
            "nom": "Salarsen",
            "description": "Lorsqu'il gratte l'excroissance sur son ventre pour produire de l'\u00e9lectricit\u00e9, on peut entendre un son similaire \u00e0 celui d'une guitare."
        },
        {
            "nom": "Grillepattes",
            "description": "Il produit de la chaleur gr\u00e2ce au gaz inflammable qu'il emmagasine dans son corps. La partie jaune de son abdomen est particuli\u00e8rement br\u00fblante."
        },
        {
            "nom": "Scolocendre",
            "description": "Quand il g\u00e9n\u00e8re de la chaleur, sa temp\u00e9rature est d'environ 800\u00b0C. Il se sert de son corps comme d'un fouet pour sauter sur ses ennemis."
        },
        {
            "nom": "Poulpaf",
            "description": "Il se rend sur la terre ferme pour se nourrir. Tr\u00e8s curieux, son premier r\u00e9flexe est de frapper tout ce qu'il voit avec ses tentacules."
        },
        {
            "nom": "Krakos",
            "description": "Son corps est un amas de muscles. La puissance des prises d'\u00e9tranglement qu'il ex\u00e9cute avec ses tentacules est saisissante."
        },
        {
            "nom": "Th\u00e9ffroi",
            "description": "La spirale sur son corps est son point faible. Si on la touille, elle perd sa forme, ce qui lui donne des vertiges."
        },
        {
            "nom": "Polth\u00e9geist",
            "description": "Son go\u00fbt et son parfum sont tr\u00e8s particuliers. Seuls les Dresseurs en lesquels il a enti\u00e8rement confiance sont autoris\u00e9s \u00e0 en boire une gorg\u00e9e."
        },
        {
            "nom": "Bibichut",
            "description": "La protub\u00e9rance sur sa t\u00eate lui permet de percevoir les \u00e9motions des \u00eatres vivants. Il n'accorde sa confiance qu'aux gens calmes."
        },
        {
            "nom": "Chapotus",
            "description": "S'il ressent des \u00e9motions trop fortes, il en fera taire la source, quelle qu'elle soit, en utilisant des m\u00e9thodes assez violentes."
        },
        {
            "nom": "Sorcilence",
            "description": "Il \u00e9loigne les autres \u00eatres vivants en \u00e9mettant des ondes psychiques pouvant donner des maux de t\u00eate \u00e9pouvantables."
        },
        {
            "nom": "Grimalin",
            "description": "Pour se refaire une sant\u00e9, il hume l'\u00e9nergie n\u00e9gative que les humains et les Pok\u00e9mon d\u00e9gagent quand ils sont irrit\u00e9s."
        },
        {
            "nom": "Fourbelin",
            "description": "Sa technique de combat consiste \u00e0 faire semblant de se prosterner devant son adversaire pour le transpercer avec ses cheveux aiguis\u00e9s."
        },
        {
            "nom": "Angoliath",
            "description": "Il enroule ses cheveux autour de son corps pour augmenter sa masse musculaire, ce qui lui donne assez de force pour enserrer un Mackogneur."
        },
        {
            "nom": "Ixon",
            "description": "Il poss\u00e8de une puissance vocale remarquable. On appelle Blocage sa technique qui consiste \u00e0 intimider l'ennemi avec son cri guttural."
        },
        {
            "nom": "Berserkatt",
            "description": "La fourrure sur sa t\u00eate s'est endurcie et a pris la forme d'un casque en fer. Il est de nature tr\u00e8s bagarreuse."
        },
        {
            "nom": "Coray\u00f4me",
            "description": "Son \u00e9nergie spectrale accrue s'est r\u00e9pandue hors de sa coquille. Il prot\u00e8ge l'\u00e2me de son noyau avec son corps spirituel."
        },
        {
            "nom": "Palarticho",
            "description": "Seuls les Canarticho ayant surv\u00e9cu \u00e0 de nombreux combats atteignent ce stade d'\u00e9volution. Si son poireau se fl\u00e9trit, il se retire du champ de bataille."
        },
        {
            "nom": "M. Glaquette",
            "description": "V\u00e9ritable virtuose des claquettes, il se donne en spectacle en dansant d'un pas l\u00e9ger tout en jonglant avec sa canne de glace."
        },
        {
            "nom": "Tut\u00e9t\u00e9kri",
            "description": "Les motifs antiques qui ont \u00e9t\u00e9 grav\u00e9s en y incorporant une puissante mal\u00e9diction ont aspir\u00e9 l'\u00e2me de Tutafeh avant de prendre vie."
        },
        {
            "nom": "Cr\u00e8my",
            "description": "Son corps de cr\u00e8me s'est compos\u00e9 \u00e0 partir de particules au parfum sucr\u00e9 flottant dans l'air."
        },
        {
            "nom": "Charmilly",
            "description": "Il offre aux Dresseurs auxquels il accorde toute sa confiance des Baies d\u00e9cor\u00e9es avec de la cr\u00e8me."
        },
        {
            "nom": "Hexadron",
            "description": "C'est une entit\u00e9 unique compos\u00e9e d'un chef et de cinq cadets. Ces derniers ob\u00e9issent sans sourciller \u00e0 leur sup\u00e9rieur hi\u00e9rarchique."
        },
        {
            "nom": "Wattapik",
            "description": "Il lib\u00e8re de l'\u00e9lectricit\u00e9 depuis la pointe de ses \u00e9pines, et se nourrit des algues accroch\u00e9es aux rochers en les arrachant avec ses dents aiguis\u00e9es."
        },
        {
            "nom": "Frissonille",
            "description": "Il crache un fil gel\u00e9 qu'il utilise pour s'accrocher \u00e0 une branche\u00a0: il dort ainsi en imitant une stalactite."
        },
        {
            "nom": "Beldeneige",
            "description": "La temp\u00e9rature de ses ailes est de - 180\u00b0C. Quand il vole, ses \u00e9cailles gel\u00e9es tombent sur le paysage comme des flocons de neige."
        },
        {
            "nom": "Dolman",
            "description": "Il se tient immobile au milieu des plaines et passe son temps \u00e0 observer la course du soleil dans le ciel. Son jeu de jambes est ph\u00e9nom\u00e9nal."
        },
        {
            "nom": "Bekagla\u00e7on",
            "description": "Originaire d'une contr\u00e9e polaire, ce Pok\u00e9mon a d\u00e9barqu\u00e9 dans la r\u00e9gion ballott\u00e9 par les flots. Il garde toujours la t\u00eate froide."
        },
        {
            "nom": "Wimessir",
            "description": "Il peut sentir les \u00e9motions d'autrui avec ses cornes. Le m\u00e2le reste aux c\u00f4t\u00e9s de son Dresseur pour s'occuper de lui, \u00e0 l'image d'un domestique."
        },
        {
            "nom": "Morpeko",
            "description": "Il a toujours un petit creux. Il grignote les graines qu'il a mises dans ses sortes de poches pour produire de l'\u00e9lectricit\u00e9."
        },
        {
            "nom": "Charibari",
            "description": "Ce Pok\u00e9mon est assez costaud pour porter des charges de cinq tonnes sans probl\u00e8me. Il utilise sa trompe pour creuser le sol."
        },
        {
            "nom": "Pachyradjah",
            "description": "Sa peau verte r\u00e9siste bien \u00e0 l'eau. Il s'est install\u00e9 dans la r\u00e9gion il y a longtemps et a travaill\u00e9 en coop\u00e9ration avec les Hommes."
        },
        {
            "nom": "Galvagon",
            "description": "Jadis, la partie inf\u00e9rieure de son corps muscl\u00e9 le rendait invincible, mais il s'est \u00e9teint apr\u00e8s avoir mang\u00e9 toutes les plantes dont il se nourrissait."
        },
        {
            "nom": "Galvagla",
            "description": "Quand la partie sup\u00e9rieure de son corps, couverte de glace, frissonne, il produit de l'\u00e9lectricit\u00e9. Il \u00e9prouve de grandes difficult\u00e9s \u00e0 marcher."
        },
        {
            "nom": "Hydragon",
            "description": "La force de ses pattes et de ses m\u00e2choires le rendait presque invincible, mais \u00e0 trop chasser ses proies, celles-ci ont disparu, et lui avec."
        },
        {
            "nom": "Hydragla",
            "description": "Il g\u00e8le les alentours pour capturer ses proies, mais comme sa bouche est sur le dessus de sa t\u00eate, il a beaucoup de mal \u00e0 les manger."
        },
        {
            "nom": "Duralugon",
            "description": "Son corps, semblable \u00e0 du m\u00e9tal poli, allie l\u00e9g\u00e8ret\u00e9 et solidit\u00e9. Malheureusement, il rouille facilement."
        },
        {
            "nom": "Fantyrm",
            "description": "Revenu \u00e0 la vie sous forme de Pok\u00e9mon Spectre, il erre au-dessus de la mer dans laquelle il vivait autrefois."
        },
        {
            "nom": "Dispareptil",
            "description": "Il vole \u00e0 une vitesse de 200 km/h et se bat aux c\u00f4t\u00e9s d'un Fantyrm, dont il prend soin jusqu'\u00e0 son \u00e9volution."
        },
        {
            "nom": "Lanssorien",
            "description": "Il vit en compagnie de Fantyrm qui logent dans les trous de ses cornes. Quand il passe \u00e0 l'attaque, il les propulse \u00e0 la vitesse du son."
        },
        {
            "nom": "Zacian",
            "description": "\u00c9galement surnomm\u00e9 \u00ab\u00a0h\u00e9ros l\u00e9gendaire\u00a0\u00bb, ce Pok\u00e9mon absorbe du m\u00e9tal et se change en arme pour se battre."
        },
        {
            "nom": "Zamazenta",
            "description": "Ce Pok\u00e9mon sauva autrefois Galar en joignant ses forces \u00e0 celles du roi des Hommes. Il absorbe du m\u00e9tal quand il passe au combat."
        },
        {
            "nom": "\u00c9thernatos",
            "description": "Il devient actif en absorbant l'\u00e9nergie qui \u00e9merge du sol de Galar gr\u00e2ce au noyau situ\u00e9 sur sa poitrine."
        },
        {
            "nom": "\u00c9thernatos",
            "description": "Il devient actif en absorbant l'\u00e9nergie qui \u00e9merge du sol de Galar gr\u00e2ce au noyau situ\u00e9 sur sa poitrine."
        },
        {
            "nom": "Wushours",
            "description": "Il suit un entra\u00eenement rigoureux pour parfaire ses techniques. La forme de son \u00e9volution d\u00e9pend des capacit\u00e9s qu'il a assimil\u00e9es."
        },
        {
            "nom": "Shifours",
            "description": "Adepte des techniques pouvant mettre K.O. en un seul coup, il se jette sur son adversaire et le frappe de son poing robuste."
        },
        {
            "nom": "Shifours",
            "description": "Adepte des techniques pouvant mettre K.O. en un seul coup, il se jette sur son adversaire et le frappe de son poing robuste."
        },
        {
            "nom": "Zarude",
            "description": "Ils vivent en groupe dans la jungle, o\u00f9 les autres Pok\u00e9mon les craignent \u00e0 cause de leur nature agressive."
        },
        {
            "nom": "Regieleki",
            "description": "Son corps est un v\u00e9ritable concentr\u00e9 d'\u00e9nergie \u00e9lectrique. On raconte que si on lui retire ses anneaux, sa puissance cach\u00e9e se lib\u00e8re."
        },
        {
            "nom": "Regidrago",
            "description": "Une th\u00e9orie stipule que ses bras ont la forme de la t\u00eate d'un Pok\u00e9mon Dragon des temps anciens, mais aucune preuve ne l'atteste."
        },
        {
            "nom": "Blizzeval",
            "description": "Violent au point de s'emparer de tout ce qu'il d\u00e9sire par la force, ce Pok\u00e9mon est capable de lib\u00e9rer un puissant air glacial de ses sabots."
        },
        {
            "nom": "Spectreval",
            "description": "Il se sert de tous ses sens pour se rep\u00e9rer, sauf celui de la vue. Un coup de ses sabots suffirait \u00e0 s\u00e9parer l'\u00e2me du corps de sa cible."
        },
        {
            "nom": "Sylveroy",
            "description": "Dot\u00e9 de pouvoir de gu\u00e9rison et d'abondance, ce Pok\u00e9mon mis\u00e9ricordieux r\u00e9gnait sur Galar il y a fort longtemps."
        },
        {
            "nom": "Cerbyllin",
            "description": "Ses boules noires \u00e9mettent une inqui\u00e9tante lueur lorsqu'il \u00e9rige des barri\u00e8res invisibles. Les poils de barbe qu'il perd servent \u00e0 confectionner des v\u00eatements d'hiver bien chauds."
        },
        {
            "nom": "Hach\u00e9cateur",
            "description": "Il se prot\u00e8ge \u00e0 l'aide de roches dures et abat des arbres avec ses haches frustes. Comme il poss\u00e8de un temp\u00e9rament violent, il est pr\u00e9f\u00e9rable de fuir quand on le croise dans la nature."
        },
        {
            "nom": "Ursaking",
            "description": "Je pense que ce sont les \u00e9tendues mar\u00e9cageuses de Hisui qui ont dot\u00e9 ce Pok\u00e9mon d'un corps robuste et d'une aptitude \u00e0 manipuler la tourbe."
        },
        {
            "nom": "Paragruel",
            "description": "Ce Pok\u00e9mon rev\u00eat les \u00e2mes de ses camarades qui ont p\u00e9ri en remontant les rivi\u00e8res. Dans les fleuves qui traversent Hisui, aucune autre esp\u00e8ce n'est \u00e0 sa mesure."
        },
        {
            "nom": "Farfurex",
            "description": "Ce Pok\u00e9mon n'a gu\u00e8re d'ennemis sur les hauteurs froidies, car ses aptitudes physiques sont sans \u00e9gales et son poison est mortel. Il pr\u00e9f\u00e8re la solitude \u00e0 la vie en groupe."
        },
        {
            "nom": "Qwilpik",
            "description": "Ses \u00e9pines semblables \u00e0 des lances et sa nature violente lui valent le sobriquet \u00ab\u00a0d'ogre des oc\u00e9ans\u00a0\u00bb. Il se repa\u00eet du poison qu'il aspire."
        },
        {
            "nom": "Amov\u00e9nus",
            "description": "Son arriv\u00e9e par les mers annonce la fin des hivers rigoureux. On raconte que c'est l'amour que ce Pok\u00e9mon ressent qui fait bourgeonner de nouvelles vies dans la r\u00e9gion de Hisui."
        },
        {
            "nom": "Poussacha",
            "description": "Ce Pok\u00e9mon lave assid\u00fbment son visage pour \u00e9viter qu'il ne s'ass\u00e8che. La composition de son pelage soyeux est proche de celle des plantes."
        },
        {
            "nom": "Matourgeon",
            "description": "Il manie avec habilet\u00e9 la liane dissimul\u00e9e sous ses longs poils et frappe ses adversaires avec le bourgeon dur situ\u00e9 \u00e0 son extr\u00e9mit\u00e9."
        },
        {
            "nom": "Miascarade",
            "description": "Il se sert de la r\u00e9verb\u00e9ration de la lumi\u00e8re sur la fourrure de sa cape pour camoufler sa tige, ce qui donne l'illusion que sa fleur flotte dans les airs."
        },
        {
            "nom": "Chochodile",
            "description": "Il s'allonge sur des pierres chaudes et produit de l'\u00e9nergie de type Feu gr\u00e2ce \u00e0 la chaleur absorb\u00e9e par ses \u00e9cailles rectangulaires."
        },
        {
            "nom": "Crocogril",
            "description": "La boule de feu en forme d'\u0153uf qui surmonte sa t\u00eate r\u00e9sulte de la fusion entre son \u00e9nergie de type Feu et son trop-plein de vitalit\u00e9."
        },
        {
            "nom": "Fl\u00e2migator",
            "description": "Quand il chante, son oiseau de feu change de forme. Cet oiseau serait n\u00e9 lorsqu'une \u00e2me a pris possession de sa boule de feu."
        },
        {
            "nom": "Coiffeton",
            "description": "Originaire d'une contr\u00e9e lointaine, il est venu s'installer dans la r\u00e9gion il y a longtemps. Ses ailes s\u00e9cr\u00e8tent un gel qui repousse l'eau et les salet\u00e9s."
        },
        {
            "nom": "Canarbello",
            "description": "Ils courent dans les hauts-fonds pour renforcer les muscles de leurs pattes et rivalisent entre eux pour voir qui a le coup de pied le plus \u00e9l\u00e9gant."
        },
        {
            "nom": "Palmaval",
            "description": "Il peut propulser un camion dans les airs d'un simple coup de pied. Ses puissantes pattes lui permettent aussi d'ex\u00e9cuter des danses insolites."
        },
        {
            "nom": "Gourmelet",
            "description": "Il poss\u00e8de un sens de l'odorat d\u00e9velopp\u00e9 qu'il utilise uniquement pour chercher de la nourriture, ce qu'il fait \u00e0 longueur de journ\u00e9e."
        },
        {
            "nom": "Fragroin",
            "description": "Sa peau lisse \u00e0 l'aspect satin\u00e9 fait sa fiert\u00e9. Le bout de sa queue d\u00e9gage un parfum puissant."
        },
        {
            "nom": "Fragroin",
            "description": "Sa peau lisse \u00e0 l'aspect satin\u00e9 fait sa fiert\u00e9. Le bout de sa queue d\u00e9gage un parfum puissant."
        },
        {
            "nom": "Tissenboule",
            "description": "La boule de fil qui entoure son corps est assez \u00e9lastique pour repousser les faux d'Ins\u00e9cateur, son ennemi jur\u00e9."
        },
        {
            "nom": "Filentrappe",
            "description": "Ce Pok\u00e9mon s'accroche aux branches ou aux plafonds gr\u00e2ce \u00e0 son fil et se d\u00e9place en silence. Il \u00e9limine ses proies sans qu'elles le remarquent."
        },
        {
            "nom": "Lilliterelle",
            "description": "Sa troisi\u00e8me paire de pattes est repli\u00e9e. Il poss\u00e8de assez de force pour sauter \u00e0 plus de dix m\u00e8tres lorsqu'il est en difficult\u00e9."
        },
        {
            "nom": "Gambex",
            "description": "Quand les choses deviennent s\u00e9rieuses, il passe en mode assaut et se tient sur son autre paire de pattes. Il neutralise ses ennemis en un clin d'\u0153il."
        },
        {
            "nom": "Pohm",
            "description": "Les poches sur ses joues sont peu d\u00e9velopp\u00e9es. Elles ne produisent de l'\u00e9lectricit\u00e9 que lorsqu'il les frotte avec ses coussinets."
        },
        {
            "nom": "Pohmotte",
            "description": "Quand on attaque son groupe, ce Pok\u00e9mon est le premier \u00e0 riposter. Il d\u00e9fait ses adversaires avec un art martial qui repose sur l'\u00e9lectricit\u00e9."
        },
        {
            "nom": "Pohmarmotte",
            "description": "D'ordinaire, ce Pok\u00e9mon est plut\u00f4t calme, mais lorsqu'il se bat, il \u00e9limine ses adversaires avec des mouvements rapides comme l'\u00e9clair."
        },
        {
            "nom": "Compagnol",
            "description": "Ces Pok\u00e9mon travaillent en \u00e9quipe. \u00c0 l'aide de leur incisive, ils extraient les mat\u00e9riaux n\u00e9cessaires pour construire leur nid, puis ils les emportent."
        },
        {
            "nom": "Famignol",
            "description": "Ils construisent des nids gigantesques divis\u00e9s en espaces distincts qui r\u00e9pondent \u00e0 diff\u00e9rents besoins, comme dormir ou s'alimenter."
        },
        {
            "nom": "P\u00e2tachiot",
            "description": "Ce Pok\u00e9mon est moite et lisse au toucher. Il fait fermenter ce qui se trouve \u00e0 proximit\u00e9 gr\u00e2ce \u00e0 la levure que contient son souffle."
        },
        {
            "nom": "Briochien",
            "description": "Il est tr\u00e8s appr\u00e9ci\u00e9 depuis longtemps dans les villages agricoles, car le d\u00e9licieux parfum qu'il d\u00e9gage aide \u00e0 faire cro\u00eetre le bl\u00e9."
        },
        {
            "nom": "Olivini",
            "description": "Le fruit qui surmonte sa t\u00eate s\u00e9cr\u00e8te une huile qui le prot\u00e8ge de ses adversaires. Ce liquide a un go\u00fbt si d\u00e9sagr\u00e9able qu'il fait grimacer."
        },
        {
            "nom": "Olivado",
            "description": "Ce Pok\u00e9mon partage volontiers son huile fra\u00eeche et d\u00e9licieuse. Il vit en harmonie avec les \u00eatres humains depuis les temps anciens."
        },
        {
            "nom": "Arboliva",
            "description": "Calme et bienveillant, il partage son huile d\u00e9licieuse et riche en nutriments avec les Pok\u00e9mon affaiblis."
        },
        {
            "nom": "Tapato\u00e8s",
            "description": "Ces Pok\u00e9mon pr\u00e9f\u00e8rent vivre en ville. Ils forment des groupes selon la couleur de leur plumage et se livrent \u00e0 des luttes de territoire."
        },
        {
            "nom": "Selutin",
            "description": "Ce Pok\u00e9mon est n\u00e9 dans des couches souterraines de sel gemme. Connu pour partager son pr\u00e9cieux sel, il \u00e9tait appr\u00e9ci\u00e9 autrefois."
        },
        {
            "nom": "Amassel",
            "description": "Il projette du sel pour en recouvrir ses proies. Celles-ci subissent alors un processus de salaison et se d\u00e9shydratent."
        },
        {
            "nom": "Gigansel",
            "description": "Le sel dont il saupoudre les Pok\u00e9mon bless\u00e9s en frottant le bout de ses doigts gu\u00e9rit aussit\u00f4t toutes les blessures, m\u00eame les plus graves."
        },
        {
            "nom": "Charbambin",
            "description": "Ce Pok\u00e9mon est un charbon de bois consum\u00e9 qui a pris vie. Il est anim\u00e9 par un d\u00e9sir de combattre qui le pousse \u00e0 d\u00e9fier des adversaires puissants."
        },
        {
            "nom": "Carmadura",
            "description": "Il a \u00e9volu\u00e9 gr\u00e2ce \u00e0 l'armure d'une illustre \u00e2me guerri\u00e8re. Ce Pok\u00e9mon est extr\u00eamement loyal."
        },
        {
            "nom": "Malvalame",
            "description": "Les flammes de ses \u00e9p\u00e9es sont anim\u00e9es par la ranc\u0153ur d'une \u00e2me guerri\u00e8re qui a p\u00e9ri avant de pouvoir accomplir son but."
        },
        {
            "nom": "T\u00eatampoule",
            "description": "Ce Pok\u00e9mon produit de l'\u00e9lectricit\u00e9 en agitant sa queue. Lorsqu'il per\u00e7oit un danger, sa t\u00eate clignote pour avertir ses cong\u00e9n\u00e8res."
        },
        {
            "nom": "Ampibidou",
            "description": "Lorsque ce Pok\u00e9mon allonge et contracte son corps \u00e9lastique, son nombril-dynamo produit une quantit\u00e9 d'\u00e9lectricit\u00e9 colossale."
        },
        {
            "nom": "Zap\u00e9trel",
            "description": "Les os de ses ailes produisent de l'\u00e9lectricit\u00e9 gr\u00e2ce au vent. Pour chasser, ce Pok\u00e9mon plonge dans la mer et \u00e9lectrocute ses proies."
        },
        {
            "nom": "Fulgulairo",
            "description": "Lorsqu'il gonfle son sac gulaire, l'intensit\u00e9 du courant \u00e9lectrique qu'il produit augmente. Il peut parcourir 700 km par jour en planant."
        },
        {
            "nom": "Grondogue",
            "description": "Il affiche toujours un air renfrogn\u00e9 pour qu'on le prenne au s\u00e9rieux, mais m\u00eame les enfants en pleurs \u00e9clatent de rire lorsqu'ils voient sa t\u00eate."
        },
        {
            "nom": "Dogrino",
            "description": "Ce Pok\u00e9mon emmagasine de l'\u00e9nergie dans ses grandes bajoues. Il la lib\u00e8re ensuite d'un coup pour balayer ses adversaires au loin."
        },
        {
            "nom": "Gribouraigne",
            "description": "Ce Pok\u00e9mon est d'un naturel doux, mais lorsqu'il se met en col\u00e8re, il mord \u00e0 l'aide de ses incisives ac\u00e9r\u00e9es et impr\u00e9gn\u00e9es de venin paralysant."
        },
        {
            "nom": "Tag-Tag",
            "description": "Sa salive toxique change de couleur selon son alimentation. Il en enduit ses doigts pour dessiner des motifs sur les arbres de la for\u00eat."
        },
        {
            "nom": "Virovent",
            "description": "Ce Pok\u00e9mon est n\u00e9 lorsque, port\u00e9e par le vent, une \u00e2me incapable de trouver le repos s'est retrouv\u00e9e emp\u00eatr\u00e9e dans des herbes s\u00e8ches."
        },
        {
            "nom": "Virevorreur",
            "description": "Il d\u00e9plie ses branches pour gober ses proies. Une fois qu'il a absorb\u00e9 la quantit\u00e9 d'\u00e9nergie vitale qu'il souhaitait, il les recrache."
        },
        {
            "nom": "Terracool",
            "description": "Il vit dans les for\u00eats humides. La partie ondul\u00e9e qui entoure son abdomen peut se d\u00e9tacher. Elle est croquante et d\u00e9licieuse."
        },
        {
            "nom": "Terracruel",
            "description": "Ces Pok\u00e9mon vivent en colonies au fin fond des bois. Ils d\u00e9testent au plus haut point que des personnes inconnues s'approchent d'eux."
        },
        {
            "nom": "Craparoi",
            "description": "Il se poste la t\u00eate en bas sur une falaise, dans l'attente d'une proie, mais il ne peut pas rester longtemps ainsi, car le sang lui monte \u00e0 la t\u00eate."
        },
        {
            "nom": "Pimito",
            "description": "Plus ce Pok\u00e9mon s'expose au soleil, plus son corps produit une substance piquante, ce qui apporte un peu de piment \u00e0 ses capacit\u00e9s."
        },
        {
            "nom": "Scovilain",
            "description": "Sa t\u00eate rouge convertit la substance piquante produite par son corps en \u00e9nergie de type Feu et crache des flammes br\u00fblantes."
        },
        {
            "nom": "L\u00e9boul\u00e9rou",
            "description": "Il confectionne une boule de boue en m\u00e9langeant de la terre, du sable et de l'\u00e9nergie de type Psy. \u00c0 ses yeux, elle importe plus que sa propre vie."
        },
        {
            "nom": "B\u00e9rasca",
            "description": "Le corps qui porte la sph\u00e8re bouge \u00e0 peine. On se demande donc si c'est bien lui qui contr\u00f4le les actions de ce Pok\u00e9mon."
        },
        {
            "nom": "Flotillon",
            "description": "Il l\u00e9vite \u00e0 un centim\u00e8tre du sol gr\u00e2ce \u00e0 l'\u00e9nergie psychique qui \u00e9mane des volants de son abdomen."
        },
        {
            "nom": "Cl\u00e9opsytra",
            "description": "Ce Pok\u00e9mon immobilise ses adversaires gr\u00e2ce \u00e0 l'\u00e9nergie psychique qui \u00e9mane de ses grands yeux. Il est beaucoup plus violent qu'il n'en a l'air."
        },
        {
            "nom": "Forgerette",
            "description": "Il se d\u00e9fend en brandissant un marteau qu'il a cr\u00e9\u00e9 lui-m\u00eame, mais les Pok\u00e9mon qui se nourrissent de m\u00e9taux ont tendance \u00e0 le lui voler."
        },
        {
            "nom": "Forgella",
            "description": "Ce Pok\u00e9mon attaque des cohortes de Scalpion et de Scalproie pour rassembler le m\u00e9tal n\u00e9cessaire \u00e0 la confection d'un grand marteau robuste."
        },
        {
            "nom": "Forgelina",
            "description": "Ce Pok\u00e9mon tr\u00e8s intelligent et hardi jette des rochers dans les airs puis les frappe avec son marteau en visant les Corvaillus qui volent."
        },
        {
            "nom": "Taupikeau",
            "description": "Il d\u00e9tecte l'odeur de D\u00e9lestin \u00e0 plus de vingt m\u00e8tres, ce qui lui donne le temps de s'enfouir dans le sable."
        },
        {
            "nom": "Triopikeau",
            "description": "Ce Pok\u00e9mon est beaucoup plus violent qu'il n'y para\u00eet. Il enroule son long corps autour de ses proies pour les attirer dans son nid."
        },
        {
            "nom": "Lestombaile",
            "description": "Il aime mettre des objets dans le tablier form\u00e9 de plumes qui orne son poitrail, avant de les larguer depuis une altitude \u00e9lev\u00e9e."
        },
        {
            "nom": "Dofin",
            "description": "Il aime utiliser l'anneau d'eau de sa queue quand il joue avec ses cong\u00e9n\u00e8res et se sert d'ultrasons pour comprendre les \u00e9motions des autres."
        },
        {
            "nom": "Superdofin",
            "description": "Il change de forme d\u00e8s qu'il entend les cris de d\u00e9tresse de ses cong\u00e9n\u00e8res, mais il ne laissera jamais personne assister \u00e0 sa transformation."
        },
        {
            "nom": "Vrombi",
            "description": "On raconte qu'il est n\u00e9 lorsqu'un myst\u00e9rieux Pok\u00e9mon Poison a pris possession d'un moteur laiss\u00e9 \u00e0 l'abandon dans une casse."
        },
        {
            "nom": "Vrombotor",
            "description": "Il produit de l'\u00e9nergie en faisant exploser dans ses huit cylindres un m\u00e9lange gazeux qui contient une substance toxique et des min\u00e9raux."
        },
        {
            "nom": "Motorizard",
            "description": "Des fresques vieilles de 10 000 ans laissent penser que ce Pok\u00e9mon transporte des \u00eatres humains sur son dos depuis les temps anciens."
        },
        {
            "nom": "Ferdeter",
            "description": "Lorsqu'on l'attaque, ce Pok\u00e9mon se sert de ses poils comme de poings pour rouer de coups ses adversaires."
        },
        {
            "nom": "Germ\u00e9clat",
            "description": "Il absorbe les nutriments qui se trouvent dans les parois des grottes. Les p\u00e9tales qui recouvrent son corps sont constitu\u00e9s de poison cristallis\u00e9."
        },
        {
            "nom": "Flor\u00e9clat",
            "description": "Lorsqu'il d\u00e9tecte un danger, il ouvre ses p\u00e9tales cristallins et son corps conique tire un rayon laser."
        },
        {
            "nom": "Toutombe",
            "description": "On pense qu'il est la r\u00e9incarnation d'un Pok\u00e9mon chien errant qui a perdu la vie sans jamais avoir eu d'interaction avec les \u00eatres humains."
        },
        {
            "nom": "Tomberro",
            "description": "Il passe la majeure partie de son temps \u00e0 dormir dans des cimeti\u00e8res. C'est le Pok\u00e9mon chien le plus loyal au monde."
        },
        {
            "nom": "Flamenroule",
            "description": "On pense qu'il fait un n\u0153ud \u00e0 la base de son cou afin d'emp\u00eacher l'\u00e9nergie qu'il accumule dans son ventre de s'\u00e9chapper par son bec."
        },
        {
            "nom": "Pi\u00e9tac\u00e9",
            "description": "Ce Pok\u00e9mon a quitt\u00e9 le milieu marin il y a fort longtemps pour s'installer sur la terre ferme. Il appartiendrait \u00e0 une esp\u00e8ce proche des Wailmer."
        },
        {
            "nom": "Balbal\u00e8ze",
            "description": "Ce Pok\u00e9mon arpente les \u00e9tendues de neige et de glace. Ses muscles puissants et son \u00e9paisse couche de graisse prot\u00e8gent son corps."
        },
        {
            "nom": "D\u00e9lestin",
            "description": "Pour aiguiser son esprit et renforcer ses pouvoirs psychiques, il se d\u00e9fait de sa chair en trop. Celle-ci a un go\u00fbt l\u00e9ger, mais exquis."
        },
        {
            "nom": "Oyacata",
            "description": "Comme il n'est pas tr\u00e8s dou\u00e9 pour attraper ses proies, ce Pok\u00e9mon vorace fait \u00e9quipe avec Nigirigon pour chasser."
        },
        {
            "nom": "Nigirigon",
            "description": "Ce petit Pok\u00e9mon Dragon vit dans la gueule d'Oyacata, \u00e0 l'abri de ses adversaires."
        },
        {
            "nom": "Courrousinge",
            "description": "Quand sa col\u00e8re a franchi un seuil critique, il a acquis une puissance qui l'a \u00e9mancip\u00e9 des limites de son corps."
        },
        {
            "nom": "Terraiste",
            "description": "Quand on l'attaque, il riposte en faisant sortir de grosses \u00e9pines de son tronc, une dangereuse technique qui montre qu'il est pr\u00eat \u00e0 tout risquer."
        },
        {
            "nom": "Farigiraf",
            "description": "Gr\u00e2ce \u00e0 la synchronisation des ondes c\u00e9r\u00e9brales de sa t\u00eate et de sa queue, ses pouvoirs psychiques sont dix fois plus puissants que ceux de Girafarig."
        },
        {
            "nom": "Deusolourdo",
            "description": "Il se sert de sa queue pour creuser son terrier dans les profondeurs rocheuses de la terre. Celui-ci peut faire jusqu'\u00e0 10 km de long."
        },
        {
            "nom": "Scalpereur",
            "description": "Seul un Scalproie qui s'est hiss\u00e9 au plus haut rang d'une grande arm\u00e9e peut \u00e9voluer en Scalpereur."
        },
        {
            "nom": "Fort-Ivoire",
            "description": "Ce Pok\u00e9mon a \u00e9t\u00e9 aper\u00e7u \u00e0 plusieurs reprises ces derni\u00e8res ann\u00e9es. Son nom s'inspire d'une cr\u00e9ature \u00e9voqu\u00e9e dans un certain livre."
        },
        {
            "nom": "Hurle-Queue",
            "description": "Ce Pok\u00e9mon n'avait \u00e9t\u00e9 aper\u00e7u qu'une seule fois jusqu'ici. Il ressemble \u00e0 une cr\u00e9ature myst\u00e9rieuse \u00e9voqu\u00e9e dans un vieux r\u00e9cit d'exploration."
        },
        {
            "nom": "Fongus-Furie",
            "description": "Il est possible que ce Pok\u00e9mon soit la cr\u00e9ature \u00e9voqu\u00e9e sous le nom de \u00ab\u00a0Fongus-Furie\u00a0\u00bb dans un certain livre."
        },
        {
            "nom": "Flotte-M\u00e8che",
            "description": "Ce Pok\u00e9mon a des caract\u00e9ristiques semblables \u00e0 celles d'une cr\u00e9ature \u00e9voqu\u00e9e dans un certain livre sous le nom de \u00ab\u00a0Flotte-M\u00e8che\u00a0\u00bb."
        },
        {
            "nom": "Rampe-Ailes",
            "description": "Ce Pok\u00e9mon myst\u00e9rieux pr\u00e9sente des similitudes avec Rampe-Ailes, une cr\u00e9ature \u00e9voqu\u00e9e dans un livre ancien."
        },
        {
            "nom": "Pelage-Sabl\u00e9",
            "description": "Ses attributs correspondent \u00e0 ceux d'une cr\u00e9ature \u00e9voqu\u00e9e dans un r\u00e9cit d'exploration. On manque de donn\u00e9es sur lui, car nul n'en a jamais attrap\u00e9."
        },
        {
            "nom": "Roue-de-Fer",
            "description": "Il ressemble beaucoup \u00e0 une arme sophistiqu\u00e9e qui serait d'origine extraterrestre, selon une revue consacr\u00e9e aux ph\u00e9nom\u00e8nes paranormaux."
        },
        {
            "nom": "Hotte-de-Fer",
            "description": "Sa forme est similaire \u00e0 celle d'un robot cr\u00e9\u00e9 par une civilisation antique, d'apr\u00e8s un article d'une revue consacr\u00e9e aux ph\u00e9nom\u00e8nes paranormaux."
        },
        {
            "nom": "Paume-de-Fer",
            "description": "Il ressemble \u00e0 l'athl\u00e8te transform\u00e9 en cyborg dont l'histoire avait \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9e en exclusivit\u00e9 dans une revue sur les ph\u00e9nom\u00e8nes paranormaux."
        },
        {
            "nom": "T\u00eates-de-Fer",
            "description": "Ne doit pas \u00eatre confondu avec T\u00eate de Fer."
        },
        {
            "nom": "Mite-de-Fer",
            "description": "Il ressemble \u00e0 une entit\u00e9 \u00e9trange d\u00e9crite dans une revue sur les ph\u00e9nom\u00e8nes paranormaux. D'apr\u00e8s celle-ci, ce serait un ovni qui \u00e9pie la race humaine."
        },
        {
            "nom": "\u00c9pine-de-Fer",
            "description": "Pour les articles homonymes, se r\u00e9f\u00e9rer \u00e0 \u00c9pine de Fer."
        },
        {
            "nom": "Frigodo",
            "description": "Sa cr\u00eate dorsale absorbe la chaleur et la convertit en \u00e9nergie de type Glace. Plus la chaleur est intense, plus il emmagasine de l'\u00e9nergie."
        },
        {
            "nom": "Cryodo",
            "description": "Il g\u00e8le l'air alentour pour prot\u00e9ger son visage avec un masque de glace et doter sa cr\u00eate dorsale de lames gel\u00e9es."
        },
        {
            "nom": "Glaivodo",
            "description": "L'air qu'il crache est tellement froid qu'il peut geler instantan\u00e9ment du magma en fusion."
        },
        {
            "nom": "Mordudor",
            "description": "Ce Pok\u00e9mon est n\u00e9 dans un coffre au tr\u00e9sor, il y a environ 1 500 ans. Il absorbe l'\u00e9nergie vitale des voyous qui osent voler son magot."
        },
        {
            "nom": "Gromago",
            "description": "Son corps serait compos\u00e9 de 1 000 pi\u00e8ces. Sociable, il peut se lier d'amiti\u00e9 tr\u00e8s rapidement avec n'importe qui."
        },
        {
            "nom": "Chongjian",
            "description": "La ranc\u0153ur d'un \u00eatre humain puni pour avoir not\u00e9 les m\u00e9faits d'un roi sur des tablettes en bois s'est m\u00eal\u00e9e \u00e0 des feuilles mortes et a pris vie."
        },
        {
            "nom": "Baojian",
            "description": "Ce Pok\u00e9mon peut contr\u00f4ler 100 tonnes de neige tomb\u00e9e. Il s'amuse en sautant joyeusement dans les avalanches qu'il provoque."
        },
        {
            "nom": "Dinglu",
            "description": "La peur d\u00e9vers\u00e9e dans un r\u00e9ceptacle utilis\u00e9 lors de rites anciens s'est m\u00eal\u00e9e \u00e0 de la terre et \u00e0 des pierres et a pris vie."
        },
        {
            "nom": "Yuyu",
            "description": "Ce Pok\u00e9mon manipule des flammes \u00e0 3 000\u00b0C. Il nage tranquillement dans une mer de magma qu'il a cr\u00e9\u00e9e en faisant fondre de la roche et du gravier."
        },
        {
            "nom": "Rugit-Lune",
            "description": "Il pourrait s'agir de la cr\u00e9ature nomm\u00e9e \u00ab\u00a0Rugit-Lune\u00a0\u00bb, qui appara\u00eet dans un r\u00e9cit d'exploration tr\u00e8s myst\u00e9rieux."
        },
        {
            "nom": "Garde-de-Fer",
            "description": "Il ressemble un peu \u00e0 l'invention d'un cerveau d\u00e9ment mentionn\u00e9e dans une revue consacr\u00e9e aux ph\u00e9nom\u00e8nes paranormaux."
        },
        {
            "nom": "Koraidon",
            "description": "Il s'agirait d'\u00ab\u00a0Ailes-Royales\u00a0\u00bb, une cr\u00e9ature qui, d'apr\u00e8s un vieux r\u00e9cit d'exploration, aurait fendu la terre par la force de ses poings."
        },
        {
            "nom": "Miraidon",
            "description": "On manque d'informations \u00e0 son sujet. Il ressemble \u00e0 Motorizard, mais en bien plus fort et cruel."
        },
        {
            "nom": "Serpente-Eau",
            "description": "Cette cr\u00e9ature violente entour\u00e9e de myst\u00e8re tire son nom d'un monstre aquatique \u00e9voqu\u00e9 dans un vieux r\u00e9cit d'exploration."
        },
        {
            "nom": "Vert-de-Fer",
            "description": "Il pr\u00e9sente de nombreuses similitudes avec le Viridium du futur \u00e9voqu\u00e9 dans une revue sur les ph\u00e9nom\u00e8nes paranormaux."
        },
        {
            "nom": "Pomdramour",
            "description": "Ce Pok\u00e9mon est compos\u00e9 de deux individus. Il a \u00e9volu\u00e9 gr\u00e2ce \u00e0 une pomme sp\u00e9ciale qui n'est cultiv\u00e9e que dans une certaine r\u00e9gion."
        },
        {
            "nom": "Poltchageist",
            "description": "Ce Pok\u00e9mon serait l'incarnation, sous la forme d'un pot de matcha, des regrets d'une personne d\u00e9c\u00e9d\u00e9e avant d'avoir ma\u00eetris\u00e9 l'art du th\u00e9."
        },
        {
            "nom": "Th\u00e9ffroyable",
            "description": "Il se fait passer pour un bol de th\u00e9 afin d'aspirer la force vitale de quiconque ferait l'erreur de le boire, mais en g\u00e9n\u00e9ral, personne n'est dupe."
        },
        {
            "nom": "F\u00e9licanis",
            "description": "Les toxines de la cha\u00eene empoisonn\u00e9e autour de son cou ont stimul\u00e9 tous ses muscles et son corps est devenu massif."
        },
        {
            "nom": "Fortusimia",
            "description": "Les toxines de sa cha\u00eene sont capables de r\u00e9v\u00e9ler un potentiel latent. En stimulant son cerveau, elles lui ont conf\u00e9r\u00e9 des pouvoirs psychiques."
        },
        {
            "nom": "Favianos",
            "description": "Il doit son apparence et sa voix majestueuses \u00e0 la stimulation provoqu\u00e9e par les toxines qui s'\u00e9chappent de la cha\u00eene autour de son corps."
        },
        {
            "nom": "Ogerpon",
            "description": "Son type change selon le masque qu'il porte. Son agilit\u00e9 et ses coups de pied habiles lui permettent de malmener ses adversaires."
        },
        {
            "nom": "Pondralugon",
            "description": "Il accumule l'\u00e9lectricit\u00e9 statique alentour. Le rayon qu'il tire quand il se met \u00e0 quatre pattes est d'une puissance colossale."
        },
        {
            "nom": "Pomdorochi",
            "description": "Sept \u00ab\u00a0Verochi\u00a0\u00bb vivent dans une pomme compos\u00e9e de nectar. Celui qui se trouve au centre est le chef du groupe."
        },
        {
            "nom": "Feu-Per\u00e7ant",
            "description": "Cette cr\u00e9ature n'a \u00e9t\u00e9 que rarement aper\u00e7ue, mais elle appara\u00eet dans une courte vid\u00e9o o\u00f9 on la voit enrager et faire jaillir des piliers de feu."
        },
        {
            "nom": "Ire-Foudre",
            "description": "On raconte que la foudre qui s'\u00e9chappe de sa fourrure peut br\u00fbler tout ce qui l'entoure, mais on en sait peu sur lui."
        },
        {
            "nom": "Roc-de-Fer",
            "description": "Il ressemble \u00e0 un Terrakium qui, selon une revue douteuse, aurait \u00e9t\u00e9 modifi\u00e9 par une organisation mal\u00e9fique."
        },
        {
            "nom": "Chef-de-Fer",
            "description": "Il ressemble \u00e0 une entit\u00e9 myst\u00e9rieuse qui, selon une revue sur les ph\u00e9nom\u00e8nes paranormaux, serait une arme de pointe \u00e0 l'effigie de Cobaltium."
        },
        {
            "nom": "Terapagos",
            "description": "Il se prot\u00e8ge en transformant de l'\u00e9nergie en cristal solide. Ce Pok\u00e9mon est \u00e0 l'origine du ph\u00e9nom\u00e8ne de T\u00e9racristallisation."
        },
        {
            "nom": "P\u00eachaminus",
            "description": "Il fait manger \u00e0 sa cible un mochi empoisonn\u00e9 qui \u00e9veille les d\u00e9sirs et r\u00e9v\u00e8le le potentiel. Il la contr\u00f4le ensuite gr\u00e2ce \u00e0 ses cha\u00eenes."
        }
    ]
    console.log(pedandex);
    useEffect(() => {
        Axios.get("/api/getAllDailyGames")
            .then(function(response){
                setAllDailyGames(response.data);
            })
    }, []);
    function addPedandexGame() {
        const index = Math.floor(Math.random()*pedandex.length);
        Axios.post('/api/addDailyGame',
            {
                name: pedandex[index].nom,
                description: pedandex[index].description ,
                day :allDailyGames.length + 1
            }
        )
    }
    return (
        <div className={"contentContainer"}>
            <div className="socialContainer">
                <button onClick={addPedandexGame}>Valider</button>
            </div>
        </div>
    )
}

export default StartPedandex
