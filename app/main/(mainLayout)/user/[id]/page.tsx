import UserAbout from "@/components/UserAbout";
import TabsComp from "@/components/TabsComp";
import { prisma } from "@/lib/db/prisma";

export default async function UserPage(props: { params: { id: string } }) {
  const {
    params: { id: userId },
  } = props;

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });
  const bookings = await prisma.booking.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      userId: user?.id,
    },
    include: {
      activity: true,
    },
  });

  const reviews = await prisma.review.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      userId: user?.id,
    },
    include: {
      activity: true,
    },
  });

  return (
    <div className="container mx-auto px-2 md:px-4 mt-20 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <UserAbout userId={user?.userId!} userAbout={user?.about!} />
        <div className="md:col-span-7 lg:col-span-8">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">
              Hello, {user?.fName} {user?.lName}
            </h5>
          </div>
          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8">
            <TabsComp
              bookings={bookings}
              reviews={reviews}
              userId={user?.userId!}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
