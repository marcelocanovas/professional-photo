"use client";

import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Container maxW={"container.sm"}>
      <VStack bg={"blackAlpha.100"} p={8} w={"full"} rounded={"md"} mb={8}>
        <Text
          as="a"
          href={"https://vendah.com.br"}
          target={"_blank"}
        >
          {"Feito por Vendah"}
        </Text>
      </VStack>
    </Container>
  );
}
