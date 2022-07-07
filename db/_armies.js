export const armies = [
  // Adepta Sororitas
  {
    name: "Adepta Sororitas",
    squads: [
      {
        name: "Battle Sisters Squad",
        min: 5,
        max: 20,
        optionalSquadEquipment: [
          "Simulacrum Imperialis",
          "Incensor Cherub",
          "Simulacrum Imperialis and Incensor Cherub",
        ],
        specialWeapons: [
          "Artificier-crafted Storm Bolter",
          "Meltagun",
          "Ministorum Flamer",
        ],
        heavyWeapons: [
          "Heavy Bolter",
          "Ministorum Heavy Flamer",
          "Multi-melta",
        ],
        hasLeader: true,
        leader: {
          name: "Sister Superior",
          leaderWeapon1: [
            "Bolt Pistol",
            "Inferno Pistol",
            "Ministorum Hand Flamer",
            "Plasma Pistol",
            "Boltgun",
            "Combi-melta",
            "Combi-plasma",
            "Condemnor Boltgun",
            "Ministorum Combi-flamer",
          ],
          leaderWeapon2: ["Chainsword", "Power Maul", "Power Sword"],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
      {
        name: "Sisters Novitiate",
        min: 10,
        max: 10,
        optionalSquadEquipment: [
          "Simulacrum Imperialis",
          "Sacred Banner",
          "Simulacrum Imperialis and Sacred Banner",
        ],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Novitiate Superior",
          leaderWeapon1: ["Bolt Pistol", "Plasma Pistol"],
          leaderWeapon2: ["Power Sword"],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // Adeptus Custodes
  {
    name: "Adeptus Custodes",
    squads: [
      {
        name: "Custodian Guard",
        min: 3,
        max: 10,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: false,
        leader: {},
      },
    ],
  },
  // Adeptus Custodes
  {
    name: "Adeptus Mechanicus",
    squads: [
      {
        name: "Skitarii Rangers",
        min: 5,
        max: 20,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Skitarii Ranger Alpha",
          leaderWeapon1: [],
          leaderWeapon2: [],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // Aeldari
  {
    name: "Aeldari (Eldar)",
    squads: [
      {
        name: "Guardian Defenders",
        min: 10,
        max: 20,
        optionalSquadEquipment: [
          "Heavy Weapon Platform x1",
          "Heavy Weapon Platform x2",
        ],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: false,
        leader: {},
      },
    ],
  },
  // Imperial Guard
  {
    name: "Astra Militarum (Imperial Guard)",
    squads: [
      {
        name: "Infantry Squad (Guardsmen)",
        min: 5,
        max: 10,
        optionalSquadEquipment: ["Voxcaster"],
        specialWeapons: [
          "Sniper Rifle (1 model)",
          "Flamer (1 model)",
          "Grenade Launcher (1 model)",
          "Meltagun (1 model)",
          "Plasma Gun (1 model)",
          "Breacher Charge (1 model)",
          "Lascutter (1 model)",
        ],
        heavyWeapons: [
          "Mortar (2 models)",
          "Autocannon (2 models)",
          "Heavy Bolter (2 models)",
          "Missile Launcher (2 models)",
          "Lascannon (2 models)",
        ],
        hasLeader: true,
        leader: {
          name: "Sergeant",
          leaderWeapon1: [
            "Laspistol",
            "Bolt Pistol",
            "Boltgun",
            "Plasma Pistol",
          ],
          leaderWeapon2: ["Chainsword", "Power Sword"],
        },
      },
      {
        name: "Infantry Squad (Conscripts)",
        min: 20,
        max: 30,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: false,
        leader: {},
      },
    ],
  },
  // Chaos Daemons
  {
    name: "Chaos Daemons",
    squads: [
      {
        name: "Bloodletters of Khorne",
        min: 10,
        max: 30,
        optionalSquadEquipment: [
          "Instrument of Chaos (1 every 10 models)",
          "Daemonic Icon (1 every 10 models)",
        ],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Bloodreaper",
          leaderWeapon1: [],
          leaderWeapon2: [],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // Drukhari
  {
    name: "Drukhari (Dark Eldar)",
    squads: [
      {
        name: "Kabalite Warriors",
        min: 5,
        max: 20,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        leader: {
          name: "Sybarite",
          leaderWeapon1: ["Power Sword", "Agoniser"],
          leaderWeapon2: ["Splinter Rifle", "Splinter Pistol", "Blast Pistol"],
          restrictOptionalEquipment: false,
          leaderOptionalEquipment: ["Phantasm Grenade Launcher"],
        },
      },
    ],
  },
  // Chaos Space Marines
  {
    name: "Chaos Space Marines",
    squads: [
      {
        name: "Chaos Space Marines",
        min: 5,
        max: 20,
        optionalSquadEquipment: [
          "Icon of Wrath",
          "Icon of Flame",
          "Icon of Despair",
          "Icon of Excess",
          "Icon of Leadership",
        ],
        specialWeapons: ["Flamer", "Meltagun", "Plasma Gun"],
        heavyWeapons: [
          "Autocannon",
          "Heavy Bolter",
          "Lascannon",
          "Missile Launcher",
          "Reaper Chaincannon",
        ],
        leader: {
          name: "Aspiring Champion",
          leaderWeapon1: [
            "Bolt Pistol",
            "Chainaxe",
            "Chainsword",
            "Lightning Claw",
            "Plasma Pistol",
            "Boltgun",
            "Combi-bolter",
            "Combi-flamer",
            "Combi-melta",
            "Combi-melta",
            "Combi-plasma",
          ],
          leaderWeapon2: [
            "Power Axe",
            "Power Fist",
            "Power Maul",
            "Power Sword",
          ],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
      {
        name: "Chaos Cultists",
        min: 10,
        max: 30,
        optionalSquadEquipment: [
          "Heavy Stubber (1 every 10 models)",
          "Flamer (1 every 10 models)",
        ],
        specialWeapons: [],
        heavyWeapons: [],
        leader: {
          name: "Aspiring Champion",
          leaderWeapon1: ["Autogun"],
          leaderWeapon2: [],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [
            "Shotgun",
            "Autopist and Brutal Assault Weapon",
          ],
        },
      },
    ],
  },
  // Genestealer Cults
  {
    name: "Genestealer Cults",
    squads: [
      {
        name: "Acolyte Hybrids",
        min: 5,
        max: 15,
        optionalSquadEquipment: ["Cult Icon"],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Acolyte Leader",
          leaderWeapon1: ["Autopistol", "Cult Bonesword", "Cult Lash Whip"],
          leaderWeapon2: ["Cult Claws and Knife"],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // Necrons
  {
    name: "Necrons",
    squads: [
      {
        name: "Necron Warriors",
        min: 10,
        max: 20,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: false,
        leader: {},
      },
    ],
  },
  //   Orks
  {
    name: "Orks",
    squads: [
      {
        name: "Ork Boyz",
        min: 10,
        max: 30,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Boss Nob",
          leaderWeapon1: [
            "Big Chooppa",
            "Choppa",
            "Killsaw",
            "Power Klaw",
            "Power Stabba",
            "Slugga",
          ],
          leaderWeapon2: [
            "Big Chooppa",
            "Choppa",
            "Killsaw",
            "Power Klaw",
            "Power Stabba",
            "Slugga",
          ],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: ["Kombi-rokkit", "Kombi-skorcha"],
        },
      },
      {
        name: "Stormboyz",
        min: 5,
        max: 15,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Boss Nob",
          leaderWeapon1: ["Slugga"],
          leaderWeapon2: ["Choppa", "Power Klaw"],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // T'au
  {
    name: "T'au",
    squads: [
      {
        name: "Kroot Carnivores",
        min: 10,
        max: 20,
        optionalSquadEquipment: [],
        specialWeapons: [],
        weaponsWeapons: [],
        hasLeader: false,
        leader: {},
      },
      {
        name: "Pathfinder Team",
        min: 10,
        max: 10,
        optionalSquadEquipment: [
          "Ion Rifle x3",
          "Rail Rifle x3",
          "Semi-automatic Grenade Launcher",
          "Neuroweb System Jammer",
          "Drone Controller",
        ],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Pathfinder Shas'ui",
          leaderWeapon1: [],
          leaderWeapon2: [],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
  // Tyranids
  {
    name: "Tyranids",
    squads: [
      {
        name: "Termagants",
        min: 10,
        max: 30,
        optionalSquadEquipment: [],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: false,
        leader: {},
      },
    ],
  },

  // Space Marines
  {
    name: "Space Marines",
    squads: [
      {
        name: "Tactical Squad",
        min: 5,
        max: 10,
        specialWeapons: ["Flamer", "Grav-gun", "Meltagun", "Plasma gun"],
        heavyWeapons: [
          "Grav-cannon",
          "Heavy bolter",
          "Heavy flamer",
          "Lascannon",
          "Missile launcher",
          "Multi-melta",
          "Plasma cannon",
        ],
        optionalSquadEquipment: [],
        hasLeader: true,
        leader: {
          name: "Space Marine Sergeant",
          leaderWeapon1: [
            "Bolt Pistol",
            "Hand Flamer",
            "Grav Pistol",
            "Inferno Pistol",
            "Plasma Pistol",
            "Combi-flamer",
            "Combi-grav",
            "Combi-melta",
            "Combi-plasma",
            "Storm Bolter",
          ],
          leaderWeapon2: [
            "Chainsword",
            "Lightning Claw",
            "Power Axe",
            "Power Fist",
            "Power Maul",
            "Power Sword",
            "Thunderhammer",
          ],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
      {
        name: "Assault Squad",
        min: 5,
        max: 10,
        optionalSquadEquipment: ["Jump Packs"],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Assault Marine Sergeant",
          leaderWeapon1: [
            "Bolt Pistol",
            "Hand Flamer",
            "Grav Pistol",
            "Inferno Pistol",
            "Plasma Pistol",
          ],
          leaderWeapon2: [
            "Chainsword",
            "Lightning Claw",
            "Power Axe",
            "Power Fist",
            "Power Maul",
            "Power Sword",
            "Thunderhammer",
          ],
          restrictOptionalEquipment: false,
          leaderOptionalEquipment: ["Combat Shield"],
        },
      },
      {
        name: "Terminator Squad",
        min: 5,
        max: 10,
        optionalSquadEquipment: ["Teleport homer"],
        specialWeapons: [],
        heavyWeapons: [],
        hasLeader: true,
        leader: {
          name: "Terminator Sergeant",
          leaderWeapon1: ["Power Sword"],
          leaderWeapon2: ["Storm Bolter"],
          restrictOptionalEquipment: true,
          leaderOptionalEquipment: [],
        },
      },
    ],
  },
];
