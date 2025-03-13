
import { MenuItem, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Popular',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat3',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat4',
    name: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat5',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat6',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=150&auto=format&fit=crop'
  }
];

export const menuItems: MenuItem[] = [
  {
    "name": "လ္ဘက်သုပ်",
    "description": "လ္ဘက်သုပ်",
    "category": {
      "_model": "category",
      "_id": "f80ca6d133336312d40000e0"
    },
    "price": 2500,
    "image": null,
    "available": true,
    "_modified": 1741167054,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167042,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f86e5017326630f56900011b"
  },
  {
    "name": "ဆိုင်ဖျော်ကော်ဖီ",
    "description": "ဆိုင်ဖျော်ကော်ဖီ",
    "category": {
      "_model": "category",
      "_id": "f84b6e5f646137433f00036b"
    },
    "price": 2000,
    "image": null,
    "available": true,
    "_state": 1,
    "_modified": 1741167118,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167118,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f879ca653561304ec9000258"
  },
  {
    "name": "Milkshake",
    "description": "Milkshake",
    "category": {
      "_model": "category",
      "_id": "f84d66386666638ba70000e7"
    },
    "price": 3000,
    "image": null,
    "available": true,
    "_state": 1,
    "_modified": 1741167165,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167165,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f88111a3636262c0d2000082"
  },
  {
    "name": "ထမင်းကြော်",
    "description": "ထမင်းကြော်",
    "category": [
      {
        "_model": "category",
        "_id": "f8933cbf3765626bf900033c"
      },
      {
        "_model": "category",
        "_id": "f82aa1d630396483fc00017c"
      }
    ],
    "price": 4000,
    "image": null,
    "available": true,
    "_modified": 1741167327,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167225,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f88a2fa8643862e4a9000121"
  },
  {
    "name": "Ice Cream",
    "description": "Ice Cream",
    "category": [
      {
        "_model": "category",
        "_id": "f84354d9663632626c000106"
      }
    ],
    "price": 2000,
    "image": null,
    "available": true,
    "_state": 1,
    "_modified": 1741167368,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167368,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8a005ed3637625034000121"
  },
  {
    "name": "ဂျင်းသုပ်",
    "description": "ဂျင်းသုပ်",
    "category": [
      {
        "_model": "category",
        "_id": "f80ca6d133336312d40000e0"
      }
    ],
    "price": 2500,
    "image": null,
    "available": true,
    "_modified": 1741167452,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167443,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8ab5f813566633e450003c2"
  },
  {
    "name": "ဖီတန်သုပ်",
    "description": "ဖီတန်သုပ်",
    "category": [
      {
        "_model": "category",
        "_id": "f80ca6d133336312d40000e0"
      }
    ],
    "price": 3000,
    "image": null,
    "available": false,
    "_state": 1,
    "_modified": 1741167506,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167506,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8b4f93062656235f7000060"
  },
  {
    "name": "ခေါက်ဆွဲကြော်",
    "description": "ခေါက်ဆွဲကြော်",
    "category": [
      {
        "_model": "category",
        "_id": "f8933cbf3765626bf900033c"
      }
    ],
    "price": 3500,
    "image": null,
    "available": true,
    "_modified": 1741167569,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167564,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8bde0743562397491000222"
  },
  {
    "name": "အီကြာကွေး",
    "description": "အီကြာကွေး",
    "category": [
      {
        "_model": "category",
        "_id": "f82aa1d630396483fc00017c"
      }
    ],
    "price": 1200,
    "image": null,
    "available": false,
    "_state": 1,
    "_modified": 1741167614,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167600,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8c36a09663533cf0e00036e"
  },
  {
    "name": "Mojito",
    "description": "Mojito",
    "category": [
      {
        "_model": "category",
        "_id": "f8567891353766bb5b00015c"
      },
      {
        "_model": "category",
        "_id": "f820a5586139359c40000390"
      }
    ],
    "price": 3000,
    "image": null,
    "available": false,
    "_modified": 1741167709,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167704,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8d3327d3130656a35000384"
  },
  {
    "name": "ထောပတ်သီးဖျော်ရည်",
    "description": "ထောပတ်သီးဖျော်ရည်",
    "category": [
      {
        "_model": "category",
        "_id": "f84d66386666638ba70000e7"
      },
      {
        "_model": "category",
        "_id": "f84354d9663632626c000106"
      }
    ],
    "price": 2500,
    "image": null,
    "available": true,
    "_state": 1,
    "_modified": 1741167826,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167826,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8e5dcea36633928d2000163"
  },
  {
    "name": "မလေးရှားထမင်းကြော်",
    "description": "မလေးရှားထမင်းကြော်",
    "category": [
      {
        "_model": "category",
        "_id": "f8933cbf3765626bf900033c"
      },
      {
        "_model": "category",
        "_id": "f83bc8c83865370b500000d7"
      }
    ],
    "price": 4000,
    "image": null,
    "available": true,
    "_state": 1,
    "_modified": 1741167864,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167864,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8ebbc43623331d0fc0003d7"
  },
  {
    "name": "ကြက်သားသုပ်",
    "description": "ကြက်သားသုပ်",
    "category": [
      {
        "_model": "category",
        "_id": "f80ca6d133336312d40000e0"
      }
    ],
    "price": 6000,
    "image": null,
    "available": true,
    "_modified": 1741167899,
    "_mby": "f38a9a7337353248a30002f4",
    "_created": 1741167894,
    "_state": 1,
    "_cby": "f38a9a7337353248a30002f4",
    "_id": "f8f0493361623247c30001c8"
  }
];