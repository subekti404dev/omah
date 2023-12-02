/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SimpleGrid, chakra, useDisclosure } from "@chakra-ui/react";
import { Item } from "./Item";
import useBookmarkStore, { IBookmark } from "../../../store/useBookmark";
import useModeStore from "../../../store/useMode";
import { FaTrash } from "react-icons/fa";
import { ModalDeleteConfirm } from "../../../components/ModalDeleteConfirm";
const TrashIcon = chakra(FaTrash);

type ICategory = {
  data: IBookmark;
};
export const Category = ({ data }: ICategory) => {
  const [isViewMode] = useModeStore((store) => [store.isViewMode]);
  const [deleteCategory] = useBookmarkStore((store) => [store.deleteCategory]);
  const {
    isOpen: isOpenModalDelete,
    onClose: onCloseModalDelete,
    onOpen: onOpenModalDelete,
  } = useDisclosure();
  return (
    <Box
      margin={[2, 4, 6, 8]}
      textAlign={"left"}
      backgroundColor={"#202123"}
      padding={[2, 4, 6, 8]}
      borderRadius={16}
      border={"1px solid #373A40"}
      position={"relative"}
    >
      <ModalDeleteConfirm
        isOpen={isOpenModalDelete}
        onClose={onCloseModalDelete}
        name={data.name}
        onDelete={() => deleteCategory(data.id)}
      />
      {!isViewMode() && (
        <Box position={"absolute"} top={[4, 6, 8]} right={[4, 6, 8]}>
          <Box
            cursor={"pointer"}
            onClick={(e) => {
              e.stopPropagation();
              onOpenModalDelete();
            }}
          >
            <TrashIcon />
          </Box>
        </Box>
      )}
      <Box marginBottom={"16px"} fontSize={"1.375rem"} fontWeight={700}>
        {data.name}
      </Box>
      <SimpleGrid columns={[2, 3, 4, 5, 6, 7]} spacing={[0.5, 1, 2, 3, 5, 6]}>
        {data.items.map((item, j) => (
          <Item key={j} data={item} categoryId={data.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
