import { StarFilledIcon } from "@radix-ui/react-icons";



export default function ReviewComp() {
    const reviews = [
        {
            name: "John Doe",
            review: "This is a test review",
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
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            >
                <div className="font-semibold mb-2 flex">
                    <p>{review.name}</p>
                    <div className="ml-4 flex items-center text-orange text-lg">
                        {
                            Array.from({length: review.rating}).map((_, index) => (
                                <StarFilledIcon key={index} color={"orange"} width={25} height={25}/>
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