const techs_of_interest = [
  // TC
{ id:22, tech: 'Loom', type:"unique", building: "eco"},
{ id:8, tech: 'Town Watch', type: "los", building: "eco"},
{ id:280, tech: 'Town Patrol', type: "los", building: "eco"},
{ id:213, tech: 'Wheel Barrow', type: "vil speed", building: "eco"},
{ id:249, tech: 'Hand Cart', type: "vil speed", building: "eco"},
  // blacksmith
{ id:199, tech: 'Fletching', type: "attack", building: "archery"},
{ id:200, tech: 'Bodkin Arrow', type: "attack", building: "archery"},
{ id:201, tech: 'Bracer', type: "attack", building: "archery"},
{ id:211, tech: 'Padded Archer Armor', type: "armour", building: "archery"},
{ id:212, tech: 'Leather Archer Armor', type: "armour", building: "archery"},
{ id:219, tech: 'Ring Archer Armor', type: "armour", building: "archery"},
{ id:67, tech: 'Forging', type: "attack", building: "barracks stable"},
{ id:68, tech: 'Iron casting', type: "attack", building: "barracks stable"},
{ id:75, tech: 'Blast Furnace', type: "attack", building: "barracks stable"},
{ id:81, tech: 'Scale Barding Armor', type: "armour", building: "stable"},
{ id:82, tech: 'Chain Barding Armor', type: "armour", building: "stable"},
{ id:80, tech: 'Plate Barding Armor', type: "armour", building: "stable"},
{ id:74, tech: 'Scale Mail Armor', type: "armour", building: "barracks"},
{ id:76, tech: 'Chain Mail Armor', type: "armour", building: "barracks"},
{ id:77, tech: 'Plate Mail Armor', type: "armour", building: "barracks"},
  // archery
{ id:437, tech: 'Thumb Ring', type: "unique", building: "archery"},
{ id:436, tech: 'Parthian Tactics', type: "unique", building: "archery"},
  // barracks
{ id:716, tech: 'Supplies', type: "unique", building: "barracks"}, // internal_name is Tracking
{ id:215, tech: 'Squires', type: "unique", building: "barracks"},
{ id:602, tech: 'Arson', type: "unique", building: "barracks"},
  // stable
{ id:435, tech: 'Bloodlines', type: "unique", building: "stable"},
{ id:39, tech: 'Husbandry', type: "unique", building: "stable"},
  // castle
{ id:321, tech: 'Sappers', type: "unique", building: "defense"},
{ id:315, tech: 'Conscription', type: "unique", building: "defense"},
{ id:379, tech: 'Hoardings', type: "unique", building: "defense"},
{ id:408, tech: 'Spies', type: "unique", building: "defense"}, // internal_name "Spy Technology"
  // university
{ id:50, tech: 'Masonry', type: "building hp", building: "defense"},
{ id:51, tech: 'Architecture', type: "building hp", building: "defense"},
{ id:93, tech: 'Ballistics', type: "unique", building: "archery"},
{ id:47, tech: 'Chemistry', type:"unique", building: "archery"},
{ id:140, tech: 'Guard Tower', type: "tower", building: "defense"},
{ id:63, tech: 'Keep', type: "tower", building: "defense"},
{ id:64, tech: 'Bombard Tower', type: "unique", building: "defense"},
{ id:322, tech: 'Murder Holes', type: "unique", building: "defense"},
{ id:377, tech: 'Siege Engineers', type: "unique", building: "workshop"},
{ id:380, tech: 'Heated Shot', type: "unique", building: "defense"},
{ id:608, tech: 'Arrowslits', type: "unique", building: "defense"},
{ id:194, tech: 'Fortified Wall', type: "unique", building: "defense"},
  // monastery
{ id:231, tech: 'Sanctity', type: "unique", building: "monastery"},
{ id:252, tech: 'Fervor', type: "unique", building: "monastery"},
{ id:316, tech: 'Redemption', type: "unique", building: "monastery"},
{ id:319, tech: 'Atonement', type: "unique", building: "monastery"},
{ id:439, tech: 'Heresy', type: "unique", building: "monastery"},
{ id:441, tech: 'Herbal Medicine', type: "unique", building: "monastery"},
{ id:45, tech: 'Faith', type: "unique", building: "monastery"},
{ id:230, tech: 'Block Printing', type: "unique", building: "monastery"},
{ id:233, tech: 'Illumination', type: "unique", building: "monastery"},
{ id:438, tech: 'Theocracy', type: "unique", building: "monastery"},
  //dock
// { id:65, tech: 'Gillnets'},
// { id:373, tech: 'Shipwright'},
// { id:374, tech: 'Careening'},
// { id:375, tech: 'Dry Dock'},
  // market
// { id:23, tech: 'Coinage'},
// { id:17, tech: 'Banking'},
// { id:15, tech: 'Guilds'},
// { id:48, tech: 'Caravan'},
  // mining camp
// // { id:54, tech: 'Stone cutting', type: "stone", building: "eco"}, // deprecated
{ id:55, tech: 'Gold Mining', type: "gold", building: "eco"},
{ id:182, tech: 'Gold Shaft Mining', type: "gold", building: "eco"},
{ id:278, tech: 'Stone Mining', type: "stone", building: "eco"},
{ id:279, tech: 'Stone Shaft Mining', type: "stone", building: "eco"},
  // lumber camp
{ id:202, tech: 'Double Bit Axe', type: "wood", building: "eco"},
{ id:203, tech: 'Bow Saw', type: "wood", building: "eco"},
{ id:221, tech: 'Two Man Saw', type: "wood", building: "eco"},
  // mill
{ id:14, tech: 'Horse collar', type: "food", building: "eco"},
{ id:13, tech: 'Heavy plow', type: "food", building: "eco"},
{ id:12, tech: 'Crop rotation', type: "food", building: "eco"},
];

export default techs_of_interest;
