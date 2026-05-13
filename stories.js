// ===== OFFLINE STORY BANK =====
// Organized by topic -> phase -> grade group
// Each story is an array of panel objects:
// { caption, speech: [line1, line2|null] }
// 6-panel format (works for all layouts; extras are ignored for 4-panel)

const STORIES = {

  // ══════════════════════════════════════════
  "places": {
    label: "Places I Can Go",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "Look at these places!", speech: ["School! 🏫", null] },
          { caption: null, speech: ["Park! 🌳", null] },
          { caption: null, speech: ["Store! 🛒", null] },
          { caption: null, speech: ["Beach! 🏖️", null] },
          { caption: null, speech: ["Home! 🏠", null] },
          { caption: "Where do YOU go?", speech: ["I go to school!", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos asks his friends.", speech: ["Where do you go?", "I go to the park!"] },
          { caption: null, speech: ["Do you go to school?", "Yes, every day!"] },
          { caption: null, speech: ["Where is the store?", "It is near here."] },
          { caption: null, speech: ["I like the beach!", "Me too!"] },
          { caption: null, speech: ["Let's go to the park!", "Great idea!"] },
          { caption: "They walk together.", speech: ["This is fun!", "Yes, it is!"] }
        ],
        "Grade 3-4": [
          { caption: "Miss Rivera shows the class a map.", speech: ["What places do you see?", "A school and a park!"] },
          { caption: null, speech: ["Where do you go after school?", "I go to the store."] },
          { caption: null, speech: ["Do you go to the library?", "Yes, on Fridays!"] },
          { caption: null, speech: ["What is your favorite place?", "The beach, of course!"] },
          { caption: null, speech: ["I go to the market too.", "With your family?"] },
          { caption: "The class makes a list of places.", speech: ["We know many places!", "Great work, everyone!"] }
        ],
        "Grade 5-6": [
          { caption: "The class discusses community places.", speech: ["What places do we need?", "A hospital and a school!"] },
          { caption: null, speech: ["Where do people shop here?", "At the market or the mall."] },
          { caption: null, speech: ["Is there a library nearby?", "Yes, on Central Avenue."] },
          { caption: null, speech: ["What about a post office?", "There is one downtown."] },
          { caption: null, speech: ["Which place do you visit most?", "The park, on weekends."] },
          { caption: "Diego draws a map of his town.", speech: ["Our community has many places!", "Let's label them all."] }
        ]
      },
      "Presentation": {
        "Pre-K / Kinder": [
          { caption: "Miss Rivera points to the board.", speech: ["This is a school.", null] },
          { caption: null, speech: ["This is a park.", null] },
          { caption: null, speech: ["I go to school.", null] },
          { caption: null, speech: ["Say it with me!", "School!"] },
          { caption: null, speech: ["Say: I go to...", "I go to school!"] },
          { caption: "Good job!", speech: ["I go to school! 🎉", null] }
        ],
        "Grade 1-2": [
          { caption: "Mr. López teaches new words.", speech: ["Repeat: I go to the park.", "I go to the park!"] },
          { caption: null, speech: ["Where does Carlos go?", "He goes to the store."] },
          { caption: null, speech: ["She goes to school.", "Every Monday!"] },
          { caption: null, speech: ["We go to the beach.", "On Saturdays!"] },
          { caption: null, speech: ["Now your turn! Where do you go?", "I go to the market!"] },
          { caption: "Everyone practices the structure.", speech: ["I go to the ___!", "Very good!"] }
        ],
        "Grade 3-4": [
          { caption: "Miss Rivera presents new vocabulary.", speech: ["We use 'near' and 'far'.", "The park is near!"] },
          { caption: null, speech: ["The hospital is far from here.", "How do we get there?"] },
          { caption: null, speech: ["We take the bus.", "Or we can walk!"] },
          { caption: null, speech: ["The library is next to the school.", "That is very convenient!"] },
          { caption: null, speech: ["How do you get to the market?", "I walk with my mom."] },
          { caption: "Students describe locations.", speech: ["The store is near the park.", "Excellent sentence!"] }
        ],
        "Grade 5-6": [
          { caption: "The class learns to give directions.", speech: ["Turn left at the school.", "Then go straight."] },
          { caption: null, speech: ["The market is on the right.", "I see it now!"] },
          { caption: null, speech: ["How far is the hospital?", "About two blocks away."] },
          { caption: null, speech: ["Excuse me, where is the library?", "Go straight, then turn right."] },
          { caption: null, speech: ["Is the park far from here?", "No, it is very close."] },
          { caption: "Students practice giving directions.", speech: ["Turn left at the corner.", "You are a great guide!"] }
        ]
      },
      "Reading": {
        "Grade 1-2": [
          { caption: "Read the story about Carlos.", speech: ["I live in Panama.", null] },
          { caption: null, speech: ["I go to school every day.", null] },
          { caption: null, speech: ["After school, I go to the park.", null] },
          { caption: null, speech: ["On weekends, I go to the beach.", null] },
          { caption: null, speech: ["My favorite place is the park.", null] },
          { caption: "Answer: Where does Carlos go?", speech: ["He goes to the park!", null] }
        ],
        "Grade 3-4": [
          { caption: "Read about Sofía's neighborhood.", speech: ["My neighborhood has many places.", null] },
          { caption: null, speech: ["There is a school near my house.", null] },
          { caption: null, speech: ["The market is two blocks away.", null] },
          { caption: null, speech: ["I go to the library on Fridays.", null] },
          { caption: null, speech: ["My favorite place is the park.", null] },
          { caption: "What places does Sofía mention?", speech: ["School, market, library, park!", null] }
        ],
        "Grade 5-6": [
          { caption: "Read: A Day in the Life of Diego.", speech: ["Diego lives in a small town.", null] },
          { caption: null, speech: ["Every morning he walks to school.", null] },
          { caption: null, speech: ["The school is next to the church.", null] },
          { caption: null, speech: ["After school, he helps at the market.", null] },
          { caption: null, speech: ["On Sundays, the family goes to the beach.", null] },
          { caption: "What is Diego's routine?", speech: ["School, market, then the beach!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "family": {
    label: "Family Members",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "María shows her family photo.", speech: ["This is my mom!", null] },
          { caption: null, speech: ["This is my dad!", null] },
          { caption: null, speech: ["This is my brother!", null] },
          { caption: null, speech: ["This is my sister!", null] },
          { caption: null, speech: ["This is my grandma!", null] },
          { caption: "I love my family! ❤️", speech: ["My family! ❤️", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos talks about his family.", speech: ["I have a big family!", "Tell me about them!"] },
          { caption: null, speech: ["My mom is a teacher.", "That is cool!"] },
          { caption: null, speech: ["My dad works at the market.", "Does he sell fruits?"] },
          { caption: null, speech: ["I have two sisters.", "Are they older or younger?"] },
          { caption: null, speech: ["My grandpa lives with us.", "That is wonderful!"] },
          { caption: "Who is in your family?", speech: ["I have a mom and a dad!", null] }
        ],
        "Grade 3-4": [
          { caption: "Sofía brings her family tree to class.", speech: ["This is my family tree!", "Wow, it is big!"] },
          { caption: null, speech: ["My grandmother has six children.", "That is a large family!"] },
          { caption: null, speech: ["My uncle lives in the city.", "Do you visit him often?"] },
          { caption: null, speech: ["My cousin is my best friend.", "That is so nice!"] },
          { caption: null, speech: ["We have dinner together on Sundays.", "Your family sounds great!"] },
          { caption: "Draw your family tree!", speech: ["I have aunts and uncles too!", "Great, add them all!"] }
        ],
        "Grade 5-6": [
          { caption: "The class discusses family roles.", speech: ["Who does the cooking in your home?", "My mom and my dad share it."] },
          { caption: null, speech: ["Does your family have traditions?", "Yes, we cook sancocho together!"] },
          { caption: null, speech: ["How many people live in your house?", "Five: my parents, grandma, and my brother."] },
          { caption: null, speech: ["What does your father do for work?", "He is a fisherman."] },
          { caption: null, speech: ["Do you have relatives in other provinces?", "Yes, in Chiriquí and Colón!"] },
          { caption: "Families are all different and special.", speech: ["Every family is unique!", "And that is beautiful."] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Mr. López teaches family words.", speech: ["This is mother. Say: mother!", "Mother!"] },
          { caption: null, speech: ["This is father. Say: father!", "Father!"] },
          { caption: null, speech: ["Brother and sister.", "Brother! Sister!"] },
          { caption: null, speech: ["Grandmother. Grandfather.", "Grandmother! Grandfather!"] },
          { caption: null, speech: ["She is my mother.", "He is my father."] },
          { caption: "Practice: Who is this?", speech: ["She is my sister!", "He is my brother!"] }
        ],
        "Grade 3-4": [
          { caption: "Miss Rivera presents possessives.", speech: ["Say: This is MY mother.", "This is MY mother!"] },
          { caption: null, speech: ["HIS father is a doctor.", "HER mother is a teacher."] },
          { caption: null, speech: ["OUR grandmother is kind.", "THEIR uncle is funny."] },
          { caption: null, speech: ["What does YOUR father do?", "MY father is a farmer."] },
          { caption: null, speech: ["Describe YOUR family member.", "MY sister is very smart."] },
          { caption: "Use MY, HIS, HER, OUR, THEIR.", speech: ["MY grandmother is my hero!", "Beautiful sentence!"] }
        ],
        "Reading": {
          "Grade 1-2": [
            { caption: "Read about María's family.", speech: ["My name is María.", null] },
            { caption: null, speech: ["I have a small family.", null] },
            { caption: null, speech: ["My mother is kind.", null] },
            { caption: null, speech: ["My father is strong.", null] },
            { caption: null, speech: ["My brother is funny.", null] },
            { caption: "Who is in María's family?", speech: ["Mother, father, brother!", null] }
          ]
        }
      },
      "Reading": {
        "Grade 3-4": [
          { caption: "Read: My Family by Diego.", speech: ["I have a wonderful family.", null] },
          { caption: null, speech: ["My mother is a nurse.", null] },
          { caption: null, speech: ["My father builds houses.", null] },
          { caption: null, speech: ["My sister loves to read.", null] },
          { caption: null, speech: ["My grandfather tells great stories.", null] },
          { caption: "What does each person do?", speech: ["Nurse, builder, reader, storyteller!", null] }
        ],
        "Grade 5-6": [
          { caption: "Read: Families in Panama.", speech: ["Panamanian families are very diverse.", null] },
          { caption: null, speech: ["Some families are large with many relatives.", null] },
          { caption: null, speech: ["Grandparents often live with the family.", null] },
          { caption: null, speech: ["On weekends, families visit each other.", null] },
          { caption: null, speech: ["Food and music bring families together.", null] },
          { caption: "How are Panamanian families described?", speech: ["Diverse, large, and close!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "animals": {
    label: "Animals",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "What animal is this?", speech: ["A dog! 🐕", null] },
          { caption: null, speech: ["A cat! 🐈", null] },
          { caption: null, speech: ["A bird! 🐦", null] },
          { caption: null, speech: ["A fish! 🐟", null] },
          { caption: null, speech: ["A frog! 🐸", null] },
          { caption: "What sound does it make?", speech: ["Woof! Meow! Tweet!", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos visits the zoo.", speech: ["Look at the monkey!", "It is so funny!"] },
          { caption: null, speech: ["I see a parrot!", "What color is it?"] },
          { caption: null, speech: ["It is green and red.", "Beautiful!"] },
          { caption: null, speech: ["The jaguar is sleeping.", "It looks big!"] },
          { caption: null, speech: ["Do you have a pet?", "Yes, a dog named Coco!"] },
          { caption: "Animals are amazing!", speech: ["I love animals!", "Me too!"] }
        ],
        "Grade 3-4": [
          { caption: "The class learns about Panamanian animals.", speech: ["Panama has amazing wildlife!", "Like what?"] },
          { caption: null, speech: ["The harpy eagle is our national bird.", "It is huge!"] },
          { caption: null, speech: ["Sloths live in the rainforest.", "They are so slow!"] },
          { caption: null, speech: ["The golden frog is only in Panama!", "It is our symbol!"] },
          { caption: null, speech: ["Turtles come to our beaches.", "To lay their eggs!"] },
          { caption: "Panama's wildlife is special!", speech: ["We must protect them!", "I agree!"] }
        ],
        "Grade 5-6": [
          { caption: "Diego researches endangered animals.", speech: ["The jaguar is endangered.", "Why is that?"] },
          { caption: null, speech: ["Because of deforestation.", "We are losing their habitat."] },
          { caption: null, speech: ["The golden frog is nearly extinct.", "That is so sad!"] },
          { caption: null, speech: ["What can we do to help?", "Protect the forests!"] },
          { caption: null, speech: ["And reduce pollution.", "Every action counts."] },
          { caption: "We can make a difference!", speech: ["Let's protect Panama's wildlife!", "Starting today!"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Mr. López shows animal flashcards.", speech: ["This is a dog. It barks.", "Woof!"] },
          { caption: null, speech: ["This is a cat. It meows.", "Meow!"] },
          { caption: null, speech: ["The bird flies.", "Tweet tweet!"] },
          { caption: null, speech: ["The fish swims.", "Splash!"] },
          { caption: null, speech: ["What does the frog do?", "It jumps!"] },
          { caption: "Animals do different things!", speech: ["Dogs bark! Cats meow!", "Birds fly! Fish swim!"] }
        ],
        "Grade 3-4": [
          { caption: "Miss Rivera teaches animal habitats.", speech: ["Where does the monkey live?", "In the rainforest!"] },
          { caption: null, speech: ["The turtle lives in the ocean.", "And on the beach!"] },
          { caption: null, speech: ["The parrot lives in the trees.", "It eats fruit and seeds."] },
          { caption: null, speech: ["The jaguar hunts at night.", "It is a nocturnal animal."] },
          { caption: null, speech: ["Describe a sloth's habitat.", "It lives in the rainforest canopy."] },
          { caption: "Match the animal to its habitat!", speech: ["Jaguar: rainforest!", "Turtle: ocean!"] }
        ]
      },
      "Reading": {
        "Grade 1-2": [
          { caption: "Read about farm animals.", speech: ["The cow says moo.", null] },
          { caption: null, speech: ["The pig says oink.", null] },
          { caption: null, speech: ["The hen says cluck.", null] },
          { caption: null, speech: ["The horse says neigh.", null] },
          { caption: null, speech: ["The dog says woof.", null] },
          { caption: "What does each animal say?", speech: ["Moo! Oink! Cluck! Neigh!", null] }
        ],
        "Grade 5-6": [
          { caption: "Read: The Golden Frog of Panama.", speech: ["The golden frog is a national symbol.", null] },
          { caption: null, speech: ["It lives in mountain streams.", null] },
          { caption: null, speech: ["Its bright color warns predators.", null] },
          { caption: null, speech: ["Sadly, it is now nearly extinct.", null] },
          { caption: null, speech: ["Scientists work to save it.", null] },
          { caption: "Why is the golden frog important?", speech: ["It is our symbol and part of nature!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "school": {
    label: "At School",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "Good morning at school!", speech: ["Good morning! ☀️", null] },
          { caption: null, speech: ["Sit down, please.", null] },
          { caption: null, speech: ["Open your book!", null] },
          { caption: null, speech: ["Listen to me!", null] },
          { caption: null, speech: ["Very good! ⭐", null] },
          { caption: "I love school! 🏫", speech: ["I love school!", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos arrives at school.", speech: ["Good morning, class!", "Good morning, teacher!"] },
          { caption: null, speech: ["Take out your pencil.", "Yes, Miss Rivera!"] },
          { caption: null, speech: ["Open your book to page 5.", "I found it!"] },
          { caption: null, speech: ["What do we need today?", "A pencil and a ruler!"] },
          { caption: null, speech: ["Time to do our work!", "Let's go!"] },
          { caption: "We work hard at school!", speech: ["I finished my work!", "Great job, Carlos!"] }
        ],
        "Grade 3-4": [
          { caption: "It is the first day of school.", speech: ["Welcome back, everyone!", "Thank you, Miss Rivera!"] },
          { caption: null, speech: ["What subjects do you like?", "I love English and art!"] },
          { caption: null, speech: ["What is your favorite subject?", "Science and math!"] },
          { caption: null, speech: ["We have English every day.", "That is my favorite class!"] },
          { caption: null, speech: ["Let's review our school rules.", "Respect and responsibility!"] },
          { caption: "A great school year starts today!", speech: ["Let's learn together!", "Yes, let's do it!"] }
        ],
        "Grade 5-6": [
          { caption: "The students discuss school life.", speech: ["What is the hardest subject for you?", "Math is challenging for me."] },
          { caption: null, speech: ["I find science difficult too.", "But it is very interesting!"] },
          { caption: null, speech: ["Do you study after school?", "Yes, from four to six."] },
          { caption: null, speech: ["Working in groups helps me learn.", "Me too! We explain things to each other."] },
          { caption: null, speech: ["What are your goals this year?", "I want to improve my English!"] },
          { caption: "Education opens many doors.", speech: ["Let's work hard this year!", "Together we can do it!"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Learn school objects!", speech: ["This is a pencil.", "PEN-CIL!"] },
          { caption: null, speech: ["This is a book.", "BOOK!"] },
          { caption: null, speech: ["This is a ruler.", "RU-LER!"] },
          { caption: null, speech: ["This is a backpack.", "BACK-PACK!"] },
          { caption: null, speech: ["Point to the pencil!", "This one!"] },
          { caption: "Name the school objects!", speech: ["Pencil, book, ruler, bag!", "Excellent!"] }
        ],
        "Grade 3-4": [
          { caption: "Miss Rivera teaches school rules.", speech: ["Rule 1: Raise your hand.", "I understand!"] },
          { caption: null, speech: ["Rule 2: Listen when others speak.", "No interrupting!"] },
          { caption: null, speech: ["Rule 3: Keep your area clean.", "We will!"] },
          { caption: null, speech: ["Rule 4: Be kind to everyone.", "Always!"] },
          { caption: null, speech: ["Why are rules important?", "They help us learn better!"] },
          { caption: "Good rules make a happy class!", speech: ["We follow the rules!", "Our class is amazing!"] }
        ]
      },
      "Reading": {
        "Grade 3-4": [
          { caption: "Read: A Day at School.", speech: ["School starts at seven in the morning.", null] },
          { caption: null, speech: ["First, we have English class.", null] },
          { caption: null, speech: ["Then, we have math and science.", null] },
          { caption: null, speech: ["We eat lunch at twelve o'clock.", null] },
          { caption: null, speech: ["School ends at one in the afternoon.", null] },
          { caption: "What is the school schedule?", speech: ["English, math, science, then lunch!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "food": {
    label: "Food & Eating",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "What food do you like?", speech: ["Rice! 🍚", null] },
          { caption: null, speech: ["Banana! 🍌", null] },
          { caption: null, speech: ["Fish! 🐟", null] },
          { caption: null, speech: ["Mango! 🥭", null] },
          { caption: null, speech: ["Chicken! 🍗", null] },
          { caption: "Yummy food! 😋", speech: ["I like rice and chicken!", null] }
        ],
        "Grade 1-2": [
          { caption: "It is lunchtime at school.", speech: ["What is for lunch today?", "Rice and chicken!"] },
          { caption: null, speech: ["Do you want some plantains?", "Yes, please!"] },
          { caption: null, speech: ["I like fruit for dessert.", "Me too! Mango!"] },
          { caption: null, speech: ["Drink your water!", "Yes, Miss!"] },
          { caption: null, speech: ["This food is delicious!", "My mom cooked it!"] },
          { caption: "Eating healthy is important!", speech: ["I love Panamanian food!", "It is the best!"] }
        ],
        "Grade 3-4": [
          { caption: "The class talks about traditional food.", speech: ["What is your favorite food?", "Sancocho!"] },
          { caption: null, speech: ["What is in sancocho?", "Chicken, corn, and yuca!"] },
          { caption: null, speech: ["I love arroz con pollo.", "That is my mom's specialty!"] },
          { caption: null, speech: ["Do you eat seafood?", "Yes! Corvina is delicious!"] },
          { caption: null, speech: ["What do you eat for breakfast?", "Tortillas with eggs!"] },
          { caption: "Panama has amazing traditional food!", speech: ["Our food is part of our culture!", "And it is delicious!"] }
        ],
        "Grade 5-6": [
          { caption: "The class discusses healthy eating.", speech: ["What did you eat today?", "Rice, beans, and salad."] },
          { caption: null, speech: ["Is that a balanced meal?", "Yes! Carbs, protein, and vegetables."] },
          { caption: null, speech: ["How often do you eat fruit?", "Every day with breakfast."] },
          { caption: null, speech: ["What foods should we eat less of?", "Processed food and soda."] },
          { caption: null, speech: ["Can traditional food be healthy?", "Definitely! Sancocho is very nutritious."] },
          { caption: "Healthy habits start with good food!", speech: ["Eat well, feel well!", "Our grandmothers knew best!"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Learn food words!", speech: ["This is rice. I like rice.", "RICE!"] },
          { caption: null, speech: ["This is a banana.", "BA-NA-NA!"] },
          { caption: null, speech: ["Do you like chicken?", "Yes, I like chicken!"] },
          { caption: null, speech: ["Do you like fish?", "No, I don't like fish."] },
          { caption: null, speech: ["What food do you like?", "I like mango!"] },
          { caption: "Practice: I like / I don't like", speech: ["I like rice! 😊", "I don't like broccoli! 😅"] }
        ]
      },
      "Reading": {
        "Grade 3-4": [
          { caption: "Read: Sancocho — Panama's National Dish.", speech: ["Sancocho is a traditional soup.", null] },
          { caption: null, speech: ["It has chicken, yuca, and corn.", null] },
          { caption: null, speech: ["Families cook it on special days.", null] },
          { caption: null, speech: ["The smell fills the whole house.", null] },
          { caption: null, speech: ["Everyone loves a bowl of sancocho!", null] },
          { caption: "What makes sancocho special?", speech: ["Family, tradition, and flavor!", null] }
        ],
        "Grade 5-6": [
          { caption: "Read: Eating Habits in Panama.", speech: ["Rice and beans are staple foods in Panama.", null] },
          { caption: null, speech: ["Most families eat three meals a day.", null] },
          { caption: null, speech: ["Breakfast often includes eggs and tortillas.", null] },
          { caption: null, speech: ["Lunch is usually the biggest meal.", null] },
          { caption: null, speech: ["Fresh fruit is eaten as a snack.", null] },
          { caption: "Describe a typical Panamanian day of eating.", speech: ["Tortillas, sancocho, and fresh fruit!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "body": {
    label: "The Human Body",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "Touch your body parts!", speech: ["Head! 👆", null] },
          { caption: null, speech: ["Shoulders! 👆", null] },
          { caption: null, speech: ["Knees! 👆", null] },
          { caption: null, speech: ["Toes! 👆", null] },
          { caption: null, speech: ["Eyes and ears! 👀", null] },
          { caption: "Head, shoulders, knees and toes!", speech: ["Head, shoulders, knees and toes! 🎶", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos does not feel well.", speech: ["My head hurts.", "I am sorry!"] },
          { caption: null, speech: ["My stomach hurts too.", "Let's go see the nurse."] },
          { caption: null, speech: ["Where does it hurt?", "My throat hurts."] },
          { caption: null, speech: ["Open your mouth please.", "Ahhh!"] },
          { caption: null, speech: ["Drink water and rest.", "Thank you, nurse!"] },
          { caption: "Taking care of our body is important!", speech: ["I feel better now!", "That is great!"] }
        ],
        "Grade 3-4": [
          { caption: "The class learns about the body.", speech: ["How many bones do we have?", "Over two hundred!"] },
          { caption: null, speech: ["What does the heart do?", "It pumps blood!"] },
          { caption: null, speech: ["How do we keep our body healthy?", "Exercise and eat well!"] },
          { caption: null, speech: ["Why do we sleep?", "Our body needs rest to grow!"] },
          { caption: null, speech: ["What happens when we exercise?", "Our muscles get stronger!"] },
          { caption: "Our body is amazing!", speech: ["Let's take care of it!", "Every day!"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Point to the body parts!", speech: ["This is my head.", "HEAD!"] },
          { caption: null, speech: ["These are my eyes.", "EYES!"] },
          { caption: null, speech: ["This is my mouth.", "MOUTH!"] },
          { caption: null, speech: ["These are my hands.", "HANDS!"] },
          { caption: null, speech: ["These are my feet.", "FEET!"] },
          { caption: "Name the body parts!", speech: ["Head, eyes, mouth, hands, feet!", "Excellent!"] }
        ]
      },
      "Reading": {
        "Grade 3-4": [
          { caption: "Read: How to Stay Healthy.", speech: ["Exercise helps your body stay strong.", null] },
          { caption: null, speech: ["Eat fruits and vegetables every day.", null] },
          { caption: null, speech: ["Drink eight glasses of water daily.", null] },
          { caption: null, speech: ["Sleep eight to ten hours at night.", null] },
          { caption: null, speech: ["Wash your hands before eating.", null] },
          { caption: "List the healthy habits.", speech: ["Exercise, eat well, hydrate, sleep, wash hands!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "colors": {
    label: "Colors & Shapes",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "What color is this?", speech: ["Red! 🔴", null] },
          { caption: null, speech: ["Blue! 🔵", null] },
          { caption: null, speech: ["Yellow! 🟡", null] },
          { caption: null, speech: ["Green! 🟢", null] },
          { caption: null, speech: ["Orange! 🟠", null] },
          { caption: "Colors are everywhere! 🌈", speech: ["I see many colors!", null] }
        ],
        "Grade 1-2": [
          { caption: "María paints a picture.", speech: ["I need the red paint!", "Here you go!"] },
          { caption: null, speech: ["What color is the sky?", "It is blue!"] },
          { caption: null, speech: ["What color are bananas?", "Yellow!"] },
          { caption: null, speech: ["Mix blue and yellow!", "You get green!"] },
          { caption: null, speech: ["What is your favorite color?", "Purple!"] },
          { caption: "Colors make the world beautiful!", speech: ["My painting is colorful!", "It is beautiful!"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Learn colors with Miss Rivera!", speech: ["Red! The apple is red.", "RED!"] },
          { caption: null, speech: ["Blue! The sky is blue.", "BLUE!"] },
          { caption: null, speech: ["Green! The tree is green.", "GREEN!"] },
          { caption: null, speech: ["Yellow! The sun is yellow.", "YELLOW!"] },
          { caption: null, speech: ["What color is the banana?", "YELLOW!"] },
          { caption: "Name the colors!", speech: ["Red, blue, green, yellow!", "Perfect!"] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "weather": {
    label: "Weather",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "How is the weather today?", speech: ["It is sunny! ☀️", null] },
          { caption: null, speech: ["It is raining! 🌧️", null] },
          { caption: null, speech: ["It is cloudy! ☁️", null] },
          { caption: null, speech: ["It is windy! 💨", null] },
          { caption: null, speech: ["I need my umbrella! ☂️", null] },
          { caption: "What is the weather today?", speech: ["It is sunny today!", null] }
        ],
        "Grade 3-4": [
          { caption: "The class checks the weather forecast.", speech: ["What is the weather today?", "It is hot and sunny!"] },
          { caption: null, speech: ["Will it rain this week?", "Yes, on Wednesday and Thursday."] },
          { caption: null, speech: ["Panama has two seasons.", "Dry season and rainy season!"] },
          { caption: null, speech: ["When is the dry season?", "From December to April."] },
          { caption: null, speech: ["What do you do on rainy days?", "I read books and watch movies."] },
          { caption: "Weather affects our daily life!", speech: ["I prefer sunny days!", "But rain helps the plants grow!"] }
        ]
      },
      "Reading": {
        "Grade 5-6": [
          { caption: "Read: Panama's Climate.", speech: ["Panama has a tropical climate.", null] },
          { caption: null, speech: ["The dry season runs from December to April.", null] },
          { caption: null, speech: ["The rainy season is from May to November.", null] },
          { caption: null, speech: ["Temperatures stay warm all year.", null] },
          { caption: null, speech: ["Rain is important for the Panama Canal.", null] },
          { caption: "Why is rain important for the Canal?", speech: ["It keeps the water levels high!", null] }
        ]
      }
    }
  },

  // ══════════════════════════════════════════
  "greetings": {
    label: "Greetings & Introductions",
    phases: {
      "Warm-up": {
        "Pre-K / Kinder": [
          { caption: "Say hello! 👋", speech: ["Hello! 👋", null] },
          { caption: null, speech: ["Hi! 😊", null] },
          { caption: null, speech: ["Good morning! ☀️", null] },
          { caption: null, speech: ["Good afternoon! 🌤️", null] },
          { caption: null, speech: ["Goodbye! 👋", null] },
          { caption: "Greetings are polite!", speech: ["Hello and goodbye! 😊", null] }
        ],
        "Grade 1-2": [
          { caption: "Carlos meets a new student.", speech: ["Hello! What is your name?", "My name is Diego!"] },
          { caption: null, speech: ["Nice to meet you, Diego!", "Nice to meet you too!"] },
          { caption: null, speech: ["How old are you?", "I am eight years old."] },
          { caption: null, speech: ["Where are you from?", "I am from Chiriquí!"] },
          { caption: null, speech: ["Welcome to our school!", "Thank you so much!"] },
          { caption: "Making new friends is wonderful!", speech: ["We are friends now!", "Yes we are! 😊"] }
        ]
      },
      "Presentation": {
        "Grade 1-2": [
          { caption: "Practice greetings!", speech: ["Hello! My name is Carlos.", "Hi! My name is María."] },
          { caption: null, speech: ["How are you?", "I am fine, thank you!"] },
          { caption: null, speech: ["How old are you?", "I am seven years old."] },
          { caption: null, speech: ["Where are you from?", "I am from Panama City."] },
          { caption: null, speech: ["Nice to meet you!", "Nice to meet you too!"] },
          { caption: "Practice with a partner!", speech: ["Hello! What is your name?", "My name is ___!"] }
        ],
        "Grade 3-4": [
          { caption: "Formal and informal greetings.", speech: ["Good morning, Mr. López.", "Good morning, Sofía!"] },
          { caption: null, speech: ["Hey! What's up?", "Not much! How about you?"] },
          { caption: null, speech: ["When do we use formal greetings?", "With teachers and adults!"] },
          { caption: null, speech: ["When is informal greeting OK?", "With friends our age!"] },
          { caption: null, speech: ["Goodbye, Mr. López!", "Goodbye! Have a great day!"] },
          { caption: "Choose the right greeting!", speech: ["Formal with adults!", "Informal with friends!"] }
        ]
      },
      "Reading": {
        "Grade 1-2": [
          { caption: "Read: New Friends.", speech: ["Hi! I am Carlos.", null] },
          { caption: null, speech: ["I am from Panama.", null] },
          { caption: null, speech: ["I am seven years old.", null] },
          { caption: null, speech: ["I like soccer and drawing.", null] },
          { caption: null, speech: ["Let's be friends!", null] },
          { caption: "Tell me about yourself!", speech: ["My name is ___ and I like ___!", null] }
        ]
      }
    }
  }
};

// ===== TOPIC LIST for UI =====
const TOPIC_LIST = Object.entries(STORIES).map(([key, val]) => ({ key, label: val.label }));

// ===== FIND BEST MATCHING STORY =====
function findStory(topicKey, phase, grade) {
  const topic = STORIES[topicKey];
  if (!topic) return null;

  const phaseData = topic.phases[phase];
  if (!phaseData) {
    // Fallback to first available phase
    const firstPhase = Object.values(topic.phases)[0];
    return findGradeStory(firstPhase, grade);
  }

  return findGradeStory(phaseData, grade);
}

function findGradeStory(phaseData, grade) {
  if (!phaseData) return null;

  // Exact match
  if (phaseData[grade]) return phaseData[grade];

  // Grade group fallbacks
  const fallbacks = {
    "Pre-K / Kinder": ["Grade 1-2", "Grade 3-4"],
    "Grade 1-2": ["Pre-K / Kinder", "Grade 3-4"],
    "Grade 3-4": ["Grade 1-2", "Grade 5-6"],
    "Grade 5-6": ["Grade 3-4", "Grade 1-2"]
  };

  for (const fb of (fallbacks[grade] || [])) {
    if (phaseData[fb]) return phaseData[fb];
  }

  // Return first available
  return Object.values(phaseData)[0] || null;
}

// ===== TRIM TO PANEL COUNT =====
function getStoryPanels(topicKey, phase, grade, count) {
  const story = findStory(topicKey, phase, grade);
  if (!story) return null;

  if (story.length >= count) return story.slice(0, count);

  // Pad if story is shorter than panel count
  const padded = [...story];
  while (padded.length < count) {
    padded.push({ caption: null, speech: ["...", null] });
  }
  return padded;
}
