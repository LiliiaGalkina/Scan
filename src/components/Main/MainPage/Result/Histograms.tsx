import style from "./result.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowright from "./img/arrowright.svg";
import { useEffect, useState } from "react";
import loader from "../../../Header/img/loader.png";

interface IHistogramsItem {
  period: string;
  total: number;
  risks: number;
}

interface IHistogramsProps {
  histogramsItems: IHistogramsItem[];
  isLoading: boolean;
}

const Histograms: React.FC<IHistogramsProps> = ({ histogramsItems, isLoading }) => {
  const [dataItems, setDataItems] = useState<IHistogramsItem[]>([]);

  useEffect(() => {
    if (histogramsItems) {
      setDataItems(histogramsItems);
    } else {

    }
  }, [histogramsItems]);

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

  const settingsmobile = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <SlickButtonFix>
        <div>
          <img
            src={arrowright}
            className={style.mobilearrowright}
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
            className={style.mobilearrowleft}
            alt="стрелка влево"
          />
        </div>
      </SlickButtonFix>
    ),
  };
  return (
    <>
      <div className={style.histogramsblock}>
        <div className={style.histogramsheader}>
          <div className={style.histogramsheaderitem}>Период</div>
          <div className={style.histogramsheaderitem}>Всего</div>
          <div className={style.histogramsheaderitem}>Риски</div>
        </div>
        <div className={style.histogramsslider}>
          <Slider {...settings}>
            {isLoading && (
              <div className={style.loaderblock}>
                <div className={style.resultloader}>
                  <img src={loader} alt="loader" />
                </div>
                <div className={style.resultloadertext}>Загрузка данных...</div>
              </div>
            )}
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
      <div className={style.histogramsmobile}>
        <div className={style.histogramsmobileslider}>
          <Slider {...settingsmobile}>
            {dataItems.map((item, index) => (
              <div key={index} className={style.histogramsmobileitem}>
                <div className={style.mobilecolumn}>
                  <div className={style.mobilecolumbheader}>Период</div>
                  <div className={style.mobilevalue}>{item.period}</div>
                </div>
                <div className={style.mobilecolumn}>
                  <div className={style.mobilecolumbheader}>Всего</div>
                  <div className={style.mobilevalue}>{item.total}</div>
                </div>
                <div className={style.mobilecolumn}>
                  <div className={style.mobilecolumbheader}>Риски</div>
                  <div className={style.mobilevalue}>{item.risks}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Histograms;
