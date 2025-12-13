// store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface CoordinatesState {

    longitude: number
    latitude: number
    setCoordinates: (long: number, lat: number) => void
    
}

export const useStore = create<CoordinatesState>()(
  persist(
    (set) => ({
      longitude: 0,
      latitude: 0,
      setCoordinates: (long, lat) =>
        set(() => ({
          longitude: long,
          latitude: lat
        })),
    }),
    {
      name: 'coordinates-storage',   // key in localStorage
    }
  )
)