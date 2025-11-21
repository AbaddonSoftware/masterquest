import MoveControls from "./MoveControls";

type BoardCardProps = {
  title: string;
  description?: string | null;
  onEdit?: () => void;
  onDoubleClick?: () => void;
  onArchive?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  disableReorder?: boolean;
};

export default function BoardCard({
  title,
  description,
  onEdit,
  onDoubleClick,
  onArchive,
  onMoveUp,
  onMoveDown,
  disableReorder = false,
}: BoardCardProps) {
  const showReorder = Boolean(onMoveUp || onMoveDown);
  return (
    <div
      className="rounded-xl border border-[#d8c8a0] bg-white/90 p-3 shadow-sm transition hover:shadow-md"
      onDoubleClick={onDoubleClick}
      role={onDoubleClick ? "button" : undefined}
      tabIndex={onDoubleClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onDoubleClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDoubleClick();
        }
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-base font-semibold text-stone-800 break-words flex-1">{title}</h4>
        {showReorder && (
          <MoveControls
            onPrevious={onMoveUp}
            onNext={onMoveDown}
            previousLabel="Move card up"
            nextLabel="Move card down"
            orientation="horizontal"
            size="xs"
            previousIcon="↑"
            nextIcon="↓"
            stopPropagation
            disabled={disableReorder}
            className="bg-white/70 border-[#d8c8a0]"
          />
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm text-stone-600">{description}</p>
      )}

      {(onEdit || onArchive) && (
        <div className="mt-3 flex items-center justify-end gap-3">
          {onArchive && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onArchive();
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-800"
            >
              Archive
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onEdit();
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
