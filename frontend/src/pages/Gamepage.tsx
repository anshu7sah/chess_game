import { useSocket } from "../hooks/use-socket";

const Gamepage = () => {
  const [socket, board] = useSocket();

  console.log(board);
  return <div>Gamepage</div>;
};

export default Gamepage;
