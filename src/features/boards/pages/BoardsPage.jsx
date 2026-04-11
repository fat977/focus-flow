import { useSelector } from "react-redux";
import { useBoards } from "../hooks/useBoards";
import BoardItem from "../components/BoardItem";

function BoardsPage() {
  const userId = useSelector((state) => state.auth.user?.uid);

  const { data: boards } = useBoards(userId);

  return (
      <ul className="m-5 pb-4 grid grid-cols-2 lg:grid-cols-3 gap-5">
        {boards?.map((board) => (
          <BoardItem  key={board.id} board={board} />
        ))}
      </ul>
  );
}

export default BoardsPage;
