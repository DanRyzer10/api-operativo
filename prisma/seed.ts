import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde .env.development
config({ path: resolve(__dirname, '../.env.development') });

import { prisma } from "../src/Shared/Infrastructure/PrismaClient";

interface CatalogData {
  code: string;
  name: string;
  description?: string;
  items: {
    code: string;
    name: string;
    description?: string;
    order: number;
    metadata?: any;
  }[];
}

const catalogs: CatalogData[] = [
  {
    code: 'CLIENT_STATUS',
    name: 'Estados de Cliente',
    description: 'Estados disponibles para los clientes en el sistema CRM',
    items: [
      {
        code: 'ACTIVE',
        name: 'Activo',
        description: 'Cliente activo en el sistema',
        order: 1,
      },
      {
        code: 'INACTIVE',
        name: 'Inactivo',
        description: 'Cliente inactivo temporalmente',
        order: 2,
      },
      {
        code: 'BLOCKED',
        name: 'Bloqueado',
        description: 'Cliente bloqueado por políticas o incumplimientos',
        order: 3,
      },
      {
        code: 'PROSPECT',
        name: 'Prospecto',
        description: 'Cliente potencial no convertido',
        order: 4,
      },
    ],
  },
  {
    code: 'CLIENT_SOURCE',
    name: 'Fuentes de Cliente',
    description: 'Canales por los cuales los clientes llegaron al negocio',
    items: [
      {
        code: 'WHATSAPP',
        name: 'WhatsApp',
        description: 'Cliente adquirido a través de WhatsApp',
        order: 1,
      },
      {
        code: 'REFERRAL',
        name: 'Referido',
        description: 'Cliente referido por otro cliente',
        order: 2,
      },
      {
        code: 'SOCIAL_MEDIA',
        name: 'Redes Sociales',
        description: 'Cliente adquirido por redes sociales',
        order: 3,
      },
      {
        code: 'WEBSITE',
        name: 'Sitio Web',
        description: 'Cliente que llegó desde el sitio web',
        order: 4,
      },
      {
        code: 'ADVERTISING',
        name: 'Publicidad',
        description: 'Cliente adquirido por campañas publicitarias',
        order: 5,
      },
      {
        code: 'WALK_IN',
        name: 'Presencial',
        description: 'Cliente que llegó de forma presencial',
        order: 6,
      },
      {
        code: 'OTHER',
        name: 'Otro',
        description: 'Otras fuentes',
        order: 7,
      },
    ],
  },
  {
    code: 'ORDER_STATUS',
    name: 'Estados de Orden',
    description: 'Estados del ciclo de vida de una orden',
    items: [
      {
        code: 'PENDING',
        name: 'Pendiente',
        description: 'Orden creada, esperando procesamiento',
        order: 1,
        metadata: { color: '#FFA500', icon: 'clock' },
      },
      {
        code: 'CONFIRMED',
        name: 'Confirmada',
        description: 'Orden confirmada por el cliente',
        order: 2,
        metadata: { color: '#00BFFF', icon: 'check-circle' },
      },
      {
        code: 'PROCESSING',
        name: 'En Proceso',
        description: 'Orden siendo preparada',
        order: 3,
        metadata: { color: '#1E90FF', icon: 'settings' },
      },
      {
        code: 'READY',
        name: 'Lista',
        description: 'Orden lista para envío/entrega',
        order: 4,
        metadata: { color: '#32CD32', icon: 'package' },
      },
      {
        code: 'SHIPPED',
        name: 'Enviada',
        description: 'Orden en camino al cliente',
        order: 5,
        metadata: { color: '#9370DB', icon: 'truck' },
      },
      {
        code: 'DELIVERED',
        name: 'Entregada',
        description: 'Orden entregada al cliente',
        order: 6,
        metadata: { color: '#228B22', icon: 'check-double' },
      },
      {
        code: 'COMPLETED',
        name: 'Completada',
        description: 'Orden completada y cerrada',
        order: 7,
        metadata: { color: '#008000', icon: 'trophy' },
      },
      {
        code: 'CANCELLED',
        name: 'Cancelada',
        description: 'Orden cancelada',
        order: 8,
        metadata: { color: '#DC143C', icon: 'times-circle' },
      },
      {
        code: 'REFUNDED',
        name: 'Reembolsada',
        description: 'Orden con reembolso aplicado',
        order: 9,
        metadata: { color: '#FF6347', icon: 'undo' },
      },
    ],
  },
  {
    code: 'PAYMENT_METHOD',
    name: 'Métodos de Pago',
    description: 'Formas de pago aceptadas',
    items: [
      {
        code: 'CASH',
        name: 'Efectivo',
        description: 'Pago en efectivo',
        order: 1,
        metadata: { requiresConfirmation: false },
      },
      {
        code: 'CREDIT_CARD',
        name: 'Tarjeta de Crédito',
        description: 'Pago con tarjeta de crédito',
        order: 2,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'DEBIT_CARD',
        name: 'Tarjeta de Débito',
        description: 'Pago con tarjeta de débito',
        order: 3,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'BANK_TRANSFER',
        name: 'Transferencia Bancaria',
        description: 'Pago por transferencia bancaria',
        order: 4,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'MOBILE_PAYMENT',
        name: 'Pago Móvil',
        description: 'Pago a través de aplicaciones móviles',
        order: 5,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'PAYPAL',
        name: 'PayPal',
        description: 'Pago a través de PayPal',
        order: 6,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'CRYPTO',
        name: 'Criptomoneda',
        description: 'Pago con criptomonedas',
        order: 7,
        metadata: { requiresConfirmation: true },
      },
      {
        code: 'ON_DELIVERY',
        name: 'Contra Entrega',
        description: 'Pago al momento de la entrega',
        order: 8,
        metadata: { requiresConfirmation: false },
      },
    ],
  },
  {
    code: 'PAYMENT_STATUS',
    name: 'Estados de Pago',
    description: 'Estados del proceso de pago',
    items: [
      {
        code: 'PENDING',
        name: 'Pendiente',
        description: 'Pago pendiente de confirmación',
        order: 1,
        metadata: { color: '#FFA500' },
      },
      {
        code: 'PROCESSING',
        name: 'Procesando',
        description: 'Pago en proceso de verificación',
        order: 2,
        metadata: { color: '#1E90FF' },
      },
      {
        code: 'PAID',
        name: 'Pagado',
        description: 'Pago confirmado exitosamente',
        order: 3,
        metadata: { color: '#228B22' },
      },
      {
        code: 'FAILED',
        name: 'Fallido',
        description: 'Pago fallido o rechazado',
        order: 4,
        metadata: { color: '#DC143C' },
      },
      {
        code: 'REFUNDED',
        name: 'Reembolsado',
        description: 'Pago reembolsado al cliente',
        order: 5,
        metadata: { color: '#FF6347' },
      },
      {
        code: 'PARTIALLY_REFUNDED',
        name: 'Reembolsado Parcialmente',
        description: 'Pago parcialmente reembolsado',
        order: 6,
        metadata: { color: '#FF8C00' },
      },
    ],
  },
  {
    code: 'BOT_TYPE',
    name: 'Tipos de Bot',
    description: 'Tipos de bots disponibles en el sistema',
    items: [
      {
        code: 'SALES',
        name: 'Ventas',
        description: 'Bot especializado en procesar ventas y pedidos',
        order: 1,
        metadata: { icon: 'shopping-cart', defaultFlow: true },
      },
      {
        code: 'SUPPORT',
        name: 'Soporte',
        description: 'Bot para atención al cliente y soporte técnico',
        order: 2,
        metadata: { icon: 'headset', defaultFlow: false },
      },
      {
        code: 'GENERAL',
        name: 'General',
        description: 'Bot de propósito general',
        order: 3,
        metadata: { icon: 'robot', defaultFlow: false },
      },
      {
        code: 'MARKETING',
        name: 'Marketing',
        description: 'Bot para campañas de marketing y promociones',
        order: 4,
        metadata: { icon: 'bullhorn', defaultFlow: false },
      },
      {
        code: 'SURVEY',
        name: 'Encuesta',
        description: 'Bot para recolección de feedback y encuestas',
        order: 5,
        metadata: { icon: 'poll', defaultFlow: false },
      },
    ],
  },
  {
    code: 'MESSAGE_NODE_TYPE',
    name: 'Tipos de Nodo de Mensaje',
    description: 'Tipos de nodos en los flujos conversacionales',
    items: [
      {
        code: 'TEXT',
        name: 'Texto',
        description: 'Nodo que envía un mensaje de texto',
        order: 1,
        metadata: { hasResponse: false, icon: 'comment' },
      },
      {
        code: 'QUESTION',
        name: 'Pregunta',
        description: 'Nodo que hace una pregunta y espera respuesta',
        order: 2,
        metadata: { hasResponse: true, icon: 'question-circle' },
      },
      {
        code: 'MENU',
        name: 'Menú',
        description: 'Nodo que presenta opciones al usuario',
        order: 3,
        metadata: { hasResponse: true, icon: 'list', allowsMultiple: false },
      },
      {
        code: 'ACTION',
        name: 'Acción',
        description: 'Nodo que ejecuta una acción o proceso',
        order: 4,
        metadata: { hasResponse: false, icon: 'bolt', requiresCode: true },
      },
      {
        code: 'CONDITION',
        name: 'Condición',
        description: 'Nodo que evalúa condiciones y ramifica el flujo',
        order: 5,
        metadata: { hasResponse: false, icon: 'code-branch', requiresExpression: true },
      },
      {
        code: 'IMAGE',
        name: 'Imagen',
        description: 'Nodo que envía una imagen',
        order: 6,
        metadata: { hasResponse: false, icon: 'image', requiresMedia: true },
      },
      {
        code: 'VIDEO',
        name: 'Video',
        description: 'Nodo que envía un video',
        order: 7,
        metadata: { hasResponse: false, icon: 'video', requiresMedia: true },
      },
      {
        code: 'DOCUMENT',
        name: 'Documento',
        description: 'Nodo que envía un documento',
        order: 8,
        metadata: { hasResponse: false, icon: 'file', requiresMedia: true },
      },
      {
        code: 'DELAY',
        name: 'Espera',
        description: 'Nodo que introduce una pausa en el flujo',
        order: 9,
        metadata: { hasResponse: false, icon: 'clock', requiresDuration: true },
      },
    ],
  },
  {
    code: 'BUSINESS_SUBSCRIPTION',
    name: 'Tipos de Suscripción',
    description: 'Planes de suscripción para negocios',
    items: [
      {
        code: 'FREE',
        name: 'Gratuito',
        description: 'Plan gratuito con funcionalidades básicas',
        order: 1,
        metadata: {
          price: 0,
          maxUsers: 2,
          maxBots: 1,
          maxOrders: 100,
          features: ['basic_bot', 'basic_reporting'],
        },
      },
      {
        code: 'STARTER',
        name: 'Inicial',
        description: 'Plan inicial para pequeños negocios',
        order: 2,
        metadata: {
          price: 29.99,
          maxUsers: 5,
          maxBots: 3,
          maxOrders: 500,
          features: ['advanced_bot', 'basic_reporting', 'email_support'],
        },
      },
      {
        code: 'PROFESSIONAL',
        name: 'Profesional',
        description: 'Plan profesional para negocios en crecimiento',
        order: 3,
        metadata: {
          price: 79.99,
          maxUsers: 15,
          maxBots: 10,
          maxOrders: 2000,
          features: [
            'advanced_bot',
            'advanced_reporting',
            'priority_support',
            'custom_flows',
            'integrations',
          ],
        },
      },
      {
        code: 'ENTERPRISE',
        name: 'Empresarial',
        description: 'Plan empresarial con capacidades ilimitadas',
        order: 4,
        metadata: {
          price: 199.99,
          maxUsers: -1, // unlimited
          maxBots: -1, // unlimited
          maxOrders: -1, // unlimited
          features: [
            'advanced_bot',
            'advanced_reporting',
            'dedicated_support',
            'custom_flows',
            'integrations',
            'white_label',
            'api_access',
            'custom_development',
          ],
        },
      },
    ],
  },
];

