/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Image, chakra, useDisclosure } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import useModeStore from "../../../store/useMode";
import useBookmarkStore, { IBookmarkItem } from "../../../store/useBookmark";
import { ModalDeleteConfirm } from "../../../components/ModalDeleteConfirm";

const TrashIcon = chakra(FaTrash);

type IItem = {
  categoryId: number;
  data: IBookmarkItem;
};

export const Item = ({ data, categoryId }: IItem) => {
  const [isViewMode] = useModeStore((store) => [store.isViewMode]);
  const [deleteItem] = useBookmarkStore((store) => [store.deleteItem]);
  const {
    isOpen: isOpenModalDelete,
    onClose: onCloseModalDelete,
    onOpen: onOpenModalDelete,
  } = useDisclosure();

  return (
    <Box
      onClick={() => window.open(data.url, "_blank")}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      margin={2}
    >
      <ModalDeleteConfirm
        isOpen={isOpenModalDelete}
        onClose={onCloseModalDelete}
        name={data.name}
        onDelete={() => deleteItem(data.id, categoryId)}
      />
      <Box
        backgroundColor={"#25262B"}
        border={"1px solid #373A40"}
        w={"100%"}
        aspectRatio={"1/1"}
        borderRadius={[8, 12, 16, 20, 24, 28]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingTop={[2, 3, 4]}
        paddingBottom={[2, 3, 4]}
        paddingLeft={[4, 6, 8]}
        paddingRight={[4, 6, 8]}
        cursor={"pointer"}
        flexDirection={"column"}
        position={"relative"}
      >
        {!isViewMode() && (
          <Box position={"absolute"} top={2} right={2}>
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
        <Box
          fontSize={["0.8rem", "0.9rem", "1rem"]}
          fontWeight={700}
          mb={2}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
        >
          {data.name}
        </Box>
        <Image
          src={data.icon}
          width={"100%"}
          aspectRatio={"1/1"}
          _hover={{ transform: "scale(1.1) translateZ(0px)" }}
        />
      </Box>
    </Box>
  );
};
