import './styles.css';

const SearchNote = (props) => {
  return (
    <div className="notemap--div">
      <p>{props.name} :</p>
      <p>{props.number}</p>
    </div>  
  )
}

export default SearchNote;
