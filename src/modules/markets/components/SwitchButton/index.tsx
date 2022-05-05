import staticStyles from './style';

interface SwitchButtonInterface {
  label: string;
  onChange: any;
}

const SwitchButton = ({ label, onChange }: SwitchButtonInterface) => {
  return (
    <div className="container">
      <div className="toggle-switch" onChange={onChange}>
        <input type="checkbox" className="checkbox" name={label} id={label} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
};

export default SwitchButton;
