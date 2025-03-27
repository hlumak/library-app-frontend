export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  membershipNumber: string;
  memberSince: string;
  borrowedItems: BorrowedItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BorrowedItem {
  id: string;
  itemId: string;
  itemType: 'book' | 'movie';
  title: string;
  borrowDate: string;
  dueDate: string;
  returnedDate?: string;
}

export interface PersonFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}