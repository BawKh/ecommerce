import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import { HashLoader } from "react-spinners";

export default function CategorySlider() {
  async function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const {data , isLoading} = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: getAllCategories,
    refetchOnMount: false,
    refetchInterval: 3000,
    cacheTime: 1000 * 60 * 60, // Cache for 1 hour
    enabled: true, 
  });

  if (isLoading) {
    return (
      <div className="d-flex bg-light text-white justify-content-center align-items-center vh-100">
        <HashLoader color='#888' size={60} />
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    Responsive: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data?.data.data.map((category) => (
        <div key={category._id} className="text-center">
          <img
            style={{ height: '300px' }}
            className="w-100"
            src={category.image}
            alt={category.name}
          />
          <h5>{category.name}</h5>
        </div>
      ))}
    </Slider>
  );
}