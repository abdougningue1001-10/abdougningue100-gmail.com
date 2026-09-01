import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Phone, 
  MessageSquare, 
  Copy, 
  AlertTriangle, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Order } from '../types';

export const OrderTrackerView: React.FC = () => {
  const { 
    orders, 
    activeOrderToTrack, 
    setActiveOrderToTrack, 
    formatPrice, 
    createDispute, 
    showToast 
  } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<Order>(activeOrderToTrack || orders[0]);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('Produit défectueux / non conforme');
  const [disputeDesc, setDisputeDesc] = useState('');

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <Package className="w-16 h-16 text-gray-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Aucune commande enregistrée pour le moment.</h2>
        <p className="text-gray-400 text-sm">Effectuez votre premier achat sur GNINGUE EMPIRE pour tester le suivi GPS en temps réel.</p>
      </div>
    );
  }

  const currentOrder = selectedOrder || orders[0];

  const getStatusIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'packed': return 1;
      case 'shipped': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStatusIndex(currentOrder.status);

  const steps = [
    { label: 'Commandé', desc: 'Paiement vérifié' },
    { label: 'Emballé', desc: 'Scellé antivol' },
    { label: 'Expédié', desc: 'Hub Logistique' },
    { label: 'En Livraison', desc: 'Livreur en route' },
    { label: 'Livré & Escrow', desc: 'Garantie 48h active' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Code copié dans le presse-papier !");
  };

  const handleOpenDispute = (e: React.FormEvent) => {
    e.preventDefault();
    createDispute({
      orderId: currentOrder.id,
      orderNumber: currentOrder.orderNumber,
      vendorName: 'Vendeur Gningue',
      reason: disputeReason,
      description: disputeDesc,
      amount: currentOrder.totalAmount
    });
    setIsDisputeModalOpen(false);
    setDisputeDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading flex items-center gap-2">
            <Truck className="w-7 h-7 text-[#FFC300]" />
            <span>Suivi de Commande & Traçabilité GPS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Suivez la position exacte de votre livreur et gérez vos garanties Escrow 48h.
          </p>
        </div>

        {/* Order Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold">Commande :</span>
          <select
            value={currentOrder.id}
            onChange={(e) => {
              const found = orders.find(o => o.id === e.target.value);
              if (found) setSelectedOrder(found);
            }}
            className="bg-[#181B26] text-xs font-bold text-[#FFC300] border border-white/15 rounded-xl px-3 py-2 focus:outline-none"
          >
            {orders.map((ord) => (
              <option key={ord.id} value={ord.id}>
                {ord.orderNumber} ({formatPrice(ord.totalAmount)}) - {ord.status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Map / Courier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Milestone Steps & Products list */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Order Header Summary Card */}
          <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-gray-400">N° de commande Gningue :</span>
                <p className="text-lg font-black text-white font-heading">{currentOrder.orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Total réglé via {currentOrder.paymentMethod.toUpperCase()} :</span>
                <p className="text-lg font-black text-[#FFC300] font-heading">{formatPrice(currentOrder.totalAmount)}</p>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 relative">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-1 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      idx <= currentStepIdx 
                        ? 'bg-[#FFC300] text-black shadow-md shadow-[#FFC300]/30 ring-4 ring-[#FFC300]/20' 
                        : 'bg-[#181B26] text-gray-500 border border-white/10'
                    }`}>
                      {idx < currentStepIdx ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[11px] font-bold ${idx <= currentStepIdx ? 'text-white' : 'text-gray-500'}`}>
                      {st.label}
                    </span>
                    <span className="text-[9px] text-gray-500 hidden sm:block">
                      {st.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow Status Notice Banner */}
            <div className="bg-[#181B26] p-4 rounded-2xl border border-[#FFC300]/30 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#FFC300] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Garantie Escrow 48h Sécurisée</p>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Le vendeur recevra ses fonds uniquement 48h après la confirmation de livraison. Vous bénéficiez d'une protection intégrale contre la fraude ou la non-conformité.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDisputeModalOpen(true)}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-bold shrink-0 border border-red-500/30 transition-colors"
              >
                Ouvrir un Litige
              </button>
            </div>
          </div>

          {/* Items in this Order */}
          <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Package className="w-4 h-4 text-[#FFC300]" />
              <span>Articles inclus dans cette commande ({currentOrder.items.length})</span>
            </h3>

            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      className="w-14 h-14 rounded-xl object-cover bg-black/40 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-white text-xs line-clamp-1">{item.productTitle}</h4>
                      <p className="text-[11px] text-gray-400">Quantité : {item.quantity} • Prix unitaire : {formatPrice(item.unitPrice)}</p>
                      {item.variantName && (
                        <p className="text-[10px] text-[#FFC300] font-semibold">{item.variantName}</p>
                      )}
                    </div>
                  </div>

                  {/* Digital Instant Codes Display */}
                  {item.category === 'digital' && item.digitalCodes && (
                    <div className="bg-black/60 p-2 rounded-xl border border-green-500/30 text-xs flex items-center justify-between gap-2">
                      <div className="text-[11px] font-mono text-green-400 truncate max-w-[200px]">
                        {item.digitalCodes[0]}
                      </div>
                      <button
                        onClick={() => handleCopy(item.digitalCodes![0])}
                        className="p-1 text-gray-400 hover:text-white"
                        title="Copier le code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span className="font-black text-white text-xs sm:text-sm">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Live GPS Courier Tracking & Delivery Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live GPS Map Card */}
          <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFC300]" />
                <span>Position Live du Livreur (GPS)</span>
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                <span>En Direct</span>
              </span>
            </div>

            {/* Interactive Simulated Map Canvas */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0D14] flex flex-col justify-between p-4">
              {/* Map grid lines aesthetic */}
              <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#FFC300_1px,transparent_1px),linear-gradient(to_bottom,#FFC300_1px,transparent_1px)] [background-size:24px_24px]"></div>
              
              {/* Top ETA overlay */}
              <div className="relative z-10 bg-[#181B26]/95 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 flex items-center justify-between text-xs">
                <span className="text-gray-300">Estimation d’arrivée :</span>
                <span className="font-bold text-[#FFC300]">{currentOrder.tracking.estimatedDelivery}</span>
              </div>

              {/* Center Courier Pulse Pin */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="p-3 bg-[#FFC300] text-black rounded-full shadow-2xl shadow-[#FFC300]/50 animate-pulse flex items-center gap-1.5 font-bold text-xs">
                  <Truck className="w-4 h-4" />
                  <span>{currentOrder.tracking.currentLocation?.address || 'En route vers votre adresse'}</span>
                </div>
              </div>

              {/* Destination Address Tag */}
              <div className="relative z-10 bg-[#12141C]/90 px-3 py-2 rounded-xl border border-white/10 text-xs text-gray-300">
                <span className="text-gray-400">Destination : </span>
                <strong className="text-white">{currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.city}</strong>
              </div>
            </div>

            {/* Courier Info Card */}
            <div className="bg-[#181B26] p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFC300]/20 flex items-center justify-center text-[#FFC300] font-black">
                  🏍️
                </div>
                <div>
                  <p className="font-bold text-white">{currentOrder.tracking.courierName}</p>
                  <p className="text-[11px] text-gray-400">{currentOrder.tracking.courierPhone}</p>
                </div>
              </div>

              <a
                href={`tel:${currentOrder.tracking.courierPhone}`}
                className="p-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors"
                title="Appeler le livreur"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Tracking History Log */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Historique des étapes :</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentOrder.tracking.history.map((h, idx) => (
                  <div key={idx} className="p-2.5 bg-[#181B26] rounded-xl border border-white/5 text-xs flex items-start gap-2.5">
                    <span className="font-mono text-[10px] text-[#FFC300] shrink-0 pt-0.5">{h.timestamp}</span>
                    <div>
                      <p className="font-bold text-white">{h.label}</p>
                      <p className="text-[11px] text-gray-400">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* DISPUTE & ESCROW MEDIATION MODAL */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#12141C] border border-red-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Ouverture de Litige & Médiation Gningue 48h</span>
              </div>
              <button onClick={() => setIsDisputeModalOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              L'argent de la commande <strong>{currentOrder.orderNumber}</strong> ({formatPrice(currentOrder.totalAmount)}) est actuellement bloqué. Veuillez préciser la raison du litige :
            </p>

            <form onSubmit={handleOpenDispute} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Motif principal :</label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full bg-[#181B26] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  <option>Produit défectueux / non conforme</option>
                  <option>Colis non reçu après le délai promis</option>
                  <option>Code digital ou licence invalide</option>
                  <option>Article manquant dans le colis</option>
                  <option>Autre problème technique</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Détails et explications :</label>
                <textarea
                  required
                  rows={3}
                  value={disputeDesc}
                  onChange={(e) => setDisputeDesc(e.target.value)}
                  placeholder="Décrivez précisément le problème rencontré..."
                  className="w-full bg-[#181B26] border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisputeModalOpen(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-gray-300 rounded-xl text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs"
                >
                  Transmettre à la Médiation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
