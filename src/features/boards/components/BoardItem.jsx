import { useModal } from "../../../context/modal/useModal";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { getDeadlineInfo } from "../../../utils/getDeadlineInfo";
import { calculateProgress } from "../../../helpers/calculateProgress";
import BoardHeader from "./BoardHeader";
import BoardProgress from "./BoardProgress";
import BoardDates from "./BoardDates";
import { getBoardStatus } from "../../../utils/statusStyle";
function BoardItem({ board }) {
  const { openModal } = useModal();

  const progressData = calculateProgress(board.lists);
  const status = getBoardStatus(
    board.lists,
    progressData.total,
    progressData.completed
  );
  
  const deadline = getDeadlineInfo(board.dueDate);
  const createdDate = getFormattedDate(board.created_at);

  return (
    <li className="group bg-(--grey-50) border border-(--grey-200) shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-6 relative overflow-hidden mb-4">
     

      <BoardHeader
        id={board.id}
        title={board.title}
        status={status}
        board={board}
        openModal={openModal}
      />

      <BoardProgress
        completed={progressData.completed}
        total={progressData.total}
        progress={progressData.progress}
      />

      <BoardDates deadline={deadline} created={createdDate} />
    </li>
  );
}

export default BoardItem;
