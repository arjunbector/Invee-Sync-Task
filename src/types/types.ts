export interface Item {
    id: number;
    name: string;
    quantity?: number;
    stock?: number;
}

export interface Order {
    id: number;
    customer: string;
    items: Item[];
    status: string;
}
