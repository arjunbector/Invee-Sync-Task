export const data = {
    "orders": [
        {
            "id": 1,
            "customer": "Customer A",
            "items": [
                { "id": 1, "name": "Item 1", "quantity": 5 },
                { "id": 2, "name": "Item 2", "quantity": 3 }
            ],
            "status": "Pending"
        },
        {
            "id": 4,
            "customer": "Customer D",
            "items": [
                { "id": 1, "name": "Item 1", "quantity": 1 },
                { "id": 2, "name": "Item 2", "quantity": 2 },
                { "id": 3, "name": "Item 3", "quantity": 3 }
            ],
            "status": "Completed"
        },
        {
            "id": 5,
            "customer": "Customer E",
            "items": [
                { "id": 4, "name": "Item 4", "quantity": 1 },
                { "id": 5, "name": "Item 5", "quantity": 2 },
                { "id": 2, "name": "Item 2", "quantity": 6 },
                { "id": 1, "name": "Item 1", "quantity": 1 },
            ],
            "status": "Pending"
        },
        {
            "id": 2,
            "customer": "Customer B",
            "items": [
                { "id": 1, "name": "Item 1", "quantity": 2 },
                { "id": 3, "name": "Item 3", "quantity": 1 }
            ],
            "status": "Completed"
        },
        {
            "id": 3,
            "customer": "Customer C",
            "items": [
                { "id": 2, "name": "Item 2", "quantity": 4 },
                { "id": 3, "name": "Item 3", "quantity": 2 }
            ],
            "status": "Pending"
        }
    ],
    "items": [
        { "id": 1, "name": "Item 1", "stock": 20 },
        { "id": 2, "name": "Item 2", "stock": 15 },
        { "id": 3, "name": "Item 3", "stock": 0 },
        { "id": 4, "name": "Item 4", "stock": 25 },
        { "id": 5, "name": "Item 5", "stock": 30 },
        { "id": 6, "name": "Item 6", "stock": 10 },
        { "id": 7, "name": "Item 7", "stock": 5 }
    ]
}