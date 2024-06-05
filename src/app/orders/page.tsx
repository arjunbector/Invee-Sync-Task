"use client";
// Import necessary components and hooks
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
import { data } from "@/data/data"; // Import data
import { useRouter } from "next/navigation"; // Hook for routing
import { useState } from "react"; // Hook for state management

const FILTERS = ["None", "Pending", "Completed"];
const SORT_OPTIONS = ["None", "Customer Name", "Item Count"];

// Define the Page component
const Page = () => {
  const router = useRouter(); // Initialize router
  const [orders, setOrders] = useState(data.orders); // Initialize state for orders
  const [filter, setFilter] = useState("None"); // Initialize state for filter
  const [sortOption, setSortOption] = useState("None"); // Initialize state for sorting option

  // Function to sort orders
  const sortOrders = (option: string) => {
    let sortedOrders = [...orders];
    if (option === "Customer Name") {
      sortedOrders.sort((a, b) => a.customer.localeCompare(b.customer));
    } else if (option === "Item Count") {
      sortedOrders.sort((a, b) => a.items.length - b.items.length);
    }
    setOrders(sortedOrders);
  };

  // Return the component JSX
  return (
    <div>
      <MaxWidthWrapper className="my-10">
        <h1 className="text-center text-4xl font-bold">Orders</h1>
        <div className="mx-auto grid grid-cols-2 my-10">
          {/* Filters */}
          <div className="flex flex-col items-center">
            <h1 className="font-semibold">Filter</h1>
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
                      if (filter === "None") {
                        setOrders(data.orders);
                      } else {
                        setOrders(
                          data.orders.filter(
                            (order) => order.status === filter,
                          ),
                        );
                      }
                    }}
                  >
                    {filter}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Sorting */}
          <div className="flex flex-col items-center">
            <h1 className="font-semibold">Sort By</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">{sortOption}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select a sorting option</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                  key={option}
                    onClick={() => {
                      // Sort orders based on the selected option
                      setSortOption(option);
                      sortOrders(option);
                    }}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table>
          <TableCaption>List of all the orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Item Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map through orders and create a table row for each */}
            {orders &&
              orders.map((order) => (
                <TableRow
                key={order.id}
                  className="cursor-pointer"
                  onClick={() => {
                    // On click, navigate to order details page
                    router.push(`/orders/details?id=${order.id}`);
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell
                    className={
                      order.status === "Completed"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {order.status}
                  </TableCell>
                  <TableCell className="text-center sm:text-left">{order.items.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </MaxWidthWrapper>
    </div>
  );
};

// Export the Page component
export default Page;
