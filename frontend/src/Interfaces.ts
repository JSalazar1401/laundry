interface IService{
    name:string;
    quantity:number;
    unitPrice:number;
}

interface IServiceBackend{
    id?:number;
    name:string;
    description:string;
    price:number;
}

interface IGarments{
    id?:number;
    type:string;
    description:string;
    observations:string;
    services:IService[]
}

interface IOrder{
    id?:number;
    client_id:number;
    user_id:number;
    created_at?:Date | string;
    estimated_delivery_date?:Date | string;
    real_delivery_date?:Date | string;
    state:string;
    total:number;
    pagado:boolean;
    garments?:IGarments[]
}

interface IOrderTable{
    id?:number;
    client_name:string;
    user_name:string;
    created_at:string;
    state:string;
    total:number;
}

interface Counting{
    quantity_garments:number;
    quantity_services:number;
    quantity_users:number;
    quantity_clients:number;
}

export type {
    IOrder,
    IGarments,
    IService,
    IOrderTable,
    Counting,
    IServiceBackend
}