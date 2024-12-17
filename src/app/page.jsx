

export default function Home() {
  const images = [
    { src: "https://wallpaperaccess.com/full/4365626.jpg", title: "Chongqing, China" },
    { src: "https://wallpapercave.com/wp/wp6860393.jpg", title: "Los Angeles, U.S.A" },
    { src: "https://wallpaperaccess.com/full/411632.jpg", title: "Hawaii, U.S.A" },
  ];
  return(
    <div className="styles.container">
      <h1 className="styles.heading">Welcome to Picturest</h1>
      <div>
        {images.map((image, index) => (
          <div key={index} className="styles.card">
            <img src={image.src} alt={image.title} className="styles.image w-96 flex  border bg-neutral-200 p-5 flex-col m-5 w-96 rounded-2xl gap-5" />
            <h2 className="styles.title">{image.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )

}
