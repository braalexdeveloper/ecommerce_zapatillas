import { In, Repository } from "typeorm";
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
import { ShoeDto } from "./ShoeDto";

interface GetShoesOptions {
    page: number;
    limit: number;
    orderPrice: string;
    brandsIds: number[];
    categories: string[] | null;
}

export class ShoeService {
    private shoeRepository: Repository<Shoe>;


    constructor() {
        this.shoeRepository = AppDataSource.getRepository(Shoe);

    }


    async getShoes(options: GetShoesOptions) {

        const { page, limit, orderPrice, brandsIds, categories } = options;

        const query = this.shoeRepository.createQueryBuilder("shoe")
            .leftJoinAndSelect("shoe.brand", "brand")
            .leftJoinAndSelect("shoe.images", "images")
            .leftJoinAndSelect("shoe.categoryShoes", "categoryShoe")
            .leftJoinAndSelect("categoryShoe.category", "category");


        if (brandsIds && brandsIds.length > 0) {
            query.andWhere("brand.id IN (:...brandsIds)", { brandsIds });
        }

        if (categories && categories.length > 0) {
            query.andWhere("category.name IN (:...categories)", { categories });
        }

        query.orderBy("shoe.price", orderPrice?.toUpperCase() === "ASC" ? "ASC" : "DESC");

        const [shoes, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();


        return {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            items: shoes
        };
    }

    async getShoe(id: number): Promise<ShoeDto> {
        const shoeFound = await this.shoeRepository.findOne({
            where: { id },
            relations: ["brand", "categoryShoes.category", "shoeSizes.size", "images"]
        });
        if (!shoeFound) throw new NotFoundError("Zapatilla no encontrada");

        const shoe: ShoeDto = {
            id: shoeFound.id,
            name: shoeFound.name,
            description: shoeFound.description,
            price: shoeFound.price,
            brand: shoeFound.brand.name,
            categories: shoeFound.categoryShoes.map((c: any) => {
                return {
                    id: c.category.id,
                    name: c.category.name
                }
            }),
            sizes: shoeFound.shoeSizes.map((s: any) => {
                return {
                    size: s.size.size_value,
                    stock: s.stock
                }
            }),
            images: shoeFound.images ? shoeFound.images : null,
        };

        return shoe;
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
            let principal = Array.isArray(arrayImgsPrincipal) ? arrayImgsPrincipal : [arrayImgsPrincipal];
            const arrayImages = files.map((file: any, index: number) => {
                return {
                    url: `/uploads/${file.filename}`,
                    is_main: principal[index] === "true"
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

    async updateShoe(id: number, shoe: ShoeInterface, files: any) {
        let { categories, sizes, brand_id, arrayImgsPrincipal, idImages, ...shoeData } = shoe;

        return await AppDataSource.transaction(async (manager) => {
            const shoeRepo = manager.getRepository(Shoe);
            const categoryRepo = manager.getRepository(Category);
            const sizeRepo = manager.getRepository(Size);
            const brandRepo = manager.getRepository(Brand);
            const categoryShoeRepo = manager.getRepository(CategoryShoe);
            const sizeShoeRepo = manager.getRepository(ShoeSize);
            const imageRepo = manager.getRepository(Image);

            // Buscar la zapatilla a actualizar
            const shoeFound = await shoeRepo.findOne({
                where: { id },
                relations: ['brand', 'categoryShoes', 'shoeSizes', 'images']
            });

            if (!shoeFound) throw new NotFoundError('Zapatilla no encontrada');

            // Actualizar datos básicos
            Object.assign(shoeFound, shoeData);

            //Actualizar la marca
            if (brand_id) {
                const brand = await brandRepo.findOneBy({ id: brand_id });
                if (!brand) throw new NotFoundError('Marca no encontrada');
                shoeFound.brand = brand;
            }

            //Guardar cambios básicos
            const updateShoe = await shoeRepo.save(shoeFound);



            //Asociar nuevas categorias
            if (categories && categories.length > 0) {
                //Limpiar las categorias antiguas
                await categoryShoeRepo.delete({ shoe: { id } });

                const existingCategories = await categoryRepo.findByIds(categories);
                if (existingCategories.length !== categories.length) {
                    throw new NotFoundError('Una o más categorias no existen!');
                }

                const categoryShoeUpdate = existingCategories.map(category =>
                    categoryShoeRepo.create({
                        shoe: updateShoe,
                        category: category
                    })
                );

                await categoryShoeRepo.save(categoryShoeUpdate);
            }



            //Asociar nuevas tallas con stock
            let sizesJson = JSON.parse(sizes);
            if (sizesJson && sizesJson.length > 0) {
                //Limpiar tallas antiguas
                await sizeShoeRepo.delete({ shoe: { id } });

                const sizeIds = sizesJson.map((el: any) => el.id);
                const existingSizes = await sizeRepo.findByIds(sizeIds);
                if (existingSizes.length !== sizesJson.length) {
                    throw new NotFoundError('Una o más tallas no existen!');
                }
                const sizesShoesUpdate = existingSizes.map(size => {
                    const inputSize = sizesJson.find((s: any) => s.id === size.id);
                    return sizeShoeRepo.create({
                        shoe: updateShoe,
                        size: size,
                        stock: inputSize?.stock || 0
                    });
                }
                );
                await sizeShoeRepo.save(sizesShoesUpdate);

            }

            //Eliminar los archivos del sistema de archivos
            const imagesParse = JSON.parse(idImages || '[]');
            const safeIdImages = Array.isArray(imagesParse) ? imagesParse.map((el: any) => el.id) : [];
            console.log('imagenes', imagesParse)

            if (shoeFound.images && shoeFound.images.length > 0) {
                for (const image of shoeFound.images) {
                    if (!safeIdImages.includes(image.id)) {
                        const imagePath = path.join(process.cwd(), 'src', 'uploads', path.basename(image.url));
                        console.log(imagePath)
                        try {
                            if (fs.existsSync(imagePath)) {
                                fs.unlinkSync(imagePath);//Elimina el archivo fisico
                            }
                            // 🧹 Eliminar imágenes antiguas
                            await imageRepo.delete(image.id);
                        } catch (error) {
                            console.error(`Error eliminando archivo: ${imagePath}`, error);
                        }
                    }


                }

                if (imagesParse.length > 0) {
                    for (const element of imagesParse) {
                        const image = await imageRepo.findOneBy({ id: element.id });
                        if (!image) throw new NotFoundError('Imagen no encontrada para cambiar la principal');
                        image.is_main = element.is_main === true;
                        await imageRepo.save(image);
                    }
                }


            }
            //Guardar imagenes
            if (files && files.length > 0) {


                arrayImgsPrincipal = Array.isArray(arrayImgsPrincipal) ? arrayImgsPrincipal : [arrayImgsPrincipal];
                const arrayImages = files.map((file: any, index: number) => ({
                    url: `/uploads/${file.filename}`,
                    is_main: arrayImgsPrincipal[index] === "true"
                }));

                const imageEntities = arrayImages.map((el: any) =>
                    imageRepo.create({
                        url: el.url,
                        is_main: el.is_main,
                        shoe: updateShoe
                    })
                );

                await imageRepo.save(imageEntities);
            }

            return updateShoe;
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
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);//Elimina el archivo fisico
                    }
                } catch (error) {
                    console.error(`Error eliminando archivo: ${imagePath}`, error);
                }
            }
        }


        await this.shoeRepository.remove(shoe);

        return "Zapatilla eliminada correctamente";
    }


}