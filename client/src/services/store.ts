// store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface CoordinatesState {

    longitude: number
    latitude: number
    setCoordinates: (lat: number, long: number) => void
}

export const useStore = create<CoordinatesState>()(
  persist(
    (set) => ({
      latitude: 0,
      longitude: 0,
      setCoordinates: (lat, long) =>
        set(() => ({
          latitude: lat,
          longitude: long
        })),
    }),
    {
      name: 'coordinates-storage',   // key in localStorage
    }
  )
)