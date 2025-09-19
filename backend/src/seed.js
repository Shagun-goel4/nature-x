import mongoose from "mongoose";
import dotenv from "dotenv";
import Lesson from "./models/Lesson.js";

dotenv.config({ path: "../.env" });

const lessons = [
  {
    title: "Waste Segregation",
    pages: [
      {
        title: "Concept & Importance",
        content: `Waste segregation means dividing garbage into different groups so it can be handled properly.\nWe usually use three bins:\n\nBin\tColor\tWhat to Throw\n🟢 Green Bin\tGreen\tFood waste, vegetable peels, garden waste, anything that rots easily.\n🔵 Blue Bin\tBlue\tPaper, plastic bottles, metal cans, glass jars – items that can be recycled.\n⚫ Black Bin\tBlack\tPlastic wrappers, thermocol, non-recyclable materials.\n\nWhy it matters:\n\n- Prevents harmful mixing of waste.\n- Allows recycling and composting.\n- Keeps our streets, rivers, and soil clean.`,
      },
      {
        title: "Examples & Student Action Plan",
        content: `School examples: Canteen leftovers → Green bin, Exam papers → Blue bin.\nHome examples: Chips packets → Black bin, Broken glass bottle → Blue bin.\n\nDo’s & Don’ts:\n✅ Always check before throwing waste.\n✅ Clean recyclables before putting them in blue bin.\n❌ Don’t mix food waste with recyclables.\n\nCall to Action:\n“Be a Waste Wizard! Help your school stay clean by teaching your friends and family about the 3-bin system.”`,
      },
    ],
    quiz: [
      {
        question: "Banana peel goes in which bin?",
        options: ["Green", "Blue", "Black"],
        answer: "Green",
        type: "mcq",
      },
      {
        question: "Plastic bottle goes in which bin?",
        options: ["Green", "Blue", "Black"],
        answer: "Blue",
        type: "mcq",
      },
      {
        question: "Chips wrapper goes in which bin?",
        options: ["Green", "Blue", "Black"],
        answer: "Black",
        type: "mcq",
      },
      {
        question: "True/False: Newspaper should go in green bin.",
        options: ["True", "False"],
        answer: "False",
        type: "truefalse",
      },
      {
        question: "Match: Leaves, Newspaper, Chips wrapper",
        options: ["Green", "Blue", "Black"],
        answer: ["Green", "Blue", "Black"],
        type: "match",
      },
    ],
    game: {
      name: "Bin Sorter",
      description:
        "Drag-and-drop sorting game with 3 bins and waste items. Correct = eco-points.",
      logic: "drag-drop-bins",
    },
    badge: "Waste Wizard",
  },
  {
    title: "Water Conservation",
    pages: [
      {
        title: "All About Water Conservation",
        content: `Water is life – but we are running out of fresh water.\nProblems caused by wasting water:\n- Rivers and lakes dry up.\n- Farmers face droughts.\n- People have to walk far to get water.\n\nWays Students Can Save Water:\n- Turn off taps while brushing teeth.\n- Collect rainwater to use for gardening.\n- Fix leaky taps at home or inform elders.\n- Use bucket instead of running hose to wash bikes/cars.\n\nDo’s & Don’ts:\n✅ Reuse leftover water for plants.\n❌ Don’t throw garbage in water bodies.\n\nCall to Action:\n“Become a Water Warrior – Every drop saved by you can save someone’s life.”`,
      },
      {
        title: "Lesson Summary",
        content: `This summary image and text highlight the key points of water conservation: Save water, fix leaks, reuse water, and never pollute water bodies. Every drop counts!`,
      },
    ],
    quiz: [
      {
        question: "True/False: Keeping a tap open while brushing saves water.",
        options: ["True", "False"],
        answer: "False",
        type: "truefalse",
      },
      {
        question: "Which method helps store rainwater?",
        options: ["Rainwater harvesting", "Washing car with bucket"],
        answer: "Rainwater harvesting",
        type: "mcq",
      },
      {
        question: "Which of these saves water?",
        options: ["Washing car with bucket", "Washing car with running hose"],
        answer: "Washing car with bucket",
        type: "mcq",
      },
      {
        question: "Fill in the blank: We should always ______ taps after use.",
        options: [],
        answer: "close",
        type: "fill",
      },
      {
        question: "Scenario: Your tap leaks at home. What should you do?",
        options: [],
        answer: "Fix/repair it",
        type: "scenario",
      },
    ],
    game: {
      name: "Save the Water",
      description:
        "A tap leaks drops of water, students must click quickly to fix it before the bucket fills. Points for speed.",
      logic: "tap-leak-clicker",
    },
    badge: "Water Warrior",
  },
  {
    title: "Energy Saving",
    pages: [
      {
        title: "All About Energy Saving",
        content: `Electricity is made from coal, gas, or solar energy. Wasting electricity means wasting natural resources and polluting the air.\n\nWhy Save Energy?\n- Reduces electricity bills.\n- Reduces air pollution.\n- Helps fight global warming.\n\nEnergy-Saving Habits:\n- Turn off fans, lights, and AC when leaving a room.\n- Use LED bulbs instead of yellow bulbs.\n- Encourage your school to use solar power.\n\nDo’s & Don’ts:\n✅ Switch off computer screens after class.\n✅ Unplug chargers when not in use.\n❌ Don’t keep TV running when no one is watching.\n\nCall to Action:\n“Be an Energy Hero – Every click of a switch helps the planet breathe.”`,
      },
      {
        title: "Lesson Summary",
        content: `This summary image and text highlight the key points of energy saving: Turn off unused devices, use LEDs, and save electricity to help the planet!`,
      },
    ],
    quiz: [
      {
        question: "True/False: Leaving lights on saves energy.",
        options: ["True", "False"],
        answer: "False",
        type: "truefalse",
      },
      {
        question: "Which energy source is renewable?",
        options: ["Coal", "Solar"],
        answer: "Solar",
        type: "mcq",
      },
      {
        question: "Which of these saves electricity?",
        options: ["LED bulb", "Tube light"],
        answer: "LED bulb",
        type: "mcq",
      },
      {
        question: "Fill in the blank: Always ______ devices when not in use.",
        options: [],
        answer: "switch off",
        type: "fill",
      },
      {
        question:
          "Scenario: You leave your classroom and fans are on. What do you do?",
        options: [],
        answer: "Switch them off",
        type: "scenario",
      },
    ],
    game: {
      name: "Energy Hero",
      description:
        "A classroom is shown with lights/fans/appliances on. Student must click to turn them off quickly.",
      logic: "classroom-clicker",
    },
    badge: "Energy Hero",
  },
  {
    title: "Climate Change",
    pages: [
      {
        title: "All About Climate Change",
        content: `Climate change means the Earth’s temperature is rising because of greenhouse gases like CO₂ from vehicles, industries, and deforestation.\n\nEffects of Climate Change:\n- Hotter summers, extreme weather.\n- Melting glaciers, rising sea levels.\n- More floods, droughts, and cyclones.\n\nHow Students Can Help:\n- Plant more trees and take care of them.\n- Walk or cycle instead of using motorbikes for short trips.\n- Avoid single-use plastic.\n\nDo’s & Don’ts:\n✅ Carry a cloth bag instead of plastic.\n✅ Share what you learn about climate change with friends.\n❌ Don’t burn garbage – it releases harmful gases.\n\nCall to Action:\n“Become a Climate Champion – Small actions by you can cool down the planet.”`,
      },
      {
        title: "Lesson Summary",
        content: `This summary image and text highlight the key points of climate change: Reduce pollution, plant trees, and take small actions to cool down the planet!`,
      },
    ],
    quiz: [
      {
        question: "True/False: Deforestation causes climate change.",
        options: ["True", "False"],
        answer: "True",
        type: "truefalse",
      },
      {
        question: "Which of these gases cause global warming?",
        options: ["Carbon dioxide", "Oxygen"],
        answer: "Carbon dioxide",
        type: "mcq",
      },
      {
        question: "Which is NOT a solution?",
        options: ["Planting trees", "Burning plastic"],
        answer: "Burning plastic",
        type: "mcq",
      },
      {
        question:
          "Fill in the blank: The rise in Earth’s temperature is called ______.",
        options: [],
        answer: "Global warming",
        type: "fill",
      },
      {
        question:
          "Scenario: You need to go to a nearby shop. Best eco-friendly option?",
        options: [],
        answer: "Walk or cycle",
        type: "scenario",
      },
    ],
    game: {
      name: "Climate Action Runner",
      description:
        "A running game where student avoids pollution obstacles (factories, plastic bags) and collects eco-actions (trees, bicycles).",
      logic: "runner-obstacles",
    },
    badge: "Climate Champion",
  },
  {
    title: "Biodiversity & Wildlife Protection",
    pages: [
      {
        title: "All About Biodiversity & Wildlife Protection",
        content: `Biodiversity means the variety of plants, animals, birds, and insects around us.\nIt is important because:\n- Trees give oxygen and food.\n- Animals control pests and maintain balance.\n- Forests stop soil erosion and give rain.\n\nHow Students Can Help:\n- Never harm animals or birds.\n- Grow small plants at home.\n- Support wildlife sanctuaries and zoos that protect endangered species.\n\nDo’s & Don’ts:\n✅ Feed stray animals clean water during summer.\n✅ Report illegal tree cutting or poaching to elders/authorities.\n❌ Don’t throw plastic in forests, parks, or rivers.\n\nCall to Action:\n“Become a Biodiversity Guardian – Protect nature because every creature has a role to play.”`,
      },
      {
        title: "Lesson Summary",
        content: `This summary image and text highlight the key points of biodiversity: Protect all living things, never harm animals, and help nature thrive!`,
      },
    ],
    quiz: [
      {
        question:
          "True/False: Tigers are important for maintaining balance in nature.",
        options: ["True", "False"],
        answer: "True",
        type: "truefalse",
      },
      {
        question: "Which of these harms biodiversity?",
        options: ["Planting trees", "Cutting forests"],
        answer: "Cutting forests",
        type: "mcq",
      },
      {
        question: "Which of these protects animals?",
        options: ["Poaching", "Wildlife sanctuaries"],
        answer: "Wildlife sanctuaries",
        type: "mcq",
      },
      {
        question:
          "Fill in the blank: Protecting plants and animals is called ______.",
        options: [],
        answer: "Conservation",
        type: "fill",
      },
      {
        question:
          "Scenario: You see someone throwing plastic in a lake. What should you do?",
        options: [],
        answer: "Stop them, explain impact",
        type: "scenario",
      },
    ],
    game: {
      name: "Biodiversity Match",
      description:
        "A memory card game where students match animals with their habitats (Tiger ↔ Forest, Fish ↔ River, Eagle ↔ Sky).",
      logic: "memory-match",
    },
    badge: "Biodiversity Guardian",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Lesson.deleteMany({});
  await Lesson.insertMany(lessons);
  console.log("Seeded lessons!");
  process.exit();
}

seed();
