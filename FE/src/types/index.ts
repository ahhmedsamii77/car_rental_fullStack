import type { IconType } from "react-icons";

export type SidebarLinksType = {
  name: string;
  path: string;
  icon: IconType;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image?: File | null;
};


export type LoginType = {
  email: string;
  password: string;
};

export type ConfirmEmailType = {
  email: string;
  otp: string;
};

export type ResendOtpType = {
  email: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type VerifyResetOtpType = {
  email: string;
  otp: string;
};

export type ResetPasswordType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  refershToken: string | null;
  setRefershToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>
};

export type DecodedType = {
  id: string;
  iat: number;
  exp: number;
  role: string;
};

export type CarType = {
  location: string;
  price_per_day: number;
  description: string;
  transmission: string;
  fuel_type: string;
  price: number;
  seating_capacity: number;
  category: string;
  year: number;
  model: string;
  brand: string;
  image: File | null;
  _id?: string;
};

export type CarResType = {
  owner: string;
    location: string;
  price_per_day: number;
  description: string;
  transmission: string;
  fuel_type: string;
  price: number;
  seating_capacity: number;
  category: string;
  year: number;
  model: string;
  brand: string;
  image: {
    secure_url: string;
    public_id: string;
  };
  _id: string;
  isAvailable: boolean;
  hasActiveBookings?: boolean;
}

export type BookingType = {
  carId: string;
  pickupDate: string;
  returnDate: string;
};

export type BookingResType = {
  owner: string;
  pickupDate: string;
  returnDate: string;
  status: string;
  _id: string;
  price: number;
  carId: CarResType;
  createdAt: string;
}

export type DashboardType = {
  cars: CarResType[];
  bookings: BookingResType[];
  pendingBookings: BookingResType[];
  completedBookings: BookingResType[];
  monthlyEarnings: number;
  totalEarnings: number;
  totalCars: number;
  totalBookings: number;
};



export type UserInfoType = {
  name: string;
  email: string;
  profileImage: {
    secure_url: string;
    public_id: string;
  };
};



export type AvailableCarType = {
  location: string;
  pickupDate: string;
  returnDate: string;
}

