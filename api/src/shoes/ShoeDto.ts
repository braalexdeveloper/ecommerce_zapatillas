import { CategoryDto } from "../shared/dtos/CategoryDTO";
import { ImageDto } from "../shared/dtos/imageDto";
import { SizeDto } from "../shared/dtos/SizeDto";

export interface ShoeDto {
    id: number | string,
    name: string,
    description: string,
    price: number,
    brand: string,
    categories: CategoryDto[],
    sizes:SizeDto[],
    images:ImageDto[] | null
}