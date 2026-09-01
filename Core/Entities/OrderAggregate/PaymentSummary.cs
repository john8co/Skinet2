namespace Core.Entities.OrderAggregate;

public class PaymentSummary
{
    public int Last4 { get; set; }
    public required string Brand { get; set; }
    public required string ExpMonth { get; set; }
    public required string ExpYear { get; set; }
}