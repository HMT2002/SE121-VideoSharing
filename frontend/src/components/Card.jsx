import './Card.css';

function Card(props) {
  const classes = 'card-' + props.className;

  const divClickedHandler = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className={classes} onClick={divClickedHandler}>
      {props.children}
    </div>
  );
}
export default Card;
