import { prisma } from '../../Shared/Infrastructure/PrismaClient';

/**
 * Servicio para manejar los catálogos del sistema
 */
export class CatalogService {
  /**
   * Obtiene un item de catálogo por código de catálogo y código de item
   */
  static async getCatalogItem(catalogCode: string, itemCode: string) {
    const catalog = await prisma.catalog.findUnique({
      where: { code: catalogCode },
      include: {
        items: {
          where: {
            code: itemCode,
            isActive: true,
          },
        },
      },
    });

    return catalog?.items[0] || null;
  }

  /**
   * Obtiene todos los items de un catálogo
   */
  static async getCatalogItems(catalogCode: string) {
    const catalog = await prisma.catalog.findUnique({
      where: { code: catalogCode },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return catalog?.items || [];
  }

  /**
   * Obtiene el ID de un item de catálogo
   */
  static async getCatalogItemId(catalogCode: string, itemCode: string): Promise<string | null> {
    const item = await this.getCatalogItem(catalogCode, itemCode);
    return item?.id || null;
  }

  /**
   * Cache para los catálogos más usados
   */
  private static cache: Map<string, any> = new Map();

  /**
   * Obtiene un item del cache o lo busca en la base de datos
   */
  static async getCachedCatalogItem(catalogCode: string, itemCode: string) {
    const cacheKey = `${catalogCode}:${itemCode}`;
    
    if (!this.cache.has(cacheKey)) {
      const item = await this.getCatalogItem(catalogCode, itemCode);
      if (item) {
        this.cache.set(cacheKey, item);
      }
    }
    
    return this.cache.get(cacheKey) || null;
  }

  /**
   * Limpia el cache
   */
  static clearCache() {
    this.cache.clear();
  }

  /**
   * Pre-carga los catálogos en memoria para mejorar el rendimiento
   */
  static async preloadCatalogs() {
    const catalogs = await prisma.catalog.findMany({
      where: { isActive: true },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    for (const catalog of catalogs) {
      for (const item of catalog.items) {
        const cacheKey = `${catalog.code}:${item.code}`;
        this.cache.set(cacheKey, item);
      }
    }

  }
}

// Constantes para acceder fácilmente a los códigos de catálogo
export const CATALOG_CODES = {
  CLIENT_STATUS: 'CLIENT_STATUS',
  CLIENT_SOURCE: 'CLIENT_SOURCE',
  ORDER_STATUS: 'ORDER_STATUS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  PAYMENT_STATUS: 'PAYMENT_STATUS',
  BOT_TYPE: 'BOT_TYPE',
  MESSAGE_NODE_TYPE: 'MESSAGE_NODE_TYPE',
  BUSINESS_SUBSCRIPTION: 'BUSINESS_SUBSCRIPTION',
} as const;

// Constantes para los estados de cliente
export const CLIENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
  PROSPECT: 'PROSPECT',
} as const;

// Constantes para fuentes de cliente
export const CLIENT_SOURCE = {
  WHATSAPP: 'WHATSAPP',
  REFERRAL: 'REFERRAL',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  WEBSITE: 'WEBSITE',
  ADVERTISING: 'ADVERTISING',
  WALK_IN: 'WALK_IN',
  OTHER: 'OTHER',
} as const;

// Constantes para estados de orden
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

// Constantes para métodos de pago
export const PAYMENT_METHOD = {
  CASH: 'CASH',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  MOBILE_PAYMENT: 'MOBILE_PAYMENT',
  PAYPAL: 'PAYPAL',
  CRYPTO: 'CRYPTO',
  ON_DELIVERY: 'ON_DELIVERY',
} as const;

// Constantes para estados de pago
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
} as const;

// Constantes para tipos de bot
export const BOT_TYPE = {
  SALES: 'SALES',
  SUPPORT: 'SUPPORT',
  GENERAL: 'GENERAL',
  MARKETING: 'MARKETING',
  SURVEY: 'SURVEY',
} as const;

// Constantes para tipos de nodo de mensaje
export const MESSAGE_NODE_TYPE = {
  TEXT: 'TEXT',
  QUESTION: 'QUESTION',
  MENU: 'MENU',
  ACTION: 'ACTION',
  CONDITION: 'CONDITION',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  DELAY: 'DELAY',
} as const;

// Constantes para tipos de suscripción
export const BUSINESS_SUBSCRIPTION = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export default CatalogService;
