import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Vendor, 
  User, 
  Dispute, 
  Coupon, 
  LiveShoppingSession, 
  Currency, 
  Language, 
  ProductCategory,
  ProductVariant,
  Review
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_VENDORS, 
  INITIAL_USERS, 
  INITIAL_COUPONS, 
  INITIAL_LIVE_SESSIONS, 
  INITIAL_DISPUTES,
  CURRENCY_RATES,
  CURRENCY_SYMBOLS
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Products & Categories
  products: Product[];
  activeCategory: ProductCategory | 'all';
  setActiveCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (sub: string | null) => void;
  b2bOnlyFilter: boolean;
  setB2bOnlyFilter: (val: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Active View & Modals
  activeView: 'home' | 'b2b_wholesale' | 'digital_hub' | 'services' | 'vendor_dashboard' | 'admin_dashboard' | 'orders' | 'live_shopping' | 'wishlist' | 'compare';
  setActiveView: (view: any) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (prod: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeOrderToTrack: Order | null;
  setActiveOrderToTrack: (order: Order | null) => void;
  
  // Cart & Calculations
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  packageInsurance: boolean;
  setPackageInsurance: (val: boolean) => void;
  packageInsuranceFee: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  couponDiscountAmount: number;
  coinsToUse: number;
  setCoinsToUse: (coins: number) => void;
  coinsDiscountAmount: number;
  cartTotal: number;

  // Currency & Language
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  formatPrice: (amountInXof: number) => string;

  // Users & Auth
  currentUser: User;
  switchUserRole: (role: 'buyer' | 'vendor' | 'superadmin') => void;
  updateUserCoins: (amount: number) => void;

  // Vendors & Orders
  vendors: Vendor[];
  currentVendor: Vendor | null;
  vendorWallet: {
    availableBalance: number;
    escrowBalance: number;
    totalEarnings: number;
  };
  withdrawVendorFunds: (amount: number, method: string, phone: string) => boolean;
  adminCommissionRate: number;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: any) => void;
  requestVendorWithdrawal: (vendorId: string, amount: number, method: string) => boolean;
  submitVendorKyc: (vendorId: string, data: any) => void;

  // Wishlist & Comparison
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;

  // Live Shopping & Disputes
  liveSessions: LiveShoppingSession[];
  activeLiveSession: LiveShoppingSession | null;
  setActiveLiveSession: (session: LiveShoppingSession | null) => void;
  disputes: Dispute[];
  createDispute: (data: Partial<Dispute>) => void;
  resolveDispute: (disputeId: string, resolution: 'refund' | 'pay_vendor') => void;

  // Reviews & Video Proofs
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  likeReview: (productId: string, reviewId: string) => void;

  // Toast & Push Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Abandoned Cart Push Reminders
  cartReminderNotification: {
    isOpen: boolean;
    triggerReason: 'exit_intent' | 'tab_switch' | 'drawer_close' | 'manual_test' | 'inactivity';
    timestamp?: number;
  } | null;
  triggerCartReminder: (reason?: 'exit_intent' | 'tab_switch' | 'drawer_close' | 'manual_test' | 'inactivity') => void;
  dismissCartReminder: () => void;
  cartReminderEnabled: boolean;
  setCartReminderEnabled: (enabled: boolean) => void;
  requestPushNotificationPermission: () => Promise<string>;
  pushPermissionStatus: 'default' | 'granted' | 'denied' | 'unsupported';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gningue_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gningue_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [liveSessions, setLiveSessions] = useState<LiveShoppingSession[]>(INITIAL_LIVE_SESSIONS);

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [b2bOnlyFilter, setB2bOnlyFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeView, setActiveView] = useState<'home' | 'b2b_wholesale' | 'digital_hub' | 'services' | 'vendor_dashboard' | 'admin_dashboard' | 'orders' | 'live_shopping' | 'wishlist' | 'compare'>('home');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(null);
  const [activeLiveSession, setActiveLiveSession] = useState<LiveShoppingSession | null>(INITIAL_LIVE_SESSIONS[0]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [packageInsurance, setPackageInsurance] = useState<boolean>(true);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [coinsToUse, setCoinsToUse] = useState<number>(0);

  // Currency & Language
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [language, setLanguage] = useState<Language>('FR');

  // User
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // default Abdou (superadmin / buyer / vendor)
  const currentVendor = vendors.find(v => v.id === currentUser.vendorId) || vendors[0];

  // Wishlist & Compare
  const [wishlist, setWishlist] = useState<string[]>(['prod_iphone15_pro', 'prod_netflix_4k_12m']);
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Abandoned Cart Push Reminders
  const [cartReminderNotification, setCartReminderNotification] = useState<{
    isOpen: boolean;
    triggerReason: 'exit_intent' | 'tab_switch' | 'drawer_close' | 'manual_test' | 'inactivity';
    timestamp?: number;
  } | null>(null);
  const [cartReminderEnabled, setCartReminderEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('gningue_cart_reminder_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [pushPermissionStatus, setPushPermissionStatus] = useState<'default' | 'granted' | 'denied' | 'unsupported'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission as 'default' | 'granted' | 'denied';
    }
    return 'unsupported';
  });

  const lastReminderTriggerRef = useRef<number>(0);

  // Sound chime helper
  const playPushNotificationChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const requestPushNotificationPermission = async (): Promise<string> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPushPermissionStatus('unsupported');
      return 'unsupported';
    }
    try {
      const result = await Notification.requestPermission();
      setPushPermissionStatus(result as any);
      if (result === 'granted') {
        showToast("Notifications push activées avec succès !");
      }
      return result;
    } catch {
      return 'denied';
    }
  };

  const triggerCartReminder = (reason: 'exit_intent' | 'tab_switch' | 'drawer_close' | 'manual_test' | 'inactivity' = 'manual_test') => {
    if (cart.length === 0) return;
    if (!cartReminderEnabled && reason !== 'manual_test') return;

    // Cooldown check for automatic triggers (prevent spamming within 25 seconds)
    const now = Date.now();
    if (reason !== 'manual_test' && now - lastReminderTriggerRef.current < 25000) {
      return;
    }
    lastReminderTriggerRef.current = now;

    // Play chime sound
    playPushNotificationChime();

    // Set state for simulated floating push UI
    setCartReminderNotification({
      isOpen: true,
      triggerReason: reason,
      timestamp: now
    });

    // Fire browser native push notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        const totalFormatted = `${Math.round(cart.reduce((s, i) => s + i.totalPrice, 0)).toLocaleString('fr-FR')} FCFA`;
        const count = cart.reduce((s, i) => s + i.quantity, 0);
        new Notification("🛒 Vous avez oublié vos articles !", {
          body: `Votre panier (${count} article${count > 1 ? 's' : ''} • ${totalFormatted}) vous attend chez Gningue Empire. Bénéficiez de -5% avec le code RAPPEL5 !`,
          icon: cart[0]?.product.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'
        });
      } catch {
        // notification suppressed in iframe
      }
    }
  };

  const dismissCartReminder = () => {
    setCartReminderNotification(null);
  };

  // Sync preference
  useEffect(() => {
    localStorage.setItem('gningue_cart_reminder_enabled', String(cartReminderEnabled));
  }, [cartReminderEnabled]);

  // Tab switch & Exit Intent Listeners
  useEffect(() => {
    if (!cartReminderEnabled || cart.length === 0) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab with items in cart -> arm reminder
        triggerCartReminder('tab_switch');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // User mouse moves out towards the top of window (closing tab or changing URL)
      if (e.clientY <= 8 && cart.length > 0 && !isCartOpen) {
        triggerCartReminder('exit_intent');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cart, cartReminderEnabled, isCartOpen]);

  // Sync products to local storage
  useEffect(() => {
    localStorage.setItem('gningue_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gningue_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const formatPrice = (amountInXof: number) => {
    const rate = CURRENCY_RATES[currency];
    const converted = amountInXof * rate;
    const symbol = CURRENCY_SYMBOLS[currency];
    
    if (currency === 'XOF') {
      return `${Math.round(converted).toLocaleString('fr-FR')} ${symbol}`;
    }
    return `${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
  };

  const switchUserRole = (role: 'buyer' | 'vendor' | 'superadmin') => {
    if (role === 'superadmin') {
      setCurrentUser(INITIAL_USERS[0]);
      showToast("Connecté en tant que Super Administrateur Gningue Empire");
    } else if (role === 'vendor') {
      setCurrentUser(INITIAL_USERS[1]);
      showToast("Connecté en tant que Vendeur Officiel (Dakar Tech / Gningue)");
    } else {
      setCurrentUser(INITIAL_USERS[2]);
      showToast("Connecté en tant que Client Particulier (Fatou Ndiaye)");
    }
  };

  const updateUserCoins = (amount: number) => {
    setCurrentUser(prev => ({
      ...prev,
      gningueCoins: Math.max(0, prev.gningueCoins + amount)
    }));
  };

  // Cart calculations with B2B wholesale tiers auto-discount
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedVariant?.id === variant?.id
      );

      const targetQty = existingIndex >= 0 ? prev[existingIndex].quantity + quantity : quantity;
      
      // Calculate unit price according to B2B bulk tier if available
      let calculatedUnitPrice = product.retailPrice;
      if (product.b2bAvailable && product.bulkPricing && product.bulkPricing.length > 0) {
        for (const tier of product.bulkPricing) {
          if (targetQty >= tier.minQty && (!tier.maxQty || targetQty <= tier.maxQty)) {
            calculatedUnitPrice = tier.unitPrice;
          }
        }
      }

      if (variant?.priceModifier) {
        calculatedUnitPrice += variant.priceModifier;
      }

      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: targetQty,
          unitPrice: calculatedUnitPrice,
          totalPrice: calculatedUnitPrice * targetQty,
          selectedVariant: variant || newCart[existingIndex].selectedVariant
        };
        return newCart;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: targetQty,
            unitPrice: calculatedUnitPrice,
            totalPrice: calculatedUnitPrice * targetQty,
            selectedVariant: variant
          }
        ];
      }
    });

    showToast(`Ajouté au panier: ${product.title.slice(0, 30)}...`);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedVariant?.id === variantId)));
    showToast("Article retiré du panier");
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedVariant?.id === variantId) {
        let calculatedUnitPrice = item.product.retailPrice;
        if (item.product.b2bAvailable && item.product.bulkPricing) {
          for (const tier of item.product.bulkPricing) {
            if (quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)) {
              calculatedUnitPrice = tier.unitPrice;
            }
          }
        }
        if (item.selectedVariant?.priceModifier) {
          calculatedUnitPrice += item.selectedVariant.priceModifier;
        }

        return {
          ...item,
          quantity,
          unitPrice: calculatedUnitPrice,
          totalPrice: calculatedUnitPrice * quantity
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCoinsToUse(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const packageInsuranceFee = packageInsurance && cartSubtotal > 0 ? Math.round(cartSubtotal * 0.02) : 0;

  const applyCoupon = (code: string) => {
    const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: "Code promo invalide ou expiré." };
    }
    if (coupon.minOrderAmount && cartSubtotal < coupon.minOrderAmount) {
      return { success: false, message: `Montant minimum requis de ${formatPrice(coupon.minOrderAmount)} pour ce coupon.` };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Code promo ${coupon.code} appliqué avec succès !` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const couponDiscountAmount = appliedCoupon 
    ? (appliedCoupon.discountType === 'percentage' ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100) : appliedCoupon.discountValue)
    : 0;

  // 1 Gningue Coin = 10 XOF discount
  const coinsDiscountAmount = Math.min(cartSubtotal - couponDiscountAmount, coinsToUse * 10);

  const cartTotal = Math.max(0, cartSubtotal + packageInsuranceFee - couponDiscountAmount - coinsDiscountAmount);

  // Orders & 1% Commission automation
  const createOrder = (orderData: Partial<Order>): Order => {
    const subtotal = orderData.subtotal || cartSubtotal;
    const commission1Percent = Math.round(subtotal * 0.01); // Gningue 1% automated cut
    const vendorNet = subtotal - commission1Percent;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `GN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerId: currentUser.id,
      buyerName: orderData.buyerName || currentUser.name,
      buyerEmail: orderData.buyerEmail || currentUser.email,
      buyerPhone: orderData.buyerPhone || currentUser.phone,
      items: orderData.items || cart.map(i => ({
        productId: i.product.id,
        productTitle: i.product.title,
        productImage: i.product.images[0],
        category: i.product.category,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.totalPrice,
        variantName: i.selectedVariant?.name,
        digitalCodes: i.product.category === 'digital' ? [i.product.digitalCodeSample || `GNINGUE-AUTO-${Date.now().toString().slice(-6)}`] : undefined,
        serviceDemoAccess: i.product.demoUrl
      })),
      subtotal: subtotal,
      shippingFee: orderData.shippingFee || 0,
      packageInsuranceFee: orderData.packageInsuranceFee || packageInsuranceFee,
      discountAmount: couponDiscountAmount,
      loyaltyPointsUsed: coinsToUse,
      totalAmount: orderData.totalAmount || cartTotal,
      platformCommission1Percent: commission1Percent,
      vendorNetTotal: vendorNet,
      paymentMethod: orderData.paymentMethod || 'wave',
      paymentStatus: 'paid',
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress: orderData.deliveryAddress || {
        street: 'Dakar Plateau / Almadies',
        city: 'Dakar',
        country: 'Sénégal',
        latitude: 14.7167,
        longitude: -17.4677
      },
      tracking: {
        courierName: 'Livreur Express Gningue Network',
        courierPhone: '+221 77 000 00 00',
        estimatedDelivery: '24h - 48h',
        currentLocation: { lat: 14.7167, lng: -17.4677, address: 'Hub Central Logistique Dakar' },
        history: [
          {
            status: 'pending',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            label: 'Commande Reçue & Paiement Confirmé',
            description: `Paiement sécurisé via ${orderData.paymentMethod || 'Wave'}. Escrow 48h engagé.`
          }
        ]
      },
      escrowReleaseDate: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      escrowStatus: 'held'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Give Gningue coins to buyer (1 coin per 1000 XOF)
    const earnedCoins = Math.floor(newOrder.totalAmount / 1000);
    updateUserCoins(earnedCoins);

    // Update vendor wallet
    setVendors(prev => prev.map(v => {
      if (v.id === 'vendor_gningue_official' || v.id === currentVendor?.id) {
        return {
          ...v,
          grossRevenue: v.grossRevenue + subtotal,
          platformFeesPaid: v.platformFeesPaid + commission1Percent,
          walletBalance: v.walletBalance + vendorNet,
          totalSales: v.totalSales + 1,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              type: 'sale',
              amount: subtotal,
              description: `Vente commande ${newOrder.orderNumber}`,
              orderId: newOrder.orderNumber,
              status: 'completed'
            },
            {
              id: `tx_comm_${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              type: 'commission_deduction',
              amount: -commission1Percent,
              description: `Frais plateforme Gningue 1% sur ${newOrder.orderNumber}`,
              orderId: newOrder.orderNumber,
              status: 'completed'
            },
            ...v.transactions
          ]
        };
      }
      return v;
    }));

    clearCart();
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const history = [...ord.tracking.history, {
          status,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          label: `Statut mis à jour : ${status}`,
          description: `Progression de la commande vers l’acheteur.`
        }];
        return {
          ...ord,
          status,
          tracking: {
            ...ord.tracking,
            history
          }
        };
      }
      return ord;
    }));
    showToast(`Statut de commande ${orderId} actualisé: ${status}`);
  };

  const requestVendorWithdrawal = (vendorId: string, amount: number, method: string) => {
    let success = false;
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        if (v.walletBalance < amount) {
          showToast("Solde insuffisant pour ce montant de retrait.");
          return v;
        }
        success = true;
        return {
          ...v,
          walletBalance: v.walletBalance - amount,
          transactions: [
            {
              id: `tx_w_${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              type: 'payout',
              amount: -amount,
              description: `Demande de retrait vers ${method} (Traitement instantané)`,
              status: 'completed'
            },
            ...v.transactions
          ]
        };
      }
      return v;
    }));
    if (success) {
      showToast(`Retrait de ${formatPrice(amount)} validé avec succès vers ${method}!`);
    }
    return success;
  };

  const submitVendorKyc = (vendorId: string, data: any) => {
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          kyc: {
            ...v.kyc,
            ...data,
            status: 'verified', // Auto verified in prototype
            submittedAt: new Date().toISOString().split('T')[0]
          }
        };
      }
      return v;
    }));
    showToast("Dossier KYC Vendeur soumis et certifié avec succès !");
  };

  // Vendor Wallet Dynamic Calculations
  const vendorWallet = {
    availableBalance: currentVendor ? currentVendor.walletBalance : 12450000,
    escrowBalance: orders
      .filter(o => o.escrowStatus === 'held')
      .reduce((sum, o) => sum + (o.vendorNetTotal || Math.round(o.totalAmount * 0.99)), 0) + 1450000,
    totalEarnings: currentVendor ? currentVendor.grossRevenue : 48900000
  };

  const withdrawVendorFunds = (amount: number, method: string, phone: string) => {
    const targetVendorId = currentVendor ? currentVendor.id : (currentUser.vendorId || 'vendor_gningue_official');
    return requestVendorWithdrawal(targetVendorId, amount, `${method.toUpperCase()} (${phone})`);
  };

  const adminCommissionRate = 0.01; // 1%

  // Product management
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    showToast(`Produit "${product.title}" publié avec succès !`);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    showToast(`Produit "${product.title}" mis à jour.`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Produit supprimé du catalogue.");
  };

  const duplicateProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const duplicated: Product = {
      ...target,
      id: `prod_${Date.now()}`,
      title: `${target.title} (Copie)`,
      slug: `${target.slug}-copie-${Date.now()}`,
      salesCount: 0,
      rating: 5.0,
      reviewCount: 0,
      reviews: []
    };
    setProducts(prev => [duplicated, ...prev]);
    showToast(`Produit dupliqué avec succès : "${duplicated.title}"`);
  };

  // Wishlist & Compare
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Retiré des favoris");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Ajouté aux favoris ❤️");
        return [...prev, productId];
      }
    });
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        showToast("Retiré du comparateur");
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast("Maximum 4 produits à comparer en simultané.");
        return prev;
      }
      showToast(`Ajouté au comparateur: ${product.title.slice(0, 20)}...`);
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareList([]);

  // Disputes
  const createDispute = (data: Partial<Dispute>) => {
    const newDispute: Dispute = {
      id: `disp_${Date.now()}`,
      orderId: data.orderId || 'ord_recent',
      orderNumber: data.orderNumber || 'GN-2026-UNKNOWN',
      buyerName: currentUser.name,
      vendorName: data.vendorName || 'Vendeur Gningue',
      reason: data.reason || 'Article non conforme',
      description: data.description || 'Détails du litige',
      status: 'opened',
      createdAt: new Date().toISOString().split('T')[0],
      amount: data.amount || 25000,
      evidenceImages: data.evidenceImages || []
    };
    setDisputes(prev => [newDispute, ...prev]);
    showToast("Litige ouvert. L'équipe de médiation Gningue Empire intervient sous 24h.");
  };

  const resolveDispute = (disputeId: string, resolution: 'refund' | 'pay_vendor') => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: resolution === 'refund' ? 'resolved_buyer_refund' : 'resolved_vendor_paid'
        };
      }
      return d;
    }));
    showToast(resolution === 'refund' ? "Litige résolu : Remboursement acheteur validé" : "Litige résolu : Paiement débloqué pour le vendeur");
  };

  // Video Reviews & Purchases Proof
  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedReviews = [newReview, ...p.reviews];
        const avgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        const updatedProduct: Product = {
          ...p,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: avgRating,
          // If product didn't have video preview and this review has video, update product preview
          videoPreviewUrl: p.videoPreviewUrl || newReview.videoUrl
        };

        if (selectedProductForDetail && selectedProductForDetail.id === productId) {
          setSelectedProductForDetail(updatedProduct);
        }

        return updatedProduct;
      }
      return p;
    }));

    // Reward buyer with Gningue Coins (50 coins for video proof, 20 for standard)
    const rewardCoins = newReview.videoUrl ? 50 : 20;
    updateUserCoins(rewardCoins);

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    showToast(`🎉 Avis publié ! +${rewardCoins} Gningue Coins crédités sur votre compte.`);
  };

  const likeReview = (productId: string, reviewId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedReviews = p.reviews.map(r => {
          if (r.id === reviewId) {
            return { ...r, helpfulCount: r.helpfulCount + 1 };
          }
          return r;
        });
        const updatedProduct = { ...p, reviews: updatedReviews };
        if (selectedProductForDetail && selectedProductForDetail.id === productId) {
          setSelectedProductForDetail(updatedProduct);
        }
        return updatedProduct;
      }
      return p;
    }));
    showToast("Merci pour votre vote utile 👍");
  };

  return (
    <AppContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedSubcategory,
        setSelectedSubcategory,
        b2bOnlyFilter,
        setB2bOnlyFilter,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,

        activeView,
        setActiveView,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeOrderToTrack,
        setActiveOrderToTrack,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        packageInsurance,
        setPackageInsurance,
        packageInsuranceFee,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscountAmount,
        coinsToUse,
        setCoinsToUse,
        coinsDiscountAmount,
        cartTotal,

        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,

        currentUser,
        switchUserRole,
        updateUserCoins,

        vendors,
        currentVendor,
        vendorWallet,
        withdrawVendorFunds,
        adminCommissionRate,
        orders,
        createOrder,
        updateOrderStatus,
        requestVendorWithdrawal,
        submitVendorKyc,

        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        clearCompare,

        liveSessions,
        activeLiveSession,
        setActiveLiveSession,
        disputes,
        createDispute,
        resolveDispute,

        addReview,
        likeReview,

        toastMessage,
        showToast,

        cartReminderNotification,
        triggerCartReminder,
        dismissCartReminder,
        cartReminderEnabled,
        setCartReminderEnabled,
        requestPushNotificationPermission,
        pushPermissionStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
