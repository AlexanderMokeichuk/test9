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

export interface ApiFormTransaction {
  type: string,
  category: string,
  amount: string,
}

export interface FormTransaction extends ApiFormTransaction {
  id: string
  createdAt: string,
}

export interface ApiTransaction {
  category: string,
  amount: string,
  createdAt: string,
}

export interface EditApiTransaction extends ApiTransaction{
  id: string
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface Transaction extends ApiCategory {
  id: string,
  amount: string,
  createdAt: string,
}

