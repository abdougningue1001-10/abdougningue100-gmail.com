import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  ShoppingBag, 
  ArrowRight,
  Zap,
  Store
} from 'lucide-react';

export const AIChatDrawer: React.FC = () => {
  const { 
    isAIChatOpen, 
    setIsAIChatOpen, 
    aiChatMessages, 
    sendChatMessage, 
    setSelectedProductForDetail,
    formatPrice
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatMessages]);

  if (!isAIChatOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const query = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    await sendChatMessage(query);
    setIsLoading(false);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputMessage("Quels sont vos meilleurs tarifs en gros pour des panneaux solaires à Dakar ?");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-[#12141C] border-l border-white/15 h-full flex flex-col justify-between text-white shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Chatbot Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-[#181B26] via-[#202434] to-[#181B26] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFC300] to-purple-600 p-0.5 shadow-lg shadow-[#FFC300]/20">
              <div className="w-full h-full bg-[#12141C] rounded-[14px] flex items-center justify-center text-[#FFC300]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">GNINGUE AI (Assistant Vente)</h3>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.2 rounded-full">
                  En Ligne
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Conseiller B2B, B2C & Digital • FR / Wolof / EN</p>
            </div>
          </div>

          <button
            onClick={() => setIsAIChatOpen(false)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-[#FFC300]/20 text-[#FFC300] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FFC300] text-black font-medium ml-4 rounded-tr-none'
                    : 'bg-[#181B26] text-gray-200 border border-white/10 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line text-xs">{msg.text}</p>

                {/* Attached product suggestions from AI */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFC300]">
                      Articles recommandés :
                    </p>
                    {msg.suggestedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProductForDetail(p);
                          setIsAIChatOpen(false);
                        }}
                        className="p-2 bg-[#12141C] rounded-xl border border-white/10 hover:border-[#FFC300]/50 transition-all flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={p.images[0]} alt={p.title} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <span className="font-bold text-white text-[11px] truncate group-hover:text-[#FFC300]">{p.title}</span>
                        </div>
                        <span className="text-[11px] font-black text-[#FFC300] shrink-0 ml-2">{formatPrice(p.retailPrice)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-xl bg-[#FFC300]/20 text-[#FFC300] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#181B26] p-3 rounded-2xl border border-white/10 flex items-center gap-2 text-gray-400 text-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC300] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC300]"></span>
                </span>
                <span>Gningue AI réfléchit...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-[#181B26]/50 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
          <button
            onClick={() => setInputMessage("Comment fonctionne la garantie Escrow 48h ?")}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 whitespace-nowrap transition-colors"
          >
            🛡️ Escrow 48h
          </button>
          <button
            onClick={() => setInputMessage("Quels sont les tarifs de gros pour l'IPTV et Netflix ?")}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 whitespace-nowrap transition-colors"
          >
            ⚡ Abonnements Digitaux
          </button>
          <button
            onClick={() => setInputMessage("Comment vendre sur GNINGUE EMPIRE avec 1% de commission ?")}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 whitespace-nowrap transition-colors"
          >
            🏪 Devenir Vendeur
          </button>
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#181B26] flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl border transition-all ${
              isRecording ? 'bg-red-600 text-white border-red-500 animate-pulse' : 'bg-[#12141C] text-gray-400 border-white/10 hover:text-white'
            }`}
            title="Recherche Vocale"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Posez une question en Français, Wolof ou Anglais..."
            className="flex-1 bg-[#12141C] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300]"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 bg-[#FFC300] hover:bg-[#e6b000] text-black font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
