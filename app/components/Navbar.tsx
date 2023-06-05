import {
  Button,
  HStack,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      bg={"blackAlpha.100"}
      p={4}
      backdropFilter={"blur(20px)"}
      w={"full"}
      position={"sticky"}
      top={0}
      zIndex={100}
      userSelect={"none"}
    >
      <Heading size={"md"} as={"a"} href={"/"}>
        Minha Foto Profissional
      </Heading>
      <Spacer />
      <IconButton
        aria-label={"Modo Escuro"}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
        size={"sm"}
        rounded={"full"}
      />
    </HStack>
  );
}
