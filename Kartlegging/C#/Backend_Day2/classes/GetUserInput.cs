public class GetUserInput
{
    public string AskForFileName()
    {
        Console.Write("Enter the filename to read: ");
        return Console.ReadLine() ?? "";
    }
}


// public static class GetUserInput
// {
//     public static string AskForFileName()
//     {
//         Console.Write("Enter the filename to read: ");
//         return Console.ReadLine() ?? "";
//     }
// }