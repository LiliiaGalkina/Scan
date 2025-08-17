import style from "./result.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowright from "./img/arrowright.svg";
import { useEffect, useState } from "react";

const vremData = [
  {
    period: "10.09.2021",
    total: 5,
    risks: 0,
  },
  {
    period: "13.09.2021",
    total: 2,
    risks: 0,
  },
  {
    period: "17.09.2021",
    total: 6,
    risks: 0,
  },
  {
    period: "20.09.2021",
    total: 8,
    risks: 2,
  },
  {
    period: "12.10.2021",
    total: 1,
    risks: 0,
  },
  {
    period: "15.10.2021",
    total: 10,
    risks: 2,
  },
  {
    period: "16.10.2021",
    total: 4,
    risks: 0,
  },
  {
    period: "17.10.2021",
    total: 3,
    risks: 0,
  },
  {
    period: "18.10.2021",
    total: 6,
    risks: 1,
  },
  {
    period: "19.10.2021",
    total: 4,
    risks: 0,
  },
];

interface IHistogramsProps {
  histogramItems: any;
}

interface IHistogramsItem {
  period: string;
  total: number;
  risks: number;
}

const Histograms: React.FC<IHistogramsProps> = ({ histogramItems }) => {
  const [dataItems, setDataItems] = useState<IHistogramsItem[]>([]);

  useEffect(() => {
    if (histogramItems) {
      //setDataItems(histogramItems);
      setDataItems(vremData);
    }
  });

  const SlickButtonFix = ({
    currentSlide,
    slideCount,
    children,
    ...props
  }: any) => <div {...props}>{children}</div>;

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 7,
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
            src={arrowright}
            className={style.arrowleft}
            alt="стрелка влево"
          />
        </div>
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className={style.histogramsblock}>
      
        <div className={style.histogramsheader}>
          <div className={style.histogramsheaderitem}>Период</div>
          <div className={style.histogramsheaderitem}>Всего</div>
          <div className={style.histogramsheaderitem}>Риски</div>
        </div>
        <div className={style.histogramsslider}>
          <Slider {...settings}>
            {dataItems.map((item, index) => (
              <div key={index} className={style.histogramsslideritem}>
                <div className={style.histogramsslideritemceil}>
                  {item.period}
                </div>
                <div className={style.histogramsslideritemceil}>
                  {item.total}
                </div>
                <div className={style.histogramsslideritemceil}>
                  {item.risks}
                </div>
              </div>
            ))}
          </Slider>
        </div>
   
    </div>
  );
};

export default Histograms;
