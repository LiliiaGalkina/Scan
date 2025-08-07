import style from "./tarifcard.module.scss";
import checkmark from "../img/checkmark.svg";
import allstyle from "../../allstyle.module.scss"

 interface TarifCardProps  {
    title: string;
    text: string;
    image: string;
    price: string;
    oldprice: string;
    buttonname: string;
    tariffitems: string[];
    colorheader: string;
    colortitle:string;
    colorbutton:string;
    colorbuttonname?: string;
    colorborder?:string;
    dopinfo?: string;
    beige?:string;
}



const TarifCard: React.FC<TarifCardProps> = ({title, text, image, price, oldprice, buttonname, tariffitems, colortitle, colorbutton, dopinfo, beige, colorheader, colorborder, colorbuttonname}) => {
    return (
        <div className={style.card}>
            <div className={style.cardheader} style={{backgroundColor: colorheader, color:colortitle}}>
                <div className={style.cardheadertextblock}>
                    <h4 className={style.cardtitle}>{title}</h4>
                    <p className={style.cardtext}>{text}</p>
                </div>
                <div className={style.cardimage}><img src={image} alt="icon" /></div>
            </div>
            <div className={style.cardbody} style={{border: `0.2rem solid ${colorborder}`}}>
                {beige && <div className={style.beige}>{beige}</div>}
                <div>
                    <div className={style.priceblock}>
                        <span className={style.price}>{price} &#8381;</span>
                        <span className={style.oldprice}>{oldprice} &#8381;</span>
                    </div>
                    {dopinfo && <div className={style.dopindo}>{dopinfo}</div>}
                </div>
                <div className={style.bodyinfo}>
                    <p className={style.bodytext}>В тариф входит:</p>
                    <div className={style.tarifoptions}>
                        {tariffitems.map((option, index) => <div className={style.tarifoption} key={index}><div className={style.tarifoptionimage}><img src={checkmark} alt="зеленая галочка" /></div><div className={style.tarifoptiontext}>{option}</div></div>)}
                    </div>
                    <button className={`${style.tarifbutton} ${allstyle.button}`} style={{backgroundColor: colorbutton, color: colorbuttonname}}>{buttonname}</button>
                </div>
            </div>
        </div>
    )
}

export default TarifCard;