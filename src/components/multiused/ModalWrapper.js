import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

const ModalWrapper = ({ isOpen, onClose, size, title, children, Footer }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent p={8} rounded="2xl">
        <ModalHeader as={Heading}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {Footer}
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper