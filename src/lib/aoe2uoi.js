const units_of_interest = [
  // {id: 83, type: 'villager'}, // Villager
  // archery range
  {id: 4, type: 'archer', building: 'archery'}, // Archer
  {id: 24, type: 'archer', building: 'archery'}, // Crossbowman
  {id: 492, type: 'archer', building: 'archery'}, // Arbalester
  {id: 185, type: 'slinger', building: 'archery'}, // slinger
  {id: 7, type: 'skirm', building: 'archery'}, // Skirmisher
  {id: 6, type: 'skirm', building: 'archery'}, // Elite Skirmisher
  {id: 1155, type: 'skirm', building: 'archery'}, // imperial skirmisher
  {id: 1010, type: 'genitour', building: 'archery'}, // genitour
  {id: 1012, type: 'genitour', building: 'archery'}, // elite genitour
  {id: 5, type: 'cannoneer', building: 'archery'}, // Hand Cannoneer
  {id: 39, type: 'cavarcher', building: 'archery'}, // Cavalry Archer
  {id: 474, type: 'cavarcher', building: 'archery'}, // Heavy Cavalry Archer
  {id: 873, type: 'elephantarcher', building: 'archery'}, // Elephant Archer
  {id: 875, type: 'elephantarcher', building: 'archery'}, // Elite Elephant Archer
  // barracks
  {id: 74, type: 'swordsman', building: 'barracks'}, // Militia
  {id: 75, type: 'swordsman', building: 'barracks'}, // Man-at-Arms
  {id: 77, type: 'swordsman', building: 'barracks'}, // Long Swordsman
  {id: 473, type: 'swordsman', building: 'barracks'}, // Two-Handed Swordsman
  {id: 567, type: 'swordsman', building: 'barracks'}, // Champion
  {id: 93, type: 'pikeman', building: 'barracks'}, // Spearman
  {id: 358, type: 'pikeman', building: 'barracks'}, // Pikeman
  {id: 359, type: 'pikeman', building: 'barracks'}, // Halberdier
  {id: 751, type: 'eagle', building: 'barracks'}, // Eagle Scout
  {id: 753, type: 'eagle', building: 'barracks'}, // Eagle Warrior
  {id: 752, type: 'eagle', building: 'barracks'}, // Elite Eagle Warrior
  {id: 882, type: 'condottiero', building: 'barracks'}, // condottiero
  // stables
  {id: 448, type: 'cav', building: 'stable'}, // Scout Cavalry
  {id: 546, type: 'cav', building: 'stable'}, // Light Cavalry
  {id: 441, type: 'cav', building: 'stable'}, // Hussar
  {id: 1707, type: 'cav', building: 'stable'}, // Winged Hussar
  {id: 1751, type: 'shrivamsha', building: 'stable'}, // shrivamsha rider
  {id: 1753, type: 'shrivamsha', building: 'stable'}, // elite shrivamsha rider
  {id: 38, type: 'knight', building: 'stable'}, // Knight
  {id: 283, type: 'knight', building: 'stable'}, // Cavalier
  {id: 569, type: 'knight', building: 'stable'}, // Paladin
  {id: 1370, type: 'lancer', building: 'stable'}, // Steppe Lancer
  {id: 1372, type: 'lancer', building: 'stable'}, // Elite Steppe Lancer
  {id: 1755, type: 'cavcamel', building: 'stable'}, // camel scout
  {id: 329, type: 'cavcamel', building: 'stable'}, // Camel Rider
  {id: 330, type: 'cavcamel', building: 'stable'}, // Heavy Camel Rider
  {id: 5419, type: 'cavcamel', building: 'stable'}, // imperial camel rider
  {id: 1132, type: 'elephant', building: 'stable'}, // Battle Elephant
  {id: 1134, type: 'elephant', building: 'stable'}, // Elite Battle Elephant
  {id: 1570, type: 'xolotl', building: 'stable'}, // Xolotl Warrior
  // seige workshop
  {id: 1258, type: 'ram', building: 'workshop'}, // Battering Ram
  {id: 422, type: 'ram', building: 'workshop'}, // Capped Ram
  {id: 548, type: 'ram', building: 'workshop'}, // Siege Ram
  {id: 279, type: 'Scorpion', building: 'workshop'}, // Scorpion
  {id: 542, type: 'Scorpion', building: 'workshop'}, // Heavy Scorpion
  {id: 280, type: 'Mangonel', building: 'workshop'}, // Mangonel
  {id: 550, type: 'Mangonel', building: 'workshop'}, // Onager
  {id: 588, type: 'Mangonel', building: 'workshop'}, // Siege Onager
  {id: 36, type: 'bbc', building: 'workshop'}, // Bombard Cannon
  {id: 1709, type: 'bbc', building: 'workshop'}, // houfnice
  {id: 1105, type: 'siege tower', building: 'workshop'}, // Siege Tower
  {id: 1744, type: 'elephant seige', building: 'workshop'}, // Armored Elephant
  {id: 1746, type: 'elephant seige', building: 'workshop'}, // Siege Elephant
  // dock - this blows the width, do we really need docs?
  // {id: 442, type: 'ship galleon', building: 'dock'}, // Galleon
  // {id: 420, type: 'ship cannon', building: 'dock'}, // Cannon Galleon
  // {id: 691, type: 'ship cannon', building: 'dock'}, // Elite Cannon Galleon
  // {id: 1104, type: 'ship demo', building: 'dock'}, // Demolition Raft
  // {id: 527, type: 'ship demo', building: 'dock'}, // Demolition Ship
  // {id: 528, type: 'ship demo', building: 'dock'}, // Heavy Demolition Ship
  // {id: 529, type: 'ship fire', building: 'dock'}, // Fire Ship
  // {id: 532, type: 'ship fire', building: 'dock'}, // Fast Fire Ship
  // {id: 539, type: 'ship galley', building: 'dock'}, // Galley
  // {id: 545, type: 'ship transport', building: 'dock'}, // Transport Ship
  // {id: 1103, type: 'ship galley fire', building: 'dock'}, // Fire Galley
];
  
  export default units_of_interest;
