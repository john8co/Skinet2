using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync(string? color, string? type, string? sort);
    Task<Product?> GetProductByIdAsync(int id);
    Task<IReadOnlyList<string>> GetColorsAsync();
    Task<IReadOnlyList<string>> GetTypesAsync();
    void AddProduct(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(Product product);
    bool ProductExists(int id);
    Task<bool> SaveChangesAsync();
}