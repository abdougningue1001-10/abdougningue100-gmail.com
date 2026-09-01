import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Sliders,
  Scale,
  Lock,
  Layers,
  Sparkles,
  ArrowUpRight,
  Store
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    orders, 
    products, 
    disputes, 
    resolveDispute, 
    formatPrice, 
    adminCommissionRate,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kpis' | 'disputes' | 'kyc' | 'ledger'>('kpis');

  // Overall platform calculations
  const totalGMV = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 12850000;
  const totalCommissionEarned = orders.reduce((sum, o) => sum + (o.platformCommission1Percent || Math.round((o.totalAmount || 0) * 0.01)), 0) + 128500;
  const escrowLockedPool = orders.filter(o => o.escrowStatus === 'held').reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 3450000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-white">
      
      {/* Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFC300] to-[#B8860B] p-0.5 shadow-xl shadow-[#FFC300]/20">
            <div className="w-full h-full bg-[#12141C] rounded-[14px] flex items-center justify-center text-[#FFC300] font-black text-xl">
              👑
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">Super Admin Dashboard</h1>
              <span className="bg-[#FFC300]/20 text-[#FFC300] text-xs font-bold px-2.5 py-0.5 rounded-full">
                GNINGUE EMPIRE HQ
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Surveillance du volume d'affaires mondial, encaissement de la commission de 1%, arbitrage des litiges Escrow 48h.
            </p>
          </div>
        </div>

        {/* Global stats pill */}
        <div className="bg-[#181B26] px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-4 text-xs">
          <div>
            <span className="text-gray-400">Taux de Commission :</span>
            <p className="font-extrabold text-[#FFC300] text-sm">1.0% Fixe</p>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-gray-400">Séquestre Escrow :</span>
            <p className="font-extrabold text-white text-sm">48 Heures</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'kpis' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Indicateurs Clés (GMV & 1%)
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'disputes' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <Scale className="w-4 h-4 text-red-400" /> Centre d'Arbitrage Litiges ({disputes.length})
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'kyc' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <Users className="w-4 h-4 text-blue-400" /> Approbation Marchands & KYC
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ledger' ? 'bg-[#FFC300] text-black' : 'text-gray-400 hover:text-white bg-[#181B26]'
          }`}
        >
          <DollarSign className="w-4 h-4 text-green-400" /> Grand Livre des Commissions (1%)
        </button>
      </div>

      {/* TAB 1: KPIS & PLATFORM REVENUE */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400">Volume Total des Ventes (GMV)</span>
              <p className="text-2xl font-black font-heading text-white">{formatPrice(totalGMV)}</p>
              <p className="text-[11px] text-green-400 font-semibold">Trafic mondial (Afrique, Europe, Asie)</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-[#FFC300]/40 space-y-2">
              <span className="text-xs text-gray-400">Revenus de Commission Nette (1%)</span>
              <p className="text-2xl font-black font-heading text-[#FFC300]">{formatPrice(totalCommissionEarned)}</p>
              <p className="text-[11px] text-gray-400">Encaissé automatiquement sur chaque transaction</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400">Pool Séquestre Escrow (48h)</span>
              <p className="text-2xl font-black font-heading text-purple-400">{formatPrice(escrowLockedPool)}</p>
              <p className="text-[11px] text-gray-400">Fonds sécurisés en attente de libération</p>
            </div>

            <div className="p-5 bg-[#12141C] rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400">Marchands & Grossistes B2B</span>
              <p className="text-2xl font-black font-heading text-white">1 420 Actifs</p>
              <p className="text-[11px] text-blue-400 font-semibold">+85 nouveaux cette semaine</p>
            </div>

          </div>

          {/* Revenue distribution breakdown */}
          <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Répartition du Volume par Catégorie</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">📦 B2B Gros & Détail Physique</span>
                  <span className="text-[#FFC300] font-bold">58%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FFC300] h-full w-[58%]" />
                </div>
                <p className="text-[11px] text-gray-400">Smartphones, Solaire, Mode Bazin</p>
              </div>

              <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">⚡ Produits & Abonnements Digitaux</span>
                  <span className="text-green-400 font-bold">29%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-[29%]" />
                </div>
                <p className="text-[11px] text-gray-400">Netflix 4K, IPTV, Canva Pro, Xbox</p>
              </div>

              <div className="p-4 bg-[#181B26] rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">🚀 Services & Boutiques Clé en Main</span>
                  <span className="text-blue-400 font-bold">13%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-[13%]" />
                </div>
                <p className="text-[11px] text-gray-400">Shopify 48h, Logos Luxe, Code source</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISPUTES & ESCROW MEDIATION */}
      {activeTab === 'disputes' && (
        <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2 text-red-400">
                <Scale className="w-5 h-5" />
                <span>Centre d'Arbitrage et Médiation Escrow 48h</span>
              </h3>
              <p className="text-xs text-gray-400">
                Arbitrez les litiges entre acheteurs et vendeurs. Vous avez le pouvoir de débloquer ou rembourser les fonds en 1-clic.
              </p>
            </div>
          </div>

          {disputes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto opacity-40 mb-2" />
              <p className="text-sm font-bold text-white">Aucun litige actif</p>
              <p className="text-xs">Toutes les transactions se déroulent sans incident.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {disputes.map((disp) => (
                <div key={disp.id} className="p-5 bg-[#181B26] rounded-2xl border border-red-500/30 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Litige #{disp.id}</span>
                      <h4 className="text-sm font-black text-white">{disp.reason}</h4>
                      <p className="text-xs text-gray-400">Commande : {disp.orderNumber} • Montant bloqué : <strong className="text-[#FFC300]">{formatPrice(disp.amount)}</strong></p>
                    </div>
                    
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${disp.status === 'open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {disp.status === 'open' ? 'En attente d’arbitrage' : `Résolu (${disp.resolution})`}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">
                    « {disp.description} »
                  </p>

                  {disp.status === 'open' && (
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => resolveDispute(disp.id, 'refund_buyer')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Rembourser Intégralement l'Acheteur
                      </button>

                      <button
                        onClick={() => resolveDispute(disp.id, 'release_to_vendor')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Débloquer et Verser au Vendeur
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KYC APPROVAL QUEUE */}
      {activeTab === 'kyc' && (
        <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base">Validation des Dossiers Marchands & Grossistes</h3>
          
          <div className="space-y-3">
            {[
              { name: 'AfriTech Import-Export Sarl', country: 'Sénégal / Chine', type: 'Grossiste Électronique & Solaire', date: 'Aujourd’hui', status: 'pending' },
              { name: 'Bamako Luxe Fabrics', country: 'Mali', type: 'Grossiste Bazin & Soie', date: 'Hier', status: 'approved' },
              { name: 'Digital Empire Hub', country: 'Côte d’Ivoire', type: 'Abonnements & Logiciels', date: 'Il y a 2 jours', status: 'approved' }
            ].map((v, i) => (
              <div key={i} className="p-4 bg-[#181B26] rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{v.name}</h4>
                  <p className="text-gray-400">{v.type} • {v.country}</p>
                </div>

                <div className="flex items-center gap-2">
                  {v.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => showToast("Marchand approuvé avec succès !")}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold"
                      >
                        Approuver KYC ✓
                      </button>
                      <button 
                        onClick={() => showToast("Dossier rejeté pour pièces manquantes", "info")}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-xl"
                      >
                        Rejeter
                      </button>
                    </>
                  ) : (
                    <span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-xl">
                      ✓ Marchand Certifié
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMMISSION LEDGER (1%) */}
      {activeTab === 'ledger' && (
        <div className="bg-[#12141C] p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base">Grand Livre des Commissions Prélevées (1.0%)</h3>
          
          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-3.5 bg-[#181B26] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Commande {ord.orderNumber} ({ord.items.length} articles)</p>
                  <p className="text-[11px] text-gray-400">Montant brut : {formatPrice(ord.totalAmount)} • Payé via {ord.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400">Commission Admin 1% :</span>
                  <p className="text-sm font-black text-[#FFC300] font-heading">+{formatPrice(ord.platformCommission1Percent || Math.round((ord.totalAmount || 0) * 0.01))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
