import React from "react";

import {
  CustomModal,
  Box,
  EndBox,
  Title,
  Description,
  BoxIcons,
} from "./modals.style";

import Button from "../buttons/button";

import { Cross1Icon } from "@radix-ui/react-icons";

export default function Modal({
  open,
  closeModal,
  title,
  description,
  data,
  inputComponents,
}) {
  return (
    <CustomModal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <EndBox>
          <BoxIcons onClick={closeModal}>
            <Cross1Icon />
          </BoxIcons>
        </EndBox>
        <Title id="modal-modal-title">{title}</Title>
        <Description id="modal-modal-description">{description}</Description>
        {inputComponents}
      </Box>
    </CustomModal>
  );
}
