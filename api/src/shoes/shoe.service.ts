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

import * as fs from 'fs';
import * as path from 'path';

export class ShoeService {
    private shoeRepository: Repository<Shoe>;


    constructor() {
        this.shoeRepository = AppDataSource.getRepository(Shoe);

    }

    async getShoes() {
        return await this.shoeRepository.find({
            relations: ["brand", "images"]
        });
    }

    async getShoe(id: number) {
        const shoeFound = await this.shoeRepository.findOne({
            where: { id },
            relations: ["brand", "categoryShoes.category", "shoeSizes.size","images"]
        });
        if (!shoeFound) throw new NotFoundError("Zapatilla no encontrada");
        return shoeFound;
    }

    async createShoe(shoe: ShoeInterface, files: any) {
        const { categories, sizes, brand_id, arrayImgsPrincipal, ...shoeData } = shoe;

        return await AppDataSource.transaction(async (manager) => {
            const shoeRepo = manager.getRepository(Shoe);
            const categoryRepo = manager.getRepository(Category);
            const sizeRepo = manager.getRepository(Size);
            const brandRepo = manager.getRepository(Brand);
            const categoryShoeRepo = manager.getRepository(CategoryShoe);
            const sizeShoeRepo = manager.getRepository(ShoeSize);
            const imageRepo = manager.getRepository(Image);

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

            let parseSizes = JSON.parse(sizes);
            // Asociar tallas (ShoeSize)
            if (parseSizes && parseSizes.length > 0) {
                const sizeIds = parseSizes.map((s: any) => s.id);
                const existingSizes = await sizeRepo.findByIds(sizeIds);
                console.log(existingSizes)
                const sizeShoes = existingSizes.map(size => {
                    const inputSize = parseSizes.find((s: any) => s.id === size.id);
                    return sizeShoeRepo.create({
                        shoe: shoeSaved,
                        size,
                        stock: inputSize?.stock || 0
                    });
                });

                await sizeShoeRepo.save(sizeShoes);
            }

            //images
            const arrayImages = files.map((file: any, index: number) => {
                return {
                    url: `/uploads/${file.filename}`,
                    is_main: arrayImgsPrincipal[index] === "true"
                }
            });


            if (arrayImages.length > 0) {
                const imageEntities = arrayImages.map((el: any) => {
                    return imageRepo.create({
                        url: el.url,
                        is_main: el.is_main,
                        shoe: shoeSaved
                    });
                });
                await imageRepo.save(imageEntities);
                shoeSaved.images = imageEntities;
            }

            return shoeSaved;
        });
    }

    async deleteShoe(id: number) {
        const shoe = await this.shoeRepository.findOne({
            where: { id },
            relations: ["images"]
        });

        if (!shoe) {
            throw new NotFoundError("Zapatilla no encontrada");
        }

        //Eliminar los archivos del sistema de archivos
        if (shoe.images && shoe.images.length > 0) {
            for (const image of shoe.images) {
                const imagePath = path.join(process.cwd(), 'src', 'uploads', path.basename(image.url));
                console.log(imagePath)
                try {
                  if(fs.existsSync(imagePath)){
                    fs.unlinkSync(imagePath);//Elimina el archivo fisico
                  }
                } catch (error) {
                   console.error(`Error eliminando archivo: ${imagePath}`,error);
                }
            }
        }


        await this.shoeRepository.remove(shoe);

        return "Zapatilla eliminada correctamente";
    }


}