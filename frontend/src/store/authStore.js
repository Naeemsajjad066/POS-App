import { create } from 'zustand'
import API from '../api'

const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    fetchUser: async () => {
        set({ loading: true })
        const token = localStorage.getItem("token")
        if (!token) {
            set({ loading: false })
            return
        }

        try {
            const res = await API.get("/auth/me");
            set({ user: res.data.user, loading: false })

        } catch (error) {
            set({ user: null, loading: false })
        }
    },

    login: (token) => {
        localStorage.setItem("token", token)
    },
    logout: () => {
        localStorage.removeItem("token")
        set({ user: null })
    }

}))

export default useAuthStore