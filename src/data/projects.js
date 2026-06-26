import deliverx from "../utils/deliver.png";
import carrier_twin from "../utils/carrier_twin.png";
import estate_ai from "../utils/estateAi.png";
import crop_disease from "../utils/crop.png";
import portfolio from "../utils/portfolio.png";
import krushi_sathi from "../utils/krushi-sathi.jpg";

export const projects = [
  {
    id: 1,
    title: "Krushi Sathi",
    description:
      "An AI-powered precision agriculture ecosystem that converts soil data, real-time weather metrics, and leaf imagery into actionable farming insights, maximizing yield and diagnosing crop diseases.",

    image: krushi_sathi,

    techStack: [
      "Flask",
      "Python",
      "React",
      "Tailwind CSS",
      "TensorFlow Lite",
      "Scikit-Learn",
      "Pandas",
      "Joblib",
      'GEN AI'
    ],

    highlights: [
      "Engineered multi-stage predictive ML models for crop recommendation and accurate regional yield estimation",
      "Integrated OpenWeather API to provide dynamic, weather-adaptive irrigation schedules and real-time climate alerts",
      "Implemented a lightweight computer vision pipeline using TFLite to diagnose leaf diseases and prescribe treatment dosages",
      "Optimized backend architecture with lazy-loading models to eliminate server cold-start delays and drop boot times under 2 seconds",
      "Built a highly responsive, intuitive frontend dashboard for tracking soil health metrics and regional weather variables"
    ],
    githubUrl: "https://github.com/pradeepkumarsingha/Krushi-Sathi",
    liveUrl: "https://krushi-sathi.vercel.app/",
    featured: true

  },
  {
  id: 2,
  title: "AI Career Twin",
  description:
    "A AI-powered career development platform that creates a personalized digital twin of users to analyze their skills, resume, interests, and career goals. The platform provides AI-driven career recommendations, skill gap analysis, interview preparation, ATS evaluation, and personalized learning roadmaps.",

  image: carrier_twin,

  techStack: [
    "Python",
    "FastAPI",
    "React",
    "Node.js",
    "MongoDB",
    "LLM",
    "GenAI",
    "Machine Learning",
    "NLP",
    "Data Analytics",
  ],

  highlights: [
    "Personalized Digital Twin for career analysis and guidance",
    "AI-powered role prediction and career recommendations",
    "Skill gap analysis with customized learning roadmaps",
    "ATS resume scoring and resume improvement suggestions",
    "AI mock interview system with real-time feedback",
    "Real-time recommendations using LLM-based AI models",
    "Fully deployed and production-ready platform",
    "Live Interview Practice Platform with AI-driven feedback and scoring"
  ],

  githubUrl: "https://github.com/pradeepkumarsingha/Ai-Interview-Practice-Platform",

  liveUrl: "https://ai-carrier-twin.vercel.app/",

  featured: true
},
  {
    id: 3,
    title: "Estate AI",
    description:
      "A GenAI-powered real estate platform that uses Large Language Models (LLMs) to provide intelligent property recommendations, price insights, and personalized investment guidance based on user preferences and market trends.",

    image: estate_ai,

    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Python",
      "Machine Learning",
      "Data Science",
      "Data Analytics"
    ],

    highlights: [
      "Real estate platform that uses Large Language Models (LLMs) to provide intelligent property recommendations",
      "Based on Real Data of Bhubaneswar",
      "ML-based smart property recommendations",
      "AI-powered price prediction and market analysis",
      "ML-based business advisor",
      "Personalized investment",
      "Location-based filtering and intelligent suggestions"
    ],

    githubUrl: "https://github.com/pradeepkumarsingha/Ai-Powered-Price-Estimator-and-Business-Advisor",

    liveUrl: "https://ai-powered-price-estimator-and-busi.vercel.app/",

    featured: true
  },
  {
    id: 4,
    title: "DeliverX",
    description:
      "A scalable full-stack food delivery platform with real-time order tracking, OTP-based delivery verification, and role-based dashboards for users, sellers, and delivery agents.",

    // 🔥 Replace emoji with image (IMPORTANT)
    image: deliverx,

    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.IO",
      "JWT Auth"
    ],

    // 🔥 Add highlights (very powerful for recruiters)
    highlights: [
      "Real-time order tracking using WebSockets",
      "OTP-based secure delivery verification",
      "Role-based dashboards (User, Seller, Delivery)",
      "Scalable backend architecture with REST APIs"
    ],

    githubUrl: "https://github.com/pradeepkumarsingha/DeliverX",

    // 🔥 If not deployed → remove or keep null
    liveUrl: null,

    featured: true
  },
  {
    id: 5,
    title: "Crop Disease Detection",
    description:
      "An AI-powered crop disease detection system that uses deep learning and computer vision to identify plant diseases from leaf images, helping farmers take timely and accurate actions.",

    image: crop_disease,

    techStack: [
      "Python",
      "TensorFlow",
      "CNN",
      "OpenCV",
      "NumPy",
      "React"
    ],

    highlights: [
      "Image classification using Convolutional Neural Networks (CNN)",
      "Detects multiple crop diseases from leaf images",
      "Trained on agricultural image datasets",
      "Real-time prediction through web interface",
      "Helps farmers improve crop yield and reduce losses"
    ],

    githubUrl: "https://github.com/pradeepkumarsingha/Crop_Disease_Detection",

    liveUrl: null,

    featured: true
  },
  {
    id: 6,
    title: "PKS Portfolio",
    description:
      "A personal portfolio website built with React and Tailwind CSS, showcasing projects, skills, and achievements in a visually appealing and responsive design.",

    image: portfolio,

    techStack: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
      "HTML",
      "CSS"
    ],

    highlights: [
      "Built with React and Tailwind CSS for a modern and responsive design",
      "Showcases projects, skills, and achievements in a visually appealing way",
      "Includes smooth animations and interactive elements using Framer Motion",
      "Optimized for performance and accessibility",
      "Deployed on Vercel for fast and reliable hosting"
    ],
    githubUrl: "https://github.com/pradeepkumarsingha/Professional_Portfolio",
    liveUrl: "https://pradeepsportfoliopks.netlify.app/",
    featured: false

  }
];