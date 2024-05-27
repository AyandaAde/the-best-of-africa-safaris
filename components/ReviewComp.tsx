import { StarFilledIcon } from "@radix-ui/react-icons";



export default function ReviewComp() {
    const reviews = [
        {
            name: "John Doe",
            review: "This is a test review.",
            rating: 5,
        },
        {
            name: "Jane Doe",
            review: "This is another test review",
            rating: 4,
        },
        {
            name: "Bob Smith",
            review: "This is a third test review",
            rating: 5,
        },
    ];

  return (
    <>
    {
        reviews && reviews.map((review, index) => (
            <div
            key={index}
            className="bg-gray-100 text-sm md:text-base dark:bg-gray-900 p-4 rounded-lg max-h-[230px] md:max-h-[300px] overflow-y-scroll scrollbar-hide"
            >
                <div className="font-semibold text-base md:text-lg mb-2 flex flex-col md:flex-row items-start md:items-center">
                    <p>{review.name}</p>
                    <div className="my-1 md:my-0 md:ml-4 flex items-center">
                        {
                            Array.from({length: review.rating}).map((_, index) => (
                                <StarFilledIcon key={index} color={"orange"} className="w-5 h-5 md:w-6 md:h-6"/>
                            ))
                        }
                    </div>
                </div>
                <p>{review.review}</p>
            </div>
        ))
    }
    </>
  )
}