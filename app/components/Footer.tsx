"use client";

import { Box, Button, Container, Text, VStack, Image } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <Container maxW={"container.sm"}>
      <VStack bg={"blackAlpha.100"} p={8} w={"full"} rounded={"md"} mb={8}>
        <Image src="/vendah-logo.svg" alt="Logo da Vendah" />
        <Text
          as="a"
          href={"https://vendah.com.br"}
          target={"_blank"}
        >
          Feito com <Box as="span" mx={1}><FaHeart /></Box> pela Vendah
        </Text>
  </VStack>
</Container>
  );
}
