public class GetUserInput
{
    public string AskForFileName()
    {
        Console.Write("Enter the filename to read: ");
        return Console.ReadLine() ?? "";
    }
}
