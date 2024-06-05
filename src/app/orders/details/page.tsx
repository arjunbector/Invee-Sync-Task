"use client";
// Import necessary components and hooks
import ConfirmModal from "@/components/ConfirmModal";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/data/data"; // Import data
import { Order } from "@/types/types"; // Import Order type
import { notFound } from "next/navigation";
import { useState } from "react"; // Hook for state management
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
// Define the Page component
const Page = ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  const orderId = Number(id); // Parse the order ID from the URL
  const [order, setOrder] = useState<Order | undefined>(
    data.orders.find((order) => order.id === orderId), // Find the order with the given ID
  );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State for showing the confirm dialog

  // Return the component JSX
  return (
    <div>
      <MaxWidthWrapper className="my-10">
        <h1 className="my-2 text-center text-4xl font-bold">Order Details</h1>

        <div className="grid grid-cols-1 sm:mx-10 sm:grid-cols-2 sm:space-x-10">
          <Card className="my:5 sm:my-10">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display order details */}
              <p>
                <span className="font-semibold">Order ID: </span>
                {order?.id}
              </p>
              <p>
                <span className="font-semibold">Cutomer: </span>
                {order?.customer}
              </p>
              <p>
                <span className="font-semibold">Number of items: </span>
                {order?.items.length}
              </p>
            </CardContent>
          </Card>
          <Card className="my-5 sm:my-10">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display order status */}
              <p
                className={`${order?.status === "Completed" ? "text-green-500" : "text-red-500"}`}
              >
                <span className="font-semibold text-black">Status: </span>
                {order?.status}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="sm:mx-20">
          <Table>
            <TableCaption className="mt-4">
              {/* Display order ID */}
              List of all the items for order ID {orderId}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Availablility</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map through order items and create a table row for each */}
              {order &&
                order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity ?? 0}</TableCell>
                    <TableCell
                      className={`${
                        data.items.find((stockItem) => stockItem.id === item.id)
                          ?.stock ?? 0 > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.items.find((stockItem) => stockItem.id === item.id)
                        ?.stock ?? 0 > 0
                        ? "Available"
                        : "Not available"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="full flex flex-wrap items-center justify-center">
          <Button
            onClick={() => {
              setShowConfirmDialog(true); // Show the confirm dialog
            }}
            className="my-4"
          >
            {/* Display the status to be changed to */}
            Mark order as{" "}
            {order?.status === "Completed" ? "Pending" : "Completed"}
          </Button>
        </div>
        <ConfirmModal
          orderId={orderId}
          isOpen={showConfirmDialog}
          setIsOpen={setShowConfirmDialog}
          order={order}
          setOrder={setOrder}
        />
      </MaxWidthWrapper>
    </div>
  );
};

// Export the Page component
export default Page;
