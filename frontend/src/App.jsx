import { useState, useEffect } from 'react'
import axios from 'axios'


const floatingAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const bounceAnimation = `
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const spinAnimation = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

function App() {
  const [formData, setFormData] = useState({
    message: '',
    date: '',
    time: '',
    reminder_method: 'email'
  })

  const [showStars, setShowStars] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  
 
  useEffect(() => {
    const stars = []
    for (let i = 0; i < 20; i++) {
      stars.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        size: Math.floor(Math.random() * 20) + 10
      })
    }
    setShowStars(stars)
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/reminders/create', formData)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      alert('Your reminder has been set!')
      setFormData({
        message: '',
        date: '',
        time: '',
        reminder_method: 'email'
      })
    } catch (err) {
      console.error(err)
      alert('Oops! Something went wrong!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" 
         style={{ 
           background: 'linear-gradient(to bottom, #87CEEB, #1E90FF)',
           fontFamily: "'Comic Sans MS', cursive, sans-serif"
         }}>
      
      <style>
        {floatingAnimation}
        {bounceAnimation}
        {spinAnimation}
      </style>
      
      
      {showStars.map((star, index) => (
        <div 
          key={index}
          className="absolute z-10"
          style={{
            left: star.left,
            top: star.top,
            animationName: 'float',
            animationDuration: '3s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: star.animationDelay,
          }}
        >
          <div className="text-yellow-300" style={{ fontSize: `${star.size}px` }}>✦</div>
        </div>
      ))}
      
      
      <div className="absolute top-10 left-10 text-white text-6xl opacity-80" 
           style={{ animation: 'float 6s ease-in-out infinite' }}>☁️</div>
      <div className="absolute top-20 right-20 text-white text-5xl opacity-80" 
           style={{ animation: 'float 7s ease-in-out infinite 1s' }}>☁️</div>
      <div className="absolute bottom-10 left-32 text-white text-4xl opacity-80" 
           style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}>☁️</div>
      
     
      <div className="absolute top-5 right-5 text-yellow-300 text-7xl" 
           style={{ animation: 'spin 60s linear infinite' }}>☀️</div>
      
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-60">
        <div className="text-8xl">🌈</div>
      </div>

      
      {showConfetti && (
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.floor(Math.random() * 15) + 5;
            const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = `${Math.random() * 100}%`;
            const animationDuration = `${Math.random() * 3 + 2}s`;
            
            return (
              <div 
                key={i}
                className={`absolute ${color} rounded-full`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left,
                  top: '-10px',
                  animation: `fall ${animationDuration} linear forwards`,
                }}
              />
            );
          })}
          <style>
            {`
              @keyframes fall {
                0% { transform: translateY(-10px); }
                100% { transform: translateY(100vh) rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
      
      
      <h1 className="text-4xl font-bold text-white mb-6 relative z-10" 
          style={{ 
            animation: 'bounce 2s infinite',
            textShadow: '3px 3px 0px #FF69B4, 6px 6px 0px #6A5ACD'
          }}>
        My Magical Reminder App!
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 relative z-10 border-4 border-purple-400">
        <h2 className="text-3xl font-bold text-purple-600 text-center">Set a Fun Reminder!</h2>
        
        <div className="space-y-2">
          <label className="block text-xl text-purple-700 font-bold">My Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your magical reminder here!"
            className="w-full border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-300"
            required
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xl text-purple-700 font-bold">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xl text-purple-700 font-bold">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xl text-purple-700 font-bold">Reminder Method:</label>
          <select
            name="reminder_method"
            value={formData.reminder_method}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-300"
          >
            <option value="email">Email</option>
            <option value="sms">Text Message</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl text-xl font-bold hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
          style={{ boxShadow: '0 4px 0 #9333ea' }}
        >
          Create My Reminder! ✨
        </button>
      </form>
      
    
      <div className="absolute bottom-5 left-5 text-6xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
        🦄
      </div>
      <div className="absolute bottom-5 right-5 text-6xl" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
        🌟
      </div>
      
      <div className="mt-4 text-white font-bold text-center text-lg z-10">
        Never forget your important tasks again!
      </div>
    </div>
  )
}

export default App