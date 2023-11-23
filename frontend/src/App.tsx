import { useEffect } from "react";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { HomePage } from "./pages/Home";
import theme from "./theme";
import "@fontsource/poppins";
import { Helmet } from "react-helmet";
import useAuthStore from "./store/useAuth";
import LoginPage from "./pages/Login";

function App() {
  const [init, user, loading] = useAuthStore((store) => [
    store.init,
    store.user,
    store.loading,
  ]);

  useEffect(() => {
    init();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Box
        display={"flex"}
        justifyContent={"center"}
        color={"#1D1D1D"}
        backgroundColor={"#25262B"}
      >
        <Box w={"100%"} h={"100vh"} position="relative">
          {loading && (
            <Box
              w={"100%"}
              h={"100vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner />
            </Box>
          )}
          {!loading && (
            <>
              {!user && <LoginPage />}
              {user && <HomePage />}
            </>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
