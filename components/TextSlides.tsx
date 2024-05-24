

export default function TextSlides(){
    return(
        <div className="flex text-[100px] md:text-[200px] text-green-900 font-semibold">
    <h1 className="absolute top-[20vh] left-[25vw]">
        Scroll
    </h1>
     <h1 className="absolute top-[20vh] left-[125vw]">
        Ready to
     </h1>
      <h1 className="absolute top-[20vh] left-[225vw]">
        Explore
      </h1>
      <h1 className="absolute top-[20vh] left-[325vw]">
        Click to continue...<span className="md:hidden">...</span>
      </h1>
        </div>
    )
}