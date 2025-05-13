import { useState, useEffect } from 'react'

function App() {
  const [formData, setFormData] = useState({
    message: '',
    date: '',
    time: '',
    reminder_method: 'email',
    email: ''
  })

  const [showStars, setShowStars] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
 
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    
    if (formData.reminder_method === 'email' && !formData.email) {
      alert('Please enter your email address!')
      return
    }
    
   
    const mockApiCall = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 1000)
      })
    }
    
    mockApiCall().then(() => {
     
      setShowConfetti(true)
      setSubmitted(true)
      
      
      scheduleReminderNotification(formData)
      
      setTimeout(() => {
        setShowConfetti(false)
        
        setTimeout(() => setSubmitted(false), 500)
      }, 3000)
    })
  }
  
 
  const scheduleReminderNotification = (reminder) => {
    const { message, date, time, reminder_method, email } = reminder
    
    
    const reminderDate = new Date(`${date}T${time}`)
    const now = new Date()
    const timeDiff = reminderDate - now
    
    
    if (timeDiff > 0) {
      console.log(`Reminder scheduled for ${reminderDate.toString()}`)
      
      
      setTimeout(() => {
       
        if (reminder_method === 'email') {
          console.log(`📧 Email sent to ${email} with message: ${message}`)
         
          alert(`REMINDER: ${message}\n\nThis would be sent to: ${email}`)
        } else {
          console.log(`📱 SMS sent with message: ${message}`)
          alert(`REMINDER: ${message}\n\nThis would be sent as an SMS`)
        }
      }, timeDiff)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" 
         style={{ 
           background: 'linear-gradient(to bottom, #87CEEB, #1E90FF)',
           fontFamily: "'Comic Sans MS', cursive, sans-serif"
         }}>
      
     
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}} />
      
     
      {showStars.map((star, index) => (
        <div 
          key={index}
          className="absolute z-10"
          style={{
            left: star.left,
            top: star.top,
            animation: `float 3s ease-in-out infinite ${star.animationDelay}`,
          }}
        >
          <div className="text-yellow-300" style={{ fontSize: `${star.size}px` }}>✦</div>
        </div>
      ))}
      
      
      <div className="absolute top-10 left-10 text-white text-6xl opacity-80" 
           style={{ animation: 'float 6s ease-in-out infinite' }}>☁️</div>
      <div className="absolute top-20 right-20 text-white text-5xl opacity-80" 
           style={{ animation: 'float 7s ease-in-out infinite' }}>☁️</div>
      <div className="absolute bottom-10 left-32 text-white text-4xl opacity-80" 
           style={{ animation: 'float 5s ease-in-out infinite' }}>☁️</div>
      
      
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
        </div>
      )}
      
     
      <h1 className="text-4xl font-bold text-white mb-6 relative z-10" 
          style={{ 
            animation: 'bounce 2s infinite',
            textShadow: '3px 3px 0px #FF69B4, 6px 6px 0px #6A5ACD'
          }}>
        My Magical Reminder App!
      </h1>
      
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 relative z-10 border-4 border-purple-400">
                  {submitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Yay! Your reminder is set!</h2>
            <p className="text-xl text-purple-500">We'll remind you when it's time!</p>
            {formData.reminder_method === 'email' && (
              <p className="mt-2 text-lg text-purple-500">An email will be sent to: {formData.email}</p>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-purple-600 text-center">Set a Fun Reminder!</h2>
            
            <div className="space-y-2">
              <label className="block text-xl text-purple-700 font-bold">My Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your magical reminder here!"
                className="w-full border-2 border-purple-300 rounded-xl p-3"
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
                className="w-full border-2 border-purple-300 rounded-xl p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xl text-purple-700 font-bold">Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border-2 border-purple-300 rounded-xl p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xl text-purple-700 font-bold">Reminder Method:</label>
              <select
                name="reminder_method"
                value={formData.reminder_method}
                onChange={handleChange}
                className="w-full border-2 border-purple-300 rounded-xl p-3"
              >
                <option value="email">Email</option>
                <option value="sms">Text Message</option>
              </select>
            </div>
            
            {formData.reminder_method === 'email' && (
              <div className="space-y-2">
                <label className="block text-xl text-purple-700 font-bold">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full border-2 border-purple-300 rounded-xl p-3"
                  required={formData.reminder_method === 'email'}
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl text-xl font-bold transform hover:scale-105"
              style={{ 
                boxShadow: '0 4px 0 #9333ea',
                transition: 'all 0.3s ease'
              }}
            >
              Create My Reminder! ✨
            </button>
          </>
        )}
      </div>
      
     
      <div className="absolute bottom-5 left-5 text-6xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
        🦄
      </div>
      <div className="absolute bottom-5 right-5 text-6xl" style={{ animation: 'float 3.5s ease-in-out infinite' }}>
        🌟
      </div>
      
      <div className="mt-4 text-white font-bold text-center text-lg z-10">
        Never forget your important tasks again!
      </div>
    </div>
  )
}

export default App