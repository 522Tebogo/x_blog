export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    createdAt: string;
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    url: string;
    categoryId: string;
    icon?: string;
    tags?: string[];
    featured?: boolean;
    createdAt: string;
}
