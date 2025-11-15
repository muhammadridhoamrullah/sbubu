import { ObjectId } from "mongodb";
import { getDb } from "../config";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import { UserModel } from "../type/user";
import {
  generateOverlayKey,
  sendNotificationLogin,
  sendVerificationEmail,
} from "../utils/utils";
import * as jose from "jose";

type UserInputRegister = Omit<UserModel, "_id" | "lastLoginAt" | "deletedAt">;
type UserInputLogin = {
  identifier: string;
  password: string;
};

const COLL = "users";

export async function registerUser(input: UserInputRegister) {
  const db = await getDb();

  const cekUser = await db.collection(COLL).findOne({
    email: input.email,
  });

  if (cekUser) {
    throw new Error("Email already registered");
  }

  let createOverlayKey = generateOverlayKey();

  const finalInput: UserInputRegister = {
    ...input,
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    avatarUrl: "/defaultAvatar.jpg",
    phoneNumber: "",
    password: hashPassword(input.password),
    bio: "",
    bannerUrl: "/defaultBanner.jpg",
    overlayKey: createOverlayKey,
    alertSettings: {
      duration: 5000,
      animationEffect: "fade",
      notificationSound: "/alamakDuitNi.mp3",
      volumeNotification: 100,
      fontSize: 16,
      position: "center-top",
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      textAmountColor: "#FFFF00",
    },
    bankAccount: {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    },
    socialMediaLinks: {
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    },
    voiceNoteSettings: {
      status: false,
      minimumAmount: 10,
      maximalVoiceNotesTime: 120,
      volumeVoiceNotes: 100,
    },
  };

  const creatingUser = await db.collection(COLL).insertOne(finalInput);

  if (!creatingUser.acknowledged) {
    throw new Error("Register user failed");
  }

  const token = signToken({
    _id: creatingUser.insertedId.toString(),
  });

  const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/verifyEmail?token=${token}`;

  const dataVerif = {
    email: input.email,
    username: input.username,
    link: link,
  };
  await sendVerificationEmail(dataVerif);

  return {
    message: "Register user successful, please verify your email",
  };
}

export async function verifyEmail(token: string) {
  const db = await getDb();

  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const decoded = await jose.jwtVerify<{ _id: string }>(token, secret);

  const userId = decoded.payload._id;

  const cekUser = await db.collection(COLL).findOne({
    _id: new ObjectId(userId),
  });

  if (!cekUser) {
    throw new Error("User not found");
  }

  if (cekUser.isEmailVerified) {
    throw new Error("Email already verified");
  }

  const updatingUser = await db.collection(COLL).updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        isEmailVerified: true,
        updatedAt: new Date(),
      },
    }
  );

  if (updatingUser.modifiedCount === 0) {
    throw new Error("Verify email failed");
  }

  return {
    message: "Email verified successfully",
  };
}

export async function loginUser(input: UserInputLogin) {
  const db = await getDb();

  const findUser = (await db.collection(COLL).findOne({
    $or: [{ email: input.identifier }, { username: input.identifier }],
  })) as UserModel | null;

  if (!findUser) {
    throw new Error("User not found");
  }

  const comparePass = comparePassword(input.password, findUser.password);

  if (!comparePass) {
    throw new Error("Invalid password");
  }

  if (!findUser.isEmailVerified) {
    throw new Error("Email not verified");
  }

  const updateLastLogin = await db.collection(COLL).updateOne(
    {
      _id: new ObjectId(findUser._id),
    },
    {
      $set: {
        lastLoginAt: new Date(),
      },
    }
  );

  if (updateLastLogin.modifiedCount === 0) {
    throw new Error("Update last login failed");
  }

  const accessToken = signToken({
    _id: findUser._id.toString(),
  });

  await sendNotificationLogin(findUser.email);
  return accessToken;
}

//   _id: string;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   role?: string;
//   phoneNumber?: string;
//   avatarUrl?: string;
//   overlayKey: string;
//   isEmailVerified: boolean;
//   lastLoginAt?: Date;
//   bio?: string;
//   bannerUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
//   bankAccount?: BankAccount;
//   socialMediaLinks?: SocialMediaLinks;
//   alertSettings?: AlertSettings;
//   voiceNoteSettings?: VoiceNoteSettings;
//   deletedAt?: Date;
