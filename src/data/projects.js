import deliverx from "../utils/deliverX.png";
import ai_coach from "../utils/interview2.png";
import estate_ai from "../utils/estateAi.png";
import crop_disease from "../utils/crop.png";
export const projects = [
  {
    id: 1,
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
    id: 2,
    title: "AI Interview Practice Platform",
    description:
      "A GenAI-powered career guidance platform that leverages Large Language Models (LLMs) to analyze user skills, interests, and goals, providing personalized career recommendations, learning paths, and interview preparation guidance.",

    image: ai_coach,

    techStack: [
      "Python",
      "LLM",
      "GenAI",
      "OpenAI API",
      "React",
      "Node.js"
    ],

    highlights: [
      "LLM-based personalized career recommendations",
      "GenAI-driven resume and interview guidance",
      "Dynamic learning path generation based on user profile",
      "Interactive chatbot-style career assistant",
      "Real-time responses using API-based AI models"
    ],

    githubUrl: "https://github.com/pradeepkumarsingha/Ai-Interview-Practice-Platform",

    liveUrl: null,

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
  }
];