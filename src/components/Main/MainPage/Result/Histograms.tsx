import style from "./result.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowleft from "./img/arrowleft.svg";
import arrowright from "./img/arrowright.svg";
import { useEffect, useState } from "react";

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
    setDataItems(histogramItems);
		  
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
    slidesToShow: 8,
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
    <div className={style.histogramsblock}>
      <div className={style.histogramsbody}>
        <div className={style.histogramsheader}>
          <div className={style.histogramsheaderitem}>Период</div>
          <div className={style.histogramsheaderitem}>Всего</div>
          <div className={style.histogramsheaderitem}>Риски</div>
        </div>
        <Slider {...settings}>
          {dataItems.map((item, index) => (
            <div key={index} className={style.slideritem}>
				  <div className={style.slideritemceil}>{item.period}</div>
				  <div className={style.slideritemceil}>{item.total}</div>
				  <div className={style.slideritemceil}>{item.risks }</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Histograms;