import axios from 'axios';

export type GoogleLocationResult = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
};

export const getGoogleLocation = async (endereco: string | undefined) => {
  if (!endereco) {
    return null;
  }
  const googleLocationUrl = encodeURI(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }`
  );

  const googleLoction: GoogleLocationResult = await axios
    .get(googleLocationUrl)
    .then((res) => (res.data.results[0] ? res.data.results[0] : null))
    .catch((error) => {
      throw new Error(error);
    });
  return googleLoction;
};
