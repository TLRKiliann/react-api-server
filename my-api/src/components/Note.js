import './styles.css';

const Note = ({
    note,
    handleDelete,
    validateNumber,
    editNum,
    editPhoneNumber,
    handleChangeNumber,
    switchEditNum
  }) => {

  const labelSwitch = note.editNum ? "Hide" : "Display";

  return (
    <div className="filtermap--div">
      <p style={{border: '1px solid white'}}>{note.name}</p>
      <p style={{border: '1px solid white'}}>{note.number}</p>
      <button
        onClick={handleDelete}
      >
        Delete
      </button>

      {note.editNum ? (
        <div>
          <input
            value={editPhoneNumber}
            onChange={handleChangeNumber} />
          <button onClick={validateNumber}>
            Validate
          </button>
        </div>
        ) : null
      }
      <div>

        <button
          onClick={switchEditNum}>
          {labelSwitch}
        </button>

      </div>
    </div>
    )
}
export default Note;