import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Server-side Gemini AI initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ==================== REST API ROUTES ====================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "GNINGUE EMPIRE",
    version: "2.0.0",
    slogan: "Tout le monde vend, tout le monde achète, tout le monde gagne.",
    timestamp: new Date().toISOString(),
  });
});

// 1. AI Assistant Chatbot (Multilingual Wolof / French / English)
app.post("/api/gemini/chat-assistant", async (req, res) => {
  try {
    const { message, history, language = "FR", userContext } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback response if key not supplied in preview
      return res.json({
        reply: language === "WO" 
          ? "Nanga def! Man maay GNINGUE AI. Ndax danga bëgg ma jàppale la ci sa commande, wala nga wut ab abonnement Netflix / iPhone ci prix bu gën?" 
          : "Bonjour et bienvenue sur GNINGUE EMPIRE ! Je suis votre assistant intelligent 24/7. Je peux vous aider à suivre votre commande, trouver les meilleurs tarifs de gros B2B, activer vos abonnements digitaux instantanés (Netflix, Canva, IPTV) ou contacter le support vendeur.",
        suggestedActions: ["Suivre ma commande", "Voir les promos Netflix / IPTV", "Tarifs de gros B2B iPhone", "Garantie Escrow 48h"]
      });
    }

    const systemInstruction = `
Tu es "GNINGUE AI", l'assistant commercial et technique d'élite de la marketplace "GNINGUE EMPIRE" (Slogan: "Tout le monde vend, tout le monde achète, tout le monde gagne.").
Gningue Empire est la première super-marketplace hybride au monde (Alibaba B2B de gros + Amazon B2C de détail + Marketplace digital & abonnements).

Directives de communication:
1. Langues supportées: Français (par défaut), Wolof (si l'utilisateur parle en wolof, réponds en wolof naturel et chaleureux : 'Dalal ak jàmm!', 'Nanga def!', 'Jërëjëf'), Anglais.
2. Spécificités de Gningue Empire:
   - Paiements acceptés: Wave, Orange Money, MTN MoMo, Carte Bancaire (Visa/Mastercard via Stripe), PayPal, Crypto USDT.
   - Garantie Escrow 48h Gningue: L'argent est bloqué 48h après la livraison pour protéger l'acheteur. En cas de litige, médiation immédiate.
   - Livraison automatique instantanée pour les produits digitaux (Netflix 4K, IPTV, Canva Pro, Xbox Cloud, Office 365).
   - Vente en gros B2B (Alibaba style) avec remises par paliers de quantité (ex: iPhone, Onduleurs solaires, Bazin riche).
   - Commission plateforme: 1% seulement pour l'administration sur chaque vente.
   - Livraison physique géolocalisée avec suivi en direct du livreur sur carte.
   - Assurance Colis 2% en option.
3. Sois poli, concis, chaleureux, orienté solution et très professionnel. Mets en valeur les offres et rassure toujours le client.
    `;

    const promptText = `
Message de l'utilisateur: "${message}"
Contexte client: ${JSON.stringify(userContext || {})}
Langue demandée: ${language}
Réponds de manière chaleureuse, précise et donne 2 à 4 suggestions d'actions courtes au format JSON:
{
  "reply": "Ta réponse textuelle ici",
  "suggestedActions": ["Action 1", "Action 2", "Action 3"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Chat Assistant Error:", error);
    res.status(500).json({
      reply: "Désolé, je rencontre une micro-coupure. Comment puis-je vous aider sur GNINGUE EMPIRE aujourd'hui ?",
      suggestedActions: ["Voir le catalogue", "Assistance WhatsApp Directe"]
    });
  }
});

// 2. 1-Click AI Product Generator (for Vendors)
app.post("/api/gemini/generate-product", async (req, res) => {
  try {
    const { prompt, category, rawImageBase64 } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Return highly structured fallback if API key is not ready
      return res.json({
        title: `Produit Premium Gningue - ${prompt || "Nouvel arrivage"}`,
        slug: `produit-${Date.now()}`,
        description: `Produit haute qualité certifié Gningue Empire. Optimisé pour la vente au détail et en gros avec garantie satisfaction 48h.`,
        features: [
          "Qualité supérieure vérifiée par Gningue Empire",
          "Livraison express sécurisée sous 24h/48h",
          "Tarif dégressif disponible pour commande en volume",
          "Garantie satisfait ou remboursé 48h"
        ],
        retailPrice: 25000,
        originalPrice: 35000,
        b2bAvailable: true,
        bulkPricing: [
          { minQty: 1, maxQty: 4, unitPrice: 25000 },
          { minQty: 5, maxQty: 19, unitPrice: 20000 },
          { minQty: 20, unitPrice: 16500 }
        ],
        seoTags: ["vente afrique", "ecommerce", "grossiste", "promo gningue"],
        category: category || "physique",
        subcategory: "electronique",
        suggestedStock: 50
      });
    }

    const systemInstruction = `Tu es le générateur IA de fiches produits d'élite pour vendeurs sur GNINGUE EMPIRE.
Génère une fiche produit ultra-optimisée pour le e-commerce africain & mondial (titre percutant avec mots-clés, description vendeuse, 4 à 5 points forts, prix de vente conseillé en Francs CFA (XOF), grille de prix de gros B2B dégressive, tags SEO et catégorie).`;

    const userPrompt = `Génère la fiche produit complète au format JSON pour: "${prompt}". Catégorie suggérée: ${category || 'physique'}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Titre optimisé SEO du produit" },
            description: { type: Type.STRING, description: "Description commerciale détaillée et persuasive" },
            features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Liste des 4-5 points forts" },
            retailPrice: { type: Type.NUMBER, description: "Prix de vente au détail en FCFA (XOF)" },
            originalPrice: { type: Type.NUMBER, description: "Prix barré avant remise en FCFA (XOF)" },
            b2bAvailable: { type: Type.BOOLEAN, description: "Vente en gros B2B activée ou non" },
            bulkPricing: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  minQty: { type: Type.NUMBER },
                  maxQty: { type: Type.NUMBER },
                  unitPrice: { type: Type.NUMBER }
                },
                required: ["minQty", "unitPrice"]
              }
            },
            seoTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            category: { type: Type.STRING },
            subcategory: { type: Type.STRING },
            suggestedStock: { type: Type.NUMBER }
          },
          required: ["title", "description", "features", "retailPrice", "seoTags"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Product Generation Error:", error);
    res.status(500).json({ error: "Erreur lors de la génération de la fiche produit IA" });
  }
});

