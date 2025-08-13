import style from "./search.module.scss";
import mark from "./img/mark.png";

interface CheckboxProps {
  checkboxValue: boolean;
  setCheckboxValue: (value: boolean) => void;
  checkboxText: string;
}

const Checkbox: React.FC<CheckboxProps> = ({checkboxValue, setCheckboxValue, checkboxText}) => {
    return (
      <div className={style.checkboxitem}>
        <input
          type="checkbox"
          className={style.checkbox}
          checked={checkboxValue}
          onChange={() => setCheckboxValue(!checkboxValue)}
          style={{
            backgroundImage: checkboxValue ? `url(${mark})` : "none",
          }}
        />
        <p
          className={style.checkboxtext}
          style={{ opacity: checkboxValue ? 1 : 0.4 }}
        >
          {checkboxText}
        </p>
      </div>
    );
    
}

export default Checkbox;