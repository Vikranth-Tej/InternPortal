# Full Stack Intern Portal

A modern, responsive web application for managing intern donations, referrals, and achievements. Built with React, TypeScript, and Node.js.

##  Features

### Frontend
- **Authentication**: Dummy login/signup system with form validation
- **Dashboard**: Personalized intern profile with donation progress tracking
- **Referral System**: Unique referral codes for each intern
- **Rewards System**: Achievement badges based on donation milestones
- **Leaderboard**: Competitive ranking system showing top performers
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Backend
- **REST API**: Express.js server with JSON endpoints
- **Mock Data**: Pre-populated intern profiles and donation data
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Proper HTTP status codes and error responses

##  Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients and animations

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd intern-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   Start the backend server:
   ```bash
   npm run server
   ```
   
   In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

##  Demo Credentials

Use these credentials to test the login functionality:

- **Email**: shiv@example.com
- **Password**: password123

##  API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration

### Data
- `GET /api/intern/:id` - Get intern details by ID
- `GET /api/leaderboard` - Get sorted leaderboard data

##  Reward System

Interns can unlock achievements based on donation milestones:

- **Bronze Achiever**: $1,000 raised
- **Silver Supporter**: $5,000 raised  
- **Gold Champion**: $10,000 raised
- **Platinum Legend**: $25,000 raised

##  Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Smooth Animations**: Hover effects and transitions throughout
- **Visual Hierarchy**: Clear typography and spacing system
- **Interactive Elements**: Buttons, cards, and form inputs with feedback
- **Mobile-First**: Responsive design that works on all screen sizes

##  Pages

1. **Login/Signup**: Authentication with form validation
2. **Dashboard**: Personal stats, progress tracking, and referral code
3. **Leaderboard**: Competitive rankings with podium display

##  Deployment Options

### Frontend
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for static site deployment

### Backend
- **Render**: Deploy Node.js apps with automatic builds
- **Railway**: Simple deployment with database options
- **Cyclic**: Serverless Node.js hosting

##  Project Structure

```
├── src/
│   ├── components/
│   │   ├── Login.tsx          # Authentication component
│   │   ├── Dashboard.tsx      # Main dashboard view
│   │   └── Leaderboard.tsx    # Rankings display
│   ├── App.tsx                # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── server/
│   └── server.js             # Express.js backend server
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

##  Development Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

