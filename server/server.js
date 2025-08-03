import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const interns = [
  {
    id: 1,
    name: "Shiva",
    email: "shiv@example.com",
    referralCode: "shiva2025",
    donationsRaised: 15420,
    rank: 1,
    rewards: {
      bronze: true,
      silver: true,
      gold: false,
      platinum: false
    }
  },
  {
    id: 2,
    name: "Sarah",
    email: "sara@example.com", 
    referralCode: "sarah2025",
    donationsRaised: 12800,
    rank: 2,
    rewards: {
      bronze: true,
      silver: true,
      gold: false,
      platinum: false
    }
  },
  {
    id: 3,
    name: "Vishnu",
    email: "vishnu@example.com",
    referralCode: "vishnu2025", 
    donationsRaised: 9650,
    rank: 3,
    rewards: {
      bronze: true,
      silver: false,
      gold: false,
      platinum: false
    }
  },
  {
    id: 4,
    name: "Ram",
    email: "ram@example.com",
    referralCode: "ram2025",
    donationsRaised: 8200,
    rank: 4,
    rewards: {
      bronze: true,
      silver: false,
      gold: false,
      platinum: false
    }
  },
  {
    id: 5,
    name: "Krishna",
    email: "krishna@example.com",
    referralCode: "krishna2025",
    donationsRaised: 7100,
    rank: 5,
    rewards: {
      bronze: true,
      silver: false,
      gold: false,
      platinum: false
    }
  }
];

// API Routes
app.get('/api/intern/:id', (req, res) => {
  const internId = parseInt(req.params.id);
  const intern = interns.find(i => i.id === internId);
  
  if (!intern) {
    return res.status(404).json({ error: 'Intern not found' });
  }
  
  res.json(intern);
});

app.get('/api/leaderboard', (req, res) => {
  const sortedInterns = interns.sort((a, b) => b.donationsRaised - a.donationsRaised);
  res.json(sortedInterns);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication - just check if email exists
  const intern = interns.find(i => i.email === email);
  
  if (intern && password === 'password123') {
    res.json({ 
      success: true, 
      intern: intern,
      message: 'Login successful' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Mock signup - just return success
  const newIntern = {
    id: interns.length + 1,
    name,
    email,
    referralCode: `${name.toLowerCase().replace(' ', '')}2025`,
    donationsRaised: 0,
    rank: interns.length + 1,
    rewards: {
      bronze: false,
      silver: false,
      gold: false,
      platinum: false
    }
  };
  
  interns.push(newIntern);
  
  res.json({ 
    success: true, 
    intern: newIntern,
    message: 'Signup successful' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});