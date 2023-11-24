/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { WhiteCircle } from "../../assets/images";
import useAuthStore from "../../store/useAuth";
import useBookmarkStore from "../../store/useBookmark";
import { useEffect } from "react";

export const HomePage = () => {
  const [user] = useAuthStore((store) => [store.user]);
  const [bookmarks, getBookmarks] = useBookmarkStore((store) => [
    store.bookmarks,
    store.getBookmarks,
  ]);

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
        {bookmarks.map((group, i) => (
          <Box
            key={`group_${i}`}
            margin={[2, 4, 6, 8]}
            textAlign={"left"}
            backgroundColor={"#202123"}
            padding={[2, 4, 6, 8]}
            borderRadius={16}
            border={"1px solid #373A40"}
          >
            <Box marginBottom={"16px"} fontSize={"1.375rem"} fontWeight={700}>
              {group.name}
            </Box>
            <SimpleGrid
              columns={[2, 3, 4, 5, 6, 7]}
              spacing={[0.5, 1, 2, 3, 5, 6]}
            >
              {group.items.map((item, j) => (
                <Box
                  key={`item_${j}`}
                  onClick={() => window.open(item.url, "_blank")}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  margin={2}
                >
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
                  >
                    <Box
                      fontSize={["0.8rem", "0.9rem", "1rem"]}
                      fontWeight={700}
                      mb={2}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                    >
                      {item.name}
                    </Box>
                    <Image
                      src={item.icon}
                      width={"100%"}
                      aspectRatio={"1/1"}
                      _hover={{ transform: "scale(1.1) translateZ(0px)" }}
                    />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </Box>
    </>
  );
};
