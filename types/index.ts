export type Category =
    | 'beauty'
    | 'fragrances'
    | 'furniture'
    | 'groceries'
    | 'home-decoration'
    | 'kitchen-accessories'
    | 'laptops'
    | 'mens-shirts'
    | 'mens-shoes'
    | 'mens-watches'
    | 'mobile-accessories'
    | 'motorcycle'
    | 'skin-care'
    | 'smartphones'
    | 'sports-accessories'
    | 'sunglasses'
    | 'tablets'
    | 'tops'
    | 'vehicle'
    | 'womens-bags'
    | 'womens-dresses'
    | 'womens-jewellery'
    | 'womens-shoes'
    | 'womens-watches';

export type Review = { rating: number; comment: string; date: string; reviewerName: string; reviewerEmail: string };

export type Product = {
    id: number;
    title: string;
    description: string;
    category: Category;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
};

export type ProductResponse = { products: Product[]; total: number; skip: number; limit: number };