// 3. Predictive AI Stock Rupture Analysis
app.post("/api/gemini/stock-predict", async (req, res) => {
  try {
    const { productTitle, currentStock, salesVelocityLast7Days, category } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      const daysLeft = Math.max(1, Math.round(currentStock / Math.max(1, (salesVelocityLast7Days || 2))));
      return res.json({
        predictedRuptureDays: daysLeft,
        riskLevel: daysLeft <= 4 ? "critical" : daysLeft <= 8 ? "warning" : "safe",
        alertMessage: daysLeft <= 5 
          ? `Attention: Tu vas être en rupture de ${productTitle} dans ${daysLeft} jours au rythme actuel des ventes.` 
          : `Stock sain pour ${productTitle}. Prochaine commande fournisseur conseillée dans ${Math.max(1, daysLeft - 7)} jours.`,
        recommendedReorderQuantity: Math.max(20, (salesVelocityLast7Days || 5) * 14),
        suggestPreorderMode: currentStock <= 3
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Analyse le stock et le risque de rupture pour le produit:
Titre: ${productTitle}
Stock Actuel: ${currentStock} unités
Ventes des 7 derniers jours: ${salesVelocityLast7Days || 3}
Catégorie: ${category || 'physique'}

Fournis une analyse prédictive intelligente au format JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedRuptureDays: { type: Type.NUMBER, description: "Nombre de jours restants avant rupture totale" },
            riskLevel: { type: Type.STRING, description: "'safe', 'warning', ou 'critical'" },
            alertMessage: { type: Type.STRING, description: "Message d'alerte direct et personnalisé au vendeur" },
            recommendedReorderQuantity: { type: Type.NUMBER, description: "Quantité de réapprovisionnement conseillée" },
            suggestPreorderMode: { type: Type.BOOLEAN, description: "Activer le mode précommande automatique" }
          },
          required: ["predictedRuptureDays", "riskLevel", "alertMessage", "recommendedReorderQuantity"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Stock Prediction Error:", error);
    res.status(500).json({ error: "Erreur prédiction stock IA" });
  }
});

// 4. Delivery Distance & Fee Calculator (Map & Geolocation)
app.post("/api/delivery/calculate", (req, res) => {
  const { userLat, userLng, destinationLat = 14.7167, destinationLng = -17.4677, weightKg = 1, isExpress = false } = req.body;
  
  // Calculate approximate Haversine distance in km
  const R = 6371; // Earth radius in km
  const dLat = ((destinationLat - (userLat || 14.7431)) * Math.PI) / 180;
  const dLng = ((destinationLng - (userLng || -17.5144)) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(((userLat || 14.7431) * Math.PI) / 180) *
      Math.cos((destinationLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.max(1.2, Math.round(R * c * 10) / 10);

  // Price base: 1000 FCFA base + 150 FCFA/km + 200 FCFA/kg
  const baseFee = 1000;
  const distanceFee = Math.round(distanceKm * 150);
  const weightFee = Math.round((weightKg || 1) * 200);
  const expressMultiplier = isExpress ? 1.5 : 1.0;
  
  const totalShipping = Math.round((baseFee + distanceFee + weightFee) * expressMultiplier / 100) * 100;
  
  res.json({
    distanceKm,
    estimatedMinutes: Math.round(distanceKm * 3.5 + 15),
    shippingFee: Math.min(15000, Math.max(1500, totalShipping)),
    courierHub: "Gningue Central Logistics Hub (Dakar / Abidjan)",
  });
});

// 5. Abandoned Cart Trigger
app.post("/api/cart/abandoned-alert", (req, res) => {
  const { userEmail, userPhone, itemsCount, totalValue } = req.body;
  res.json({
    success: true,
    message: `Alerte de relance SMS/Email déclenchée pour ${userPhone || userEmail} avec coupon bonus -5% supplémentaire offert!`,
    discountPromoCode: "REVIENS5",
  });
});

// ==================== VITE & STATIC SERVING ====================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ GNINGUE EMPIRE Super Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
