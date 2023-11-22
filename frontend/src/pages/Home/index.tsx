/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { WhiteCircle } from "../../assets/images";
import useAuthStore from "../../store/useAuth";
import _ from "lodash";

export const HomePage = () => {
  const [user] = useAuthStore((store) => [store.user]);

  return (
    <>
      <Box
        backgroundColor={"#705a9d"}
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
          <Grid marginBottom={"24px"}>
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
        backgroundColor={"#FFF"}
        height={"calc(100vh - 95px)"}
        textAlign="center"
        overflowY={"scroll"}
        fontSize="xl"
        color={"#1D1D1D"}
        paddingBottom={12}
      >
        {_.range(0, 2).map(() => (
          <Box margin={"24px"} textAlign={"left"}>
            <Box marginBottom={"16px"} fontSize={"20px"} fontWeight={500}>
              Group
            </Box>
            <SimpleGrid columns={[3, 4, 5, 6, 7]} spacing={5}>
              {_.range(0, 10).map(() => (
                <Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    margin={2}
                  >
                    <Box fontSize={16} fontWeight={500}>
                      Name
                    </Box>
                    <Box
                      backgroundColor={"green"}
                      w={"100%"}
                      aspectRatio={"1/1"}
                      borderRadius={35}
                    ></Box>
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
