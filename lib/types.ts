
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
    slug: string

};
  