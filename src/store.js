import create from 'zustand';


const useStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    user: null,
    setUser: (value) => set({ user: value }),
    listing: null,
    setListingId: (value) => set({ listing: value }),
}));