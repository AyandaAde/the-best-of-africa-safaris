
type ToursActivities = {
    icon: string;
    name: string;
  };

  type ToursDescription = {
    heading: string;
    text: string;
  }

export type Tours = {
    id: string;
    activities: ToursActivities[]
    description: ToursDescription[]
    imageUrl: string;
    images: string[];
    name: string;
    price: number;
    slug: string;
};

export type Booking = {
  id: string;
  tour: Tours;
  tourId: string;
  userId: string;
  userName: string;
  tourName: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  noOfDays: number;
  discount: number;
  startDate: string;
  endDate: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};


export type Review = {
  tour: {
    id: string;
    imageUrl: string;
    images: string[];
    link: string | null;
    name: string;
    price: number;
    slug: string;
};
    user: {
        id: string;
        userId: string;
        fName: string | null;
        lName: string | null;
        email: string | null;
        image: string | null;
        about: string | null;
    };
    id: string;
    tourId: string;
    bookingId: string;
    updatedAt: Date;
    userId: string;
    rating: number;
    review: string;
    createdAt: Date;
}


  