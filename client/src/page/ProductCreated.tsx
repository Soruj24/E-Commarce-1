import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Define Zod schema for form validation
const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(3, "Category must be at least 3 characters"),
    image: z.string().url("Must be a valid URL"),
});

// TypeScript type inferred from the schema
type ProductFormValues = z.infer<typeof productSchema>;

const ProductCreatePage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            setLoading(true);
            console.log("Submitting product:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Product created successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter product title"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Price Field */}
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="Enter product price"
                                {...register("price", { valueAsNumber: true })}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter product description"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Category Field */}
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Image URL Field */}
                        <div>
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                type="url"
                                placeholder="Enter product image URL"
                                {...register("image")}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCreatePage;
