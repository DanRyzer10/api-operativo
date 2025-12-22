/**
 * Script de ejemplo para demostrar el uso del sistema de catálogos
 * 
 * Para ejecutar:
 * ts-node examples/catalog-example.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde .env.development
config({ path: resolve(__dirname, '../.env.development') });

import { prisma } from '../src/Shared/Infrastructure/PrismaClient';
import CatalogService, {
  CLIENT_STATUS,
  CLIENT_SOURCE,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  BOT_TYPE,
  BUSINESS_SUBSCRIPTION,
  CATALOG_CODES,
} from '../src/Shared/Infrastructure/CatalogService';

async function demonstrateCatalogSystem() {
  console.log('🚀 Demostración del Sistema de Catálogos\n');

  try {
    // 1. Pre-cargar catálogos en memoria para mejor rendimiento
    console.log('1️⃣ Pre-cargando catálogos en memoria...');
    await CatalogService.preloadCatalogs();
    console.log('   ✅ Catálogos cargados\n');

    // 2. Listar todos los items de un catálogo
    console.log('2️⃣ Listando estados de orden disponibles:');
    const orderStatuses = await CatalogService.getCatalogItems(CATALOG_CODES.ORDER_STATUS);
    orderStatuses.forEach((status) => {
      const metadata = status.metadata ? JSON.parse(status.metadata) : {};
      console.log(`   📦 ${status.name} (${status.code})`);
      console.log(`      Descripción: ${status.description}`);
      if (metadata.color) console.log(`      Color: ${metadata.color}`);
    });
    console.log('');

    // 3. Obtener ID de un item específico
    console.log('3️⃣ Obteniendo IDs de catálogos específicos...');
    const activeStatusId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.CLIENT_STATUS,
      CLIENT_STATUS.ACTIVE
    );
    console.log(`   Estado ACTIVE de cliente: ${activeStatusId}\n`);

    // 4. Ejemplo: Crear un usuario administrador (necesario para las relaciones)
    console.log('4️⃣ Creando usuario administrador de ejemplo...');
    
    // Primero verificar si ya existe un business
    let business = await prisma.business.findFirst();
    
    if (!business) {
      // Obtener ID de suscripción FREE
      const freeSubscriptionId = await CatalogService.getCatalogItemId(
        CATALOG_CODES.BUSINESS_SUBSCRIPTION,
        BUSINESS_SUBSCRIPTION.FREE
      );

      business = await prisma.business.create({
        data: {
          name: 'Negocio Demo',
          whatsappId: 'demo_' + Date.now(),
          subscriptionId: freeSubscriptionId,
        },
      });
      console.log(`   ✅ Negocio creado: ${business.name}`);
    } else {
      console.log(`   ℹ️  Usando negocio existente: ${business.name}`);
    }

    // Buscar o crear usuario
    let user = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: 'Admin Demo',
          email: `admin_${Date.now()}@demo.com`,
          role: 'ADMIN',
          businessId: business.id,
        },
      });
      console.log(`   ✅ Usuario creado: ${user.name}\n`);
    } else {
      console.log(`   ℹ️  Usando usuario existente: ${user.name}\n`);
    }

    // 5. Ejemplo: Crear un cliente usando catálogos
    console.log('5️⃣ Creando cliente con catálogos...');
    
    const whatsappSourceId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.CLIENT_SOURCE,
      CLIENT_SOURCE.WHATSAPP
    );

    const client = await prisma.client.create({
      data: {
        phoneNumber: `+1234567890${Date.now().toString().slice(-4)}`,
        fullName: 'Juan Pérez Demo',
        email: 'juan@example.com',
        statusId: activeStatusId,
        sourceId: whatsappSourceId,
      },
      include: {
        status: true,
        source: true,
      },
    });

    console.log(`   ✅ Cliente creado: ${client.fullName}`);
    console.log(`      Estado: ${client.status?.name}`);
    console.log(`      Fuente: ${client.source?.name}\n`);

    // 6. Ejemplo: Crear un bot usando catálogos
    console.log('6️⃣ Creando bot de ventas...');
    
    const salesBotTypeId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.BOT_TYPE,
      BOT_TYPE.SALES
    );

    const bot = await prisma.bot.create({
      data: {
        name: 'Bot de Ventas Demo',
        description: 'Bot automático para procesar ventas',
        botTypeId: salesBotTypeId,
        createdBy: user.id,
      },
      include: {
        botType: true,
      },
    });

    console.log(`   ✅ Bot creado: ${bot.name}`);
    console.log(`      Tipo: ${bot.botType?.name}\n`);

    // 7. Ejemplo: Crear una orden usando catálogos
    console.log('7️⃣ Creando orden con catálogos...');
    
    const pendingOrderStatusId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.ORDER_STATUS,
      ORDER_STATUS.PENDING
    );
    const cashPaymentMethodId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.PAYMENT_METHOD,
      PAYMENT_METHOD.CASH
    );
    const pendingPaymentStatusId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.PAYMENT_STATUS,
      PAYMENT_STATUS.PENDING
    );

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        total: 150.00,
        statusId: pendingOrderStatusId,
        paymentMethodId: cashPaymentMethodId,
        paymentStatusId: pendingPaymentStatusId,
        businessId: business.id,
        clientId: client.id,
        botId: bot.id,
      },
      include: {
        status: true,
        paymentMethod: true,
        paymentStatus: true,
        client: {
          include: {
            status: true,
          },
        },
      },
    });

    console.log(`   ✅ Orden creada: ${order.orderNumber}`);
    console.log(`      Total: $${order.total}`);
    console.log(`      Estado: ${order.status?.name}`);
    console.log(`      Método de Pago: ${order.paymentMethod?.name}`);
    console.log(`      Estado de Pago: ${order.paymentStatus?.name}`);
    console.log(`      Cliente: ${order.client.fullName} (${order.client.status?.name})\n`);

    // 8. Ejemplo: Actualizar estado de orden
    console.log('8️⃣ Actualizando estado de la orden...');
    
    const processingStatusId = await CatalogService.getCatalogItemId(
      CATALOG_CODES.ORDER_STATUS,
      ORDER_STATUS.PROCESSING
    );

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { statusId: processingStatusId },
      include: { status: true },
    });

    console.log(`   ✅ Estado actualizado: ${updatedOrder.status?.name}\n`);

    // 9. Ejemplo: Consultar con metadata
    console.log('9️⃣ Mostrando metadata de tipos de bot:');
    const botTypes = await CatalogService.getCatalogItems(CATALOG_CODES.BOT_TYPE);
    botTypes.forEach((type) => {
      const metadata = type.metadata ? JSON.parse(type.metadata) : {};
      console.log(`   🤖 ${type.name}`);
      if (metadata.icon) console.log(`      Icono: ${metadata.icon}`);
      if (metadata.defaultFlow !== undefined) {
        console.log(`      Flujo por defecto: ${metadata.defaultFlow ? 'Sí' : 'No'}`);
      }
    });
    console.log('');

    // 10. Ejemplo: Listar planes de suscripción con precios
    console.log('🔟 Planes de suscripción disponibles:');
    const subscriptions = await CatalogService.getCatalogItems(
      CATALOG_CODES.BUSINESS_SUBSCRIPTION
    );
    subscriptions.forEach((sub) => {
      const metadata = sub.metadata ? JSON.parse(sub.metadata) : {};
      console.log(`   💼 ${sub.name} - $${metadata.price || 0}/mes`);
      console.log(`      ${sub.description}`);
      if (metadata.maxUsers > 0) console.log(`      Usuarios: ${metadata.maxUsers}`);
      if (metadata.maxUsers === -1) console.log(`      Usuarios: Ilimitados`);
    });
    console.log('');

    console.log('✨ Demostración completada exitosamente!');
    console.log('\n📝 Nota: Los datos de prueba fueron creados en la base de datos.');
    console.log('   Revisa la documentación en docs/CATALOG_SYSTEM.md para más información.\n');

  } catch (error) {
    console.error('❌ Error en la demostración:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la demostración
demonstrateCatalogSystem()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
