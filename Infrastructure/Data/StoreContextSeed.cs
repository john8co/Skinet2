using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        await SeedEntityAsync(context, context.Products, "products.json");
        await SeedEntityAsync(context, context.DeliveryMethods, "delivery.json");
    }

    private static async Task SeedEntityAsync<T>(StoreContext context, DbSet<T> dbSet, string fileName) where T : class
    {
        if (dbSet.Any()) return;

        var data = await File.ReadAllTextAsync($"../Infrastructure/Data/SeedData/{fileName}");
        var entities = JsonSerializer.Deserialize<List<T>>(data);

        if (entities == null || entities.Count == 0) return;

        dbSet.AddRange(entities);
        await context.SaveChangesAsync();
    }
}