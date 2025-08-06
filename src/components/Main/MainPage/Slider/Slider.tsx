import { useRef } from "react";
import watch from "../img/watch.svg";
import loupe from "../img/loupe.svg";
import lock from "../img/lock.svg";
import arrowleft from "../img/arrowleft.svg";
import arrowright from "../img/arrowright.svg";
import style from "./slider.module.scss"


 interface SliderItem {
    icon: string;
    text: string;
 }

export default function Slider (){
   
    const sliderRef = useRef<HTMLDivElement | null>(null);
    
    const leftMove = () : void => {
        if(sliderRef.current) {
            sliderRef.current.scrollLeft -= window.innerWidth / 3
        }
    }
    
    const rightMove = () : void => {
        if(sliderRef.current) {
            sliderRef.current.scrollLeft += window.innerWidth / 3;
        }
    }
    
    const slides:SliderItem[] = [
        {
            icon: watch,
            text: "Высокая и оперативная скорость обработки заявки"
        },
         {
            icon: loupe,
            text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },
         {
            icon: lock,
            text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },
         {
            icon: watch,
            text: "Высокая и оперативная скорость обработки заявки"
        },
         {
            icon: loupe,
            text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },
         {
            icon: lock,
            text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },
    ]
    
    return (
         <div className={style.slider}>
                        <div className={style.arrowleft} onClick={leftMove}>
                            <img src={arrowleft} alt="стрелка влево" role="button" />
                        </div>
                        <div className={style.slideritems} ref={sliderRef}>
                            {slides.map((item, index) => 
                                <div key={index} className={style.slideritem}>
                                    <img src={item.icon} className={style.slidericon} alt="иконка"/>
                                    <div className={style.slidertext}>{item.text}</div>
                                </div>
                            )}
                        </div>
                        <div className={style.arrowright} onClick={rightMove}>
                            <img src={arrowright} alt="стрелка вправо" role="button" />
                        </div>
                    </div>
    )
}