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

  // ✅ unique groupId 기준으로 그룹핑
  const uniqueGroups = Array.from(
    new Map(items.map((item) => [item.groupId, item])).values()
  );

  return (
    <section className=" min-h-80 p-4 bg-white pb-6">
      <h2 className="text-xl font-extrabold text-[#034AA6] pb-6">
        Today&apos;s Show
      </h2>
      <Slider {...settings} className="w-full">
        {uniqueGroups.map((item) => (
          <div
            key={item.groupId}
            onClick={() => onItemClick(item)}
            className="w-full min-h-64 cursor-pointer transition duration-200 hover:bg-gray-50"
          >
            <figure
              tabIndex={-1}
              className="flex flex-col items-center justify-center space-y-2 "
            >
              <img
                src={item.image}
                alt={item.groupId}
                tabIndex={-1}
                className=" h-52 object-cover rounded-lg"
              />
              <figcaption className="text-center font-bold text-lg">
                {item.groupId}
              </figcaption>
            </figure>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ContentSlider;
