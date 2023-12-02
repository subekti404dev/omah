/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { WhiteCircle } from "../../assets/images";
import useAuthStore from "../../store/useAuth";
import useBookmarkStore from "../../store/useBookmark";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import FloatingButton from "../../components/FloatingButton";
import { ModalCreate } from "../../components/ModalCreateNew";
import useMemoryStore from "../../store/useMemory";
import useModeStore from "../../store/useMode";
import { Category } from "./components/category";
const PlusIcon = chakra(FaPlus);

export const HomePage = () => {
  const [user] = useAuthStore((store) => [store.user]);
  const [memory] = useMemoryStore((store) => [store.memory]);
  const [bookmarks, getBookmarks] = useBookmarkStore((store) => [
    store.bookmarks,
    store.getBookmarks,
  ]);
  const [isViewMode, toggleMode] = useModeStore((store) => [
    store.isViewMode,
    store.toggleMode,
  ]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      <Box
        backgroundColor={"#19181b"}
        borderBottomLeftRadius={"20px"}
        height={"95px"}
        padding={"12px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        color={"#FFF"}
      >
        <Image
          src={WhiteCircle}
          position={"absolute"}
          w={250}
          h={250}
          opacity={0.05}
          top={-100}
        />
        <Image
          src={WhiteCircle}
          position={"absolute"}
          w={100}
          h={100}
          opacity={0.05}
          right={5}
          top={100}
        />
        <Box position={"absolute"} width={"calc(100% - 24px)"}>
          <Grid marginBottom={"16px"}>
            <HStack>
              <HStack flex={1}>
                <Box
                  backgroundColor={"#F5C2B3"}
                  w={"50px"}
                  h={"50px"}
                  borderRadius={"16px"}
                >
                  {!!user?.avatar && <Image src={`/avatar/${user.avatar}`} />}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                >
                  <Box fontSize={"12px"} color={"#bfbfbf"}>
                    Welcome Back,
                  </Box>
                  <Box fontSize={"18px"} fontWeight={500}>
                    {user?.name}
                  </Box>
                </Box>
              </HStack>
              <Box>
                <Button
                  onClick={toggleMode}
                  backgroundColor={isViewMode() ? "#C1C2C5" : "#25262B"}
                  color={!isViewMode() ? "#C1C2C5" : "#25262B"}
                  _hover={{
                    backgroundColor: !isViewMode() ? "#46474B" : "#FFF",
                  }}
                >
                  {isViewMode() ? "Edit Mode" : "Save"}
                </Button>
              </Box>
            </HStack>
          </Grid>
        </Box>
      </Box>

      <Box
        backgroundColor={"#25262B"}
        height={"calc(100vh - 95px)"}
        textAlign="center"
        overflowY={"scroll"}
        fontSize="xl"
        color={"#C1C2C5"}
        paddingBottom={12}
      >
        <Box
          margin={[2, 4, 6, 8]}
          textAlign={"left"}
          backgroundColor={"#202123"}
          padding={[2, 4, 6, 8]}
          borderRadius={16}
          border={"1px solid #373A40"}
          display={"flex"}
          flexDirection={"row"}
        >
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Total Memory</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory &&
                ((memory.memory.total || 0) / (1024 * 1024)).toFixed(2)}
              {" GB"}
            </Box>
          </Box>
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Memory Usage</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory &&
                ((memory.memory.used || 0) / (1024 * 1024)).toFixed(2)}
              {" GB"}
            </Box>
          </Box>
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Memory Usage (%)</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory && memory.memory.percentage.toFixed(2)}
              {" %"}
            </Box>
          </Box>
        </Box>
        {bookmarks.map((group, i) => (
          <Category key={`group_${i}`} data={group} />
        ))}
        <FloatingButton onClick={onOpen}>
          <PlusIcon />
        </FloatingButton>
        <ModalCreate isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};
