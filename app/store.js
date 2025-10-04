
import { create } from 'zustand';

export const  useFavoritesStore = create(set => ({
  favorites: [],

  addFavorite: (place) =>
    set(state => ({
      favorites: [...state.favorites, place],
    })),

  removeFavorite: (placeId) =>
    set(state => ({
      favorites: state.favorites.filter(p => p.name !== placeId),
    })),

  toggleFavorite: (place) =>
    set(state => {
      const exists = state.favorites.find(p => p.name === place.name);
      if (exists) {
        return {
          favorites: state.favorites.filter(p => p.name !== place.name),
        };
      } else {
        return {
          favorites: [...state.favorites, place],
        };
      }
    }),
}));
