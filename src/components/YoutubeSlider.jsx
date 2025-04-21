import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useYoutubeDataStore from "../store/useYoutubeDataStore";

const YoutubeSlider = ({ onItemClick }) => {
  const { items } = useYoutubeDataStore();
  const settings = {
    dots: false,
    infinity: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };
  return (
    <section className="w-full min-h-50 border-t-2">
      <h2 className="flex flex-col items-start pt-4 pl-4">
        <p className="text-xl text-[#034AA6] font-extrabold">Your Vibe</p>
        <p className="text-gray-500 font-semibold text-sm">
          취향에 쏙 들거에요
        </p>
      </h2>
      <div className="w-full mt-2 ">
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-1">
              <figure className="overflow-hidden rounded-lg shadow-sm cursor-pointer">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-lg"
                  onClick={() => onItemClick(item)}
                />
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default YoutubeSlider;
