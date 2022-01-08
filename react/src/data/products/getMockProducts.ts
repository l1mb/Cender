import { readProductDto } from "@/api/types/newProduct/rProductDto";

const getMockProducts: readProductDto[] = [
  {
    id: 0,
    name: "fender stratocaster",
    description: "nice guitar",
    logo: "https://www.stars-music.com/medias/fender/strat-player-mex-sss-pf-hd-146087.jpg",
    price: 14.88,
    shape: "Jazzmaster",
    pickups: {
      id: 2,
      label: "S-S-S",
    },
    manufacturer: {
      id: 1,
      label: "fender",
    },
  },
  {
    id: 1,
    name: "fender stratocaster",
    description: "nice guitar",
    logo: "https://www.stars-music.com/medias/fender/strat-player-mex-sss-pf-hd-146087.jpg",
    price: 14.88,
    shape: "Jazzmaster",
    pickups: {
      id: 2,
      label: "S-S-S",
    },
    manufacturer: {
      id: 1,
      label: "fender",
    },
  },
];

export default getMockProducts;
