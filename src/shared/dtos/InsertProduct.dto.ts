export interface InsertProductDto {
    name: string;
    price: number;
    categoryId?: number;
    image: string;
}