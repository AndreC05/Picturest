

export default function Home() {
  const images = [
    { src: "chongqing.jpg", title: "Chongqing, China" },
    { src: "LA.jpg", title: "Los Angeles, U.S.A" },
    { src: "hawaii.jpg", title: "Hawaii, U.S.A" },
  ];
  return(
    <div className="styles.container">
      <h1 className="flex justify-center font-bold text-xl">Welcome to Picturest</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:gap-3  lg:grid-cols-3 ">
        {images.map((image, index) => (
          <div key={index} className=" flex p-5 m-5 border bg-neutral-200 flex-col w-80 rounded-2xl gap-5 lg:w-[400px]">
            <img src={image.src} alt={image.title} className="w-72 h-64 md:w-[396px]" />
            <h2 className="flex justify-center font-semibold">{image.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )

}
