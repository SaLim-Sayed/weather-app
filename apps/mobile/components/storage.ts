import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_SEARCHED_CITY_KEY = 'last_searched_city';

export const Storage = {
  // Save last searched city
  async saveLastSearchedCity(city: any): Promise<void> {
    try {
      const cityData = JSON.stringify(city);
      await AsyncStorage.setItem(LAST_SEARCHED_CITY_KEY, cityData);
    } catch (error) {
      console.error('Error saving last searched city:', error);
    }
  },

  // Get last searched city
  async getLastSearchedCity(): Promise<any | null> {
    try {
      const cityData = await AsyncStorage.getItem(LAST_SEARCHED_CITY_KEY);
      return cityData ? JSON.parse(cityData) : null;
    } catch (error) {
      console.error('Error getting last searched city:', error);
      return null;
    }
  },

  // Clear last searched city
  async clearLastSearchedCity(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LAST_SEARCHED_CITY_KEY);
    } catch (error) {
      console.error('Error clearing last searched city:', error);
    }
  }
};

