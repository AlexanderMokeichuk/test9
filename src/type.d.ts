export interface ApiCategory {
  name: string,
  type: string,
}

export interface ApiCategories {
  [id:string]: ApiCategory,
}

export interface Category extends ApiCategory {
  id: string
}

export interface FormTransaction {
  type: string,
  category: string,
  amount: string,
}
export interface ApiTransaction {
  category: string,
  amount: string,
  createdAt: string,
}