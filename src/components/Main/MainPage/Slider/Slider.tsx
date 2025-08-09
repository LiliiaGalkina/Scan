import watch from "../img/watch.svg";
import loupe from "../img/loupe.svg";
import lock from "../img/lock.svg";
import arrowleft from "../img/arrowleft.svg";
import arrowright from "../img/arrowright.svg";
import style from "./slider.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderItem {
  icon: string;
  text: string;
}

export default function SliderCustom() {
  const slides: SliderItem[] = [
    {
      icon: watch,
      text: "Высокая и оперативная скорость обработки заявки",
    },
    {
      icon: loupe,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      icon: lock,
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
    {
      icon: watch,
      text: "Высокая и оперативная скорость обработки заявки",
    },
    {
      icon: loupe,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      icon: lock,
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
  ];

  const SlickButtonFix = ({
    currentSlide,
    slideCount,
    children,
    ...props
  }: any) => <div {...props}>{children}</div>;

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SlickButtonFix>
        <div>
          <img
            src={arrowright}
            className={style.arrowright}
            alt="стрелка вправо"
          />
        </div>
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <div>
          <img
            src={arrowleft}
            className={style.arrowleft}
            alt="стрелка влево"
          />
        </div>
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={style.slider}>
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className={style.slideritem}>
            <img src={item.icon} className={style.slidericon} alt="иконка" />
            <div className={style.slidertext}>{item.text}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
