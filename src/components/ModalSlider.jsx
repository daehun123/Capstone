import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ModalSlider = ({ data }) => {
  const settings = {
    dots: false,
    Infinity: true,
    speed: 500,
    slidesToShow: 2,
    slideToScroll: 1,
    arrows: false,
  };
  return (
    <section className="min-h-32 p-2 bg-white">
      {/* <Slider {...settings} className="w-full">
        {data.map((item) => (
          <div key={item.id} className="w-full"></div>
        ))}
      </Slider> */}
    </section>
  );
};

export default ModalSlider;