async function seedCatalogs() {
  console.log('🌱 Iniciando seed de catálogos...');

  for (const catalogData of catalogs) {
    console.log(`\n📦 Procesando catálogo: ${catalogData.name}`);

    // Verificar si el catálogo ya existe
    let catalog = await prisma.catalog.findUnique({
      where: { code: catalogData.code },
    });

    if (!catalog) {
      // Crear el catálogo
      catalog = await prisma.catalog.create({
        data: {
          code: catalogData.code,
          name: catalogData.name,
          description: catalogData.description,
          isActive: true,
        },
      });
      console.log(`   ✅ Catálogo creado: ${catalog.name}`);
    } else {
      console.log(`   ⏭️  Catálogo ya existe: ${catalog.name}`);
    }

    // Crear o actualizar items del catálogo
    for (const itemData of catalogData.items) {
      const existingItem = await prisma.catalogItem.findUnique({
        where: {
          catalogId_code: {
            catalogId: catalog.id,
            code: itemData.code,
          },
        },
      });

      if (!existingItem) {
        await prisma.catalogItem.create({
          data: {
            catalogId: catalog.id,
            code: itemData.code,
            name: itemData.name,
            description: itemData.description,
            order: itemData.order,
            isActive: true,
            metadata: itemData.metadata ? JSON.stringify(itemData.metadata) : null,
          },
        });
        console.log(`   ✅ Item creado: ${itemData.name}`);
      } else {
        await prisma.catalogItem.update({
          where: { id: existingItem.id },
          data: {
            name: itemData.name,
            description: itemData.description,
            order: itemData.order,
            metadata: itemData.metadata ? JSON.stringify(itemData.metadata) : null,
          },
        });
        console.log(`   🔄 Item actualizado: ${itemData.name}`);
      }
    }
  }

  console.log('\n✨ Seed de catálogos completado exitosamente!');
}

async function main() {
  try {
    await seedCatalogs();
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
