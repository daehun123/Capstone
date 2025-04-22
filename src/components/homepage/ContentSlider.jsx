import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useContentDataStore from "../../store/useContentDataStore";

const ContentSlider = ({ onItemClick }) => {
  const { items } = useContentDataStore();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className=" min-h-80 p-4 bg-white pb-6">
      <h2 className="text-xl font-extrabold text-[#034AA6] pb-6">
        Today&apos;s Show
      </h2>
      <Slider {...settings} className="w-full">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full min-h-64 cursor-pointer transition duration-200 hover:bg-gray-50"
          >
            <figure
              tabIndex={-1}
              className="flex flex-col items-center justify-center space-y-2 "
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                tabIndex={-1}
                className=" h-52 object-cover rounded-lg"
              />
              <figcaption className="text-center font-bold text-lg">
                {item.name}
              </figcaption>
            </figure>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ContentSlider;
