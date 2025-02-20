import axios from 'axios'

const api = {
  // Challenge endpoints
  getChallenges: (params) => axios.get('/api/challenges/', { params }),
  getChallenge: (id) => axios.get(`/api/challenges/${id}/`),
  submitChallenge: (id, data) => axios.post(`/api/challenges/${id}/submit/`, data),
  
  // User progress endpoints
  getUserProgress: () => axios.get('/api/progress/'),
  getUserStatistics: () => axios.get('/api/progress/statistics/'),
  
  // Achievement endpoints
  getAchievements: () => axios.get('/api/achievements/'),
  getUserAchievements: () => axios.get('/api/user-achievements/'),
  
  // User endpoints
  updateProfile: (data) => axios.patch('/api/users/me/', data),
  getLeaderboard: () => axios.get('/api/users/leaderboard/'),
  
  // Category endpoints
  getCategories: () => axios.get('/api/challenges/categories/'),
}

// Response interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken
        })
        
        const { access } = response.data
        localStorage.setItem('token', access)
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
        
        return axios(originalRequest)
      } catch (error) {
        // Refresh token is invalid, logout user
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api
