import Note from './Note';
import './NoteList.css'

export default function NoteList(props) {
  const notes = props.notes.map((note) => {
    return <Note key={note.id} note={note}/>
  })
  return (
    <div>
      <ul className='notes-list'>
        {notes}
      </ul>
      <button>Add Note</button>
    </div>
    
  )
}