// The Hanging Gardens of Babylon: everything about this world in one place. World.jsx, layout.js,
// the guide and the chat all read from here; Scene.jsx draws the gardens.
const HUB = 'https://zlisto.github.io/hub_world/'

export default {
  id: 'hanging_gardens',
  name: 'Hanging Gardens of Babylon',
  place: 'Babylon, Mesopotamia · c. 600 BCE (as told)',
  blurb: 'Climb the green terraces as ancient writers described them, rising beside the Euphrates. Shamabubu the gardener will tell you their story, and the mystery of whether they existed at all.',

  guideName: 'Shamabubu',
  guideRole: 'royal gardener of Babylon',
  guideIcon: '🌿',
  greeting: (v) =>
    `Peace and shade to you${v ? `, ${v}` : ''}! I am Shamabubu, keeper of the royal gardens. Behold the terraces, green mountains rising over the flat plain of Babylon. Mind you, scholars still argue over whether they ever stood here at all. Ask me anything.`,
  facts: [
    {
      q: 'What were the Hanging Gardens?',
      a: `Greek and Roman writers describe **terraced gardens** rising in tiers like a theater, planted with trees and flowers on vaulted platforms, beside the royal palace.

"Hanging" comes from the Greek *kremastos*, meaning overhanging: plants spilled over the edges of the terraces. They weren't hung from anything.`,
    },
    {
      q: 'Who built them, and why?',
      a: `The best-known story, told by the Babylonian priest **Berossus** around 290 BCE, says King **Nebuchadnezzar II** (ruled 605–562 BCE) built them for his wife **Amytis**. She came from the green mountains of Media and missed them on the flat plain.

Other ancient writers credited the legendary queen **Semiramis** instead.`,
    },
    {
      q: 'Did they really exist?',
      a: `Nobody knows. It's the **only wonder whose existence hasn't been confirmed**.
- No Babylonian text from the time mentions them, even though Nebuchadnezzar's own inscriptions boast about his palace in detail.
- Robert Koldewey, who excavated Babylon from 1899 to 1917, found a vaulted building he thought was their base. It's now generally thought to be storerooms.
- Every description we have was written by people who never saw them, often centuries later.`,
    },
    {
      q: 'Were they really in Nineveh?',
      a: `Oxford scholar **Stephanie Dalley** argues they were at **Nineveh**, 450 km to the north, built by the Assyrian king **Sennacherib** (ruled 705–681 BCE).

His inscriptions describe a palace garden he called **"a wonder for all peoples,"** and his palace reliefs show terraced trees fed by an aqueduct. Later writers may have confused Nineveh with Babylon. It's an influential theory, but still debated.`,
    },
    {
      q: 'How were they watered?',
      a: `Babylon gets very little rain, so lush terraces needed lots of water lifted from the river.

The Greek geographer **Strabo** describes water raised by **screws**. Dalley translates one of Sennacherib's inscriptions as describing bronze water-raising screws, centuries before Archimedes, though that translation is debated. Chain-and-bucket wheels are the other likely method.`,
    },
    {
      q: 'How big were they?',
      a: `The historian **Diodorus Siculus** wrote that the gardens were about **400 feet (about 120 m) on each side** and rose to the height of the city wall, with terraces strong enough to hold full-grown trees.

Those numbers come from writers centuries later, so treat them as legend rather than measurement. The terraces here are scaled down.`,
    },
    {
      q: 'What happened to them?',
      a: `If they stood in Babylon, they would have faded with the city. Babylon declined after Alexander the Great died there in 323 BCE, and by Roman times much of it was deserted.

The real ruins of Babylon, including the foundations of Nebuchadnezzar's palace, lie near Hillah in Iraq. The city's famous blue **Ishtar Gate** was rebuilt in Berlin's Pergamon Museum.`,
    },
  ],

  outfit: {
    fur: '#8a6a4a',
    expression: 'happy',
    shirt: '#8a2a2a', // a fringed red wool robe
    skirt: '#8a2a2a',
    skirtLength: 0.45,
    trim: '#d4a73a',
    parts: [['babylonCap', { a: '#1f3f8a', b: '#d4a73a' }], ['curledBeard'], ['watering']],
  },

  env: { sky: '#b4d2e8', fog: '#e6d9bd', fogNear: 120, fogFar: 480, ground: '#c4a372', hemiSky: '#fff3dc', hemiGround: '#7d8a4e', sun: [50, 80, 40], sunIntensity: 1.8 },
  speed: { walk: 12, run: 20 },
  bound: 130,
  spawn: { x: 0, z: 45, yaw: 0 },
  portal: { x: 8, z: 52, rot: Math.PI, href: HUB, spawn: 'by_hanging_gardens' },
  guide: { x: -4, z: 40, rot: Math.atan2(4, 5) },
  // the terraces are a stepped hill you can climb: each tier is a platform
  platforms: [
    { x0: -20, x1: 20, z0: -43, z1: -12, h: 6 },
    { x0: -14, x1: 14, z0: -38, z1: -18, h: 12 },
    { x0: -8, x1: 8, z0: -33, z1: -24, h: 18 },
    // a grand stairway up the middle of the south face, one flight per tier
    { x0: -2.5, x1: 2.5, z0: -12, z1: 0, h0: 0, h1: 6 },
    { x0: -2.5, x1: 2.5, z0: -18, z1: -12, h0: 6, h1: 12 },
    { x0: -2.5, x1: 2.5, z0: -24, z1: -18, h0: 12, h1: 18 },
  ],
  boxes: [
    { x0: 20, x1: 34, z0: 12, z1: 18 }, // the gate's towers
    { x0: -1000, x1: -62, z0: -1000, z1: 1000 }, // the Euphrates
  ],
  circles: [],
  areas: [
    { x: 0, z: -28, r: 8, label: 'on the top terrace' },
    { x: 0, z: -27, r: 26, label: 'in the terraced gardens' },
    { x: -58, z: 0, r: 12, label: 'on the bank of the Euphrates' },
    { x: 27, z: 15, r: 10, label: 'by the blue gate' },
  ],
  elsewhere: 'in Babylon',
}
