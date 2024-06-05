import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Item } from "@/types/types";
import { Button } from "./ui/button";
import { data } from "@/data/data";
import { useToast } from "./ui/use-toast";

const ItemFormModal = ({
  isOpen,
  setIsOpen,
  items,
  setItems,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    stock: 0,
  });
  const validateForm = () => {
    console.log(isNaN(Number(formData.id)));
    console.log(isNaN(Number(formData.quantity)));
    if (isNaN(Number(formData.id)) || Number(formData.id) < 0) {
      toast({
        title: "Invalid ID",
        description: "Please enter a valid ID",
        variant: "destructive",
      });
      return false;
    }
    if (isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid Quantity",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  const addItem = () => {
    if (!validateForm()) return;
    // Check if an item with the same id already exists
    const existingItem = items.find(
      (item) => Number(item.id) === Number(formData.id),
    );
    console.log("Already existing item", existingItem);
    if (existingItem) {
      // If an item with the same id exists, show an error message
      toast({
        title: "Item already exists",
        description: "An item with the same ID already exists",
        variant: "destructive",
      });
    } else {
      // If no item with the same id exists, add the new item
      const newItem: Item = {
        id: Number(formData.id),
        name: formData.name,
        stock: Number(formData.quantity),
      };
      setItems([...items, newItem]);
      //@ts-ignore
      data.items.push(newItem);
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Item</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addItem();
          }}
        >
          <Label>Item ID</Label>
          <Input
            required
            value={formData.id}
            onChange={(e) => {
              // @ts-ignore
              setFormData({ ...formData, id: e.target.value });
            }}
          />
          <Label>Name</Label>
          <Input
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Label>Quantity</Label>
          <Input
            required
            value={formData.quantity}
            onChange={(e) => {
              // @ts-ignore
              setFormData({ ...formData, quantity: e.target.value });
            }}
          />
          <div className="flex justify-end">
            <Button type="submit" className="mt-4">
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFormModal;
