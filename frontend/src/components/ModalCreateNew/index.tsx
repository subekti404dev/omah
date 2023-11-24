import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Stack,
  RadioGroup,
  Radio,
  FormLabel,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useBookmarkStore from "../../store/useBookmark";

type IModalCreate = {
  isOpen: boolean;
  onClose: () => void;
};

const formInitValue = {
  mode: "1",
  name: "",
  category_id: "",
  url: "",
  icon: "",
};

export const ModalCreate = ({ isOpen, onClose }: IModalCreate) => {
  const [form, setForm] = useState(formInitValue);
  const [loading, bookmarks, addCategory, addItem] = useBookmarkStore((s) => [
    s.loading,
    s.bookmarks,
    s.addCategory,
    s.addItem,
  ]);

  useEffect(() => {
    if (!isOpen) setForm(formInitValue);
  }, [isOpen]);

  const categories = bookmarks.map((b) => ({ label: b.name, value: b.id }));
  const isDisabled =
    form.mode === "1"
      ? !form.name
      : !form.name || !form.category_id || !form.url || !form.icon;

  const handleSubmit = async () => {
    const { name, url, icon, category_id } = form;
    if (form.mode === "1") {
      await addCategory({ name }, onClose);
    }
    if (form.mode === "2") {
      await addItem({ name, url, icon, category_id }, onClose);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent backgroundColor={"#19181B"} color={"#C1C2C5"}>
        <ModalHeader>Create New</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <RadioGroup
              defaultValue={form.mode}
              onChange={(mode) => setForm((f) => ({ ...f, mode }))}
              isDisabled={loading}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                  Category
                </Radio>
                <Radio colorScheme="green" value="2">
                  Item
                </Radio>
              </Stack>
            </RadioGroup>
            <FormLabel mt={4}>Name</FormLabel>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              isDisabled={loading}
            />
            {form.mode === "2" && (
              <>
                <FormLabel mt={4}>Category</FormLabel>
                <Select
                  placeholder="Select Category"
                  onChange={(v) =>
                    setForm((f) => ({ ...f, category_id: v.target.value }))
                  }
                  isDisabled={loading}
                >
                  {categories.map((c, i) => {
                    return (
                      <option key={`option_${i}`} value={c.value}>
                        {c.label}
                      </option>
                    );
                  })}
                </Select>
                <FormLabel mt={4}>Url</FormLabel>
                <Input
                  value={form.url}
                  type="url"
                  placeholder="https://app.example.com"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, url: e.target.value }))
                  }
                  isDisabled={loading}
                />
                <FormLabel mt={4}>Icon</FormLabel>
                <Input
                  value={form.icon}
                  type="url"
                  placeholder="https://app.example.com"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, icon: e.target.value }))
                  }
                  isDisabled={loading}
                />
              </>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor="#1F2225"
            color={"#C1C2C5"}
            mr={3}
            onClick={onClose}
            _hover={{ backgroundColor: "#2e3236" }}
          >
            Close
          </Button>
          <Button
            backgroundColor="#004C38"
            color={"#C1C2C5"}
            _hover={{ backgroundColor: "#025b43" }}
            onClick={() => {
              handleSubmit();
            }}
            isDisabled={loading || isDisabled}
          >
            {loading ? <Spinner /> : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
