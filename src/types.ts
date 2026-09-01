export type ProductCategory = 'physique' | 'digital' | 'service';

export type ProductSubcategory = 
  | 'smartphones' 
  | 'electronique' 
  | 'mode_beaute' 
  | 'solaire_energie' 
  | 'agro_alimentaire' 
  | 'maison_bureau'
  | 'streaming_vod' 
  | 'logiciels_outils' 
  | 'gaming' 
  | 'vpn_securite' 
  | 'bureautique'
  | 'sites_web_shopify' 
  | 'templates_code' 
  | 'branding_logos' 
  | 'marketing_digital';

export interface BulkPriceTier {
  minQty: number;
  maxQty?: number;
  unitPrice: number; // in base currency XOF
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Couleur: Noir", "Taille: XL", "Durée: 12 Mois"
  sku: string;
  priceModifier?: number;
  stock: number;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
  videoUrl?: string;
  images?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  description: string;
  features: string[];
  retailPrice: number; // in XOF
  originalPrice?: number;
  b2bAvailable: boolean;
  bulkPricing?: BulkPriceTier[];
  minOrderQuantity: number;
  stock: number;
  salesCount: number;
  images: string[];
  videoPreviewUrl?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  vendorVerified: boolean;
  vendorCountry: string;
  variants?: ProductVariant[];
  
  // Specific to Digital goods
  digitalCodeSample?: string;
  autoDeliveryInstant: boolean;
  
  // Specific to Services
  serviceTurnaroundDays?: number;
  demoUrl?: string;
  serviceDeliverables?: string[];
  
  // Predictive & AI metadata
  stockAlertLevel?: 'safe' | 'warning' | 'critical';
  predictedRuptureDays?: number;
  allowPreorderWhenOutOfStock?: boolean;
  seoTags: string[];
  weightKg?: number;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'pending' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'disputed' | 'refunded';

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  category: ProductCategory;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantName?: string;
  digitalCodes?: string[];
  serviceDemoAccess?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  packageInsuranceFee: number;
  discountAmount: number;
  loyaltyPointsUsed: number;
  totalAmount: number;
  platformCommission1Percent: number; // Admin 1% cut
  vendorNetTotal: number;
  paymentMethod: 'wave' | 'orange_money' | 'mtn_momo' | 'stripe_card' | 'paypal' | 'crypto_usdt';
  paymentStatus: 'paid' | 'pending' | 'failed';
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: {
    street: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    notes?: string;
  };
  tracking: {
    courierName: string;
    courierPhone: string;
    estimatedDelivery: string;
    currentLocation?: { lat: number; lng: number; address: string };
    history: {
      status: OrderStatus;
      timestamp: string;
      label: string;
      description: string;
    }[];
  };
  escrowReleaseDate: string; // 48h after delivery
  escrowStatus: 'held' | 'released' | 'disputed';
}

export interface VendorKYC {
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  idCardUrl?: string;
  selfieUrl?: string;
  businessName: string;
  businessRegistrationNumber?: string;
  country: string;
  submittedAt?: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'sale' | 'commission_deduction' | 'payout' | 'escrow_hold' | 'escrow_release' | 'bonus';
  amount: number;
  description: string;
  orderId?: string;
  status: 'completed' | 'pending';
}

export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  logo: string;
  banner: string;
  description: string;
  rating: number;
  totalSales: number;
  grossRevenue: number;
  platformFeesPaid: number;
  walletBalance: number;
  kyc: VendorKYC;
  phone: string;
  whatsapp: string;
  transactions: WalletTransaction[];
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'vendor' | 'superadmin';
  avatar?: string;
  gningueCoins: number; // Loyalty points
  twoFactorEnabled: boolean;
  phoneVerified: boolean;
  referralCode: string;
  referralEarnings: number;
  vendorId?: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  orderNumber: string;
  buyerName: string;
  vendorName: string;
  reason: string;
  description: string;
  status: 'opened' | 'under_review' | 'resolved_buyer_refund' | 'resolved_vendor_paid';
  createdAt: string;
  amount: number;
  evidenceImages?: string[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 2000 for 2000 XOF
  minOrderAmount?: number;
  description: string;
  expiresAt: string;
}

export interface LiveProduct {
  product: Product;
  flashPrice: number;
  stockLeft: number;
}

export interface LiveShoppingSession {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  viewerCount: number;
  isLive: boolean;
  videoUrl: string;
  category: string;
  products: LiveProduct[];
  chatMessages: {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
    isVendor?: boolean;
  }[];
}

export type Currency = 'XOF' | 'EUR' | 'USD';
export type Language = 'FR' | 'EN' | 'WO';
