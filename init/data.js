date : new Date('2024-06-28T10:00:00')
const sampleListings = [
  {
    title: "Mount Everest Adventure",
    description: "Experience the thrill of trekking to the base of the world's highest mountain.",
    image: {
        list: [
            {
                url: "https://images.unsplash.com/photo-1544735889-252a626cf188?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TW91bnQlMjBFdmVyZXN0JTIwQWR2ZW50dXJlfGVufDB8fDB8fHww",
                filename: "everest1"
            },
            {
                url : "https://images.unsplash.com/photo-1544735716-41a261c7de49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnQlMjBFdmVyZXN0JTIwQWR2ZW50dXJlfGVufDB8fDB8fHww",
                filename: "everest2"
            },
            {
                url: "https://images.unsplash.com/photo-1607602014822-8a126e0d3de4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW91bnQlMjBFdmVyZXN0JTIwQWR2ZW50dXJlfGVufDB8fDB8fHww",
                filename: "everest3"
            }
        ]
    },
    category: "Mountains",
    location: "Sagarmatha National Park",
    country: "Nepal",
    reviews: [],
    likedBy: [],
    bookmarkedBy: [],
    date: new Date('2024-06-28T10:00:00'),
    owner :  '66808400dbb80746fb96aecd',
},
{
  title: "Maldives Paradise",
  description: "Relax on the pristine beaches of the Maldives, with crystal-clear waters and luxury resorts.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1526784725085-c69e947bf92e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1hbGRpdmVzJTIwUGFyYWRpc2V8ZW58MHx8MHx8fDA%3D",
              filename: "maldives1"
          },
          {
              url: "https://images.unsplash.com/photo-1472938714740-c788a1dbfa12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWFsZGl2ZXMlMjBQYXJhZGlzZXxlbnwwfHwwfHx8MA%3D%3D",
              filename: "maldives2"
          },
          {
              url: "https://images.unsplash.com/photo-1643082987068-401dd27e6e91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFsZGl2ZXMlMjBQYXJhZGlzZXxlbnwwfHwwfHx8MA%3D%3D",
              filename: "maldives3"
          }
      ]
  },
  category: "Beaches and Coastal Areas",
  location: "Malé",
  country: "Maldives",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808374dbb80746fb96ae22',
},
{
  title: "Amazon Rainforest Expedition",
  description: "Explore the biodiversity of the Amazon Rainforest and its unique wildlife.",
  image: {
      list: [
          {
              url: "https://plus.unsplash.com/premium_photo-1687525932622-b2192d27ac34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEFtYXpvbiUyMFJhaW5mb3Jlc3QlMjBFeHBlZGl0aW9ufGVufDB8fDB8fHww",
              filename: "amazon1"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1687880583250-a1062d6d02c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFtYXpvbiUyMFJhaW5mb3Jlc3QlMjBFeHBlZGl0aW9ufGVufDB8fDB8fHww",
              filename: "amazon2"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1687879794744-99e2898cab0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QW1hem9uJTIwUmFpbmZvcmVzdCUyMEV4cGVkaXRpb258ZW58MHx8MHx8fDA%3D",
              filename: "amazon3"
          }
      ]
  },
  category: "Forests and Jungles",
  location: "Amazon Basin",
  country: "Brazil",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808374dbb80746fb96ae22',
},
{
  title: "Bondi Beach Escape",
  description: "Enjoy the vibrant atmosphere and surf at the famous Bondi Beach.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              filename: "bondi1"
          },
          {
              url: "https://images.unsplash.com/photo-1531514381259-8c9fedc910b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvbmRpJTIwYmVhY2glMjBlc2NhcGV8ZW58MHx8MHx8fDA%3D",
              filename: "bondi2"
          },
          {
              url: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9uZGklMjBiZWFjaCUyMGVzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
              filename: "bondi3"
          }
      ]
  },
  category: "Beaches and Coastal Areas",
  location: "Sydney",
  country: "Australia",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808374dbb80746fb96ae22',
},
{
  title: "Wadi Rum Exploration",
  description: "Discover the stunning landscapes and rock formations of Wadi Rum.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1643051106558-e59ba069144e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8V2FkaSUyMFJ1bSUyMEV4cGxvcmF0aW9ufGVufDB8fDB8fHww",
              filename: "wadi1"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1678599837874-c6f94bfbf8e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFdhZGklMjBSdW0lMjBFeHBsb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "wadi2"
          },
          {
              url: "https://images.unsplash.com/photo-1551171128-e727fa6080df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdhZGklMjBSdW0lMjBFeHBsb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "wadi3"
          }
      ]
  },
  category: "Deserts",
  location: "Wadi Rum",
  country: "Jordan",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '6680833adbb80746fb96adb5',
},
{
  title: "Machu Picchu Exploration",
  description: "Visit the ancient Inca city of Machu Picchu, perched high in the Andes.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1461863109726-246fa9598dc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFjaHUlMjBQaWNjaHUlMjBFeHBsb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "machu1"
          },
          {
              url: "https://images.unsplash.com/photo-1717883900859-91e1fe1c66a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1hY2h1JTIwUGljY2h1JTIwRXhwbG9yYXRpb258ZW58MHx8MHx8fDA%3D",
              filename: "machu2"
          },
          {
              url: "https://images.unsplash.com/photo-1525915818695-5b1a033247f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              filename: "machu3"
          }
      ]
  },
  category: "Historical and Cultural Sites",
  location: "Machu Picchu",
  country: "Peru",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808374dbb80746fb96ae22',
},
{
  title: "Taj Mahal Visit",
  description: "Experience the beauty of the Taj Mahal, a symbol of love and a UNESCO World Heritage site.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
              filename: "taj1"
          },
          {
              url: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
              filename: "taj2"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1661962425238-aeb9b022a94b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
              filename: "taj3"
          }
      ]
  },
  category: "Historical and Cultural Sites",
  location: "Agra",
  country: "India",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner :  '66808400dbb80746fb96aecd',
},
{
  title: "Tokyo City Lights",
  description: "Explore the vibrant city of Tokyo, with its modern skyscrapers and traditional temples.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1516905936230-def0f338ae4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFRva3lvJTIwQ2l0eSUyMExpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
              filename: "tokyo1"
          },
          {
              url: "https://images.unsplash.com/photo-1529114901968-3b83794634b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fFRva3lvJTIwQ2l0eSUyMExpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
              filename: "tokyo2"
          },
          {
              url: "https://images.unsplash.com/photo-1520304257078-844f6031f58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRva3lvJTIwQ2l0eSUyMExpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
              filename: "tokyo3"
          }
      ]
  },
  category: "Urban Destinations",
  location: "Tokyo",
  country: "Japan",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808400dbb80746fb96aecd',
},
{
  title: "Santorini Island Adventure",
  description: "Discover the stunning beauty and iconic sunsets of Santorini.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1708693108811-79ec80c55ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFNhbnRvcmluaSUyMElzbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
              filename: "santorini1"
          },
          {
              url: "https://images.unsplash.com/photo-1663603018067-f0fa51be7275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFNhbnRvcmluaSUyMElzbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
              filename: "santorini2"
          },
          {
              url: "https://images.unsplash.com/photo-1714308995494-8690e73cd8c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FudG9yaW5pJTIwSXNsYW5kfGVufDB8fDB8fHww",
              filename: "santorini3"
          }
      ]
  },
  category: "Islands",
  location: "Santorini",
  country: "Greece",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '66808374dbb80746fb96ae22',
},
{
  title: "Lake Tahoe Getaway",
  description: "Enjoy the crystal-clear waters and stunning landscapes of Lake Tahoe.",
  image: {
      list: [
        {
          url: "https://images.unsplash.com/photo-1647285467535-f57aa912ebe8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fExha2UlMjBUYWhvZXxlbnwwfHwwfHx8MA%3D%3D",
          filename: "tahoe2"
      },
          {
              url: "https://images.unsplash.com/photo-1523212307269-b5645414b985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fExha2UlMjBUYWhvZSUyMEdldGF3YXl8ZW58MHx8MHx8fDA%3D",
              filename: "tahoe1"
          },
          {
              url: "https://images.unsplash.com/photo-1527363379179-331616352591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fExha2UlMjBUYWhvZXxlbnwwfHwwfHx8MA%3D%3D",
              filename: "tahoe3"
          }
      ]
  },
  category: "Lakes and Rivers",
  location: "Lake Tahoe",
  country: "USA",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner :'66808374dbb80746fb96ae22',
},
{
  title: "Yosemite National Park",
  description: "Explore the granite cliffs, waterfalls, and giant sequoias of Yosemite.",
  image: {
      list: [
          {
              url: "https://plus.unsplash.com/premium_photo-1664304414632-f23e7cc5aa81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8eW9zZW1pdGUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
              filename: "yosemite1"
          },
          {
              url: "https://images.unsplash.com/photo-1514583963320-f5835c2c730b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW9zZW1pdGUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
              filename: "yosemite2"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1673603987324-169187865e11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9zZW1pdGUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
              filename: "yosemite3"
          }
      ]
  },
  category: "Mountains",
  location: "California",
  country: "USA",
  date: new Date('2024-06-28T10:00:00'),
  owner :  '66808400dbb80746fb96aecd',
},
{
  title: "Great Barrier Reef",
  description: "Dive into the vibrant underwater world of the Great Barrier Reef.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JlYXQlMjBCYXJyaWVyJTIwUmVlZnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "reef1"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JlYXQlMjBCYXJyaWVyJTIwUmVlZnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "reef2"
          },
          {
              url: "https://images.unsplash.com/photo-1717292741615-4695bafa9663?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8R3JlYXQlMjBCYXJyaWVyJTIwUmVlZnxlbnwwfHwwfHx8MA%3D%3D",
              filename: "reef3"
          }
      ]
  },
  category: "Beaches and Coastal Areas",
  location: "Queensland",
  country: "Australia",
  date: new Date('2024-06-28T10:00:00'),
  owner :'66808374dbb80746fb96ae22',
},
{
  title: "Cinque Terre",
  description: "Visit the colorful coastal villages of Cinque Terre, with stunning cliffside views.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1548671074-349a73ad5733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2lucXVlJTIwVGVycmV8ZW58MHx8MHx8fDA%3D",
              filename: "cinque1"
          },
          {
              url: "https://images.unsplash.com/photo-1602075030732-56d5fd008b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2lucXVlJTIwVGVycmV8ZW58MHx8MHx8fDA%3D",
              filename: "cinque2"
          },
          {
              url: "https://plus.unsplash.com/premium_photo-1661905792999-036ddbe402a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENpbnF1ZSUyMFRlcnJlfGVufDB8fDB8fHww",
              filename: "cinque3"
          }
      ]
  },
  category: "Beaches and Coastal Areas",
  location: "Liguria",
  country: "Italy",
  date: new Date('2024-06-28T10:00:00'),
  owner : '6680833adbb80746fb96adb5'
},
{
  title: "New York City Experience",
  description: "Discover the bustling streets and iconic landmarks of New York City.",
  image: {
      list: [
        {
          url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fE5ldyUyMFlvcmslMjBDaXR5JTIwRXhwZXJpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
          filename: "nyc3"
      },
          {
              url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              filename: "nyc1"
          },
          {
              url: "https://images.unsplash.com/photo-1513622790541-eaa84d356909?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fE5ldyUyMFlvcmslMjBDaXR5JTIwRXhwZXJpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
              filename: "nyc2"
          },
      ]
  },
  category: "Urban Destinations",
  location: "New York City",
  country: "USA",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner : '6680833adbb80746fb96adb5',
},
{
  title: "Bali Island Escape",
  description: "Experience the vibrant culture and beautiful beaches of Bali.",
  image: {
      list: [
          {
              url: "https://plus.unsplash.com/premium_photo-1661878915254-f3163e91d870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFsaSUyMGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
              filename: "bali1"
          },
          {
              url: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGklMjBpc2xhbmR8ZW58MHx8MHx8fDA%3D",
              filename: "bali2"
          },
          {
              url: "https://images.unsplash.com/photo-1674913768011-ac8cce58033a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsaSUyMGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
              filename: "bali3"
          }
      ]
  },
  category: "Islands",
  location: "Bali",
  country: "Indonesia",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  date: new Date('2024-06-28T10:00:00'),
  owner :  '66808400dbb80746fb96aecd',
},
{
  title: "Cherry Blossom Festival",
  description: "Witness the stunning cherry blossoms in full bloom during the spring festival in Japan.",
  image: {
      list: [
          {
              url: "https://images.unsplash.com/photo-1679991811932-2437dc210551?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hlcnJ5JTIwQmxvc3NvbSUyMEZlc3RpdmFsfGVufDB8fDB8fHww",
              filename: "cherry1"
          },
          {
              url: "https://images.unsplash.com/photo-1679991811871-afcdfb7572b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hlcnJ5JTIwQmxvc3NvbSUyMEZlc3RpdmFsfGVufDB8fDB8fHww",
              filename: "cherry2"
          },
          {
              url: "https://images.unsplash.com/photo-1679991811739-40f636c065a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENoZXJyeSUyMEJsb3Nzb20lMjBGZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
              filename: "cherry3"
          }
      ]
  },
  category: "Special Interest and Seasonal Attractions",
  location: "Tokyo",
  country: "Japan",
  reviews: [],
  likedBy: [],
  bookmarkedBy: [],
  owner : '66808374dbb80746fb96ae22',
  date: new Date('2024-06-28T10:00:00')
}
];

module.exports = { data: sampleListings };
