import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';
import { useGetProductsQuery } from '@/services/productApi';
import { useState } from 'react';

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
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

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page when search changes
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination?.totalPages) {
            setPage(newPage);
        }
    };
    

    return (
        <div className="p-4 space-y-4">
            {/* Search Input and Filters */}
            <div className="space-y-4">
                <Input
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full"
                />
                <div className="flex space-x-4">
                    {/* Category Filter */}
                    <Select value={filterBy} onValueChange={(value) => setFilterBy(value)} className="w-1/3">
                        <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="Category A">Category A</SelectItem>
                                <SelectItem value="Category B">Category B</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Sort Filter */}
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value)} className="w-1/3">
                        <SelectTrigger>
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort Options</SelectLabel>
                                <SelectItem value="price">Price</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
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
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {pagination?.page} of {pagination?.totalPages}
                </span>
                <Button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination?.totalPages}
                    variant="outline"
                    size="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ProductList;
