import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetProductsQuery } from '@/services/productApi';
import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ProductList = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [filterBy, setFilterBy] = useState('');
    const [sortBy, setSortBy] = useState('');

    // Trigger API call with pagination, search, and filters
    const { data, error, isLoading } = useGetProductsQuery({
        search,
        page,
        limit,
        filterBy,
        sortBy,
    });

    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    const products = data?.payload?.products || [];
    const pagination = data?.payload?.pagination;


    return (
        <div className="p-4  space-y-4">
            {/* Search Input and Filters */}
            <div className="space-y-4 flex justify-between items-center">
                <div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">Electronics</SelectItem>
                                <SelectItem value="banana">Fashion</SelectItem>
                                <SelectItem value="blueberry">Home & Garden</SelectItem>
                                <SelectItem value="grapes">Toys</SelectItem>
                                <SelectItem value="pineapple">Sports</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter By Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple"> High to Low </SelectItem>
                                <SelectItem value="banana">Low to High</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product: { id: string; title: string; category: string; price: number }) => (
                        <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
                            <CardHeader className="text-center">
                                <h2 className="font-bold text-xl">{product.title}</h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Category: {product.category || 'N/A'}</p>
                                <p className="text-lg font-semibold">Price: ${product.price}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-red-500 font-semibold">No products matched your search.</p>
                )}
            </div>

            {/* Pagination Controls */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
};

export default ProductList;
