export interface Category {
    _id: string,
    name: string,
    parentCategory: Category
    properties: CategoryProperty[]
    childCategories: string[]
}

export interface CategoryProperty {
    name: string,
    value: string
}