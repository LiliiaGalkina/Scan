import style from "./tarifcard.module.scss";

 interface TarifCardProps  {
    title: string;
    text: string;
    image: string;
    price: string;
    oldprice: string;
    buttonname: string;
    tariffitems: string[];
    colortitle:string;
    colorbutton:string;
    dopinfo?: string;
    beige?:string;
}



const TarifCard: React.FC<TarifCardProps> = ({title, text, image, price, oldprice, buttonname, tariffitems, colortitle, colorbutton, dopinfo, beige}) =>{
    return (
        <div className={style.card}>
            <div className={style.cardheader}>
                <div className={style.cardheadertextblock}>
                    <h4 className={style.cardtitle}>{title}</h4>
                    <p className={style.cardtext}>{text}</p>
                </div>
                <div className={style.cardimage}><img src={image} alt="icon" /></div>
            </div>
            <div className={style.cardbody}>
                
            </div>
        </div>
    )
}

export default TarifCard;