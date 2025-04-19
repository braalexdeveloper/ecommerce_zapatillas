import { Repository } from "typeorm";
import { Shoe } from "./shoe.entity";
import { AppDataSource } from "../config/database";
import { NotFoundError } from "../errors/NotFoundError";
import { ShoeInterface } from "./shoe.interface";
import { Category } from "../categories/category.entity";
import { Size } from "../sizes/size.entity";
import { Brand } from "../brands/brand.entity";
import { Image } from "../images/image.entity";
import { CategoryShoe } from "../relations/category-shoe.entity";
import { ShoeSize } from "../relations/shoe-size.entity";

export class ShoeService {
    private shoeRepository: Repository<Shoe>;


    constructor() {
        this.shoeRepository = AppDataSource.getRepository(Shoe);

    }

    async getShoes() {
        return await this.shoeRepository.find();
    }

    async getShoe(id: number) {
        const shoeFound = await this.shoeRepository.findOne({
            where: { id },
            relations: ["brand", "categoryShoes.category", "shoeSizes.size"]
        });
        if (!shoeFound) throw new NotFoundError("Zapatilla no encontrada");
        return shoeFound;
    }

    async createShoe(shoe: ShoeInterface,files:any) {
        const { categories, sizes, brand_id,...shoeData } = shoe;
        
        return await AppDataSource.transaction(async (manager) => {
            const shoeRepo = manager.getRepository(Shoe);
            const categoryRepo = manager.getRepository(Category);
            const sizeRepo = manager.getRepository(Size);
            const brandRepo = manager.getRepository(Brand);
            const categoryShoeRepo = manager.getRepository(CategoryShoe);
            const sizeShoeRepo = manager.getRepository(ShoeSize);
            const imageRepo=manager.getRepository(Image);

            // Crear la zapatilla
            const createdShoe = shoeRepo.create(shoeData);

            // Asociar marca si se proporciona
            if (brand_id) {
                const brand = await brandRepo.findOneBy({ id: brand_id });
                if (!brand) throw new NotFoundError('Marca no encontrada');
                createdShoe.brand = brand;
            }

            

            // Guardar la zapatilla
            const shoeSaved = await shoeRepo.save(createdShoe);

            // Asociar categorías (CategoryShoe)
            if (categories && categories.length > 0) {
                const existingCategories = await categoryRepo.findByIds(categories);
                if (existingCategories.length !== categories.length) {
                    throw new NotFoundError("Una o más categorías no existen");
                }

                const categoryShoes = existingCategories.map(category =>
                    categoryShoeRepo.create({
                        shoe: shoeSaved,
                        category: category
                    })
                );

                await categoryShoeRepo.save(categoryShoes);
            }

            // Asociar tallas (ShoeSize)
            if (sizes && sizes.length > 0) {
                const sizeIds = sizes.map((s: any) => s.id);
                const existingSizes = await sizeRepo.findByIds(sizeIds);
                console.log(existingSizes)
                const sizeShoes = existingSizes.map(size => {
                    const inputSize = sizes.find((s: any) => s.id === size.id);
                    return sizeShoeRepo.create({
                        shoe: shoeSaved,
                        size,
                        stock: inputSize?.stock || 0
                    });
                });

                await sizeShoeRepo.save(sizeShoes);
            }

            //images
            const arrayImages=files.map((file:any)=>{
                return {
                 url: `/uploads/${file.filename}`,
                }
             });
             
             if(arrayImages.length>0){
              const imageEntities=arrayImages.map((el:any)=>{
                return imageRepo.create({
                    url:el.url,
                    shoe:shoeSaved
                });
              });
              await imageRepo.save(imageEntities);
              shoeSaved.images=imageEntities;
             }

            return shoeSaved;
        });
    }

    async deleteShoe(id: number) {
        const shoe = await this.shoeRepository.findOne({
            where: { id }
        });

        if (!shoe) {
            throw new NotFoundError("Zapatilla no encontrada");
        }

        // Opcional: Si deseas eliminar manualmente relaciones (dependiendo del cascade en tu entidad)
        // También puedes usar `AppDataSource.transaction` si quieres asegurarte de todo

        await this.shoeRepository.remove(shoe);

        return "Zapatilla eliminada correctamente";
    }


}