const BASE = "https://sbhs-computer-science-academy.github.io/";
// Locally the page is served under /project-showcase-home/, so sibling repos need ../
// On GitHub Pages the site is at the org root, so no prefix is needed.
const IMG = window.location.hostname === "localhost" ? "../" : "";

// Structure: courses → years → students
// External courses (no local student data) just have an externalUrl on the year entry.
const SHOWCASE = {
  courses: [
    {
      id: "comp-art",
      name: "Computational Art",
      desc: "Creative coding, generative art, and digital media",
      icon: "bi-palette-fill",
      years: [
        {
          id: "y2526",
          label: "2025–26",
          current: true,
          imgBase: IMG + "Comp-Art-25-26-projects-for-showcase/images/",
          students: [
            { name: "Alessandro",           url: "https://codehs.com/share/id/final-project-MbUEpb/run" },
            { name: "Ivan",                 url: "https://codehs.com/share/id/final-project-891f2h/run" },
            { name: "Vonn",                 url: "https://codehs.com/share/id/final-project-CGu32v/run" },
            { name: "Maddie",               url: "https://codehs.com/share/id/final-project-FICB9H/run" },
            { name: "Miles",                url: "https://codehs.com/share/id/final-project-OWkyVF/run" },
            { name: "Henry, Mason, and Noah", url: "https://codehs.com/sandbox/kstewart/retro-polo" },
            { name: "Mason",                url: "https://codehs.com/sandbox/kstewart/blackjack-p5" },
            { name: "Sam and Kaylee",       url: "https://codehs.com/sandbox/kstewart/final-pacman" },
            { name: "Marsi",                url: "https://codehs.com/share/id/final-project-891f2h/run" },
            { name: "Vanessa",              url: "https://codehs.com/share/id/final-project-fy2fVB/run" },
            { name: "Nicholas",             url: "https://codehs.com/share/id/final-project-fZETxB/run" },
            { name: "Kayleb",               url: "https://codehs.com/share/id/final-project-ETZ9XQ/run" },
            { name: "Adam",                 url: "https://codehs.com/share/id/final-project-MELUKX/run" },
            { name: "Koa",                  url: "https://codehs.com/share/id/final-project-UqSd1j/run" }
          ]
        },
        {
          id: "y2425",
          label: "2024–25",
          imgBase: IMG + "Comp-Art-24-25-projects-for-showcase/images/",
          students: [
            { name: "Alex",                         url: null },
            { name: "Angelo and Xavi",              url: "https://space-invader-game-12369487.codehs.me/index.html" },
            { name: "Ceci",                         url: "https://kxuntiwdzs-2909120183-lmdqptohah-t.codehs.me/index.html" },
            { name: "Damien",                       url: null },
            { name: "David",                        url: "https://ngfiyygvgr-2621267445-lmdqptohah-t.codehs.me/index.html" },
            { name: "Hassan, Steven, and Thomas",   url: null },
            { name: "Hector",                       url: null },
            { name: "Henry, Jayden, and Nico",      url: null },
            { name: "Henry, Ian, and Tristan",      url: "https://final-project-12320783.codehs.me/index.html" },
            { name: "Josh and Mia",                 url: "https://monkey-game-12372862.codehs.me/index.html" },
            { name: "Itzel",                        url: null },
            { name: "Jocelyn",                      url: null },
            { name: "Karl",                         url: null },
            { name: "Kate",                         url: null },
            { name: "Kathy",                        url: null },
            { name: "Kaya",                         url: null },
            { name: "Lily",                         url: null },
            { name: "Maddie",                       url: null },
            { name: "Marvin",                       url: null },
            { name: "Mason",                        url: null },
            { name: "Nash",                         url: null },
            { name: "Nick",                         url: "https://ayukgttkuq-2911604671-lmdqptohah-t.codehs.me/index.html" },
            { name: "Noah",                         url: null },
            { name: "Shae",                         url: null }
          ]
        },
        {
          id: "y2324",
          label: "2023–24",
          imgBase: IMG + "Comp-Art-23-24-projects-for-showcase/images/",
          students: [
            { name: "Aaron",                        url: IMG + "Comp-Art-23-24-projects-for-showcase/Aaron/index.html" },
            { name: "Aidan, Ethan, and Jonathan",   url: IMG + "Comp-Art-23-24-projects-for-showcase/AidanEthanJonathan/index.html" },
            { name: "Alex",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Alex/index.html" },
            { name: "Ben and Thatcher",             url: IMG + "Comp-Art-23-24-projects-for-showcase/BenThatcher/index.html" },
            { name: "Caje",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Caje/index.html" },
            { name: "Carlos, Kristian, and Lucas",  url: IMG + "Comp-Art-23-24-projects-for-showcase/CarlosKristianLucas/index.html" },
            { name: "Dash",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Dash/index.html" },
            { name: "Diego",                        url: IMG + "Comp-Art-23-24-projects-for-showcase/Diego/index.html" },
            { name: "Elicia and Fabricio",          url: IMG + "Comp-Art-23-24-projects-for-showcase/EliciaFabricio/index.html" },
            { name: "Emma",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Emma/index.html" },
            { name: "Evan",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Evan/index.html" },
            { name: "Evelyn",                       url: IMG + "Comp-Art-23-24-projects-for-showcase/Evelyn/index.html" },
            { name: "Finnley",                      url: IMG + "Comp-Art-23-24-projects-for-showcase/Finnley/index.html" },
            { name: "Gavin and Jordan",             url: IMG + "Comp-Art-23-24-projects-for-showcase/GavinJordan/index.html" },
            { name: "Ider",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Ider/index.html" },
            { name: "Jack and Jackson",             url: IMG + "Comp-Art-23-24-projects-for-showcase/JackJackson/index.html" },
            { name: "Jack and Stella",              url: IMG + "Comp-Art-23-24-projects-for-showcase/JackStella/index.html" },
            { name: "Jaden, Luis, Max, and Noe",    url: IMG + "Comp-Art-23-24-projects-for-showcase/JadenLuisMaxNoe/index.html" },
            { name: "Jason",                        url: IMG + "Comp-Art-23-24-projects-for-showcase/Jason/index.html" },
            { name: "Jay",                          url: IMG + "Comp-Art-23-24-projects-for-showcase/Jay/index.html" },
            { name: "JC",                           url: IMG + "Comp-Art-23-24-projects-for-showcase/JC/index.html" },
            { name: "Joseph",                       url: IMG + "Comp-Art-23-24-projects-for-showcase/Joseph/index.html" },
            { name: "Julian",                       url: IMG + "Comp-Art-23-24-projects-for-showcase/Julian/index.html" },
            { name: "Kody",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Kody/index.html" },
            { name: "Liam, Milo, and Simon",        url: IMG + "Comp-Art-23-24-projects-for-showcase/LiamMiloSimon/index.html" },
            { name: "Lucy",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Lucy/index.html" },
            { name: "Melanie",                      url: IMG + "Comp-Art-23-24-projects-for-showcase/Melanie/index.html" },
            { name: "Michael",                      url: IMG + "Comp-Art-23-24-projects-for-showcase/Michael/index.html" },
            { name: "Noah",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Noah/index.html" },
            { name: "Oliver and Ryler",             url: IMG + "Comp-Art-23-24-projects-for-showcase/OliverRyler/index.html" },
            { name: "Sammy",                        url: IMG + "Comp-Art-23-24-projects-for-showcase/Sammy/index.html" },
            { name: "Tino",                         url: IMG + "Comp-Art-23-24-projects-for-showcase/Tino/index.html" },
            { name: "Vania",                        url: IMG + "Comp-Art-23-24-projects-for-showcase/Vania/index.html" }
          ]
        }
      ]
    },
    {
      id: "data-science",
      name: "Data Science",
      desc: "Data analysis, visualization, and machine learning",
      icon: "bi-bar-chart-fill",
      years: [
        {
          id: "y2526",
          label: "2025–26",
          current: true,
          imgBase: IMG + "Data-Science-25-26-projects-for-showcase/images/",
          students: [
            { name: "Gio and Nikita",   url: IMG + "Data-Science-25-26-projects-for-showcase/GioNikita.pdf" },
            { name: "Lucy Kronberg",    url: IMG + "Data-Science-25-26-projects-for-showcase/LKronbergfinalProject.pdf" },
            { name: "Makena Taylor",    url: IMG + "Data-Science-25-26-projects-for-showcase/makenataylorfinalProject.pdf" },
            { name: "Michelle Wang",    url: IMG + "Data-Science-25-26-projects-for-showcase/MWang%20-%20F25%20Final%20Project%20Presentation-1.pdf" },
            { name: "Simon",            url: IMG + "Data-Science-25-26-projects-for-showcase/Simon%20118%20Presentation.pdf" },
            { name: "Tyler Satterberg", url: IMG + "Data-Science-25-26-projects-for-showcase/TSatterbergfinalProject.pdf" }
          ]
        },
        {
          id: "y2425",
          label: "2024–25",
          imgBase: IMG + "Data-Science-24-25-projects-for-showcase/images/",
          students: [
            { name: "Bea",    url: "https://docs.google.com/presentation/d/173BJBwXTvMLLH8QJlZjux2Mkqmm5uBqmDPeIsEH88OY/present#slide=id.p" },
            { name: "Dane",   url: IMG + "Data-Science-24-25-projects-for-showcase/DPolchinFinalPresentation.pdf" },
            { name: "Lucas",  url: "https://docs.google.com/presentation/d/1NmHtbrdH-Om72ex8WrN3kvNUPgS8IA1xC-Uwp_UUKvs/present#slide=id.p" },
            { name: "Ryler",  url: "https://docs.google.com/presentation/d/1pbTjVbDtXVu4P3TL-UmZTsTI7CWdyrW2HmCtiehCM-g/present#slide=id.p" }
          ]
        }
      ]
    },
    {
      id: "apcs",
      name: "AP Computer Science",
      desc: "Advanced programming and computer science fundamentals",
      icon: "bi-cpu-fill",
      years: [
        {
          id: "y2425",
          label: "2024–25",
          imgBase: IMG + "APCS-24-25-projects-for-showcase/images/",
          students: [
            { name: "Adrian",               url: "https://codehs.com/sandbox/id/new-sandbox-program-ph4yDG" },
            { name: "David",                url: "https://editor.p5js.org/chavezdavid0609/full/FHmuaaA2j" },
            { name: "Emiliano and Harvey",  url: "https://balderdashstudios.github.io/WaitingSimulator2/" },
            { name: "Jaden, Luis, Max, and Noe", url: null },
            { name: "Milo",                 url: "https://openprocessing.org/sketch/2649825" },
            { name: "Santiago",             url: "https://codehs.com/sandbox/id/2p-project-geometry-lab-26tOQm" },
            { name: "Simon",                url: "https://openprocessing.org/sketch/2519009" }
          ]
        },
        {
          id: "y2324",
          label: "2023–24",
          imgBase: IMG + "APCS-23-24-projects-for-showcase/images/",
          students: [
            { name: "Aaliyah",              url: IMG + "APCS-23-24-projects-for-showcase/Aaliyah/index.html" },
            { name: "Ann and Elly",         url: "https://codehs.com/sandbox/id/ann-elly-final-bhaddie-project-n0agqO/run" },
            { name: "Anthony and Daniel",   url: "https://codehs.com/sandbox/id/mario-final-6pYkA3/run" },
            { name: "Bea",                  url: "https://github.com/bea-75/portfolio" },
            { name: "Camille",              url: "https://openprocessing.org/sketch/2273550" },
            { name: "Chase and Zade",       url: "https://codehs.com/sandbox/id/new-sandbox-program-1S2f6f/run" },
            { name: "Dane",                 url: "https://danyewest97.github.io/portfolio-template/" },
            { name: "Felipe",               url: "https://replit.com/@YourBoredom/Donkey-Kong-11?v=1#script.js" },
            { name: "Finnley",              url: IMG + "APCS-23-24-projects-for-showcase/Finnley/index.html" },
            { name: "Gavin and Matthew",    url: "https://html-10202801.codehs.me/index.html" },
            { name: "Ider",                 url: IMG + "APCS-23-24-projects-for-showcase/Ider/index.html" },
            { name: "Larissa",              url: "https://codehs.com/sandbox/id/game-96s8Ch/run" },
            { name: "Liam",                 url: "https://sixtiess.github.io/portfolio/" },
            { name: "Lorenzo and Nikita",   url: "https://html-10202809.codehs.me/index.html" },
            { name: "Owen",                 url: "https://owenschiller.github.io/portfolio/" },
            { name: "Sam",                  url: "https://samuelramirez805.github.io/Final-Project-AP-Comp-Sci-2023-24/" },
            { name: "Shane",                url: "https://codehs.com/sandbox/id/2048-shane-final-project-vujDw9/run" }
          ]
        }
      ]
    },
    {
      id: "ecs",
      name: "Exploring Computer Science",
      desc: "Introductory computing concepts and creative projects",
      icon: "bi-laptop",
      years: [
        { id: "y2526", label: "2025–26", current: true, externalUrl: BASE + "ECS-25-26-projects-for-showcase/", 
          students:[
            {name: "Alejandro",         url: "https://codehs.com/sandbox/id/alejandro-artwork-7NrRg0"},
            {name: "Angel Del Carmen",  url:  "https://codehs.com/share/id/greeting-card-JY168g/run"},
            {name: "Angel,Daniel",      url: "https://codehs.com/sandbox/purplesheep4677/program"},
    {name: "Atticus,Sebastian",          url:"https://codehs.com/sandbox/scarletheron6204/new-sandbox-program?collaborate=-ObTUDxnih_oa8hily0J"},
    {name: "Christopher,Steven",         url:"https://codehs.com/sandbox/id/new-sandbox-program-4Lr5lc?collaborate=-ObTPD_PU1QwXaXDvHHT&filepath=Style.css"},
    {name: "Daniel,Angel",               url:"https://codehs.com/sandbox/purplesheep4677/corporate-mockery?collaborate=-OZAGDx62UNJYSuqhTTO"},
    {name: "Daveed,Charlie,Manny",       url:"https://codehs.com/sandbox/purplebat7192/new-sandbox-program-1?collaborate=-Og8FMTks4JkLCX2jNIh"},
    {name: "Deacon",                     url:"https://codehs.com/sandbox/maroontrout4593/new-sandbox-program-1/run"},
    {name: "Kitty",                      url:"https://codehs.com/sandbox/dicoslover/chatbot"},
    {name: "Lillian",                    url:"https://codehs.com/sandbox/pinkeel7852/lillian-community-artwork/run"},
    {name: "Logan,Jesus",                url:"https://codehs.com/sandbox/pinkchinchilla9120/html?collaborate=-ObTPYk9anMKF-OuwYDU"},
    {name: "Mar",                        url:"https://codehs.com/share/id/greeting-card-KAl52u/run"},
    {name: "Noe,Ceci,Lillian",           url: "https://codehs.com/sandbox/pinkfish2684/three-worlds?collaborate=-OgJW-EtPXezE4Z6YdF9&filepath=script.js"},
    {name: "Sebastian, Christopher",     url:"https://codehs.com/sandbox/graywombat5843/pong?collaborate=-Og8HWRVDeAjIE6qFsJ-&filepath=paddle.js"},
    {name: "Sia,Alex",                   url:"https://codehs.com/sandbox/id/basic-chatbot-LzLT8S/run"},
    {name: "Spotify",                    url:"https://codehs.com/sandbox/id/new-sandbox-program-wKddPS/run"},
    {name: "Valerie,Nathan,Kitty",       url:"https://codehs.com/sandbox/violetgull7401/whack-a-beaver-1/run"},
          ]
        }
      ]
    },
    {
      id: "dsw",
      name: "Designing Software for the Web",
      desc: "Web development, UI/UX design, and full-stack projects",
      icon: "bi-code-slash",
      years: [
        { id: "y2526", label: "2025–26", current: true, externalUrl: BASE + "DSW-25-26-projects-for-showcase/" }
      ]
    },
    {
      id: "mobile",
      name: "Mobile Development",
      desc: "iOS app design and development",
      icon: "bi-phone-fill",
      years: [
        { id: "y2425", label: "2024–25", externalUrl: BASE + "Mobile-24-25/" }
      ]
    }
  ]
};
