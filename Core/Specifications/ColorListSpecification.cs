using Core.Entities;

namespace Core.Specifications;

public class ColorListSpecification : BaseSpecification<Product, string>
{
    public ColorListSpecification()
    {
        AddSelect(x => x.Color);
        ApplyDistinct();
    }
}
