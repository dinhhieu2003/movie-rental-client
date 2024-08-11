export interface PaymentInfo {
    id: string;
    createdAt: string | null;
    updatedAt: string | null;
    isActive: boolean;
    isDeleted: boolean;
    bankName: string;
    cardNumber: string;
    cardHolderName: string;
    issueDate: string;
  }
  