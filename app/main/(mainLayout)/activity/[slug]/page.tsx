import ActivityGallery from "@/components/ActivityGallery";
import BookActivityCta from "@/components/BookActivityCta";
import ReviewComp from "@/components/ReviewComp";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function Activity({
  params,
}: {
  params: { slug: string };
}) {
  const user = await currentUser();

  const { id, firstName, lastName, imageUrl, emailAddresses } = user!;

  const slug = params.slug;

  const dbUser = await prisma.user.findUnique({ where: { userId: id } });
  if (!dbUser) {
    await prisma.user.create({
      data: {
        userId: id,
        fName: firstName,
        lName: lastName,
        email: emailAddresses[0].emailAddress,
        image: imageUrl,
      },
    });
  }

  const activity = await prisma.activity.findFirst({ where: { slug } });

  let reviews = [];
  if (activity?.name === "Volunteering") {
    reviews = await prisma.review.findMany({
      include: {
        user: true,
      },
    });
  } else {
    reviews = await prisma.review.findMany({
      where: {
        NOT: {
          activity: {
            name: "Volunteering",
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
  const activities = [
    "Arusha National park",
    "Tarangire National park",
    "Manyara National park",
    "Ngorongoro Crater",
    "Lake Eyasi Culture Tour",
  ];

  if (!activity) return <div>Activity not found</div>;

  return (
    <div className="mb-10 md:mb-20 md:pt-28">
      <ActivityGallery images={activity?.images!} />
      <div className="container mx-auto mt-8 md:mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-7 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-3xl">
                {activity?.name}
              </h2>
              <Separator className="mt-5 md:mt-11" />
              <div className="my-5 md:my-11">
                <h2 className="font-bold text-xl md:text-2xl mb-2">
                  Activities and Features
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {activity?.activities.map((activity, index) => (
                    <div key={index} className="flex items-center md:my-0 my-1">
                      <i className={`fa-solid md:fa-xl ${activity.icon}`} />
                      <p className="text-sm md:text-base ml-2">
                        {activity.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-5 md:my-11" />
              <div className="mb-5 md:mb-11">
                <h2 className="font-bold text-xl md:text-2xl mb-2">
                  Description
                </h2>
                {activity?.description.map((paragraph, index) => (
                  <div key={index}>
                    <h2 className="font-bold text-base md:text-lg mt-3 mb-2">
                      {paragraph.heading}
                    </h2>
                    <p className="text-sm">{paragraph.text}</p>
                  </div>
                ))}
                <h2 className="font-bold text-base md:text-lg mt-3 mb-2">
                  Each short trip is 7 days including day in and out from
                  arrival at KIA, visiting:
                </h2>
                <ul className="text-sm">
                  {activities.map((activity, index) => (
                    <li key={index}>
                      {index + 1}.{activity}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm md:text-base">
                  Book your dream trip Today!
                </p>
              </div>
              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ReviewComp reviews={reviews} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-5 rounded-xl shadow-xl dark:shadow dark:shadow-white sticky top-32 h-fit overflow-auto">
            <BookActivityCta
              discount={10}
              price={500}
              activityId={activity?.id!}
              userId={id!}
              activityName={activity?.name!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
