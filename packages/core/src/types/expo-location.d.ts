// This file makes TS happy on web builds where expo-location is not used
declare module "expo-location" {
    export const requestForegroundPermissionsAsync: () => Promise<{ status: string }>;
    export const getCurrentPositionAsync: (options?: any) => Promise<{
      coords: { latitude: number; longitude: number };
    }>;
  }
  