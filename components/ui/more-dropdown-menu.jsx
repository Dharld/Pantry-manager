"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"; // Add these imports
import { deleteProduct } from "@/lib/firebase";

export function ProductActionMenu({ productId }) {
  // Use router to navigate through the page
  const router = useRouter();

  const onDelete = async () => {
    try {
      const success = await deleteProduct(productId);
      if (success) {
        // If the product is deleted successfully, refresh the page
        router.refresh();
      }
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };
  const onEdit = async () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-secondary rounded-full"
        >
          <MoreHorizontal className="h-4 w-4 text-secondary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary border border-ui-border shadow-lg rounded-md">
        <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-primary">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-ui-border" />
        <DropdownMenuItem
          onClick={onEdit}
          className="flex items-center px-3 py-2 text-sm text-primary hover:bg-onSecondary cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4 text-accent-primary" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center px-3 py-2 text-sm text-primary hover:bg-onSecondary cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
