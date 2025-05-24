import { useSortable } from '@dnd-kit/sortable';
import { Box } from '@mui/material';

export const SortableItem = ({
  id,
  children,
  isReorderEnabled,
}: {
  id: number;
  children: React.ReactNode;
  isReorderEnabled: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style} {...(isReorderEnabled ? { ...attributes, ...listeners } : {})}>
      {children}
    </Box>
  );
};
