import { Product, Order, Vendor, Coupon, LiveShoppingSession, User, Dispute } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_abdou',
    name: 'Abdou Gningue',
    email: 'abdou@gningue-empire.com',
    phone: '+221 77 000 00 00',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    gningueCoins: 1250,
    twoFactorEnabled: true,
    phoneVerified: true,
    referralCode: 'GNINGUE-VIP',
    referralEarnings: 45000,
    vendorId: 'vendor_gningue_official',
  },
  {
    id: 'user_moussa',
    name: 'Moussa Diop',
    email: 'moussa.tech@gmail.com',
    phone: '+221 78 123 45 67',
    role: 'vendor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gningueCoins: 420,
    twoFactorEnabled: true,
    phoneVerified: true,
    referralCode: 'MOUSSA-TECH',
    referralEarnings: 15000,
    vendorId: 'vendor_dakar_tech',
  },
  {
    id: 'user_fatou',
    name: 'Fatou Ndiaye',
    email: 'fatou.client@gmail.com',
    phone: '+221 70 987 65 43',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gningueCoins: 310,
    twoFactorEnabled: false,
    phoneVerified: true,
    referralCode: 'FATOU-ND',
    referralEarnings: 5000,
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vendor_gningue_official',
    userId: 'user_abdou',
    storeName: 'GNINGUE Direct Import & Flagship',
    storeSlug: 'gningue-flagship',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    description: 'Boutique officielle GNINGUE EMPIRE. Produits vérifiés B2B/B2C avec garantie 100% origine.',
    rating: 4.95,
    totalSales: 3420,
    grossRevenue: 48900000,
    platformFeesPaid: 489000,
    walletBalance: 12450000,
    phone: '+221 77 888 99 00',
    whatsapp: '221778889900',
    country: 'Sénégal',
    kyc: {
      status: 'verified',
      businessName: 'Gningue Empire International SARL',
      businessRegistrationNumber: 'SN-DKR-2024-B-8921',
      country: 'Sénégal',
      submittedAt: '2024-01-10',
    },
    transactions: [
      {
        id: 'tx_01',
        date: '2026-08-30',
        type: 'sale',
        amount: 350000,
        description: 'Vente 10x iPhone 15 Pro Max (Gros B2B)',
        orderId: 'ORD-9842',
        status: 'completed',
      },
      {
        id: 'tx_02',
        date: '2026-08-30',
        type: 'commission_deduction',
        amount: -3500,
        description: 'Commission Gningue 1% sur ORD-9842',
        orderId: 'ORD-9842',
        status: 'completed',
      },
      {
        id: 'tx_03',
        date: '2026-08-28',
        type: 'payout',
        amount: -500000,
        description: 'Retrait Wave Mobile Money validé',
        status: 'completed',
      }
    ]
  },
  {
    id: 'vendor_dakar_tech',
    userId: 'user_moussa',
    storeName: 'Dakar Solar & Smart Hub',
    storeSlug: 'dakar-solar',
    logo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1508873696983-2df5293cb39f?w=800&auto=format&fit=crop&q=80',
    description: 'Fournisseur direct kits solaires, batteries lithium, onduleurs hybrides et télécoms.',
    rating: 4.88,
    totalSales: 890,
    grossRevenue: 18400000,
    platformFeesPaid: 184000,
    walletBalance: 3820000,
    phone: '+221 78 123 45 67',
    whatsapp: '221781234567',
    country: 'Sénégal',
    kyc: {
      status: 'verified',
      businessName: 'Dakar Tech Solar EURL',
      country: 'Sénégal',
      submittedAt: '2024-03-15',
    },
    transactions: [
      {
        id: 'tx_dt_1',
        date: '2026-08-29',
        type: 'sale',
        amount: 850000,
        description: 'Vente Kit Solaire 5kVA Hybride',
        orderId: 'ORD-9810',
        status: 'completed',
      },
      {
        id: 'tx_dt_2',
        date: '2026-08-29',
        type: 'commission_deduction',
        amount: -8500,
        description: 'Commission Gningue 1% sur ORD-9810',
        orderId: 'ORD-9810',
        status: 'completed',
      }
    ]
  },
  {
    id: 'vendor_digital_africa',
    userId: 'user_digital',
    storeName: 'Digital Prime Subscriptions',
    storeSlug: 'digital-prime',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Comptes premium officiels, codes d’activation instantanés et licences vérifiées 100%.',
    rating: 4.97,
    totalSales: 5400,
    grossRevenue: 24500000,
    platformFeesPaid: 245000,
    walletBalance: 4120000,
    phone: '+225 07 08 09 10',
    whatsapp: '22507080910',
    country: "Côte d'Ivoire",
    kyc: {
      status: 'verified',
      businessName: 'Digital Key Global Ltd',
      country: "Côte d'Ivoire",
      submittedAt: '2024-02-20',
    },
    transactions: []
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. PHYSICAL - Smartphones & Electronics (B2B + B2C)
  {
    id: 'prod_iphone15_pro',
    title: 'Apple iPhone 15 Pro Max 256GB - Titane Naturel (Gros & Détail)',
    slug: 'iphone-15-pro-max-256gb-titane',
    category: 'physique',
    subcategory: 'smartphones',
    description: 'Le summum de la technologie Apple avec puce A17 Pro, boîtier en titane ultra-résistant et triple capteur photo 48 Mpx. Disponible à l’unité pour particuliers ou par cartons de 10/50 pièces avec tarification grossiste B2B.',
    features: [
      'Puce A17 Pro gravée en 3nm',
      'Écran Super Retina XDR 6.7" ProMotion 120Hz',
      'Boîtier en Titane aérospatial',
      'Port USB-C vitesse USB 3 (10 Gb/s)',
      'Garantie Apple Internationale 1 an + Garantie Gningue 48h'
    ],
    retailPrice: 820000, // in XOF (~1250 EUR)
    originalPrice: 890000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 4, unitPrice: 820000 },
      { minQty: 5, maxQty: 19, unitPrice: 760000 },
      { minQty: 20, unitPrice: 720000 }
    ],
    minOrderQuantity: 1,
    stock: 4,
    salesCount: 312,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-modern-smartphone-40742-large.mp4',
    rating: 4.9,
    reviewCount: 88,
    reviews: [
      {
        id: 'rev_1',
        userId: 'u_10',
        userName: 'Ibrahima Fall',
        rating: 5,
        comment: 'Reçu en 24h à Dakar Plateau! Produit authentique scellé, merci Gningue Empire pour le suivi GPS du livreur en direct.',
        verifiedPurchase: true,
        date: '2026-08-25',
        helpfulCount: 14,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-modern-smartphone-40742-large.mp4'
      }
    ],
    vendorId: 'vendor_gningue_official',
    vendorName: 'GNINGUE Direct Import & Flagship',
    vendorRating: 4.95,
    vendorVerified: true,
    vendorCountry: 'Sénégal',
    variants: [
      { id: 'var_nat_256', name: 'Titane Naturel - 256GB', sku: 'IP15PM-NAT-256', stock: 2 },
      { id: 'var_blk_256', name: 'Titane Noir - 256GB', sku: 'IP15PM-BLK-256', stock: 1 },
      { id: 'var_blu_512', name: 'Titane Bleu - 512GB', sku: 'IP15PM-BLU-512', priceModifier: 110000, stock: 1 }
    ],
    autoDeliveryInstant: false,
    stockAlertLevel: 'warning',
    predictedRuptureDays: 4,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['iphone 15 pro max', 'smartphone dakar', 'vente gros telephone senegal', 'apple original b2b'],
    weightKg: 0.5,
    featured: true,
    badge: 'Vente Flash - Gros & Détail'
  },

  // 2. PHYSICAL - Solar & Energy (B2B Alibaba style)
  {
    id: 'prod_solar_inverter_5kva',
    title: 'Onduleur Hybride Solaire 5.5kVA 48V MPPT 100A + Wifi Smart (Import Usine)',
    slug: 'onduleur-hybride-solaire-5kva-48v',
    category: 'physique',
    subcategory: 'solaire_energie',
    description: 'Onduleur haute fréquence pur sinus idéal pour maisons, commerces et forages agricoles. Compatible batteries Lithium LiFePO4 et Plomb-Gel. Surveillance mobile en temps réel par Wifi. Prix direct fabricant.',
    features: [
      'Puissance nominale: 5500W / 48Vdc',
      'Contrôleur MPPT haute tension 100A (120-450Vdc)',
      'Fonctionnement sans batterie possible en journée',
      'Application smartphone Wifi Smart intégrée',
      'Protection anti-surtension & foudre intégrée'
    ],
    retailPrice: 420000,
    originalPrice: 490000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 2, unitPrice: 420000 },
      { minQty: 3, maxQty: 9, unitPrice: 360000 },
      { minQty: 10, unitPrice: 310000 }
    ],
    minOrderQuantity: 1,
    stock: 15,
    salesCount: 142,
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb39f?w=800&auto=format&fit=crop&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-sunny-field-40788-large.mp4',
    rating: 4.85,
    reviewCount: 34,
    reviews: [
      {
        id: 'rev_solar_1',
        userId: 'u_solar_pro',
        userName: 'Mamadou Diop (GIE Agro-Solaire Thies)',
        rating: 5,
        comment: 'Installation effectuée sur notre ferme avicole à Thiès. Onduleur 5.5kVA très silencieux, communication Wifi impeccable. Livraison sécurisée par Gningue.',
        verifiedPurchase: true,
        date: '2026-08-20',
        helpfulCount: 28,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-sunny-field-40788-large.mp4'
      }
    ],
    vendorId: 'vendor_dakar_tech',
    vendorName: 'Dakar Solar & Smart Hub',
    vendorRating: 4.88,
    vendorVerified: true,
    vendorCountry: 'Sénégal',
    autoDeliveryInstant: false,
    stockAlertLevel: 'safe',
    predictedRuptureDays: 24,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['onduleur hybride 5kva', 'energie solaire afrique', 'batterie lithium solaire dakar', 'grossiste solaire'],
    weightKg: 12.0,
    featured: true,
    badge: 'Best-Seller B2B Solaire'
  },

  // 3. PHYSICAL - African Fashion & Sneakers
  {
    id: 'prod_boubou_royal_brode',
    title: 'Grand Boubou Royal Sénégalais 3 Pièces - Bazin Riche Getzner Brodé Or',
    slug: 'grand-boubou-royal-bazin-riche-getzner',
    category: 'physique',
    subcategory: 'mode_beaute',
    description: 'Ensemble traditionnel haut de gamme composé du grand boubou brodé main au fil d’or, tunique intérieure et pantalon assorti. Teinture artisanale brillante et finitions couturiers maîtres de Dakar.',
    features: [
      '100% Bazin Riche Original Getzner Autriche',
      'Broderie artisanale complexe motifs royaux',
      'Tenue infroissable et éclat de couleur longue durée',
      'Tailles personnalisables sur mesure ou prêt-à-porter'
    ],
    retailPrice: 165000,
    originalPrice: 210000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 4, unitPrice: 165000 },
      { minQty: 5, maxQty: 19, unitPrice: 135000 },
      { minQty: 20, unitPrice: 110000 }
    ],
    minOrderQuantity: 1,
    stock: 8,
    salesCount: 210,
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-clothes-41227-large.mp4',
    rating: 4.96,
    reviewCount: 52,
    reviews: [
      {
        id: 'rev_boubou_1',
        userId: 'u_mod_lux',
        userName: 'Awa Sow (Boutique Almadies)',
        rating: 5,
        comment: 'Qualité du bazin Getzner irréprochable et broderie royale magnifique pour notre événement Tabaski. Colis reçu scellé sous 24h.',
        verifiedPurchase: true,
        date: '2026-08-28',
        helpfulCount: 19,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-clothes-41227-large.mp4'
      }
    ],
    vendorId: 'vendor_gningue_official',
    vendorName: 'GNINGUE Direct Import & Flagship',
    vendorRating: 4.95,
    vendorVerified: true,
    vendorCountry: 'Sénégal',
    variants: [
      { id: 'b_blanc_xl', name: 'Blanc & Or - Taille XL', sku: 'BOU-WHT-XL', stock: 3 },
      { id: 'b_bleu_l', name: 'Bleu Nuit & Or - Taille L', sku: 'BOU-BLU-L', stock: 3 },
      { id: 'b_noir_xxl', name: 'Noir Ébène & Or - Taille XXL', sku: 'BOU-BLK-XXL', stock: 2 }
    ],
    autoDeliveryInstant: false,
    stockAlertLevel: 'safe',
    predictedRuptureDays: 14,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['boubou traditionnel senegalais', 'bazin riche getzner brode', 'mode africaine luxe', 'grossiste bazin'],
    weightKg: 1.8,
    featured: false,
    badge: 'Artisanat & Luxe'
  },

  // 4. DIGITAL GOODS & SUBSCRIPTIONS (Automated instant code delivery)
  {
    id: 'prod_netflix_4k_12m',
    title: 'Abonnement Netflix Premium 4K UHD - 12 Mois (Profil Privé avec Code PIN)',
    slug: 'netflix-premium-4k-12-mois',
    category: 'digital',
    subcategory: 'streaming_vod',
    description: 'Profitez de Netflix en Ultra HD 4K sur votre TV, PC, smartphone ou tablette. Profil 100% privé verrouillé par code PIN personnel. Livraison instantanée par SMS / Email / Espace Client dès validation du paiement.',
    features: [
      'Qualité Ultra Haute Définition 4K HDR & Dolby Atmos',
      'Garantie remplacement 12 mois sans coupure',
      'Fonctionne dans tous les pays sans VPN',
      'Livraison automatique du compte et code PIN en 5 secondes'
    ],
    retailPrice: 24500, // in XOF (~37 EUR/year)
    originalPrice: 48000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 4, unitPrice: 24500 },
      { minQty: 5, maxQty: 19, unitPrice: 19500 },
      { minQty: 20, unitPrice: 16000 }
    ],
    minOrderQuantity: 1,
    stock: 95,
    salesCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    rating: 4.98,
    reviewCount: 320,
    reviews: [],
    vendorId: 'vendor_digital_africa',
    vendorName: 'Digital Prime Subscriptions',
    vendorRating: 4.97,
    vendorVerified: true,
    vendorCountry: "Côte d'Ivoire",
    autoDeliveryInstant: true,
    digitalCodeSample: 'NFLX-PREM-4K-2026-X89104 | PIN: 8941 | User: GningueVIP_04',
    stockAlertLevel: 'safe',
    predictedRuptureDays: 45,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['netflix pas cher senegal', 'abonnement netflix 12 mois', 'netflix 4k wave orange money', 'iptv streaming'],
    featured: true,
    badge: 'Livraison Instantanée ⚡'
  },

  // 5. DIGITAL - IPTV 12 Months
  {
    id: 'prod_iptv_smarters_pro',
    title: 'Abonnement IPTV Smarters Pro 4K - 12 Mois (25.000+ Chaînes & VOD VFQ)',
    slug: 'iptv-smarters-pro-4k-12-mois',
    category: 'digital',
    subcategory: 'streaming_vod',
    description: 'Accédez à toutes les chaînes sportives mondiales (Ligue des Champions, Premier League, CAN, NBA), Canal+, BeIN Sports, cinéma illimité et séries à jour. Serveurs ultra-stables anti-freeze 99.9% uptime.',
    features: [
      '25 000+ Chaînes direct en 4K/FHD/HD + Replay 7 jours',
      '60 000+ Films et Séries VOD mis à jour quotidiennement',
      'Compatible Smart TV Samsung/LG, Android TV, FireStick, iPhone, PC',
      'Livraison des codes M3U / Xtream Codes instantanée'
    ],
    retailPrice: 18000,
    originalPrice: 35000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 4, unitPrice: 18000 },
      { minQty: 5, maxQty: 19, unitPrice: 13500 },
      { minQty: 20, unitPrice: 10000 }
    ],
    minOrderQuantity: 1,
    stock: 120,
    salesCount: 2400,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.92,
    reviewCount: 410,
    reviews: [],
    vendorId: 'vendor_digital_africa',
    vendorName: 'Digital Prime Subscriptions',
    vendorRating: 4.97,
    vendorVerified: true,
    vendorCountry: "Côte d'Ivoire",
    autoDeliveryInstant: true,
    digitalCodeSample: 'URL: http://iptv.gningue-empire.live:8080 | User: gningue_iptv_99 | Pass: Gold2026Secure',
    stockAlertLevel: 'safe',
    predictedRuptureDays: 60,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['iptv afrique', 'iptv 12 mois canal bein sport', 'iptv stable anti freeze', 'xtream iptv wave'],
    featured: true,
    badge: 'Top Vente Streaming'
  },

  // 6. DIGITAL - Canva Pro Lifetime & Office 365
  {
    id: 'prod_canva_pro_lifetime',
    title: 'Canva Pro Éducation / Entreprise - Accès Illimité à Vie (Invitation Directe)',
    slug: 'canva-pro-lifetime-acces',
    category: 'digital',
    subcategory: 'logiciels_outils',
    description: 'Activez Canva Pro sur votre propre adresse email! Accédez à 100+ millions de photos, modèles premium, outils IA Magic Studio, suppressions d’arrière-plan et redimensionnement magique.',
    features: [
      'Activation directe sur votre compte email existant',
      '100M+ éléments graphiques, photos, vidéos et polices pro',
      'Outils IA complets (Magic Eraser, Magic Write, Animations Pro)',
      'Garantie et support technique à vie'
    ],
    retailPrice: 7500,
    originalPrice: 25000,
    b2bAvailable: true,
    bulkPricing: [
      { minQty: 1, maxQty: 4, unitPrice: 7500 },
      { minQty: 5, maxQty: 19, unitPrice: 5000 },
      { minQty: 20, unitPrice: 3500 }
    ],
    minOrderQuantity: 1,
    stock: 250,
    salesCount: 3100,
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.99,
    reviewCount: 520,
    reviews: [],
    vendorId: 'vendor_digital_africa',
    vendorName: 'Digital Prime Subscriptions',
    vendorRating: 4.97,
    vendorVerified: true,
    vendorCountry: "Côte d'Ivoire",
    autoDeliveryInstant: true,
    digitalCodeSample: 'Lien d’invitation d’équipe: https://www.canva.com/brand/join?token=GNINGUE_PRO_VIP_TEAM_2026',
    stockAlertLevel: 'safe',
    predictedRuptureDays: 90,
    allowPreorderWhenOutOfStock: true,
    seoTags: ['canva pro pas cher', 'canva pro a vie senegal', 'licence canva pro wave om', 'graphisme outils'],
    featured: true,
    badge: 'Prix Choc ⚡'
  },

  // 7. DIGITAL SERVICES - Turnkey Shopify Store / E-commerce Site
  {
    id: 'prod_service_shopify_store',
    title: 'Boutique E-commerce Shopify Clé en Main - Prête à Vendre en 48h (Mode & High-Tech)',
    slug: 'boutique-shopify-cle-en-main-prete',
    category: 'service',
    subcategory: 'sites_web_shopify',
    description: 'Recevez une boutique Shopify ultra professionnelle, configurée avec vos moyens de paiement locaux (Wave, Orange Money, Stripe, PayPal), 20 produits gagnants importés, logo sur mesure et vidéos publicitaires prêtes.',
    features: [
      'Thème Premium optimisé pour mobile (taux de conversion > 3.8%)',
      'Passerelles Wave, Orange Money et Cartes bancaires intégrées',
      'Pack de 20 produits sourcés avec fournisseurs fiables',
      'Guide vidéo de prise en main de 45 minutes + 30 jours de support VIP'
    ],
    retailPrice: 95000,
    originalPrice: 180000,
    b2bAvailable: false,
    minOrderQuantity: 1,
    stock: 10,
    salesCount: 84,
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.94,
    reviewCount: 29,
    reviews: [],
    vendorId: 'vendor_gningue_official',
    vendorName: 'GNINGUE Direct Import & Flagship',
    vendorRating: 4.95,
    vendorVerified: true,
    vendorCountry: 'Sénégal',
    autoDeliveryInstant: false,
    serviceTurnaroundDays: 2,
    demoUrl: 'https://demo-fashion-africa.gningue-preview.com',
    serviceDeliverables: [
      'Accès Administrateur propriétaire complet à la boutique Shopify',
      'Fichiers sources logos et visuels HD (Figma / PNG / SVG)',
      'Stratégie de lancement Facebook & TikTok Ads offerte'
    ],
    stockAlertLevel: 'safe',
    predictedRuptureDays: 30,
    seoTags: ['creation boutique shopify dakar', 'site ecommerce cle en main senegal', 'dropshipping afrique wave', 'agence web'],
    featured: true,
    badge: 'Service Clé en Main'
  },

  // 8. DIGITAL SERVICES - Branding & Logo Design
  {
    id: 'prod_service_branding_logo',
    title: 'Création Identité Visuelle Complète & Logo 3D Luxe pour Entreprise Africaine',
    slug: 'creation-logo-identite-visuelle-luxe',
    category: 'service',
    subcategory: 'branding_logos',
    description: 'Donnez à votre marque une stature internationale. Création de 3 propositions de logos originaux, charte graphique complète, maquette de cartes de visite, papiers entêtes et templates réseaux sociaux.',
    features: [
      '3 Concepts créatifs uniques livrés sous 24h',
      'Révisions illimitées jusqu’à satisfaction totale',
      'Tous formats vectoriels HD (AI, EPS, SVG, PNG transparent, PDF)',
      'Droits de propriété intellectuelle 100% cédés'
    ],
    retailPrice: 35000,
    originalPrice: 65000,
    b2bAvailable: false,
    minOrderQuantity: 1,
    stock: 20,
    salesCount: 165,
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.96,
    reviewCount: 48,
    reviews: [],
    vendorId: 'vendor_gningue_official',
    vendorName: 'GNINGUE Direct Import & Flagship',
    vendorRating: 4.95,
    vendorVerified: true,
    vendorCountry: 'Sénégal',
    autoDeliveryInstant: false,
    serviceTurnaroundDays: 1,
    demoUrl: 'https://behance.net/gningue-design-portfolio',
    serviceDeliverables: [
      'Pack Logo Vectoriel (3D + Plat + Monogramme)',
      'Guide de style Charte Graphique PDF 15 pages',
      'Templates de posts Instagram et bannières LinkedIn'
    ],
    stockAlertLevel: 'safe',
    predictedRuptureDays: 30,
    seoTags: ['creation logo dakar', 'design graphique senegal', 'charte graphique entreprise', 'branding afrique'],
    featured: false,
    badge: 'Livraison 24h'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'GN-2026-9842',
    buyerId: 'user_fatou',
    buyerName: 'Fatou Ndiaye',
    buyerEmail: 'fatou.client@gmail.com',
    buyerPhone: '+221 70 987 65 43',
    items: [
      {
        productId: 'prod_netflix_4k_12m',
        productTitle: 'Abonnement Netflix Premium 4K UHD - 12 Mois',
        productImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&auto=format&fit=crop&q=80',
        category: 'digital',
        quantity: 1,
        unitPrice: 24500,
        totalPrice: 24500,
        digitalCodes: ['NFLX-PREM-4K-2026-X89104 | PIN: 8941 | User: GningueVIP_04']
      },
      {
        productId: 'prod_canva_pro_lifetime',
        productTitle: 'Canva Pro Éducation / Entreprise - Accès Illimité à Vie',
        productImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&auto=format&fit=crop&q=80',
        category: 'digital',
        quantity: 1,
        unitPrice: 7500,
        totalPrice: 7500,
        digitalCodes: ['https://www.canva.com/brand/join?token=GNINGUE_PRO_VIP_TEAM_2026']
      }
    ],
    subtotal: 32000,
    shippingFee: 0, // digital instant
    packageInsuranceFee: 640, // 2%
    discountAmount: 0,
    loyaltyPointsUsed: 0,
    totalAmount: 32640,
    platformCommission1Percent: 320, // 1% cut for Admin
    vendorNetTotal: 31680,
    paymentMethod: 'wave',
    paymentStatus: 'paid',
    status: 'delivered',
    createdAt: '2026-08-31T14:20:00Z',
    deliveryAddress: {
      street: 'Almadies Zone 2, Villa 45B',
      city: 'Dakar',
      country: 'Sénégal',
      latitude: 14.7431,
      longitude: -17.5144,
      notes: 'Livraison numérique immédiate transmise par SMS et espace client.'
    },
    tracking: {
      courierName: 'Système Automatique GNINGUE Express Cloud',
      courierPhone: '+221 77 000 00 00',
      estimatedDelivery: 'Instantané (0 minute)',
      currentLocation: { lat: 14.7431, lng: -17.5144, address: 'Dakar Digital Hub' },
      history: [
        { status: 'pending', timestamp: '14:20:01', label: 'Paiement Wave Confirmé', description: 'Transaction Wave validée avec succès.' },
        { status: 'packed', timestamp: '14:20:03', label: 'Codes Numériques Générés', description: 'Licences sécurisées assignées à l’acheteur.' },
        { status: 'shipped', timestamp: '14:20:04', label: 'Envoi SMS & Email', description: 'Identifiants envoyés au +221 70 987 65 43.' },
        { status: 'delivered', timestamp: '14:20:05', label: 'Livraison Confirmée', description: 'Garantie Gningue Escrow 48h active.' }
      ]
    },
    escrowReleaseDate: '2026-09-02T14:20:00Z',
    escrowStatus: 'held'
  },
  {
    id: 'ord_1002',
    orderNumber: 'GN-2026-9843',
    buyerId: 'user_moussa',
    buyerName: 'Moussa Diop',
    buyerEmail: 'moussa.tech@gmail.com',
    buyerPhone: '+221 78 123 45 67',
    items: [
      {
        productId: 'prod_iphone15_pro',
        productTitle: 'Apple iPhone 15 Pro Max 256GB - Titane Naturel',
        productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
        category: 'physique',
        quantity: 1,
        unitPrice: 820000,
        totalPrice: 820000,
        variantName: 'Titane Naturel - 256GB'
      }
    ],
    subtotal: 820000,
    shippingFee: 2500,
    packageInsuranceFee: 16400, // 2%
    discountAmount: 10000, // promo code
    loyaltyPointsUsed: 500,
    totalAmount: 828400,
    platformCommission1Percent: 8200, // 1% admin commission
    vendorNetTotal: 811800,
    paymentMethod: 'orange_money',
    paymentStatus: 'paid',
    status: 'out_for_delivery',
    createdAt: '2026-08-31T09:15:00Z',
    deliveryAddress: {
      street: 'Sacré Cœur 3, Immeuble Horizon 3e étage',
      city: 'Dakar',
      country: 'Sénégal',
      latitude: 14.7167,
      longitude: -17.4677,
      notes: 'Appeler à l’arrivée devant la pharmacie.'
    },
    tracking: {
      courierName: 'Livreur Modou Ndiaye (Gningue Express Moto 04)',
      courierPhone: '+221 77 444 33 22',
      estimatedDelivery: 'Aujourd’hui à 16:30 (Dans 25 min)',
      currentLocation: { lat: 14.7190, lng: -17.4620, address: 'En route vers Sacré Cœur 3' },
      history: [
        { status: 'pending', timestamp: '09:15', label: 'Commande Reçue', description: 'Paiement Orange Money 828.400 F vérifié.' },
        { status: 'packed', timestamp: '10:30', label: 'Colis Emballé & Scellé', description: 'Emballage sécurisé avec étiquette antivol.' },
        { status: 'shipped', timestamp: '13:00', label: 'Pris en charge par le Hub Logistique', description: 'Colis confié à Modou Ndiaye.' },
        { status: 'out_for_delivery', timestamp: '15:45', label: 'En cours de livraison finale', description: 'Livreur en approche à 1.4 km de votre position.' }
      ]
    },
    escrowReleaseDate: '2026-09-02T16:30:00Z',
    escrowStatus: 'held'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'RAPPEL5',
    discountType: 'percentage',
    discountValue: 5,
    description: '5% de réduction exclusive offerte suite au rappel de panier',
    expiresAt: '2026-12-31'
  },
  {
    code: 'EMPIRE2026',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 20000,
    description: '10% de réduction immédiate sur tout le catalogue GNINGUE EMPIRE',
    expiresAt: '2026-12-31'
  },
  {
    code: 'WELCOME500',
    discountType: 'fixed',
    discountValue: 5000,
    minOrderAmount: 30000,
    description: '5.000 F CFA offerts pour les nouveaux clients enregistrés',
    expiresAt: '2026-12-31'
  },
  {
    code: 'AFRIKAGRO',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 200000,
    description: '15% de réduction B2B pour les commandes en gros > 200.000 F',
    expiresAt: '2026-12-31'
  }
];

