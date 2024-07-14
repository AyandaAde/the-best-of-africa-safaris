type ActivitiesActivities = {
  icon: string;
  name: string;
};

type ActivitiesDescription = {
  heading: string;
  text: string;
};

export type Activities = {
  id: string;
  activities: ActivitiesActivities[];
  description: ActivitiesDescription[];
  imageUrl: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
};

export type Booking = {
  id: string;
  activities: Activities;
  activityId: string;
  userId: string;
  userName: string;
  activityName: string;
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
  activity: {
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
  activityId: string;
  bookingId: string;
  updatedAt: Date;
  userId: string;
  rating: number;
  review: string;
  createdAt: Date;
};
