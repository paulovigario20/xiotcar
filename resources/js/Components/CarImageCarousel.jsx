// resources/js/Components/CarImageCarousel.jsx
import Slider from "react-slick";

export default function CarImageCarousel({ images = [] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-60 object-cover rounded"
                />
            ))}
        </Slider>
    );
}