export const INITIAL_LIVE_SESSIONS: LiveShoppingSession[] = [
  {
    id: 'live_01',
    title: '🔥 GRANDE VENTE FLASH B2B & HIGH-TECH : -30% EN DIRECT !',
    hostName: 'Fatou & Abdou Gningue',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    viewerCount: 1420,
    isLive: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-42861-large.mp4',
    category: 'High-Tech & B2B',
    products: [
      {
        product: INITIAL_PRODUCTS[0], // iPhone 15 Pro Max
        flashPrice: 749000,
        stockLeft: 3
      },
      {
        product: INITIAL_PRODUCTS[3], // Netflix 4K
        flashPrice: 19900,
        stockLeft: 25
      }
    ],
    chatMessages: [
      { id: 'cm_1', sender: 'Mamadou Kane', text: 'Est-ce que la livraison est possible à Thiès aujourd’hui?', timestamp: '15:42' },
      { id: 'cm_2', sender: 'Gningue Modérateur', text: 'Oui Mamadou ! Expédition rapide garantie dans toutes les régions du Sénégal 🇸🇳', timestamp: '15:43', isVendor: true },
      { id: 'cm_3', sender: 'Aïssatou Diallo', text: 'Je viens de commander le Netflix 4K par Wave, j’ai reçu le code en 3 secondes 🚀', timestamp: '15:44' },
      { id: 'cm_4', sender: 'Serigne Fall', text: 'Combien le prix par carton de 20 iPhone?', timestamp: '15:45' }
    ]
  }
];

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'disp_01',
    orderId: 'ord_mock_prev',
    orderNumber: 'GN-2026-8711',
    buyerName: 'Cheikh Sarr',
    vendorName: 'Dakar Solar & Smart Hub',
    reason: 'Câble manquant dans le kit solaire',
    description: 'Le kit 5kVA fonctionne parfaitement mais il manquait le câble de communication RS485 dans le carton.',
    status: 'under_review',
    createdAt: '2026-08-30',
    amount: 15000,
    evidenceImages: ['https://images.unsplash.com/photo-1508873696983-2df5293cb39f?w=400&auto=format&fit=crop&q=80']
  }
];

export const CURRENCY_RATES = {
  XOF: 1,
  EUR: 0.001524, // 1 EUR = 655.957 XOF
  USD: 0.001666  // 1 USD ~ 600 XOF
};

export const CURRENCY_SYMBOLS = {
  XOF: 'F CFA',
  EUR: '€',
  USD: '$'
};
