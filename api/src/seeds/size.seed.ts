import { AppDataSource } from "../config/database";
import { Size } from "../sizes/size.entity";


const seedSizes = async () => {
  try {
    await AppDataSource.initialize();
    const sizeRepo = AppDataSource.getRepository(Size);

    for (let i = 20; i <= 45; i++) {
      const exists = await sizeRepo.findOne({ where: { size_value: i } });
      if (!exists) {
        const size = sizeRepo.create({ size_value: i });
        await sizeRepo.save(size);
        console.log(`✔️  Insertado: Talla ${i}`);
      }
    }

    console.log('✅ Seeding completado');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error al insertar tallas:', error);
    process.exit(1);
  }
};

seedSizes();
