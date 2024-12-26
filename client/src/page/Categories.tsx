import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component from Shadcn
import { toast } from "react-toastify";
import { useAddCategoryMutation, useGetCategoriesQuery } from "@/services/categoriesApi";

interface Category {
    id: number;
    name: string;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
    const categoryAll = data?.payload?.categories || [];


    const [addCategory] = useAddCategoryMutation()

    const handleAddCategory = async () => {
        try {
            if (!newCategory.trim()) {
                toast.error("Category name cannot be empty");
                return;
            }

            const res = await addCategory({ name: newCategory });
            if (res?.error) {
                toast.error(res.error.data?.message || "Failed to add category");
                return;
            }
            toast.success("Category added successfully!");
            setNewCategory("");
            refetch();
        } catch (error) {
            toast.error("Failed to add category");
        }
    };

    const handleDeleteCategory = (id: number) => {
        setCategories((prev) => prev.filter((category) => category.id !== id));
        toast.success("Category deleted successfully!");
        refetch()
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        if (!updatedCategory.name.trim()) {
            toast.error("Category name cannot be empty");
            return;
        }

        setCategories((prev) =>
            prev.map((category) =>
                category.id === updatedCategory.id ? updatedCategory : category
            )
        );
        toast.success("Category updated successfully!");
        refetch();
        setSelectedCategory(null); // Close modal
    };

    return (
        <div className="container mx-auto p-6">
            {/* Create Category */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Create New Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="flex items-center justify-center gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddCategory();
                        }}
                    >
                        <div className="flex-1">
                            <Label htmlFor="categoryName">Category Name</Label>
                            <Input
                                id="categoryName"
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </div>
                        <Button className="mt-7" type="submit">
                            Add Category
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Separator />

            {/* Show Categories */}
            <Card>
                <CardHeader>
                    <CardTitle>Categories List</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        // Show Skeleton Loader based on the number of categories expected
                        <div className="space-y-4">
                            {[...Array(categoryAll.length || 5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border rounded-md shadow-sm"
                                >
                                    <Skeleton className="w-1/2 h-6" />
                                    <div className="flex gap-2">
                                        <Skeleton className="w-16 h-8" />
                                        <Skeleton className="w-16 h-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load categories. Please try again later.</p>
                    ) : categoryAll.length > 0 ? (
                        <ul className="space-y-4">
                            {categoryAll.map((category) => (
                                <li
                                    key={category.id}
                                    className="flex items-center justify-between p-4 border rounded-md shadow-sm"
                                >
                                    <span className="text-lg font-medium">{category.name}</span>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No categories found. Add some to get started!</p>
                    )}
                </CardContent>
            </Card>

            {/* Update Modal */}
            <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (selectedCategory) {
                                handleUpdateCategory(selectedCategory);
                            }
                        }}
                    >
                        <div className="space-y-4">
                            <Label htmlFor="editCategoryName">Category Name</Label>
                            <Input
                                id="editCategoryName"
                                type="text"
                                value={selectedCategory?.name || ""}
                                onChange={(e) =>
                                    setSelectedCategory({
                                        ...selectedCategory!,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <DialogFooter className="mt-4 flex justify-end gap-4">
                            <Button variant="secondary" onClick={() => setSelectedCategory(null)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoriesPage;
