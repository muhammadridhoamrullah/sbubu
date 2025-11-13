export interface UserModel {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  overlayKey: string;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  bio?: string;
  bannerUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  bankAccount?: BankAccount;
  socialMediaLinks?: SocialMediaLinks;
  alertSettings?: AlertSettings;
  voiceNoteSettings?: VoiceNoteSettings;
  deletedAt?: Date;
}

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

interface SocialMediaLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

interface AlertSettings {
  duration: number;
  animationEffect: string;
  notificationSound: string;
  volumeNotification: number;
  fontSize: number;
  position: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  textAmountColor: string;
}

interface VoiceNoteSettings {
  status: boolean;
  minimumAmount: number;
  maximalVoiceNotesTime: number;
  volumeVoiceNotes: number;
}
