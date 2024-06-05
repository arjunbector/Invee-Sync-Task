"use client";
import ItemFormModal from "@/components/ItemFormModal";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/data/data";
import { Item } from "@/types/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const FILTERS = ["All", "In Stock", "Out of Stock"];

const Page = () => {
  const [filter, setFilter] = useState("All"); // Initialize state for filter

  const [items, setItems] = useState<Item[]>(data.items);
  const [openModal, setOpenModal] = useState(false);

  const deleteItem = (id: number) => {
    let itemToDelete = data.items.find((item) => item.id === id);
    if (itemToDelete) {
      let newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      //@ts-ignore
      data.items = items
    }
  };

  return (
    <main>
      <MaxWidthWrapper className="my-10">
        <h1 className="text-center text-4xl font-bold">Inventory</h1>

        <div className="flex w-full justify-center items-center my-5">
          <h1 className="font-semibold">Filters:</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">{filter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Select a filter to be applied
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FILTERS.map((filter) => (
                <DropdownMenuItem
                key={filter}
                  onClick={() => {
                    // Filter orders based on the selected filter
                    setFilter(filter);
                    if (filter === "All") {
                      setItems(data.items);
                    } else {
                      if (filter === "In Stock") {
                        setItems(data.items.filter((item) => item.stock ?? 0 > 0));
                      } else {
                        setItems(data.items.filter((item) => item.stock === 0));
                      }
                    }
                  }}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableCaption>
            List of all the items available in inventory
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteItem(item.id)}
                  >
                    <TrashIcon className="h-4 w-4 shrink-0" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="my-4 flex justify-center">
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add a new item
          </Button>
        </div>
        <ItemFormModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          items={items}
          setItems={setItems}
        />
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
