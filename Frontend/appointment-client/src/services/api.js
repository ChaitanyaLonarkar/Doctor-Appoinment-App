import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  registerDoctor: (data) => api.post('/auth/register/doctor/', data),
  registerPatient: (data) => api.post('/auth/register/patient/', data),
  login: (data) => api.post('/auth/login/', data),
  // logout: () => api.post('/auth/logout/'),
};

// Slot APIs
export const slotAPI = {
  createSlot: (data) => api.post('/appointments/slot/create/', data),
  getAllSlots: () => api.get('/appointments/slots/'),
  getSlot: (id) => api.get(`/appointments/slot/${id}/`),
  updateSlot: (id, data) => api.put(`/appointments/slot/update/${id}/`, data),
  deleteSlot: (id) => api.delete(`/appointments/slot/delete/${id}/`),
};

// Appointment APIs
export const appointmentAPI = {
  createAppointment: (data) => api.post('/appointments/appointment/create/', data),
  deleteAppointment: (id) => api.delete(`/appointments/appointment/delete/${id}/`),
};

export const userAPI = {
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/update/', data),
  getDoctorsList: () => api.get('/appointments/doctors/'),
  getDoctorsSlots: (id) => api.get(`/appointments/doctor/slots/${id}/`),
  getPatientAppointments: (id) => api.get(`/appointments/patient/appointments/${id}/`),
  getDoctorBookedSlots: (id) => api.get(`/appointments/doctor/booked-slots/${id}/`),
};

export const chatbotAPI = {
  sendMessagetoBot: (message) => api.post('/pdf_rag_chat/chat/',message),
  getChatHistory: () => api.get('/chatbot/chat-history/'),
};

export const AdminAPI = {
  getAppointments:() => api.get('/admin/adminpanel/'),
}
export default api;
