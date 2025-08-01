import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.212cf6a2ea77483097e11a6d3a241e46',
  appName: 'RoofPro Contractor',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: "https://212cf6a2-ea77-4830-97e1-1a6d3a241e46.lovableproject.com?forceHideBadge=true",
    cleartext: true
  }
};

export default config;