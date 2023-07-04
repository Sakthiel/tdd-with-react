export default function Square({value , onSquareClick}) {
  
    return <button data-testid = "square" className="square" 
    onClick = {onSquareClick}>{value}
    </button>;
  }