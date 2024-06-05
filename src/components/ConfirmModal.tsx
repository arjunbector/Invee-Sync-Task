// Import necessary components and hooks
import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { data } from "@/data/data";
import { Order } from "@/types/types";

// Define the ConfirmModal component
const ConfirmModal = ({
  isOpen,
  setIsOpen,
  orderId,
  order,
  setOrder,
}: {
  isOpen: boolean; // State for modal visibility
  setIsOpen: Dispatch<SetStateAction<boolean>>; // Function to set modal visibility
  orderId: number | null; // ID of the order to be confirmed
  order: Order | undefined; // The order to be confirmed
  setOrder: Dispatch<SetStateAction<Order | undefined>>; // Function to set the order
}) => {
  // Return the component JSX
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/* Display the status to be changed to */}
            Mark Order As{" "}
            {data.orders.find((order) => order.id === orderId)?.status ===
            "Completed"
              ? "Pending"
              : "Completed"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {/* Ask for confirmation */}
            Are you sure you want to mark order as{" "}
            {data.orders.find((order) => order.id === orderId)?.status ===
            "Completed"
              ? "Pending"
              : "Completed"}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // Find the order in data.orders
              let orderToUpdate = data.orders.find(
                (order) => order.id === orderId,
              );

              // If the order is found, update its status
              if (orderToUpdate) {
                orderToUpdate.status =
                  orderToUpdate.status === "Completed"
                    ? "Pending"
                    : "Completed";

                // Update the order in the component state
                setOrder({
                  ...order!,
                  status: orderToUpdate.status,
                });
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Export the ConfirmModal component
export default ConfirmModal;